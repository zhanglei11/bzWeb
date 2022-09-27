<template>
  <SearchQuery>
    <a-col :span="6">
      <a-form-item :label="$t('dictionary.字典项名称')">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="formState.name"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
    </a-col>
    <a-col :span="6">
      <a-form-item :label="$t('dictionary.字典项标识')">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="formState.code"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
    </a-col>
    <SureReset @search="search" @reset="reset" />
  </SearchQuery>
</template>
<script setup lang="ts">
import { public_form_empty } from "@/pages/utils";
import { reactive, onMounted, onActivated } from "vue";
import SureReset from "@/components/form/sureReset.vue";
import SearchQuery from "@/components/form/searchQuery.vue";
import { getPlaceholder } from "@/pages/utils";
const emits = defineEmits();
const formState = reactive({
  name: null,
  code: null,
});

onMounted(() => {
  search()
});

//重置
const reset = () => {
  public_form_empty(formState); //清空
};

//搜索
const search = () => emits("searchQuery", formState);

</script>
