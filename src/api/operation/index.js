import request from '../index'
const config = {
//   得到赛事列表数据
  getMatchListData: {
    url: '/matchData/getMatchListPage.json',
    method: 'post'
  },
  // 赛事停售
  cancelMatch: {
    url: '/matchData/cancelMatch.json',
    method: 'get'
  },
  // 赛事延期
  delayMatch: {
    url: '/matchData/delayMatch.json',
    method: 'post'
  },
  // 赛事延期
  getMatchDetail: {
    url: '/matchData/getMatchDetail.json',
    method: 'get'
  },
  // 获取赛事操作记录
  getMatchOperationRecordListPage: {
    url: '/matchData/getMatchOperationRecordListPage.json',
    method: 'post'
  }
}

export default function req (funcName, data) {
  return request(config, funcName, data)
}
