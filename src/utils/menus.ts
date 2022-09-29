import setting from '@/pages/menu/setting';
import welcome from '@/pages/menu/welcome';
export default [
  welcome,

  {
    path: '',
    title: '超市管理',
    titleEn: 'Supermarket',
    icon: 'HomeOutlined',
    children: [
      {
        path: '/DS/Supermarket/SupermarketManger',
        titleEn: 'SupermarketManger',
        title: '超市管理'
      },
      {
        path: '/DS/Supermarket/Placing',
        titleEn: 'Placing',
        title: '放料'
      },
      {
        path: '/DS/Supermarket/reclaiming',
        titleEn: 'reclaiming',
        title: '取料'
      },
      {
        path: '/DS/Supermarket/Tailings',
        titleEn: 'Tailings',
        title: '尾料存入'
      }
    ]
  },
  {
    path: '',
    title: '库存管理',
    titleEn: 'Inventory',
    icon: 'HomeOutlined',
    children: [
      {
        path: '/DS/Inventory/InventorySearch',
        titleEn: 'InventorySearch',
        title: '库存查询'
      },
      {
        path: '/DS/Inventory/HistoryRecord',
        titleEn: 'HistoryRecord',
        title: '历史记录'
      }
    ]
  },
  {
    path: '',
    title: '基础设置',
    titleEn: 'base setting',
    icon: 'HomeOutlined',
    children: [
      {
        path: '/DS/basic/supermarket',
        titleEn: 'supermarket',
        title: '超市'
      },
      {
        path: '/DS/basic/passageway',
        titleEn: 'passageway',
        title: '通道'
      },
      {
        path: '/DS/basic/container',
        titleEn: 'container',
        title: '容器'
      },
      {
        path: '/DS/basic/material',
        titleEn: 'material',
        title: '物料'
      }
    ]
  },
  setting
]
