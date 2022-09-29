import { RouteRecordRaw } from 'vue-router';
const Layout = () => import('@/layout/index.vue');
const SupermarketManger = () => import('@/views/DS/Supermarket/SupermarketManger/index.vue')
const Placing = () => import('@/views/DS/Supermarket/Placing/index.vue')
const reclaiming = () => import('@/views/DS/Supermarket/reclaiming/index.vue')
const Tailings = () => import('@/views/DS/Supermarket/Tailings/index.vue')
const InventorySearch = () => import('@/views/DS/Inventory/InventorySearch/index.vue')
const HistoryRecord = () => import('@/views/DS/Inventory/HistoryRecord/index.vue')
const Supermarket = () => import('@/views/DS/basic/supermarket/index.vue')
const Passageway = () => import('@/views/DS/basic/passageway/index.vue')
const Container = () => import('@/views/DS/basic/container/index.vue')
const Material = () => import('@/views/DS/basic/material/index.vue')
const MaterialmaterialRelationship = () => import('@/views/DS/basic/materialRelationship/index.vue')
const PassagewayCapacity = () => import('@/views/DS/basic/passagewayCapacity/index.vue')
const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: Layout,
    meta: { title: '超市管理' },
    children: [
      {
        path: '/DS/Supermarket/SupermarketManger',
        name: 'SupermarketManger',
        component: SupermarketManger,
        meta: {
          title: '超市管理',
          titleEn: 'SupermarketManger',
          keepAlive: true
        }
      },
      {
        path: '/DS/Supermarket/Placing',
        name: 'Placing',
        component: Placing,
        meta: {
          title: '放料',
          titleEn: 'Placing',
          keepAlive: true
        }
      },

      {
        path: '/DS/Supermarket/reclaiming',
        name: 'reclaiming',
        component: reclaiming,
        meta: {
          title: '取料',
          titleEn: 'reclaiming',
          keepAlive: true
        }
      },
      {
        path: '/DS/Supermarket/Tailings',
        name: 'Tailings storage',
        component: Tailings,
        meta: {
          title: '尾料存入',
          titleEn: 'Tailings storage',
          keepAlive: true
        }
      }

    ]
  },
  {
    path: '',
    component: Layout,
    meta: { title: '库存管理' },
    children: [
      {
        path: '/DS/Inventory/InventorySearch',
        name: 'InventorySearch',
        component: InventorySearch,
        meta: {
          title: '库存查询',
          titleEn: 'InventorySearch',
          keepAlive: true
        }
      },
      {
        path: '/DS/Inventory/HistoryRecord',
        name: 'HistoryRecord',
        component: HistoryRecord,
        meta: {
          title: '历史记录',
          titleEn: 'HistoryRecord',
          keepAlive: true
        }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    meta: { title: '基础设置' },
    children: [
      {
        path: '/DS/basic/supermarket',
        name: 'Supermarket',
        component: Supermarket,
        meta: {
          title: '超市',
          titleEn: 'Supermarket',
          keepAlive: true
        }
      },
      {
        path: '/DS/basic/passageway',
        name: 'Passageway',
        component: Passageway,
        meta: {
          title: '通道',
          titleEn: 'Passageway',
          keepAlive: true
        }
      },
      {
        path: '/DS/basic/container',
        name: 'Container',
        component: Container,
        meta: {
          title: '容器',
          titleEn: 'Container',
          keepAlive: true
        }
      },
      {
        path: '/DS/basic/material',
        name: 'Material',
        component: Material,
        meta: {
          title: '物料',
          titleEn: 'Material',
          keepAlive: true
        }
      },
      {
        path: '/DS/basic/supermarket/materialRelationship',
        name: 'materialRelationship',
        component: MaterialmaterialRelationship,
        meta: {
          title: '物料关系',
          titleEn: 'materialRelationship',
          keepAlive: true
        }
      },
      {
        path: '/DS/basic/passageway/capacity',
        name: 'PassagewayCapacity',
        component: PassagewayCapacity,
        meta: {
          title: '通道容量',
          titleEn: 'PassagewayCapacity',
          keepAlive: true
        }
      }
    ]
  }
]

export default routes;
