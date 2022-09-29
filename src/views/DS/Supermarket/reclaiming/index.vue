<template>
  <div style="height: 100%; width: 100%" class="cardForm">
    <a-modal
      :closable="false"
      width="400px"
      :bodyStyle="bodyStyle"
      :maskClosable="false"
      v-model:visible="visible"
      title="请取出"
      @cancel="handleCancel"
      wrapClassName="cp"
    >
      <p style="padding: 20px; text-align: center; font-size: 20px; line-height: 30px">111133s</p>
      <a-form
        :model="formData"
        :rules="formRules"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        ref="formRef"
      >
        <a-row>
          <a-col :span="20" v-if="!isType">
            <a-form-item name="serialNo" label="分级条码">
              <a-input
                :allowClear="true"
                @change="onChange"
                type="text"
                style="width: 100%"
                :placeholder="getPlaceholder(1)"
                v-model:value="formData.serialNo"
              ></a-input> </a-form-item></a-col></a-row
      ></a-form>
      <template #footer>
        <a-button key="back" @click="handleCancel">取消</a-button>
      </template>
    </a-modal>
    <div class="serialNo">
      <a-form
        :model="formState"
        :rules="formRules"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        ref="formRef"
      >
        <a-row>
          <a-col :span="20" v-if="!isType">
            <a-form-item name="serialNo" label="分级条码">
              <a-input
                :allowClear="true"
                @change="onChange"
                type="text"
                style="width: 100%"
                :placeholder="getPlaceholder(1)"
                v-model:value="formState.serialNo"
              ></a-input> </a-form-item
          ></a-col>
          <a-col :span="20" v-if="isType">
            <a-form-item :label="$t('basic.物料类型')" name="materialType">
              <DictionaryType
                ref="materialTypeRef"
                DicType="materialType"
                @changz="changeMaterialType"
                :ID="formState.materialType"
              ></DictionaryType> </a-form-item
          ></a-col>
          <a-col :span="4">
            <a-form-item>
              <a-button type="primary" @click="switchType">
                <template #icon> <IconCom type="EditOutlined" /></template> </a-button></a-form-item
          ></a-col>
          <a-col :span="20" v-if="isType">
            <a-form-item :label="$t('basic.等级')" name="materialLevel">
              <DictionaryType
                ref="materialLevelRef"
                :ID="formState.materialLevel"
                DicType="materialLevel"
                @changz="changeMaterialLevel"
              ></DictionaryType> </a-form-item
          ></a-col>
          <a-col :span="20" v-if="isType">
            <a-form-item :label="$t('basic.物料号')" name="materialNo">
              <Material
                ref="materialRef"
                @changz="changeMaterialNo"
                :ID="formState.materialNo"
              ></Material> </a-form-item
          ></a-col>
        </a-row>
      </a-form>
    </div>
  </div>
</template>
<script setup>
import DictionaryType from '@/components/common/DictionaryType.vue'
import Material from '@/components/common/Material.vue'
import { setRules, getPlaceholder, public_form_empty } from '@/pages/utils'
import { reactive, ref, onMounted, nextTick } from 'vue'
import IconCom from '@/components/modules/IconCom.vue'
import { setMoment, setMessageTips } from '../../../../pages/utils'
const formState = reactive({
  serialNo: '',
  materialType: null,
  materialLevel: null,
  materialNo: null
})
const formData = reactive({
  serialNo: '',
})
//表单验证
const formRules = reactive({
  serialNo: [setRules(1)],
  materialType: [setRules(2)],
  materialLevel: [setRules(2)],
  materialNo: [setRules(2)]
})
const bodyStyle = ref({
  background: '#1E90FF',
  border: '0px'
})
const materialTypeRef = ref()
const materialLevelRef = ref()
const materialRef = ref()
const confirmData = ref()
const visible = ref(false)
const isType = ref(false)
let cache_input = ''
let timer = null
const switchType = () => {
  visible.value = true
  isType.value = !isType.value
  public_form_empty(formState)
  if (isType.value) {
    nextTick(() => {
      materialTypeRef.value.reset()
      materialLevelRef.value.reset()
      materialRef.value.reset()
    })
  }
}
const add = () => {
  visible.value = true
}
const handleCancel = () => {
  visible.value = false
}
const handleOk = () => {
  visible.value = false
}
const onChange = (val) => {
  if (val.inputType !== 'insertText') return
  cache_input += val.data
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    handleData(cache_input)
    cache_input = ''
  }, 100)
}
//处理数据
const handleData = (val) => {
  let arr = val?.split('/')
  if (arr.length == 5) {
    if (
      arr[0].length == 10 &&
      arr[1].length == 12 &&
      arr[2].length == 12 &&
      arr[3].length == 2 &&
      arr[4]
    ) {
      if (dateAnysis(arr[2]) && !isNaN(Number(arr[3])) && !isNaN(Number(arr[4]))) {
        if (val == confirmData.value) {
          setMessageTips({ errorCode: '333', errorMessage: '已扫描' }, false)
        }
        confirmData.value = cache_input
        formState.serialNo = val
      } else {
        formState.serialNo = null
        setMessageTips({ errorCode: 'ERRORDATACODE', errorMessage: '数据格式错误' }, false)
      }
    } else {
      formState.serialNo = null
      setMessageTips({ errorCode: 'ERRORDATACODE', errorMessage: '数据格式错误' }, false)
    }
  } else {
    formState.serialNo = null
    setMessageTips({ errorCode: 'ERRORDATACODE', errorMessage: '数据格式错误' }, false)
  }
}
//判断日期是否为YYYYMMDDHHmm
const dateAnysis = (date) => {
  let egxp =
    /^[1-2][0-9][0-9][0-9]([1][0-2]|0?[1-9])([12][0-9]|3[01]|0?[1-9])([01][0-9]|[2][0-3])[0-5][0-9]$/
  return egxp.test(date)
}
//接收物料类型的值
const changeMaterialType = ({ value }) => {
  formState.materialType = value
  nextTick(() => {
    materialRef.value.getInit({ materialLevel: formState.materialLevel, materialType: value })
  })
}
//接收物料等级的值
const changeMaterialLevel = ({ value }) => {
  formState.materialLevel = value
  nextTick(() => {
    materialRef.value.getInit({ materialLevel: value, materialType: formState.materialType })
  })
}
//接收物料的值
const changeMaterialNo = ({ value }) => {
  formState.materialNo = value
}
</script>
<style lang="less" scoped>
.cardForm {
  position: relative;
  .serialNo {
    width: 30vw;
    height: 10vh;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -20vw;
    // margin-top: -7vh;
  }
}
:deep(.ant-form label) {
  font-size: 18px;
}
</style>
<style lang="less">
.cp {
  .ant-modal-header {
    background: #1e90ff;
  }
  div#vcDialogTitle0 {
    color: white;
  }
  div#vcDialogTitle1 {
    color: white;
  }
  span.ant-modal-close-x {
    color: white;
  }
  .ant-modal-footer {
    background: #1e90ff;
  }
}
</style>
