<template>
  <div style="height: 100%; width: 100%" class="cardForm">
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
import { log } from 'util'
const formState = reactive({ barCode: '' })
//表单验证
const formRules = reactive({
  barCode: [setRules(1)]
})
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
    margin-left: -15vw;
    margin-top: -7vh;
  }
}
:deep(.ant-form label) {
  font-size: 18px;
}
</style>
