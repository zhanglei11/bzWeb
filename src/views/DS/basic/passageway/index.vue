<template>
  <a-card :bordered="false">
    <Query @searchQuery="searchQuery" ref="QueryRef" />
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
          {{ $t('base.新建') }}
        </a-button>
      </template>
      <template v-slot:tableInfo>
        <vxe-column field="supermarketName" :title="$t('basic.所属超市')" sortable></vxe-column>
        <vxe-column field="channelNo" :title="$t('basic.通道编号')" sortable></vxe-column>
        <vxe-column field="columnNo" :title="$t('basic.列号')" sortable></vxe-column>
        <vxe-column field="layerNo" :title="$t('basic.层号')" sortable></vxe-column>
        <vxe-column field="channelType" :title="$t('basic.通道类型')" sortable> 
           <template #default="{ row }">
            {{ getDictionary("channelType",row.channelType)}}
          </template>
        </vxe-column>
        <vxe-column field="electronicTagIn" :title="$t('basic.IN')" sortable></vxe-column>
        <vxe-column field="electronicTagOut" :title="$t('basic.OUT')" sortable></vxe-column>
        <vxe-column field="tailingFlag" :title="$t('basic.尾料通道')" sortable>
          <template #default="{ row }">
            {{ row.tailingFlag == '0' ? '否' : '是' }}
          </template>
        </vxe-column>
        <vxe-column field="description" :title="$t('basic.说明')" sortable></vxe-column>
        <vxe-column field="createBy" :title="$t('basic.创建人')" sortable></vxe-column>
        <vxe-column field="createTime" :title="$t('basic.创建时间')" sortable></vxe-column>
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
import { reactive, ref, onMounted } from 'vue'
import Query from './components/query.vue'
import AddModal from './components/addModal.vue'
import IconCom from '@/components/modules/IconCom.vue'
import DeleteCom from '@/components/modules/deleteCom.vue'
import VxeTable from '@/components/table/vxeTable.vue'
import { setMoment, setMessageTips } from '@/pages/utils'
import { channelDelete, channelPage } from '@/apis/marketbase'
import { useRouter } from 'vue-router'
import mixin from "@/mixin/dictionary.ts";
const { getDictionary } = mixin.setup();
const formState = ref({})
const addModalRef = ref()
const vxeTableRef = ref()
const QueryRef = ref()
const channelType = ref()
const tableDate = reactive({
  pageNumber: 1,
  pageSize: 10,
  orderBy: null,
  order: null,
})
//弹框基本信息
onMounted(() => {})

//将子组件获取到的对象返回
const searchQuery = (formValue) => {
  formState.value = formValue
  init('initial')
} 

//查询表格数据
const init = (type) => {
  if (type == 'initial') tableDate.pageNumber = 1
  let params = {
    ...formState.value,
    ...tableDate
  }
  vxeTableRef.value.tableLoading = true
  channelPage(params)
    .then((res) => {
      if (res.errorCode == '00000') {
        vxeTableRef.value.setTableDate(res)
      }
      setMessageTips(res, false)
      QueryRef.value.getchannel()
    })
    .finally(() => {
      vxeTableRef.value.tableLoading = false
    })
}

//删除
const onDelete = (row) => {
  channelDelete({ id: row.id }).then((res) => {
    setMessageTips(res)
    init('initial')
  })
}

//分页查询
const handlePage = ({ currentPage, pageSize }) => {
  tableDate.pageNumber = currentPage
  tableDate.pageSize = pageSize
  init('update')
}

//新增收货
const add = (row, type) => {
  addModalRef.value.openModal(row, type)
}
const router = useRouter()
const setRelation = (row) => {
  router.push('/DS/basic/passageway/capacity')
}

const addSubmit = () => {
  init('initial')
}

const clickOrder = ({ column, prop, order }) => {
  tableDate.orderBy = column.field;
  tableDate.order = column.order;
  init("initial");
}
</script>
