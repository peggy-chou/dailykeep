<template>
  <div class="input-group" style="width:250px;padding-bottom:15px;">
    <input
      type="text"
      v-model="filterName"
      class="form-control"
      :placeholder="placeholder"
      v-on:keyup="notifyValue()"/>
    <span class="input-group-btn">
      <button
        type="submit"
        class="btn btn-primary"
        style="height:33.9px"
        v-on:click="notifySearchBtn()">
        <span class="glyphicon glyphicon-search"></span>
      </button>
    </span>
  </div>
</template>

<script>

export default {
  data() {
    return {
      filterName:'',
    }
  },
  props: {
    placeholder: String,
  },
  methods : {
    notifySearchBtn() {
      this.$emit("search", this.filterName)
    },
    notifyValue() {
      if(this.filterName=='') {
        this.$emit("nullItem")
      }
    },
  },
}
</script>