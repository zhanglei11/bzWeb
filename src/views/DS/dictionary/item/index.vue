<template>
  <a-card :bordered="false">
    <Query @searchQuery="searchQuery" />
  </a-card>
  <a-card :bordered="false">
    <AddModal ref="addModalRef" @addSubmit="addSubmit" :dictId="dictId" />
    <VxeTable
      ref="vxeTableRef"
      :tableDate="tableDate"
      @clickOrder="clickOrder"
    >
      <template v-slot:rightButton>
        <a-button type="primary" @click="add({}, 'add')">
          <template #icon>
            <IconCom type="PlusOutlined" />
          </template>
          {{ $t("base.新建") }}
        </a-button>
      </template>
      <template v-slot:tableInfo>
        <vxe-column field="name" :title="$t('dictionary.字典项名称')" sortable></vxe-column>
        <vxe-column field="code" :title="$t('dictionary.字典项标识')" sortable></vxe-column>
        <vxe-column field="value" :title="$t('dictionary.字典项值')" sortable></vxe-column>
        <vxe-column field="sort" :title="$t('dictionary.排序号')" sortable></vxe-column>
        <vxe-column field="description" :title="$t('dictionary.描述')" sortable></vxe-column>
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
import Query from "./components/query.vue";
import AddModal from "./components/addModal.vue";
import IconCom from "@/components/modules/IconCom.vue";
import { setMessageTips } from "@/pages/utils";
import DeleteCom from "@/components/modules/deleteCom.vue";
import VxeTable from "@/components/table/vxeTable.vue";
import { system_dict_item_list,system_dict_item_delete } from "@/apis/dictionary";
import { useRoute } from "vue-router";
const route = useRoute()
const dictId = ref(route.query.id)
const formState = ref({});
const addModalRef = ref();
const vxeTableRef = ref();
const tableDate = reactive({
  orderBy: null,
  order: null,
});
//弹框基本信息
onMounted(() => {});

//将子组件获取到的对象返回
const searchQuery = (formValue) => {
  formState.value = formValue;
  init();
};

//查询表格数据
const init = () => {
  let params: Object = {
    ...formState.value,
    dictId:dictId.value
  };
  vxeTableRef.value.tableLoading = true;
  system_dict_item_list(params)
    .then((res) => {
      if (res.errorCode == "00000") {
        vxeTableRef.value.setTableDate(res,2);
      }
      setMessageTips(res, false);
    })
    .finally(() => {
      vxeTableRef.value.tableLoading = false;
    });
};

//删除 内容
const onDelete = (row: Object) => {
  system_dict_item_delete({ dictItemId: row.id }).then((res) => {
    setMessageTips(res);
    init();
  });
};

//新增收货
const add = (row: Object, type: string) => {
  addModalRef.value.openModal(row, type);
};

const addSubmit = () => {
  init();
};

const clickOrder = ({ column, prop, order }) => {
  tableDate.orderBy = column.field;
  tableDate.order = column.order;
  init();
};
</script>
