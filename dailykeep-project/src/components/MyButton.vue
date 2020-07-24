<template>
  <a href="#" class="btn btn-primary" role="button"
    v-on:click="clickButton"
    v-bind:class="{disabled: !usable}">
    <slot></slot>
  </a>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  props: {
    usable: Boolean,
  },
  methods: {
    clickButton () {
      this.$emit('click')
    },
  },
}

</script>

<style>

</style>
