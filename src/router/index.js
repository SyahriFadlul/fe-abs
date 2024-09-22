import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Forbidden from '../views/components/Forbidden.vue'
import NotFound from '../views/components/NotFound.vue'
import Product from '../views/products/Product.vue'
import nProgress from 'nprogress'
import nprogress from 'nprogress'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/Login.vue'),
      meta:{
        authenticated: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/Register.vue')
    },
    {
      path: '/',
      name: 'product',
      component: Product
    },
    {
      path: '/products/:id',
      name: 'productDetail',
      props: true,
      component: () => import('../views/products/ProductDetail.vue')
    },
    {
      path: '/cart',
      name: 'CartProduct',
      // props: true,
      component: () => import('../views/products/CartProduct.vue'),
      meta:{
        requiresAuth: true,
      },
      children: [
        // {
        //   path: 'shipment',
        //   name: 'CartProduct.shipment',
        //   component: () => import ('@/views/products/CheckoutProduct.vue')
        // }
      ]
    },
    {
      path: '/cart/shipment',
      name: 'CartProduct.shipment',
      component: () => import ('../views/products/CheckoutProduct.vue')
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: () => import ('../views/products/WishlistProduct.vue'),
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/search',
      name: 'SearchPage',
      component : () => import('../views/products/SearchProduct.vue'),
      props: route=> ({ query: route.query.name })
    },    
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/profiles/Profile.vue'),
      meta:{
        requiresAuth: true,
      },
      children:[
        {
          path:'',
          name:'profile.edit',
          component: () => import ('@/views/profiles/EditProfile.vue')
        },
        {
          path:'setting',
          name:'profile.setting',
          component: () => import ('@/views/profiles/SettingProfile.vue')
        },
        {
          path:'alamat',
          name:'profile.alamat',
          component: () => import ('@/views/profiles/AlamatProfile.vue')
        },
      ]
    },
    {
      path:'/profile/menu',
      name:'profile.menu',
      component: () => import ('@/views/profiles/ProfileMenu.vue'),
      meta:{
        requiresAuth: true,
        hideNavbar: true
      }
    },
    {
      path:'/order-list',
      name:'orderList',
      component: () =>import ('@/views/transactions/Order.vue'),
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/Dashboard.vue'),
      meta: {
        requiresRole:'admin',
        hideNavbar: true,
        hideFooterMobile:  true,
        showNavbarDashboard: true
      },
      children:[
        {
          path: '',
          name:'admin.home',
          component: () => import('@/views/dashboard/adminhome.vue'),
        },
        // {
        //   path: 'menu',
        //   name:'admin.menu',
        //   component: () => import('@/views/dashboard/MenuDashboard.vue'),
        // },
        {
          path: 'products/list',
          name:'admin.productList',
          component: () => import('@/views/products/ProductList.vue'),
        },
        {
          path: 'products',
          name:'admin.productIndex',
          component: () => import('@/views/products/ProductIndex.vue'),
        },
        {
          path: 'products/:id',
          name:'admin.productDetail',
          component: () => import('../views/products/ProductDetailDashboard.vue'),
          props: true,
        },
        {
          path: 'products/create',
          name: 'admin.productCreate',
          component: () => import('../views/products/ProductCreate.vue'),          
        },
        {
          path: 'products/:id?/edit',
          name: 'admin.productEdit',
          component: () => import('../views/products/ProductEdit.vue'),
          props:true,          
        },
        {
          path: 'products/image/:id',
          name: 'admin.productImageShow',
          component: () => import('../views/products/ProductImageShow.vue'),
          props: true,
        },
        {
          path: 'order',
          name: 'admin.orderIndex',
          component: () => import('../views/orders/OrderIndex.vue'),
          props: true,
        },
        {
          path: 'order/details',
          name: 'admin.orderDetails',
          component: () => import('../views/orders/OrderDetail.vue'),
          props: true,
        },
        {
          path: 'users',
          name: 'admin.userIndex',
          component: () => import('../views/users/UserIndex.vue'),
          props: true,
        },
        {
          path: 'users/:id',
          name: 'admin.userDetail',
          component: () => import('../views/users/UserDetailDashboard.vue'),
          props: true,
        },
      ]
    },
    {
      path: '/dashboard/menu',
      name:'admin.menu',
      component: () => import('@/views/dashboard/MenuDashboard.vue'),
    },
    {
      path: '/forgot-password',
      name: 'forgotPassword',
      component: () => import('@/views/auth/ForgotPassword.vue'),
    },
    {
      path: '/password-reset/:token',
      name: 'resetPassword',
      component: () => import('@/views/auth/ResetPassword.vue'),
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      component: Forbidden,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFound,
    },
    // {
    //   path: 'user/:id',
    //   name: 'userDetail',
    //   component: () => import('../views/users/UserDetailDashboard.vue'),
    // },
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0  }
  },
})

router.beforeEach(async (to, from, next)=>{
  const authStore = useAuthStore()  
  
  if(authStore.token[0]){
    await authStore.getRole()
  }

  if(to.meta.requiresRole && authStore.role !== 'admin'){

    next('/forbidden')
  }
  else if(to.meta.authenticated && authStore.user) {     
    next('/')
  }
  else if(to.meta.requiresAuth && !authStore.user) {    
    next({ path: '/login'})
  }else {
    next();
  }
  
})

router.beforeResolve( (to, from, next) => {

  if(to.name){
    nProgress.start()
  }

  next()
})

router.afterEach( (to, from) => {

  nprogress.done()
})




export default router
