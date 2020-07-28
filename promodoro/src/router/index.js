import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PomodoroClock from '@/components/PomodoroClock'
import Pomodoro from '@/components/Pomodoro'
import Weather from '@/components/Weather'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      
    },
    {
      path: '/pomodoroclock',
      name: 'pomodoroclock',
      component: PomodoroClock
    },
    {
      path: '/pomodoro',
      name: 'pomodoro',
      component: Pomodoro
    },
    {
      path: '/weather',
      name: 'weather',
      component: Weather
    }
  ]
})
