const Blank = () => import('../components/blank')
const ShopList = () => import('../page/shop-list/shop-list')
const ShopInformation = () => import('../page/shop-list/shop-information')

export default [{
  path: '/shop-list',
  component: Blank,
  children: [{
    path: 'shop-list',
    name: '商铺列表',
    component: ShopList
  }, {
    path: 'shop-information',
    name: '店铺信息',
    component: ShopInformation
  }]
}]
