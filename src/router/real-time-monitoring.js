const Blank = () => import('../components/blank')
const Monitor = () => import('../page/real-time-monitoring/monitor')

export default [{
  path: '/real-time-monitoring',
  component: Blank,
  children: [{
    path: 'monitor',
    name: '实时监控',
    component: Monitor
  }]
}]
