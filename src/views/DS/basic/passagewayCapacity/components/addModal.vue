<template>
  <ModalCom
    v-if="modalFlag"
    :modalProps="modalProps"
    @handleOk="handleOk"
    @handleCancel="handleCancel"
  >
    <a-form
      :model="modalForm"
      :rules="formRules"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 14 }"
      ref="formRef"
    >
      <a-form-item :label="$t('basic.物料类型')" name="name_1">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.name_1"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('basic.物料号')" name="name_2">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.name_2"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
    </a-form>
  </ModalCom>
</template>
<script lang="ts" setup>
import {
  public_form_empty,
  getPlaceholder,
  setRules,
  public_form_data_replace,
  setMessageTips,
} from "@/pages/utils";
import {
  reactive,
  ref,
  nextTick,
  onMounted,
} from "vue";
import ModalCom from "@/components/modal/modalCom.vue";
import { procedureCreate, procedureUpdate } from "@/apis/basic";
import { ModalFormTs } from "@/types/basicTs";
import { useI18n } from "vue-i18n";
const emits = defineEmits();
const { t } = useI18n();
const formRef = ref();
const modalFlag = ref<boolean>(false);
const modalProps = ref<Object>({});
const modalForm = reactive<ModalFormTs>({
  name_1: null,
  name_2: null, //部门id
  deptName: null, //部门名称
  name_3: null,
});
//弹框信息 若编辑 可保留id
const modalInfo = reactive({
  type: 'add',
  workingProcedureId: null,
});

onMounted(() => {});
//表单验证
const formRules = reactive({
  name_1: [setRules(1)],
  name_2: [setRules(2)],
});

//打开弹框
const openModal = (row: Object, type: string) => {
  if (type == "add") public_form_empty(modalForm);
  if (type == "edit") public_form_data_replace(modalForm, row);
  modalInfo.type = type;
  modalInfo.workingProcedureId = row.workingProcedureId;
  modalProps.value = {
    modalTitle: type == "add" ? t("base.新建") : t("base.编辑"),
  };
  modalFlag.value = true;
  getInit();
};

const getInit = () => {
};

//取消
const handleCancel = () => {
  modalFlag.value = false;
};

//部门
const changeDepart = ({ value, label }) => {
  modalForm.name_2 = value;
  modalForm.deptName = label;
};

//确定
const handleOk = () => {
  formRef.value.validate().then(() => {
    if (modalInfo.type == "add") addSave();
    if (modalInfo.type == "edit") editSave();
  });
};

//新增
const addSave = () => {
  let params = {
    ...modalForm,
  };
  procedureCreate(params).then((res) => handleMessage(res));
};
//编辑
const editSave = () => {
  let params = {
    ...modalForm,
    workingProcedureId: modalInfo.workingProcedureId,
  };
  procedureUpdate(params).then((res) => handleMessage(res));
};

//统一信息处理
const handleMessage = (res) => {
  if (res.errorCode == "00000") emits("addSubmit");
  setMessageTips(res);
  handleCancel();
};

defineExpose({
  openModal
})
</script>
