<template>
<span>
  <button
    class="btn btn-primary"
    v-bind:type="applyType"
    v-on:click="notifyToApply" 
    v-bind:disabled="lockApply">{{$t('button.apply')}}</button>
  <button 
    class="btn btn-default" 
    type="button"
    v-on:click="notifyToCancel"
    v-bind:disabled="lockCancel">{{$t('button.cancel')}}</button> 
</span>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props:{
    applyType: {
      type: String,
      default: "button",
    },
    lockCancel: {
      type: Boolean,
      default: null,
    },
    lockApply: {
      type: Boolean,
      default: null,
    }
  },
  created() {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 27) {
        this.notifyToCancel()
      }
      else if (e.keyCode == 13) {
        if(this.lockApply != null) {
          if (!this.lockApply)
            this.notifyToApply()
        }
        else
          this.notifyToApply()
      }
    });
  },
  methods : {
    notifyToApply() {
      if ((this.lockApply != null)&&(!this.lockApply))
        this.$emit("apply")
    },
    notifyToCancel() {
      if (!this.lockCancel)
        this.$emit("cancel")
    },
  },
}
</script>

<style>
</style>
