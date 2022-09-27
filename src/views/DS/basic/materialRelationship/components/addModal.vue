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
      <a-form-item :label="$t('basic.物料类型')" name="materialType" v-if="modalInfo.No == 0">
        <DictionaryType
          :ID="modalForm.materialType"
          DicType="materialType"
          @changz="changeMaterialType"
        ></DictionaryType>
      </a-form-item>
      <a-form-item :label="$t('basic.物料号')" name="materialNo" v-if="modalInfo.No == 1">
        <Material
          ref="materialRef"
          @changz="changeMaterialNo"
          :ID="modalForm.materialNo"
        ></Material>
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
import { reactive, ref, nextTick, onMounted } from 'vue'
import ModalCom from '@/components/modal/modalCom.vue'
import { supermarketRelationCreate } from '@/apis/marketbase'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import DictionaryType from '@/components/common/DictionaryType.vue'
import Material from '@/components/common/Material.vue'
const emits = defineEmits()
const { t } = useI18n()
const stopUpDownFun = stopUpDownFunList()
const store = useStore()
const formRef = ref()
const modalFlag = ref(false)
const materialtList = ref([])
const modalProps = ref({})
const modalForm = reactive({
  materialNo: null,
  materialType: null //物料类型id
})
//弹框信息 若编辑 可保留id
const modalInfo = reactive({
  type: 'add',
  No: null,
  id: null
})

onMounted(() => {})
//表单验证
const formRules = reactive({
  materialNo: [setRules(2)],
  materialType: [setRules(2)]
})

//打开弹框
const openModal = (row, type, No, id) => {
  if (type == 'add') public_form_empty(modalForm)
  if (type == 'edit') public_form_data_replace(modalForm, row)
  modalInfo.type = type
  modalInfo.No = No
  modalInfo.id = id
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
  let params = {}
  if (modalInfo.No == 0) {
    params = {
      baseSupermarketId: modalInfo.id,
      materialType: modalForm.materialType
    }
  } else if (modalInfo.No == 1) {
    params = {
      baseSupermarketId: modalInfo.id,
      materialNo: modalForm.materialNo
    }
  }

  supermarketRelationCreate(params).then((res) => handleMessage(res))
}
//编辑
const editSave = () => {
  let params = {
    ...modalForm,
    id: modalInfo.id
  }
  procedureUpdate(params).then((res) => handleMessage(res))
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
//接收物料的值
const changeMaterialNo = ({ value }) => {
  modalForm.materialNo = value
}
defineExpose({
  openModal
})
</script>
