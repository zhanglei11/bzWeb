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
      <a-form-item :label="$t('basic.容器名称')" name="blisterName">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.blisterName"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('basic.容器编号')" name="blisterNo">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.blisterNo"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('basic.容量')" name="capacity">
        <a-input-number
          style="width: 100%"
          :min="1"
          :allowClear="true"
          v-model:value="modalForm.capacity"
          :placeholder="getPlaceholder(1)"
        ></a-input-number>
      </a-form-item>
      <a-form-item :label="$t('basic.容量单位')" name="unit">
        <a-input
          type="text"
          disabled
          v-model:value="modalForm.unit"
          :placeholder="getPlaceholder(1)"
        ></a-input>
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
  stopUpDownFunList
} from '@/pages/utils'
import { reactive, ref, nextTick, onMounted } from 'vue'
import ModalCom from '@/components/modal/modalCom.vue'
import { blisterCreate, blisterEdit } from '@/apis/marketbase'
import { useI18n } from 'vue-i18n'
const emits = defineEmits()
const stopUpDownFun = stopUpDownFunList()
const { t } = useI18n()
const formRef = ref()
const modalFlag = ref(false)
const modalProps = ref({})
const modalForm = reactive({
  blisterName: null,
  blisterNo: null,
  capacity: null, //容量
  unit: null, //单位
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
  blisterName: [setRules(1)],
  blisterNo: [setRules(1)],
  capacity: [setRules(1)]
})

//打开弹框
const openModal = (row, type) => {
  if (type == 'add') public_form_empty(modalForm)
  modalForm.unit = '个'
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
  blisterCreate({ ...modalForm }).then((res) => handleMessage(res))
}
//编辑
const editSave = () => {
  blisterEdit({
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

defineExpose({
  openModal
})
</script>
