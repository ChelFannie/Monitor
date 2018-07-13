import request from '../index'
const config = {
//   增加店铺设备
  addStoreMachine: {
    url: '/machine/addStoreMachine.json',
    method: 'post'
  },
  // 获取业务分类数据
  getSystemTypeList: {
    url: '/dataManage/getSystemTypeList.json',
    method: 'get'
  },
  // 编辑业务分类数据
  modifySystemType: {
    url: '/dataManage/modifySystemType.json',
    method: 'post'
  },
  // 新增业务分类数据
  addSystemType: {
    url: '/dataManage/addSystemType.json',
    method: 'post'
  },
  // 删除业务分类数据
  deleteSystemType: {
    url: '/dataManage/deleteSystemTypeBySystemUniqueId.json',
    method: 'post'
  },
  // 删除店铺数据
  deleteStoreMachine: {
    url: '/machine/deleteStoreMachine.json',
    method: 'post'
  },
  // 获取店铺数据
  getMachineList: {
    url: '/machine/getMachineListPage.json',
    method: 'post'
  },
  // 获取开奖赛果数据
  getMatchResultList: {
    url: '/matchData/getMatchResultListPage.json',
    method: 'post'
  },
  // 获取店铺信息
  getStoreDetail: {
    url: '/machine/getStoreDetail.json',
    method: 'post'
  },
  // 编辑店铺信息
  editStoreMachine: {
    url: '/machine/editStoreMachine.json',
    method: 'post'
  }
}

export default function req (funcName, data) {
  return request(config, funcName, data)
}
