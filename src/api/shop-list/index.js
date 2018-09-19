import request from '../index'
const config = {
//   得到商铺列表数据
  getStoreList: {
    url: '/admin/store/getStoreListPage.json',
    method: 'post'
  },
  // 得到店铺详情数据
  getStoreDetail: {
    url: '/admin/store/getStoreDetail.json',
    method: 'post'
  },
  // 改变设备状态
  changeMachineStatus: {
    url: '/admin/store/changeMachineStatus.json',
    method: 'post'
  }
}

export default function req (funcName, data) {
  return request(config, funcName, data)
}
