<template>
  <SearchQuery>
    <a-col :span="5">
      <a-form-item :label="$t('basic.物料类型')">
        <DictionaryType
          ref="materialTypeRef"
          DicType="materialType"
          @changz="changeMaterialType"
          :ID="formState.materialType"
        ></DictionaryType>
      </a-form-item>
    </a-col>
    <a-col :span="5">
      <a-form-item :label="$t('basic.等级')">
        <DictionaryType
          ref="materialLevelRef"
          :ID="formState.materialLevel"
          DicType="materialLevel"
          @changz="changeMaterialLevel"
        ></DictionaryType>
      </a-form-item>
    </a-col>
    <a-col :span="5">
      <a-form-item :label="$t('basic.物料编号')">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="formState.materialNo"
          :placeholder="getPlaceholder(1)"
        ></a-input>
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
import { getPlaceholder } from '@/pages/utils'
import DictionaryType from '@/components/common/DictionaryType.vue'
import { useStore } from 'vuex'
const store = useStore()
const emits = defineEmits()
const formState = reactive({
  materialNo: null,
  materialLevel: null,
  materialType: null
})
const materialTypeRef = ref()
const materialLevelRef = ref()
const materialLevel = ref()
onMounted(() => {})
//重置
const reset = () => {
  public_form_empty(formState) //清空
  materialTypeRef.value.reset()
  materialLevelRef.value.reset()
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
onActivated(() => search())

defineExpose({})
</script>
