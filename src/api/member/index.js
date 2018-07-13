import request from '../index'
const config = {
//   得到会员列表数据
  getMemberListData: {
    url: '/memberManage/getMemberListPage.json',
    method: 'post'
  },
  // 得到会员列表数据
  editMemberData: {
    url: '/memberManage/editMemberByOperator.json',
    method: 'post'
  },
  // 冻结会员
  invalidateMember: {
    url: '/memberManage/invalidateMember.json',
    method: 'post'
  },
  // 获取会员基本数据
  getBasicData: {
    url: '/memberManage/getMemberDetail.json',
    method: 'get'
  },
  // 获取会员购彩数据
  getBuyData: {
    url: '/order/statisticOrderByMember.json',
    method: 'get'
  }
}

export default function req (funcName, data) {
  return request(config, funcName, data)
}
