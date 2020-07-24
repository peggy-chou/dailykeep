<template>
<div id="drop_down" v-show="statusText!==''" class="dropdown">
  <div class="dropdown-status p-4" v-outside-click="close">
    <div style="display: inline; float: left;">
      <img src="../../static/images/user.png" width="25px;">
    </div>
    <a class="px-3" style="display: inline;" v-bind:title="statusText" v-on:click="toggle">
      {{statusText}}
      <p class="collapse-icon collapse-icon-down-reverse ml-auto mt-1 mb-0 float-right"></p>
    </a>
    <div v-show="isShow" class="dropdown-options">
      <div
        v-for="(option, statusId) in options"
        v-show="option.isShow"
        class="dropdown-option px-7 py-5"
        v-on:click.stop="returnStatus(option, statusId)">
        <p class="m-0 p-0">{{ option.optionText }}</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
Vue.directive('outside-click', {
  bind: function (el, binding, vnode) {
    function clickHandler(e) {
      if (el.contains(e.target) && e.keyCode !== 27) {
        return false
      }
      if (binding.expression) {
        binding.value(e)
      }
    }
    el.vueOutsideClick = clickHandler
    document.addEventListener('click', clickHandler)
    document.addEventListener('keyup', clickHandler, false)
  },
  unbind: function (el, binding, vnode) {
    document.removeEventListener('click', el.vueOutsideClick)
    document.removeEventListener('keyup', el.vueOutsideClick)
    delete el.vueOutsideClick
  }
})

export default {
  data() {
    return {
      isShow: false
    }
  },
  props:{
    topTitle: String,
    currentStatus: String,
    options: Object
    // options object format /////////
    // options: {
    //   'A': {
    //     statusText: 'statusTextA',
    //     optionText: 'optTextA',
    //     isShow: true
    //   },
    //   'B': {
    //     statusText: 'statusTextB',
    //     optionText: 'optTextB',
    //     isShow: true
    //   }
    // }
    //////////////////////////////////
  },
  created() {
  },
  computed: {
    statusText() {
      return this.topTitle === undefined ? this.options[this.currentStatus].statusText : this.topTitle 
    }
  },
  methods : {
    toggle() {
      this.isShow = !this.isShow
    },
    close() {
      this.isShow = false
    },
    returnStatus(option, statusId) {
      this.close()
      this.$emit('returnDropdownStatus', statusId)
    }
  }
}
</script>
