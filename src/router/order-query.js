const Blank = () => import('../components/blank')
const OrderList = () => import('../page/order-query/order-List')
const OrderInformation = () => import('../page/order-query/order-information')

export default [{
  path: '/order-query',
  component: Blank,
  children: [{
    path: 'order-List',
    name: '订单查询',
    component: OrderList
  }, {
    path: 'order-information',
    name: '订单基本信息',
    component: OrderInformation
  }]
}]
