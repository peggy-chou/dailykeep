<template>
  <div>
    <button 
      type="button" 
      class="icoput-btn pb-2 btn no-box-shadow "
      v-on:click="reload">
      <svg focusable="false" width="16" height="16" viewBox="0 0 48 48">
        <path d="M24,37c-6.145,0-11.282-4.269-12.638-10H18L9,14L0,27h6.271C7.706,35.499,15.099,42,24,42c2.596,0,5.059-0.564,7.29-1.557l-2.897-4.221C27.019,36.717,25.544,37,24,37z M41.729,21C40.294,12.501,32.901,6,24,6c-2.607,0-5.08,0.569-7.319,1.571l2.895,4.218C20.959,11.287,22.444,11,24,11c6.145,0,11.282,4.269,12.638,10H30l8.615,12.443l0.361,0.525c0-0.001,0.001-0.002,0.001-0.002L39,34l9-13H41.729z"></path>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {},
  methods : {
    reload() {
      this.$emit("reload")
    },
  }
}
</script>

<style>
.no-box-shadow {
  box-shadow : 0 0px !important;
}
</style>