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
        <vxe-column
          field="materialName"
          :title="$t('basic.物料名称')"
          sortable
        ></vxe-column>
        <vxe-column
          field="materialNo"
          :title="$t('basic.物料编号')"
          sortable
        ></vxe-column>
        <vxe-column field="materialLevel" :title="$t('basic.等级')" sortable>
          <template #default="{ row }">
            {{ getDictionary("materialLevel", row.materialLevel) }}
          </template>
        </vxe-column>
        <vxe-column field="materialType" :title="$t('basic.物料类型')" sortable>
          <template #default="{ row }">
            {{ getDictionary("materialType", row.materialType) }}
          </template>
        </vxe-column>
        <vxe-column field="description" :title="$t('basic.说明')" sortable></vxe-column>
        <vxe-column field="createBy" :title="$t('basic.创建人')" sortable></vxe-column>
        <vxe-column
          field="createTime"
          :title="$t('basic.创建时间')"
          sortable
        ></vxe-column>
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
<script setup>
import { reactive, ref, onMounted } from "vue";
import Query from "./components/query.vue";
import AddModal from "./components/addModal.vue";
import IconCom from "@/components/modules/IconCom.vue";
import { setMoment, setMessageTips } from "@/pages/utils";
import DeleteCom from "@/components/modules/deleteCom.vue";
import VxeTable from "@/components/table/vxeTable.vue";
import { materialPage, materialDelete } from "@/apis/marketbase";
import mixin from "@/mixin/dictionary.ts";
const { getDictionary } = mixin.setup();
const formState = ref({});
const addModalRef = ref();
const vxeTableRef = ref();
const tableDate = reactive({
  pageNumber: 1,
  pageSize: 10,
});
//弹框基本信息
onMounted(() => {});
//将子组件获取到的对象返回
const searchQuery = (formValue) => {
  formState.value = formValue;
  init("initial");
};

//查询表格数据
const init = (type) => {
  if (type == "initial") tableDate.pageNumber = 1;
  let params = {
    ...formState.value,
    ...tableDate,
  };
  vxeTableRef.value.tableLoading = true;
  materialPage(params)
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
const onDelete = (row) => {
  materialDelete({ id: row.id }).then((res) => {
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
const add = (row, type) => {
  addModalRef.value.openModal(row, type);
};

const addSubmit = () => {
  init("initial");
};

const clickOrder = ({ column, prop, order }) => {
  // console.log(column.field)
  console.log(column);
  console.log(order);
};
</script>
