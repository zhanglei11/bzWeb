<template>
  <SearchQuery>
    <a-col :span="5">
      <a-form-item :label="$t('basic.通道')">
        <a-select
          show-search
          :filter-option="filterOption"
          option-label-prop="children"
          v-model:value="formState.channelNo"
          :placeholder="getPlaceholder(2)"
          :allowClear="true"
        >
          <a-select-option
            v-for="item in channelList"
            :key="item.channelNo"
            :value="item.channelNo"
          >
            {{ item.channelNo }}
          </a-select-option></a-select
        >
      </a-form-item>
    </a-col>
    <a-col :span="5">
      <a-form-item :label="$t('basic.通道类型')">
        <DictionaryType
          ref="channelTypeRef"
          DicType="channelType"
          @changz="changeChannelType"
          :ID="formState.channelType"
        ></DictionaryType>
      </a-form-item>
    </a-col>
    <SureReset @search="search" @reset="reset" />
  </SearchQuery>
</template>
<script setup>
import { public_form_empty, filterOption } from '@/pages/utils'
import { reactive, onMounted, ref, onActivated } from 'vue'
import { getPlaceholder } from '@/pages/utils'
import SearchQuery from '@/components/form/searchQuery.vue'
import SureReset from '@/components/form/sureReset.vue'
import { getchannelList } from '@/apis/marketbase'
import IconCom from '@/components/modules/IconCom.vue'
import DictionaryType from '@/components/common/DictionaryType.vue'
const emits = defineEmits(['searchQuery'])
const formState = reactive({
  channelType: null,
  channelNo: null
})
const channelTypeRef = ref()
const channelList = ref([])
onMounted(() => {
  search()
  getchannel()
})
//重置
const reset = () => {
  public_form_empty(formState) //清空
  channelTypeRef.value.reset()
}

//搜索
const search = () => emits('searchQuery', formState)
//获取通道
const getchannel = () => {
  getchannelList().then((res) => {
    channelList.value = res.data.sort(function (a, b) {
      let x = a['channelNo']
      let y = b['channelNo']
      return x < y ? -1 : x > y ? 1 : 0
    })
  })
}
//接收通道类型的值
const changeChannelType = ({ value }) => {
  formState.channelType = value
}
onActivated(() => search())
defineExpose({ getchannel })
</script>
