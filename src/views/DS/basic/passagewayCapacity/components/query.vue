<template>
  <SearchQuery>
    <!-- <a-col :span="4">
      <a-form-item :label="$t('basic.物料类型')">
        <DepartSelect
          ref="departSelectRef"
          :ID="formState.name_1"
          @changeZ="changeDepart"
        ></DepartSelect>
      </a-form-item>
    </a-col>
    <a-col :span="4">
      <a-form-item :label="$t('basic.物料号')">
        <DepartSelect
          ref="departSelectRef"
          :ID="formState.name_2"
          @changeZ="changeDepart"
        ></DepartSelect>
      </a-form-item>
    </a-col> -->
    <SureReset @search="search" @reset="reset" />
  </SearchQuery>
</template>
<script lang="ts" setup>
import { public_form_empty } from "@/pages/utils";
import {
  reactive,
  onMounted,
  ref,
  onActivated,
} from "vue";
import {
  getPlaceholder,
} from "@/pages/utils";
import DepartSelect from "@/components/form/departSelect.vue";
import IconCom from "@/components/modules/IconCom.vue";
import SearchQuery from "@/components/form/searchQuery.vue";
import SureReset from "@/components/form/sureReset.vue";
const emits = defineEmits();
const departSelectRef = ref();
const formState = reactive({
  name_2: null,
  name_1: null,
});

onMounted(() => {
  departSelectRef.value.getInit();
});

//重置
const reset = () => {
  public_form_empty(formState); //清空
  departSelectRef.value.reset();
};

//部门
const changeDepart = ({ value }) => {
  formState.name_2 = value;
};

//搜索
const search = () => emits("searchQuery", formState);

onActivated(() => search());
</script>
