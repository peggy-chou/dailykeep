<template>
  <div>
  <h1 style="color:red;">{{$t("general.notFound404")}}</h1>
  <button
    v-on:click="backHome">{{ $t('button.home') }}
  </button>
  </div>
</template>

<script>
  export default {
    methods:{
      backHome(){
        this.$router.push({
          path: '/',
        })
      }
    }
  }

</script>

<style scoped>

</style>