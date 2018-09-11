import Vue from 'vue'
import Router from 'vue-router'
import Teacher from "./views/Teacher.vue";

Vue.use(Router)

var router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'main',
    //   component: Teacher
    // },
    {
      path: '/',
      name: 'index',
      // meta: {
      //   requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      // },
      component: () => import('./views/Index.vue'),
      children:[
        {path:'', component: () => import('./views/Project.vue')},
        {path:'project', component: () => import('./views/Project.vue')},
        {path:'section', component: () => import('./views/ProjectSection.vue')},
        // {path:'detail/:id',component:resolve=>require(['./views/Teacher'],resolve)}
      ]
    },
    {
      path: '/embarkLogin',
      name: 'embarkLogin',
      // meta: {
      //   requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      // },
      component: () => import('./views/Login.vue'),
    },
    // {
    //   path: '/index',
    //   name: 'index',
    //   component: () => import('./views/Index.vue'),
    //   children:[
    //     {path:'project', component: () => import('./views/Project.vue')},
    //     {path:'section', component: () => import('./views/ProjectSection.vue')},
    //     // {path:'detail/:id',component:resolve=>require(['./views/Teacher'],resolve)}
    //   ]
    // },
    {
      path: '/teacher',
      // meta: {
      //   requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      // },
      component: () => import('./views/Teacher.vue'),
      // beforeEnter: (to, from, next) => {
      //   let account = sessionStorage.getItem('account')
      //   // next()
      // },
      children:[
        {path:'', component: () => import('./views/Work.vue')},
        {path:'work', component: () => import('./views/Work.vue')},
        {path:'student', component: () => import('./views/Student.vue')},
        // {path:'detail/:id',component:resolve=>require(['./views/Teacher'],resolve)}
      ]
    },
  ],
})
export default router;
router.beforeEach(function (to,from,next) {
    const user = sessionStorage.getItem('user')
    if(user){
      if(to.path=='/embarkLogin'){ //如果是登录页面路径，就直接next()
        next();
      }else {
        next();
      }
    }else {
      if(to.path=='/embarkLogin'){ //如果是登录页面路径，就直接next()
        next();
      } else { //不然就跳转到登录；
        next('/embarkLogin');
      }
    }
})
