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
      <a-form-item :label="$t('basic.物料号')">
        <Material
          ref="materialRef"
          @changz="changeMaterialNo"
          :ID="formState.materialNo"
        ></Material>
      </a-form-item>
    </a-col>
    <SureReset @search="search" @reset="reset" />
  </SearchQuery>
</template>
<script setup>
import { public_form_empty, filterOption } from '@/pages/utils'
import { reactive, onMounted, ref, onActivated } from 'vue'
import { getPlaceholder } from '@/pages/utils'
import IconCom from '@/components/modules/IconCom.vue'
import SearchQuery from '@/components/form/searchQuery.vue'
import SureReset from '@/components/form/sureReset.vue'
import DictionaryType from '@/components/common/DictionaryType.vue'
import Material from '@/components/common/Material.vue'
const emits = defineEmits()
const formState = reactive({
  materialType: null,
  materialNo: null
})
const materialTypeRef = ref()
const materialRef = ref()
const materialtList = ref([])
onMounted(() => {
})
//重置
const reset = () => {
  public_form_empty(formState) //清空
  materialTypeRef.value.reset()
  materialRef.value.reset()
}
//接收物料类型的值
const changeMaterialType = ({ value }) => {
  formState.materialType = value
}
//接收物料的值
const changeMaterialNo = ({ value }) => {
  formState.materialNo = value
}
//搜索
const search = () => emits('searchQuery', formState)

onActivated(() => search())
</script>
