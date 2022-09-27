<template>
  <SearchQuery>
    <a-col :span="6">
      <a-form-item :label="$t('basic.超市')">
        <a-select
          show-search
          :filter-option="filterOption"
          option-label-prop="children"
          v-model:value="formState.supermarketNo"
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
    </a-col>
    <SureReset @search="search" @reset="reset" />
  </SearchQuery>
</template>
<script setup>
import { getsupermarketList } from '@/apis/marketbase'
import { public_form_empty, filterOption } from '@/pages/utils'
import { reactive, onMounted, ref, onActivated } from 'vue'
import { getPlaceholder } from '@/pages/utils'
import IconCom from '@/components/modules/IconCom.vue'
import SearchQuery from '@/components/form/searchQuery.vue'
import SureReset from '@/components/form/sureReset.vue'
const emits = defineEmits()
const formState = reactive({
  supermarketNo: null
})
const markertList = ref([])
onMounted(() => {
  getMarketList()
})

//重置
const reset = () => {
  public_form_empty(formState) //清空
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
//搜索
const search = () => emits('searchQuery', formState)

onActivated(() => search())
defineExpose({ getMarketList })
</script>
