<template>
  <SearchQuery>
    <a-col :span="6">
      <a-form-item :label="$t('basic.记录类型')">
        <DictionaryType
          ref="materialLevelRef"
          :ID="formState.materialLevel"
          DicType="materialLevel"
          @changz="changeMaterialLevel"
        ></DictionaryType>
      </a-form-item>
    </a-col>
    <a-col :span="6">
      <a-form-item :label="$t('basic.物料类型')">
        <DictionaryType
          ref="materialTypeRef"
          DicType="materialType"
          @changz="changeMaterialType"
          :ID="formState.materialType"
        ></DictionaryType>
      </a-form-item>
    </a-col>
    <a-col :span="6">
      <a-form-item :label="$t('basic.等级')">
        <DictionaryType
          ref="materialLevelRef"
          :ID="formState.materialLevel"
          DicType="materialLevel"
          @changz="changeMaterialLevel"
        ></DictionaryType>
      </a-form-item>
    </a-col>
    <a-col :span="6">
      <a-form-item :label="$t('basic.物料号')">
        <Material
          ref="materialRef"
          @changz="changeMaterialNo"
          :ID="formState.materialNo"
        ></Material>
      </a-form-item>
    </a-col>
    <a-col :span="6">
      <a-form-item :label="$t('basic.超市名称')">
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
    <a-col :span="6">
      <a-form-item :label="$t('basic.通道名称')">
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
    <a-col :span="6">
      <a-form-item :label="$t('basic.时间')" name="name_1">
        <a-range-picker
          v-model:value="name_1"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          @change="dateChange"
          style="width: 100%"
        >
        </a-range-picker>
      </a-form-item>
    </a-col>
    <SureReset @search="search" @reset="reset" />
  </SearchQuery>
</template>
<script setup>
import { getsupermarketList, getchannelList } from '@/apis/marketbase'
import { public_form_empty, filterOption } from '@/pages/utils'
import { reactive, onMounted, ref, onActivated } from 'vue'
import { getPlaceholder } from '@/pages/utils'
import DictionaryType from '@/components/common/DictionaryType.vue'
import Material from '@/components/common/Material.vue'
import IconCom from '@/components/modules/IconCom.vue'
import SearchQuery from '@/components/form/searchQuery.vue'
import SureReset from '@/components/form/sureReset.vue'
const emits = defineEmits()
const formState = reactive({
  materialType: null,
  materialLevel: null,
  materialNo: null,
  materialType: null,
  supermarketNo: null,
  channelNo: null,
  name_1: null,
  name_2: null
})
const materialRef = ref()
const materialTypeRef = ref()
const materialLevelRef = ref()
const markertList = ref([])
const channelList = ref([])
const name_1 = ref()
onMounted(() => {
  getMarketList()
  getchannel()
})

//重置
const reset = () => {
  public_form_empty(formState) //清空
  materialRef.value.reset()
  materialTypeRef.value.reset()
  materialLevelRef.value.reset()
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
//获取通道
const getchannel = () => {
  getchannelList().then((res) => {
    channelList.value = res.data
  })
}
//搜索
const search = () => emits('searchQuery', formState)
//接收物料类型的值
const changeMaterialType = ({ value }) => {
  formState.materialType = value
}
//接收物料等级的值
const changeMaterialLevel = ({ value }) => {
  formState.materialLevel = value
}
//接收物料的值
const changeMaterialNo = ({ value }) => {
  formState.materialNo = value
}
//日期
const dateChange = (val) => {
  formState.name_1 = val[0]
  formState.name_2 = val[0]
}
onActivated(() => search())
defineExpose({ getMarketList })
</script>
