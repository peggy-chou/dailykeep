<template>
  <div v-if="!isEdit">
    <button 
      type="button"
      v-on:click="notifyButtonEdit()">
      <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
    </button>
  </div>
  <div v-else>
    <button 
      type="button"
      class="disableButton"
      v-on:click="notifyButtonApply()"
      v-bind:disabled="lockApply">
      <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
    </button>
    <button 
      type="button"
      v-on:click="notifyButtonCancel()">
      <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    isEdit: Boolean,
    lockApply: {
      type: Boolean,
      default: null,
    }
  },
  methods : {
    notifyButtonApply() {
      this.$emit("apply")
    },
    notifyButtonCancel() {
      this.$emit("cancel")
    },
    notifyButtonEdit() {
      this.$emit("edit")
    },
  }
}
</script>

<style>
.disableButton:disabled {
  background: #9F9F9F
}
</style>