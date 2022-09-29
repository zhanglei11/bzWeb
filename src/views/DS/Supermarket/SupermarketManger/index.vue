<template>
  <div style="height: 100%; width: 100%" class="cardForm">
    <div class="barCode">
      <a-row :gutter="16">
        <a-col :span="12" v-for="item in marketList" :key="item.id">
          <a-card
            style="cursor:pointer"
            @click="backGo(item)"
            :bordered="false"
            :style="{ height: '20vh', backgroundColor: item.color, borderRadius: '8px' }"
          >
            <p style="text-align: center; font-size: 20px; line-height: 15vh; font-weight: bold">
              {{ item.name }}
            </p>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { setRules, getPlaceholder } from '@/pages/utils'
import { reactive, ref, onMounted } from 'vue'
const formState = reactive({ barCode: '' })
//表单验证
const formRules = reactive({
  barCode: [setRules(1)]
})
const router = useRouter()
const marketList = ref([
  {
    name: '放料',
    id: '1',
    color: '#FF8800'
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
const backGo = (row) => {
  switch (row.id) {
    case '1':
      router.push('/DS/Supermarket/Placing')
      break
    case '2':
      router.push('/DS/Supermarket/reclaiming')
      break
    case '3':
      router.push('/DS/Supermarket/Tailings')
      break
    case '4':
      router.push('/DS/Inventory/HistoryRecord')
      break
    default:
      break
  }
}
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
