// // The Vue build version to load with the `import` command
// // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import router from './router'

// Vue.config.productionTip = false

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })

// 
import Vue from 'vue'
import App from './App'

import axios from 'axios'
import qs from 'qs'
import VueRouter from 'vue-router'
// import VeeValidate from 'vee-validate'
import Paginate from 'vuejs-paginate'
import Lodash from 'lodash'
// import "bootstrap/dist/css/bootstrap.min.css"

import * as components from './pages'
// import * as validates from './validates'

Vue.prototype.$http = axios
Vue.prototype.$bus = new Vue()

// array transform array[1,2,3,4] --> array%5B0%5D=1&array%5B1%5D=2&array%5B2%5D=3&array%5B3%5D=4
axios.defaults.paramsSerializer = function (params) {
  return qs.stringify(params, {arrayFormat: 'indices'});
};
axios.interceptors.request.use(function(config) {
  //set cancel token
  config.cancelToken = window.currentSource && window.currentSource.token
  // Do something before request is sent
  if (app.loadEnable) {
    app.isLoading = true
  }
  // Add method to params
  if (config.method && config.method !== 'get') {
    config.params['method'] = config.method
  }
  return config;
}, function(error) {
  // Do something with request error
  return Promise.reject(error);
});


axios.interceptors.response.use(function(response) {
  // Do something with response data
  app.isLoading = false
  return response;
}, function(error) {
  // Do something with response error
  if (error && error.response) {
    // Unauthorized
    if (error.response.status == 401) {
      router.push('/login')
    } else if (error.response.status == 404) {
      router.push('/page404')
    } else if (error.response.data.status) {
      app.errorMsg = error.response.data.status.msg
      app.errorMsg += '! ' + error.response.data.status.more_info
      app.errorData = error.response.data
    } else {
      app.errorMsg = error.response.status + '! ' + error.response.statusText
    }
  }

  app.isLoading = false
  return Promise.reject(error);
});

Vue.prototype.$http.each = (requests) => {
  return new Promise( async (resolve, reject) => {
    try {
      let responses = [];

      for (let req of requests) {
        responses.push(await axios(req));
      }
      resolve(responses);
    }
    catch (err) {
      reject(err);
    }
  });
};

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   render: h => h(App)
// })

Vue.use(VueRouter)
// Vue.use(VeeValidate)
Vue.use(Paginate)
Vue.use(Lodash)

// languages

import en from './i18n/en.js'

var locales = {
  en: en,
}

Vue.use(require('vue-i18n'))

// set lang
Vue.config.lang = 'en'

// set locales
Object.keys(locales).forEach(function(lang) {
  Vue.locale(lang, locales[lang])
})


// register
Vue.filter('capitalize', function(str) {
  // return value
  return str.charAt(0).toUpperCase() + str.slice(1)
})

var routerPath = require("./routerPath")
const router = new VueRouter({
  mode: 'history',
  routes: routerPath,
})

var disabledPage = require('./disabledPage.js')

Vue.prototype.INPUT_BOX_COMMON_STYLE = {
  'box-shadow': '0 1px 2px rgba(112, 112, 112, 0.48) inset',
  'border-top': 'rgba(112, 112, 112, 0.66)',
  'border-bottom': 'rgba(112, 112, 112, 0.12)',
  'border-left': 'rgba(112, 112, 112, 0.38)',
  'border-right': 'rgba(112, 112, 112, 0.38)',
  'background-color': '#fafafa',
  'font-size': '14px',
  'height': '34px',
  'padding': '9px'
}
Vue.prototype.INPUT_BOX_ERROR_STYLE = {
  'box-shadow': '0 1px 2px rgba(112, 112, 112, 0.48) inset',
  'border-color': 'red',
  'background-color': '#fafafa',
  'color': '#ff3860',
  'font-size': '14px',
  'height': '34px',
  'padding': '9px'
}
Vue.prototype.INPUT_BOX_DISABLE_STYLE = {
  'box-shadow' : 'None',
  'background-color': '#eeeeee',
  'border-color': '#d5d5d5',
  'color': 'rgba(35, 35, 35, 0.3)',
  'font-size': '14px',
  'height': '34px',
  'padding': '9px'
}

router.beforeEach((to, from, next) => {

  // cancel request before change route
  const source = window.currentSource
  source && source.cancel && source.cancel('Cancel last request.')
  window.currentSource = axios.CancelToken.source()

  let devPhase = 32
  if(Vue.prototype.disablePage===undefined){
    if(to.path!=='/login'){

      if(devPhase==31){
        Vue.prototype.disablePage=disabledPage.disabledPage
      }else{
        Vue.prototype.disablePage=[]
      }
      if(Vue.prototype.disablePage.find((value)=>{return value==to.fullPath.split('/')[1]})==undefined || to.path=='/hardware'){
        next()
      }else{
        next('/')
      }
    }else{
       next()
    }
  }else{
    if(Vue.prototype.disablePage.find((value)=>{return value==to.fullPath.split('/')[1]})==undefined || to.path=='/hardware' || to.path!=='/login'){
      next()
    }else{
      next('/')
    }
  }
})

import * as RegexpRules from './regexpRule'
const REGISTRY_API = '/open/v1/registry'
const app = new Vue({
  data: {
    errorMsg: "",
    isLoading: false,
    loadEnable: true,
    currentMachineType: ''
  },
  router,
  methods: {
    clearErrorMsg () {
      this.errorMsg = "";
    },
    inputBoxStyle(errorOccurred, disableFlag) {
      if (disableFlag) {
        return this.INPUT_BOX_DISABLE_STYLE
      }
      else {
        return (errorOccurred) ? this.INPUT_BOX_ERROR_STYLE : this.INPUT_BOX_COMMON_STYLE
      }
    },
    parseMachineModel(string) {
      switch (string) {
        case 'ET-7648BRA-FOS':
          return this.$t('general.pswitch2048t')
          break;
        case 'ET-7648BFRA-FOS':
          return this.$t('general.pswitch2048p')
          break;
        case 'ET-9032BF-FOS':
          return this.$t('general.pswitch4032p')
          break;
        default:
          return string;
          break;
      }
    },
    checkMachineType() {
      this.$http({
        method: 'get',
        url: REGISTRY_API,
      })
      .then( res => {
        this.currentMachineType = res.data.machineType
      })
      .catch( err => {
        this.currentMachineType = ''
      })
    },
    checkPhysicalPortValid(port) {
      this.checkMachineType()
      if(this.currentMachineType==='ET-9032BF-FOS') {
        let regexpPort = RegexpRules.port128Patt.test(port)? port: undefined
        return regexpPort
      }
      else if(this.currentMachineType==='ET-7648BRA-FOS' || this.currentMachineType==='ET-7648BFRA-FOS') {
        let regexpPort = RegexpRules.port78Patt.test(port)? port: undefined
        return regexpPort
      }
    },
    checkLagPortValid(port) {
      let regexpPort = RegexpRules.lagPatt.test(port)? port: undefined
      return regexpPort
    }
  },
}).$mount('#app')
router.afterEach((to, from) => {
  app.errorMsg = ""
})


Vue.prototype.clearErrorMsg = app.clearErrorMsg
Vue.prototype.inputBoxStyle = app.inputBoxStyle
Vue.prototype.parseMachineModel = app.parseMachineModel
Vue.prototype.checkPhysicalPortValid = app.checkPhysicalPortValid
Vue.prototype.checkLagPortValid = app.checkLagPortValid

// for(let key in validates){
//   VeeValidate.Validator.extend(key.replace(/Validator/, ''), validates[key])
// }

// 