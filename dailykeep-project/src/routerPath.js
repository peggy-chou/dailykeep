import Vue from 'vue'
import App from './App'
import * as components from './pages'

// special pages
const Login = require("./pages/Login.vue")
const Page404 = require("./pages/Page404.vue")
const TestApis = require("./pages/TestApis.vue")

var routes= [
  {
    name: 'home',
    path: '/',
    component: App,
    redirect: '/home' + '/:ver?',
    children: [],
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'page404',
    path: '/page404',
    component: Page404
  },
  {
    name: 'testapis',
    path: '/testapis',
    component: TestApis
  },
  {
    path: '*',
    redirect: '/',
  }
]

// Dynamic to add child pages
for (let i in components) {
  let page = {
    name: i.toLowerCase(),
    path: '/' + i.toLowerCase() + '/:pageNum?',
    component: components[i],
    children: [],
  }
  routes[0].children.push(page)
}

module.exports = routes
