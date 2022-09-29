<template>
  <div style="height: 100%; width: 100%" class="cardForm">
    <a-modal
      :closable="false"
      width="400px"
      :bodyStyle="bodyStyle"
      :maskClosable="false"
      v-model:visible="visible"
      title="请放入"
      @cancel="handleCancel"
      wrapClassName="zp"
    >
      <p style="padding:30px;text-align:center;font-size:20px">111133s</p>
    </a-modal>
    <div class="barCode">
      <a-form
        :model="formState"
        :rules="formRules"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 14 }"
        ref="formRef"
      >
        <a-form-item name="barCode" label="分级条码">
          <a-input
            :allowClear="true"
            @change="onChange"
            type="text"
            style="width: 100%"
            :placeholder="getPlaceholder(1)"
            v-model:value="formState.barCode"
          ></a-input>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script setup>
import { setRules, getPlaceholder } from '@/pages/utils'
import { reactive, ref, onMounted } from 'vue'
import { getChannelStore } from '@/apis/inventoryMarket'
import { setMoment, setMessageTips } from '../../../../pages/utils'
const formState = reactive({ barCode: '' })
//表单验证
const formRules = reactive({
  barCode: [setRules(1)]
})
const bodyStyle = ref({
  background: 'linear-gradient(to left top, #001d33, #004975)',
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
    cache_input = '0628387067/F00N.220.036/202208111215/02/124'
    handleData(cache_input)
    cache_input = ''
  }, 100)
}
const handleData = (val) => {
  let egxp =
    /^\S{10}\/\S{12}\/((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))0229))([0-1][0-9]|2[0-3])([0-5][0-9])\/\S{2}\/\d{1,}$/
  if (egxp.test(val)) {
    formState.barCode = val
    getChannelStore({ serialNo: formState.barCode }).then((res) => {
      if (res.errorCode == '00000') visible.value = true
    })
  } else {
    formState.barCode = null
    setMessageTips({ errorCode: 'ERRORDATACODE', errorMessage: '数据格式错误' }, false)
  }
}
//处理数据
// const handleData = (val) => {
//   let arr = val?.split('/')
//   if (arr.length == 5) {
//     if (
//       arr[0].length == 10 &&
//       arr[1].length == 12 &&
//       arr[2].length == 12 &&
//       arr[3].length == 2 &&
//       arr[4]
//     ) {
//       if (dateAnysis(arr[2]) && !isNaN(Number(arr[3])) && !isNaN(Number(arr[4]))) {
//         formState.barCode = val
//         getChannelStore({ serialNo: formState.barCode }).then((res) => {
//         })
//       } else {
//         formState.barCode = null
//         setMessageTips({ errorCode: 'ERRORDATACODE', errorMessage: '数据格式错误' }, false)
//       }
//     } else {
//       formState.barCode = null
//       setMessageTips({ errorCode: 'ERRORDATACODE', errorMessage: '数据格式错误' }, false)
//     }
//   } else {
//     formState.barCode = null
//     setMessageTips({ errorCode: 'ERRORDATACODE', errorMessage: '数据格式错误' }, false)
//   }
// }
//判断日期是否为YYYYMMDDHHmm
// const dateAnysis = (date) => {
//   let egxp =
//     /^[1-2][0-9][0-9][0-9]([1][0-2]|0?[1-9])([12][0-9]|3[01]|0?[1-9])([01][0-9]|[2][0-3])[0-5][0-9]$/
//   return egxp.test(date)
// }
</script>
<style lang="less" scoped>
.cardForm {
  position: relative;
  .barCode {
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
.zp {
  .ant-modal-header {
    background: #ff8800;
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
    background: #ff8800;
  }
}
</style>
