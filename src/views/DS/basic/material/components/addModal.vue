<template>
  <ModalCom
    v-if="modalFlag"
    :modalProps="modalProps"
    @handleOk="handleOk"
    @handleCancel="handleCancel"
  >
    <a-form
      :model="modalForm"
      :rules="formRules"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 14 }"
      ref="formRef"
    >
      <a-form-item :label="$t('basic.物料名称')" name="materialName">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.materialName"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('basic.物料编号')" name="materialNo">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.materialNo"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('basic.等级')" name="materialLevel">
        <DictionaryType
          :ID="modalForm.materialLevel"
          DicType="materialLevel"
          @changz="changeMaterialLevel"
        ></DictionaryType>
      </a-form-item>
      <a-form-item :label="$t('basic.物料类型')" name="materialType">
        <DictionaryType
          :ID="modalForm.materialType"
          DicType="materialType"
          @changz="changeMaterialType"
        ></DictionaryType>
      </a-form-item>
      <a-form-item :label="$t('basic.说明')">
        <a-textarea
          :allowClear="true"
          v-model:value="modalForm.description"
          :rows="4"
          :placeholder="getPlaceholder(1)"
        ></a-textarea>
      </a-form-item>
    </a-form>
  </ModalCom>
</template>
<script setup>
import {
  public_form_empty,
  getPlaceholder,
  setRules,
  public_form_data_replace,
  setMessageTips,
  filterOption,
  stopUpDownFunList
} from '@/pages/utils'
import { reactive, ref, nextTick, onMounted, watch } from 'vue'
import ModalCom from '@/components/modal/modalCom.vue'
import { materialCreate, materialEdit } from '@/apis/marketbase'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import DictionaryType from '@/components/common/DictionaryType.vue'
const emits = defineEmits()
const stopUpDownFun = stopUpDownFunList()
const { t } = useI18n()
const formRef = ref()
const store = useStore()
const materialType = ref()
const materialLevel = ref()
const modalFlag = ref(false)
const modalProps = ref({})
const modalForm = reactive({
  materialName: null,
  materialNo: null,
  materialLevel: null,
  materialType: null, //物料类型
  description: null
})

//弹框信息 若编辑 可保留id
const modalInfo = reactive({
  type: 'add',
  id: null
})

onMounted(() => {})
//表单验证
const formRules = reactive({
  materialName: [setRules(1)],
  materialNo: [setRules(1)],
  materialLevel: [setRules(2)],
  materialType: [setRules(2)]
})
watch(
  () => store.state.user.dictionaryInfo,
  (val) => {
    let data = val.materialType
    let result = val.materialLevel
    if (
      (typeof data !== 'undefined' && typeof data !== 'null') ||
      (typeof result !== 'undefined' && typeof result !== 'null')
    ) {
      materialType.value = Object.keys(data)?.map((key) => data[key])
      materialLevel.value = Object.keys(result).map((key) => result[key])
    }
  },
  { immediate: true }
)
//打开弹框
const openModal = (row, type) => {
  if (type == 'add') public_form_empty(modalForm)
  if (type == 'edit') public_form_data_replace(modalForm, row)
  modalInfo.type = type
  modalInfo.id = row.id
  modalProps.value = {
    modalTitle: type == 'add' ? t('base.新建') : t('base.编辑')
  }
  modalFlag.value = true
}

//取消
const handleCancel = () => {
  modalFlag.value = false
}

//确定
const handleOk = () => {
  stopUpDownFun(() => {
    formRef.value.validate().then(() => {
      if (modalInfo.type == 'add') addSave()
      if (modalInfo.type == 'edit') editSave()
    })
  })
}

//新增
const addSave = () => {
  materialCreate({ ...modalForm }).then((res) => handleMessage(res))
}
//编辑
const editSave = () => {
  materialEdit({
    ...modalForm,
    id: modalInfo.id
  }).then((res) => handleMessage(res))
}

//统一信息处理
const handleMessage = (res) => {
  if (res.errorCode == '00000') emits('addSubmit')
  setMessageTips(res)
  handleCancel()
}
//接收物料类型的值
const changeMaterialType = ({ value }) => {
  modalForm.materialType = value
}
//接收物料等级的值
const changeMaterialLevel = ({ value }) => {
  modalForm.materialLevel = value
}
defineExpose({
  openModal
})
</script>
