<template>
  <!-- 物料类型 v2.0 -->
  <a-select
    show-search
    v-model:value="ID_"
    :allowClear="true"
    :placeholder="getPlaceholder(2)"
    :disabled="DIS_"
    option-label-prop="children"
    :filterOption="filterOption"
    @change="changeID"
  >
    <a-select-option v-for="item in LIST_" :key="item.value" :value="item.value" :label="item.name">
      {{ item.name }}
      <div class="select-color">{{ `${$t('basic.编号')}:` }}{{ item.value }}</div>
    </a-select-option>
  </a-select>
</template>
<script setup>
import { filterOption, getPlaceholder } from '@/utils/common'
import { ref, onMounted } from 'vue'
import { system_dict_all_map } from '@/apis/dictionary'
const emits = defineEmits()
const props = defineProps({
  ID: {
    required: true
  },
  DicType: {
    required: true
  }
})
const TYPE = ref(props.DicType)
const DIS_ = ref(false)
const ID_ = ref(props.ID)
const LIST_ = ref(null)
onMounted(() => {
  getInit()
})
//重置
const reset = () => {
  ID_.value = null
  changeID()
}

//重置所有
const resetList = () => {
  reset()
  LIST_.value = []
}
//字典
const getInit = () => {
  system_dict_all_map().then((res) => {
    if (res.errorCode == '00000') {
      let data = res.data[TYPE.value]
      if (typeof data !== 'undefined' && typeof data !== 'null' && data) {
        LIST_.value = Object.keys(data)
          ?.map((key) => data[key])
          .sort(function (a, b) {
            let x = a['sort']
            let y = b['sort']
            return x < y ? -1 : x > y ? 1 : 0
          })
      }
      console.log(LIST_.value,"bbb");
      
    } else {
      LIST_.value = []
    }
  })
}
const changeID = (val) => {
  let obj = {
    label: null,
    value: null
  }
  if (!!!val) {
    obj = {
      label: null,
      value: null
    }
  } else {
    LIST_.value?.forEach((it) => {
      if (it.value == val) {
        obj = {
          label: it.name,
          value: it.value
        }
      }
    })
  }
  emits('changz', obj)
}
defineExpose({
  resetList,
  reset,
  getInit
})
</script>
