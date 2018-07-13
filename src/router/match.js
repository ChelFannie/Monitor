const Blank = () => import('../components/blank')
const Match = () => import('../page/match/match')
const MatchDetail = () => import('../page/match/match-detail')
const LottoDetail = () => import('../page/match/lotto-detail')

export default [{
  path: '/match',
  component: Blank,
  children: [{
    path: 'match',
    name: '赛事/彩期',
    component: Match
  }, {
    path: 'match-detail',
    name: '赛事明细',
    component: MatchDetail
  }, {
    path: 'lotto-detail',
    name: '大乐透明细',
    component: LottoDetail
  }]
}]
