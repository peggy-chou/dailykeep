<template>
  <span v-if="!isEdit">
    <button
      v-bind:disabled="lockEdit"
      role="button" 
      class="btn btn-primary"
      v-bind:class="{disabled: lockEdit}"
      v-on:click="notifyButtonEdit()">
      {{$t('button.edit')}}</button>
  </span>
  <span v-else>
    <apply-button
      v-bind:disabled="lockEdit"
      v-on:apply="notifyButtonApply()"
      v-on:cancel="notifyButtonCancel()"
      v-bind:lockApply="lockApply">
    </apply-button>
  </span>
</template>

<script>
import ApplyButton from '../components/ApplyButton'

export default {
  data() {
    return {
    }
  },
  components: {
    ApplyButton,
  },
  props:{
    isEdit: Boolean,
    lockEdit: {
      type: Boolean,
      default: null,
    },
    lockApply: {
      type: Boolean,
      default: null,
    },
  },
  created() {
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
  },
}
</script>

<style>

</style>