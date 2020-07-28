<template>
  <div id="app">
    <router-link :to="{name: 'HelloWorld'}" >hello</router-link>
    <router-link :to="{name: 'pomodoro'}" >pomodoro-2</router-link>
    <router-link :to="{name: 'weather'}" >local weather</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    routerPush(routerName) {
      this.$router.push({
        name: routerName
      })    
    }
  },
  watch: {
    $route(to, from) {
    }
},
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
