<template>
  <div style="height: 100%; width: 100%" class="cardForm">
    <div class="barCode">
      <a-row :gutter="16">
        <a-col :span="12" v-for="item in marketList" :key="item.id">
          <a-card
            :bordered="false"
            :style="{ height: '20vh', backgroundColor: item.color,borderRadius:'5px' }"
          >
            <p style="text-align: center;font-size:18px;line-height:15vh">{{ item.name }}</p>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script setup>
import { setRules, getPlaceholder } from '@/pages/utils'
import { reactive, ref, onMounted } from 'vue'
const formState = reactive({ barCode: '' })
//表单验证
const formRules = reactive({
  barCode: [setRules(1)]
})
const marketList = ref([
  {
    name: '放料',
    id: '1',
    color: '#000099'
  },
  {
    name: '取料',
    id: '2',
    color: '#1E90FF'
  },
  {
    name: '尾料存入',
    id: '3',
    color: '#54aba5'
  },
  {
    name: '历史记录',
    id: '4',
    color: '#99CC32'
  }
])
</script>
<style lang="less" scoped>
.cardForm {
  width: 100%;
  height: 100vh;
  position: relative;
  .barCode {
    width: 30vw;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -15vw;
    margin-top: -25vh;
  }
}
:deep(.ant-form label) {
  font-size: 18px;
}
</style>
