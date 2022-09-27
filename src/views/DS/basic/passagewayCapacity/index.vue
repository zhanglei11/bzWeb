<template>
  <a-card :bordered="false">
    <AddModal ref="addModalRef" @addSubmit="addSubmit" />
    <VxeTable ref="vxeTableRef" :tableDate="tableDate" @clickOrder="clickOrder" @handlePage="handlePage">
      <template v-slot:rightButton>
        <a-button type="primary" @click="add({}, 'add')">
          <template #icon>
            <IconCom type="PlusOutlined" />
          </template>
          {{ $t("base.新建") }}
        </a-button>
      </template>
      <template v-slot:tableInfo>
        <vxe-column field="deptName" :title="$t('basic.容量')"></vxe-column>
        <vxe-column field="comment" :title="$t('basic.容器')"></vxe-column>
        <vxe-column :title="$t('base.操作')" fixed="right" min-width="80">
          <template v-slot="{ row }">
            <a-tooltip placement="topLeft" :title="$t('base.编辑')">
              <a-button type="primary" @click="add(row, 'edit')" class="mr10">
                <template #icon>
                  <IconCom type="EditOutlined" />
                </template>
              </a-button>
            </a-tooltip>
            <DeleteCom :row="row" @confirmSure="onDelete" />
          </template>
        </vxe-column>
      </template>
    </VxeTable>
  </a-card>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import AddModal from "./components/addModal.vue";
import IconCom from "@/components/modules/IconCom.vue";
import DeleteCom from "@/components/modules/deleteCom.vue";
import { setMoment, setMessageTips } from "@/pages/utils";
import { procedurePage, procedureDelete } from "@/apis/basic";
import { TableDateTs } from "@/types/tableTs";
import { FormStateTs } from "@/types/basicTs";
import VxeTable from "@/components/table/vxeTable.vue";
const formState = ref<FormStateTs>({});
const addModalRef = ref();
const vxeTableRef = ref();
const tableDate = reactive<TableDateTs>({
  pageNumber: 1,
  pageSize: 10,
});
//弹框基本信息
onMounted(() => {
  init("initial");
});

//查询表格数据
const init = (type: string) => {
  if (type == "initial") tableDate.pageNumber = 1;
  let params: Object = {
    ...formState.value,
    ...tableDate
  };
  vxeTableRef.value.tableLoading = true;
  procedurePage(params)
    .then((res) => {
      if (res.errorCode == "00000") {
        vxeTableRef.value.setTableDate(res)
      }
      setMessageTips(res, false);
    })
    .finally(() => {
      vxeTableRef.value.tableLoading = false;
    });
};

//删除
const onDelete = (row: Object) => {
  procedureDelete({ workingProcedureId: row.workingProcedureId }).then((res) => {
    setMessageTips(res);
    init("initial");
  });
};

//分页查询
const handlePage = ({ currentPage, pageSize }) => {
  tableDate.pageNumber = currentPage;
  tableDate.pageSize = pageSize;
  init("update");
};

//新增收货
const add = (row: Object, type: string) => {
  addModalRef.value.openModal(row, type);
};
const addSubmit = () => {
  init("initial");
};

const clickOrder = ({ column, prop, order }) => {
  console.log(column)
  console.log(order)
}
</script>
