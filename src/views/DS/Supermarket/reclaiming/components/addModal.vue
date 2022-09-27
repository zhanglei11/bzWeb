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
      <a-form-item :label="$t('basic.超市名称')" name="supermarketName">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.supermarketName"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('basic.超市编号')" name="supermarketNo">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.supermarketNo"
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
  setMessageTips
} from '@/pages/utils'
import { reactive, ref, nextTick, onMounted } from 'vue'
import ModalCom from '@/components/modal/modalCom.vue'
import { supermarketCreate, supermarketEdit } from '@/apis/marketbase'
import { useI18n } from 'vue-i18n'
const emits = defineEmits()
const { t } = useI18n()
const formRef = ref()
const modalFlag = ref(false)
const modalProps = ref({})
const modalForm = reactive({
  supermarketName: null,
  supermarketNo: null, //超市编号
  description:null
})
//弹框信息 若编辑 可保留id
const modalInfo = reactive({
  type: 'add',
  id: null
})

onMounted(() => {})
//表单验证
const formRules = reactive({
  supermarketName: [setRules(1)],
  supermarketNo: [setRules(2)]
})

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
  formRef.value.validate().then(() => {
    if (modalInfo.type == 'add') addSave()
    if (modalInfo.type == 'edit') editSave()
  })
}

//新增
const addSave = () => {
  let params = {
    ...modalForm
  }
  supermarketCreate(params).then((res) => handleMessage(res))
}
//编辑
const editSave = () => {
  let params = {
    ...modalForm,
    id: modalInfo.id
  }
  supermarketEdit(params).then((res) => handleMessage(res))
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
