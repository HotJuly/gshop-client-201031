/* 
包含项目中所有接口的请求函数: 接口请求函数
每个函数的返回值都是promise
*/
import axios from 'axios'
import ajax from './ajax'
import ajax2 from './ajax2'
import user from './ajax-user'
import cart from './ajax-cart'
import mockAjax from './mockAjax'
import { method } from 'lodash'

/* 
首页三级分类
/api/product/getBaseCategoryList GET
*/
export const reqCategoryList = () => ajax('/product/getBaseCategoryList')
// export const reqCategoryList = () => ajax.get('/product/getBaseCategoryList')

// 定义mock接口的请求函数
export const reqBanners = () => mockAjax('/banners')
export const reqFloors = () => mockAjax('/floors')


// 请求搜索匹配的商品相关数据
export const reqProductList = (searchParams) => ajax.post('/list', searchParams)

// 获取商品详情信息
export const reqDetailInfo = (skuId) => ajax.get(`/item/${skuId}`)

// 6.获取购物车列表 /api/cart/cartList
//注意:接口已修改
export const reqCartList = () => cart.get('/cart/cartList')

// 7.添加到购物车(对已有物品进行数量改动)
/* 
skuId: 商品ID
skuNum: 变化的数量   如果增加用正数, 如果减少用负数
*/
export const reqAddToCart = (skuId, skuNum) => cart.post(`/cart/addToCart/${skuId}/${skuNum}`)

// 8.切换商品选中状态
/* 
0代表取消选中
1代表选中
*/
export const reqCheckCartItem = (skuId, isChecked) => cart.get(`/cart/checkCart/${skuId}/${isChecked}`)

// 9.删除购物车商品
export const reqDeleteCartItem = (skuId) => cart.delete(`/cart/deleteCart/${skuId}`)

/* 
登陆
/api/user/passport/login POST  mobile/password
*/
export function reqLogin (phone, password) {
  // 注意:更换新接口,参数从mobile改为phone,配置新代理
  return user.post('/user/passport/login', {phone, password})
  // return ajax({
  //   url: '/user/passport/login',
  //   method: 'POST',
  //   // params: {}, // 指定query参数
  //   data: {mobile, password}, // 指定body参数
  // })
}

/* 
16.注册用户
/api/user/passport/register POST
mobile/password/code
userInfo是包含上面3个属性的对象
*/
export const reqRegister = (userInfo) => ajax.post('/user/passport/register', userInfo)

/* 
退出登陆
/api/user/passport/logout GET
*/
export const reqLogout = () => ajax('/user/passport/logout')

/* 
11.获取我的订单列表
/api/order/auth/{page}/{limit} GET
page: 页码
limit: 每页数量
*/
export const reqOrders = (page, limit) => ajax(`/order/auth/${page}/${limit}`)

/* 
10.获取订单交易页信息
/api/order/auth/trade GET
*/
export const reqTradeInfo = () => ajax('/order/auth/trade')

/* 
12.提交订单
/api/order/auth/submitOrder?tradeNo={tradeNo} POST
请求体参数对象的结构
  {
      "consignee": "admin",
      "consigneeTel": "15011111111",
      "deliveryAddress": "北京市昌平区2",
      "paymentWay": "ONLINE",
      "orderComment": "xxx",
      "orderDetailList": []
  }
*/
export const reqSumitOrder = (tradeNo, tradeInfo) => ajax({
  url: '/order/auth/submitOrder',
  method: 'POST',
  params: {tradeNo},
  data: tradeInfo
})

// ajax.post('/order/auth/submitOrder', tradeInfo, {
//   params: {tradeNo}
// })

/* 
13.获取订单支付信息
/api/payment/weixin/createNative/{orderId} GET
*/
export const reqPayInfo = (orderId) => ajax(`/payment/weixin/createNative/${orderId}`)

/* 
14.查询支付订单状态
/api/payment/weixin/queryPayStatus/{orderId} GET
*/
export const reqOrderStatus = orderId => ajax.get(`/payment/weixin/queryPayStatus/${orderId}`)


/* 
15.获取当前商品促销和优惠券信息
/api/activity/findActivityAndCoupon/{skuId} GET
*/
export const reqCouponInfoList = skuId => ajax2.get(`/activity/findActivityAndCoupon/${skuId}`)

/* 
16.领取优惠券
/api/activity/auth/getCouponInfo/{couponId} GET
*/
export const reqCouponInfo = couponId => ajax2.get(`/activity/auth/getCouponInfo/${couponId}`)


