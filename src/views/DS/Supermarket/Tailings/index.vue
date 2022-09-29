<template>
  <div style="height: 100%; width: 100%" class="cardForm">
    <a-modal
      width="400px"
      :maskClosable="false"
      v-model:visible="visible"
      :bodyStyle="bodyStyle"
      @ok="handleOk"
      @cancel="handleCancel"
      wrapClassName="hp"
    >
      <p style="padding:30px;text-align:center;font-size:20px">111133s</p>
    </a-modal>
    <div class="serialNo">
      <a-form
        :model="formState"
        :rules="formRules"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 14 }"
        ref="formRef"
      >
        <a-form-item name="serialNo" label="分级条码">
          <a-input
            :allowClear="true"
            @change="onChange"
            type="text"
            style="width: 100%"
            :placeholder="getPlaceholder(1)"
            v-model:value="formState.serialNo"
          ></a-input>
        </a-form-item>
        <a-form-item name="quantity" label="尾料数量">
          <a-input
            :allowClear="true"
            type="text"
            style="width: 100%"
            :placeholder="getPlaceholder(1)"
            v-model:value="formState.quantity"
          ></a-input>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script setup>
import { setRules, getPlaceholder } from '@/pages/utils'
import { reactive, ref, onMounted } from 'vue'
import { setMoment, setMessageTips } from '../../../../pages/utils'
import { getChannelStoreTail } from '@/apis/inventoryMarket'

const formState = reactive({ serialNo: '', quantity: '' })
//表单验证
const formRules = reactive({
  serialNo: [setRules(1)],
  quantity: [setRules(1)]
})
const bodyStyle = ref({
  background: '#54aba5',
  border: '0px'
})
const visible = ref(false)
let cache_input = ''
let timer = null
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
  let egxp =
    /^\S{10}\/\S{12}\/((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))0229))([0-1][0-9]|2[0-3])([0-5][0-9])\/\S{2}\/\d{1,}$/
  if (egxp.test(val)) {
    formState.serialNo = val
    getChannelStoreTail({ serialNo: formState.serialNo,quantity:formState.quantity }).then((res) => {
      if (res.errorCode == '00000') visible.value = true
    })
  } else {
    formState.serialNo = null
    setMessageTips({ errorCode: 'ERRORDATACODE', errorMessage: '数据格式错误' }, false)
  }
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
    margin-top: -7vh;
  }
}
:deep(.ant-form label) {
  font-size: 18px;
}
</style>
<style lang="less">
.hp {
  .ant-modal-header {
    background: #54aba5;
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
    background: #54aba5;
  }
}
</style>
