import Vue from 'vue'
import VueRouter from 'vue-router'
const Admin = () => import('../views/admin')
const Welcome = () => import('../views/admin/welcome.vue')
const History = () => import('../views/admin/history.vue')
const Users = () => import('../views/users')
const UsersCreate = () => import('../views/users/create.vue')
const Roles = () => import('../views/roles')
const RolesCreate = () => import('../views/roles/create.vue')
const Auths = () => import('../views/admin/auths.vue')
const Login = () => import('../views/login')
const LoginSMS = () => import('../views/login/sms.vue')
const LoginToken = () => import('../views/login/token.vue')
const Total = () => import('../views/orders/total.vue')

Vue.use(VueRouter)

// 解决重复路由的bug
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    component: Admin,
    meta: {one: '后台首页', two: '欢迎页'},
    children: [
      { path: 'welcome',alias: '/', component: Welcome, meta: {one: '后台首页', two: '欢迎页'}}, 
      { path: 'history', component: History, meta: {one: '后台首页', two: '访客记录'} },
      { path: 'users', component: Users, meta: {one: '用户管理', two: '用户列表'}},
      { path: 'users/create', component: UsersCreate, meta: {one: '用户管理', two: '用户创建'}},
      { path: 'roles', component: Roles, meta: {one: '角色管理', two: '角色列表'}},
      { path: 'roles/create', component: RolesCreate, meta: {one: '角色管理', two: '角色创建'}},
      { path: 'auths', component: Auths, meta: {one: '用户列表', two: '权限管理'}},
      { path: 'total', component: Total, meta: {one: '订单管理', two: '订单统计'}},
    ]
  },
  { path: '/login', component: Login },
  { path: '/login/sms', component: LoginSMS },
  { path: '/login/token', component: LoginToken },


]

const router = new VueRouter({
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  let gogogo = ['/login','/404','/login/sms', '/login/token']

  // 数组方法四问
  if (gogogo.indexOf(to.path) != -1)
  {
    next()
  } else {
    let token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next({path: '/login'})
    }
  }
})

export default router
