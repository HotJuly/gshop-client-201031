## 今日任务
	注册
	登陆
	自动登陆
	退出登陆
	订单与支付相关路由流程
	导航守卫

## 注册登陆的组件界面

## 相关API
	reqRegister(userInfo)
	reqLogin(mobile, password)
	reqLogout()

## vuex
	user.js
	state: userInfo
	mutations: 
		RECEIVE_USER_INFO ()
		RESET_USER_INFO ()
	actions:
		register(): 请求注册的接口, 完成后不用更新state, 只需要将请求的结果通知给组件
		login(): 请求登陆接口成功后, 保存返回的用户信息	
			通过commit触发mutation调用 ==> 保存信息到state
			保存localStorage中  ===> 从而可以实现自动登陆的功能
		logout(): 请求登出的接口成功后, 清除前台用户的信息数据
			state中的userInfo
			localStorage中的userInfo
	getters: 

## 区别token与userTempId
	userTmepId
		未登陆用户(浏览器)的标识数据(字符串)
		浏览器端创建, 并保存在浏览器端
		每次请求都会通过请求头携带: userTempId: uuid字符串
	token
		已登陆用户的标识数据(字符串)
		请求登陆成功时, 服务器端创建并返回的, 保存在浏览器端
		每次请求(登陆后)都会通过请求头携带: token: 字符串(加密后的值, 里面包含了用户id和失效的信息)
	在购物车中应用的细节:
		在登陆前, 后台通过userTmepId来保存对应的购物车数据
		在登陆后, 后台通过token对应的用户来保存对应的购物车数据
		细节: 登陆后再退出登陆, 前面未登陆添加的购物车数据就看不到了?
			登陆后发获取购物车数据请求, 同时携带userTempId和token, 后台会将userTempId对应购物车数据转移到token对应的用户下, 退出登陆后, 根据userTempId不再能得到以前的购物车数据

## Register组件
	实现一次性图形验证码的动态显示与点击更新显示
		<img src="/api/user/passport/code"> // 浏览器发的http请求没有跨域, 但代理服务转发请求返回的图片
	前台表单校验
	收集用户输入: v-model
	分发注册的异步action
	如果成功了跳转到登陆页面
	如果失败了, 提示并重新显示验证码

## 注册/登陆的前台表单校验
	使用vee-validate: npm install -S vee-validate@2.2.15  没用3.x新版本, 用起来比较麻烦
	目标: 根据我们文档和已经实现的注册的表单校验来实现登陆表单校验

## Login组件
	前台表单校验
	收集用户输入数据
	点击回调中分发给登陆的异步action发请求
	如果成功了, 跳转到首页
	如果失败了, 提示

## 自动登陆
		方式一: 登陆请求成功后保存返回的用户所有信息(token及用户名等)到local中
					初始化时就自动读取local中保存的用户信息实现自动登陆  ===> 不需要额外发请求
		方式二:登陆请求成功后只保存token到local中
					初始化时就需要从local中读取出token, 并发请求获取用户信息实现自动 ==>需要额外发请求
		注意: 我们的后台没有一个根据token来获取用户信息的接口 ==> 只能用方式一

## 退出登陆
		发送退出登陆的请求
		如果失败了提示
		如果成功了, 清除数据, 自动跳转到登陆页面

## 订单与支付相关路由流程
	定义所有相关的路由组件==> 注册  ==> 通过声明式/编程式路由跳转关联
	什么时候需要定义子路由(二级)?  如果在一个大的路由界面上又有局部界面的切换显示

## 路由导航(跳转)守卫
	路由导航(跳转)守卫是什么?
		vue-router提供的能监控(监视和控制)路由跳转的相关语法功能
	
	分类:  (应用开发中基本都是用前置守卫)
		全局守卫
			前置: 监视任意路由跳转, 在准备跳转到目标路由时回调
				router.beforeEach((to, from, next) => {})
				to: 目标路由对象
				from: 当前路由对象  对应的就$route
				next: 控制路由跳转的函数
				  不执行: 不放行, 不会跳转到目标路由
				  next(): 放行, 请求的路由组件才能显示
				  next(path): 强制跳转到指定路由去
			后置: 监视任意路由跳转, 在已经跳转到目标路由时才调用
		路由守卫
			前置: 监视是跳转到当前路由, 当准备跳转时回调
				beforeEnter: (to, from, next) => { }
		组件守卫
			前置: 与路由前置守卫功能类似
				beforeRouteEnter (to, from, next) {},
					next((component) => {}) // 指定回调函数在组件对象创建之后执行
			更新: beforeRouteUpdate (to, from, next) 
			离开: beforeRouteLeave (to, from, next)

## 导航守卫相关功能
	a.只有登陆了, 才能查看交易/支付/个人中心界面
	b.只有没有登陆, 才能查看登陆界面
	c.只有携带的skuNum以及sessionStorage中有skuInfo数据, 才能查看添加购物车成功的界面
	d.只能从购物车界面, 才能跳转到交易界面
	e.只能从交易界面, 才能跳转到支付界面
	f.只有从支付界面, 才能跳转到支付成功的界面

