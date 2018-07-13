import request from '../index'
const config = {
//   得到赛事列表数据
  getMatchList: {
    url: 'matchData/getMatchListPage.json',
    method: 'post'
  }
}

export default function req (funcName, data) {
  return request(config, funcName, data)
}
