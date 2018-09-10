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
      component: () => import('./views/Index.vue'),
      children:[
        {path:'', component: () => import('./views/Project.vue')},
        {path:'project', component: () => import('./views/Project.vue')},
        {path:'section', component: () => import('./views/ProjectSection.vue')},
        // {path:'detail/:id',component:resolve=>require(['./views/Teacher'],resolve)}
      ]
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
    console.log(1,user)
    next();
  }else {
    console.log(2,user)
    window.location.href = 'http://localhost:8888/login.html'
  }
  // if(to.meta.auth){
  //     /*不为空*/
  //     if(sessionStorage.getItem('user')){
  //         next();
  //     }else{
  //         next('/login?redirect='+to.fullPath)
  //     }
  // }
  // else{
  //     next();
  // }
})
