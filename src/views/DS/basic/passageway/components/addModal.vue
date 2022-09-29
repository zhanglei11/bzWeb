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
      <a-form-item :label="$t('basic.所属超市')" name="supermarketNo">
        <a-select
          @change="marketChange"
          show-search
          :filter-option="filterOption"
          option-label-prop="children"
          v-model:value="modalForm.supermarketNo"
          :placeholder="getPlaceholder(2)"
          :allowClear="true"
        >
          <a-select-option
            v-for="item in markertList"
            :key="item.supermarketNo"
            :value="item.supermarketNo"
            :label="item.supermarketName"
          >
            {{ item.supermarketName }}
            <div class="select-color">{{ `${$t('basic.编号')}:` }}{{ item.supermarketNo }}</div>
          </a-select-option></a-select
        >
      </a-form-item>
      <a-form-item :label="$t('basic.通道编号')" name="channelNo">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.channelNo"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('basic.层号')" name="layerNo">
        <a-input-number
          style="width: 100%"
          :min="0"
          :allowClear="true"
          v-model:value="modalForm.layerNo"
          :placeholder="getPlaceholder(1)"
        ></a-input-number>
      </a-form-item>
      <a-form-item :label="$t('basic.列号')" name="columnNo">
        <a-input-number
          style="width: 100%"
          :min="0"
          :allowClear="true"
          v-model:value="modalForm.columnNo"
          :placeholder="getPlaceholder(1)"
        ></a-input-number>
      </a-form-item>
      <a-form-item :label="$t('basic.通道类型')" name="channelType">
        <DictionaryType
          DicType="channelType"
          @changz="changeChannelType"
          :ID="modalForm.channelType"
        ></DictionaryType>
      </a-form-item>
      <a-form-item :label="$t('basic.电子标签IN')" v-if="Flag" name="electronicTagIn">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.electronicTagIn"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('basic.电子标签OUT')" v-if="Flag" name="electronicTagOut">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.electronicTagOut"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('basic.电子标签INOUT')" v-if="!Flag" name="electronicTagOut">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.electronicTagOut"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('basic.尾料通道')">
        <a-switch v-model:checked="checked" />
      </a-form-item>
      <a-form-item :label="$t('basic.容量')" name="capacity">
        <a-input-number
          style="width: 100%"
          :min="0"
          :allowClear="true"
          v-model:value="modalForm.capacity"
          :placeholder="getPlaceholder(1)"
        ></a-input-number>
      </a-form-item>
      <a-form-item :label="$t('basic.容量单位')" name="baseKltId">
        <a-select
          v-model:value="modalForm.baseKltId"
          :placeholder="getPlaceholder(2)"
          :allowClear="true"
        >
          <a-select-option v-for="item in KltList" :key="item.id" :value="item.id">
            {{ item.name }}</a-select-option
          >
        </a-select>
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
import { reactive, ref, nextTick, onMounted } from 'vue'
import ModalCom from '@/components/modal/modalCom.vue'
import { channelCreate, channelEdit, getsupermarketList, getkltList } from '@/apis/marketbase'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import DictionaryType from '@/components/common/DictionaryType.vue'
const emits = defineEmits()
const stopUpDownFun = stopUpDownFunList()
const { t } = useI18n()
const store = useStore()
const markertList = ref([])
const KltList = ref([])
const Flag = ref(true)
const checked = ref(true)
const formRef = ref()
const modalFlag = ref(false)
const modalProps = ref({})
const modalForm = reactive({
  supermarketNo: null,
  baseSupermarketId: null,
  supermarketName: null,
  channelNo: null,
  columnNo: null,
  layerNo: null,
  channelType: null,
  electronicTagIn: null,
  electronicTagOut: null,
  tailingFlag: null,
  detectionType: null,
  capacity: null,
  baseKltId: null,
  description: null
})
//弹框信息 若编辑 可保留id
const modalInfo = reactive({
  type: 'add',
  equipmentId: null
})

onMounted(() => {
  getMarketList()
  getKltList()
})
//表单验证
const formRules = reactive({
  supermarketNo: [setRules(2)],
  channelNo: [setRules(1)],
  columnNo: [setRules(1)],
  layerNo: [setRules(1)],
  channelType: [setRules(2)],
  electronicTagIn: [setRules(1)],
  electronicTagOut: [setRules(1)],
  capacity: [setRules(1)],
  baseKltId: [setRules(2)]
})

//打开弹框
const openModal = (row, type) => {
  if (type == 'add') public_form_empty(modalForm)
  if (type == 'edit') {
    public_form_data_replace(modalForm, row)
    if (modalForm.channelType == 1) {
      Flag.value = true
    } else if (modalForm.channelType == 2) {
      Flag.value = false
    }
    checked.value = modalForm.tailingFlag == '1' ? true : false
  }
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
  modalForm.tailingFlag = checked.value ? '1' : '0'
  let params = {}
  if (Flag.value) {
    params = { ...modalForm }
  } else {
    modalForm.electronicTagIn = modalForm.electronicTagOut
    params = { ...modalForm }
  }
  channelCreate(params).then((res) => handleMessage(res))
}
//编辑
const editSave = () => {
  modalForm.tailingFlag = checked.value ? '1' : '0'
  let params = {
    ...modalForm,
    id: modalInfo.id
  }
  channelEdit(params).then((res) => handleMessage(res))
}
//通道类型改变
const onChange = (val) => {
  if (val == 1) {
    Flag.value = true
  } else if (val == 2) {
    Flag.value = false
  }
}
//超市改变
const marketChange = (val) => {
  markertList.value?.forEach((it) => {
    if (it.supermarketNo == val) {
      modalForm.supermarketName = it.supermarketName
      modalForm.baseSupermarketId = it.id
    }
  })
}
//超市列表查询
const getMarketList = () =>
  getsupermarketList().then((res) => {
    if (res.errorCode == '00000') {
      markertList.value = res.data
    } else {
      markertList.value = []
    }
  })
//Klt
const getKltList = () =>
  getkltList().then((res) => {
    KltList.value = []
    if (res.errorCode == '00000') {
      res.data?.forEach((it) => {
        KltList.value.push({ id: it.id, name: it.kltName })
      })
    } else {
      KltList.value = []
    }
  })

//统一信息处理
const handleMessage = (res) => {
  if (res.errorCode == '00000') emits('addSubmit')
  setMessageTips(res)
  handleCancel()
}
//接收通道类型的值
const changeChannelType = ({ value }) => {
  modalForm.channelType = value
  onChange(value)
}
defineExpose({
  openModal
})
</script>
