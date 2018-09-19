import request from '../index'
const config = {
//   得到订单列表数据
  getCompetitiveOrderData: {
    url: '/admin/order/orderClassificationStatistics.json',
    method: 'get'
  },
  // 开启或关闭传票
  changeReceiveOrderStatus: {
    url: '/admin/order/changeReceiveOrderStatus.json',
    method: 'post'
  },
  // 出票数据
  orderStatusStatistics: {
    url: '/admin/order/orderStatusStatistics.json',
    method: 'get'
  }
}

export default function req (funcName, data) {
  return request(config, funcName, data)
}
