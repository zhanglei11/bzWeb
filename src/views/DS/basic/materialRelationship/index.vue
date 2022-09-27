<template>
  <a-card :bordered="false">
    <Query @searchQuery="searchQuery" />
  </a-card>
  <a-card :bordered="false">
    <AddModal ref="addModalRef" @addSubmit="addSubmit" />
    <VxeTable ref="vxeTableRef" @clickOrder="clickOrder" @handlePage="handlePage">
      <template v-slot:rightButton>
        <a-dropdown :trigger="['click']">
          <a-button type="primary" @click.prevent
            ><template #icon>
              <IconCom type="PlusOutlined" />
            </template>
            {{ $t('base.新建') }}
          </a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item key="0" @click="add({}, 'add', 0, route.query.id)">
                <a>{{ $t('basic.物料类型') }}</a>
              </a-menu-item>
              <a-menu-item key="1" @click="add({}, 'add', 1, route.query.id)">
                <a>{{ $t('basic.物料号') }}</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
      <template v-slot:tableInfo>
        <vxe-column field="materialNo" :title="$t('basic.物料号')"></vxe-column>
        <vxe-column field="materialType" :title="$t('basic.物料类型')">
          <template #default="{ row }">
            {{ getDictionary("materialType",row.materialType) }}
          </template>
        </vxe-column>
        <vxe-column :title="$t('base.操作')" fixed="right" min-width="80">
          <template v-slot="{ row }">
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
import { setMoment, setMessageTips } from '@/pages/utils'
import { supermarketRelationPage, supermarketRelationDelete } from '@/apis/marketbase'
import VxeTable from '@/components/table/vxeTable.vue'
import mixin from "@/mixin/dictionary.ts";
const { getDictionary } = mixin.setup();
import { useRoute } from 'vue-router'
const route = useRoute()
const formState = ref({})
const addModalRef = ref()
const vxeTableRef = ref()
const tableDate = reactive({
  pageNumber: 1,
  pageSize: 10
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
    ...tableDate,
    baseSupermarketId: route.query.id
  }
  vxeTableRef.value.tableLoading = true
  supermarketRelationPage(params)
    .then((res) => {
      if (res.errorCode == '00000') {
        vxeTableRef.value.setTableDate(res)
      }
      setMessageTips(res, false)
    })
    .finally(() => {
      vxeTableRef.value.tableLoading = false
    })
}

//删除
const onDelete = (row) => {
  supermarketRelationDelete({ id: row.id }).then((res) => {
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
const add = (row, type, No, id) => {
  addModalRef.value.openModal(row, type, No, id)
}
const addSubmit = () => {
  init('initial')
}

const clickOrder = ({ column, prop, order }) => {
  console.log(column)
  console.log(order)
}
</script>
