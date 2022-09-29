<template>
  <SearchQuery>
    <a-col :span="5">
      <a-form-item :label="$t('basic.容器')" v-if="props.type == 1">
        <a-select
          show-search
          :filter-option="filterOption"
          option-label-prop="children"
          v-model:value="formState.blisterNo"
          :placeholder="getPlaceholder(2)"
          :allowClear="true"
        >
          <a-select-option v-for="item in List" :key="item.id" :value="item.id" :label="item.name">
            {{ item.name }}
            <div class="select-color">{{ `${$t('basic.编号')}:` }}{{ item.id }}</div>
          </a-select-option></a-select
        >
      </a-form-item>
      <a-form-item :label="$t('basic.容器名称')" v-if="props.type == 2">
        <a-select
          show-search
          :filter-option="filterOption"
          option-label-prop="children"
          v-model:value="formState.kltNo"
          :placeholder="getPlaceholder(2)"
          :allowClear="true"
        >
          <a-select-option v-for="item in List" :key="item.id" :value="item.id" :label="item.name">
            {{ item.name }}
            <div class="select-color">{{ `${$t('basic.编号')}:` }}{{ item.id }}</div>
          </a-select-option></a-select
        >
      </a-form-item>
    </a-col>
    <SureReset @search="search" @reset="reset" />
  </SearchQuery>
</template>
<script setup>
import { public_form_empty, filterOption } from '@/pages/utils'
import { reactive, onMounted, ref, onActivated } from 'vue'
import IconCom from '@/components/modules/IconCom.vue'
import SureReset from '@/components/form/sureReset.vue'
import SearchQuery from '@/components/form/searchQuery.vue'
import { getblisterList, getkltList } from '@/apis/marketbase'
import { getPlaceholder } from '@/pages/utils'
const props = defineProps({
  type: {
    required: true
  }
})
const emits = defineEmits()
const formState = reactive({
  blisterNo: null,
  kltNo: null
})
const List = ref([])
onMounted(() => {
  search()
  if (props.type == 1) getBliList()
  if (props.type == 2) getKltList()
})

//重置
const reset = () => {
  public_form_empty(formState) //清空
}

//搜索
const search = () => {
  emits('searchQuery', formState)
}
//Blister
const getBliList = () =>
  getblisterList().then((res) => {
    List.value = []
    if (res.errorCode == '00000') {
      res.data?.forEach((it) => {
        List.value.push({ id: it.blisterNo, name: it.blisterName })
      })
    } else {
      List.value = []
    }
  })
//Klt
const getKltList = () =>
  getkltList().then((res) => {
    List.value = []
    if (res.errorCode == '00000') {
      res.data?.forEach((it) => {
        List.value.push({ id: it.kltNo, name: it.kltName })
      })
    } else {
      List.value = []
    }
  })
onActivated(() => search())

defineExpose({getBliList,getKltList});
</script>
