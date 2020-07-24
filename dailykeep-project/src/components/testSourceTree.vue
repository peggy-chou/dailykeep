<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    // demo ajax
    this.$http({
      method: 'post',
      url: '/open/v1/login',
      params: {
        username: 'manager',
        password: ''
      }
    })
    .then( res => {
      console.log(res.data)
    })

    this.$http({
      method: 'post',
      url: '/open/v1/login',
      params: {
        username: 'admin',
        password: ''
      }
    })
    .then( res => {
      console.log(res.data)
    })

    // vlan
    this.$http({
      method: 'post',
      url: '/open/v1/vlans',
      params: {
        id: 100,
        name: 'vlan100'
      }
    })
    .then( res => {
      console.log(res.data)
    })

    this.$http({
      method: 'post',
      url: '/open/v1/vlans',
      params: {
        id: 100,
        name: 'vlan100'
      }
    })
    .then( res => {
      console.log(res.data)
    })

    this.$http({
      method: 'put',
      url: '/open/v1/vlans',
      params: {
        id: 100,
        name: 'vlan100-2'
      }
    })
    .then( res => {
      console.log(res.data)
    })

    this.$http({
      method: 'delete',
      url: '/open/v1/vlans',
      params: {
        id: 100
      }
    })
    .then( res => {
      console.log(res.data)
    })

    // create
    this.$http.get('/open/v1/vlans').then( res => {
      console.log(res.data)
    })

    this.$http({
      method: 'get',
      url: '/open/v1/dot1dbaseconfig',
      params: {
        field: 'baseBridgeAddress'
      }
    })
    .then( res => {
      console.log(res.data)
    })

    this.$http({
      method: 'get',
      url: '/open/v1/dot1dbaseconfig'
    })
    .then( res => {
      console.log(res.data)
    })

    this.$http({
      method: 'get',
      url: '/open/v1/interfaces'
    })
    .then( res => {
      console.log(res.data)
    })

    this.$http({
      method: 'put',
      url: '/open/v1/interfaces',
      params: {
        interface: '0/1',
        adminMode: 'disabled'
      }
    })
    .then( res => {
      console.log(res.data)
    })

    this.$http({
      method: 'get',
      url: '/open/v1/interfaces',
      params: {
        interface: '0/1',
        field: 'adminMode,autoNegotiate,duplexMode'
      }
    })
    .then( res => {
      console.log(res.data)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
