import request from '../index'
const config = {
//   得到订单列表数据
  getOrderData: {
    url: '/order/orderListByPage.json',
    method: 'post'
  },
  // 得到打印结果
  getqueryPrintResult: {
    url: '/ticket/queryPrintResult.json',
    method: 'get'
  },
  // 得到打印结果
  getOrderDetailData: {
    url: '/order/orderDetail.json',
    method: 'post'
  },
  // 状态改变
  changeStatus: {
    url: '/order/orderInfoExceptions.json',
    method: 'post'
  }
}

export default function req (funcName, data) {
  return request(config, funcName, data)
}
