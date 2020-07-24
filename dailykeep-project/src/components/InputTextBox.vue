<template>
  <div>
    <input 
      type="text"
      class="input-text-box"
      v-bind:class="boxWidth=='long' ? 'width-long':'width-short'"
      v-bind:value="content"
      v-bind:placeholder="placeholder"
      v-on:input="updateValue($event.target.value)" />
  </div>
</template>

<script>
export default {
  props: {
    boxWidth: {
      type: String,
      default: 'short'
    },
    content: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  methods: {
    updateValue(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style>
.input-text-box {
  font-size: 14px;
}

.width-long {
  width: 200px;
}

.width-short {
  width: 100px;
}
</style>