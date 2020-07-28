import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PomodoroClock from '@/components/PomodoroClock'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/pomodoroclock',
      name: 'pomodoroclock',
      component: PomodoroClock
    }
  ]
})
