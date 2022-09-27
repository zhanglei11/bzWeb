<template>
  <a-card :bordered="false">
    <Query @searchQuery="searchQuery" />
  </a-card>
  <a-card :bordered="false">
    <AddModal ref="addModalRef" @addSubmit="addSubmit" />
    <VxeTable
      ref="vxeTableRef"
      :tableDate="tableDate"
      @clickOrder="clickOrder"
      @handlePage="handlePage"
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
        <vxe-column field="name" :title="$t('dictionary.字典名称')" sortable></vxe-column>
        <vxe-column field="code" :title="$t('dictionary.字典Code')" sortable></vxe-column>
        <vxe-column field="description" :title="$t('dictionary.说明')" sortable></vxe-column>
        <vxe-column :title="$t('base.操作')" fixed="right" min-width="80">
          <template v-slot="{ row }">
            <a-tooltip placement="topLeft" :title="$t('base.编辑')">
              <a-button type="primary" @click="add(row, 'edit')" class="mr10">
                <template #icon>
                  <IconCom type="EditOutlined" />
                </template>
              </a-button>
            </a-tooltip>
            <a-tooltip placement="topLeft" :title="$t('dictionary.查看字典项')">
              <a-button type="dashed" danger @click="dictionaryInfo(row)" class="mr10">
                <template #icon>
                  <IconCom type="ContactsOutlined" />
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
import { system_dict_page,system_dict_delete} from "@/apis/dictionary";
import { useRouter } from "vue-router";
const formState = ref({});
const addModalRef = ref();
const vxeTableRef = ref();
const tableDate = reactive({
  pageNumber: 1,
  pageSize: 20,
  orderBy: null,
  order: null,
});
//弹框基本信息
onMounted(() => {});

//将子组件获取到的对象返回
const searchQuery = (formValue) => {
  formState.value = formValue;
  init("initial");
};

//查询表格数据
const init = (type: string) => {
  if (type == "initial") tableDate.pageNumber = 1;
  let params: Object = {
    ...formState.value,
    ...tableDate,
  };
  vxeTableRef.value.tableLoading = true;
  system_dict_page(params)
    .then((res) => {
      if (res.errorCode == "00000") {
        vxeTableRef.value.setTableDate(res);
      }
      setMessageTips(res, false);
    })
    .finally(() => {
      vxeTableRef.value.tableLoading = false;
    });
};

//删除 内容
const onDelete = (row: Object) => {
  system_dict_delete({ dictId: row.id }).then((res) => {
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

//跳转
const router = useRouter()
const dictionaryInfo = (row) => {
  router.push({
    path:'/DS/dictionary/Item',
    query:{
      id: row.id
    }
  })
};

const clickOrder = ({ column, prop, order }) => {
  tableDate.orderBy = column.field;
  tableDate.order = column.order;
  init("initial");
};
</script>
