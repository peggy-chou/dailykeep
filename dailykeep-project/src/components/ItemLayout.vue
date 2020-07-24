<template>
  <div class="item row">
    <div v-bind:class="'col-md-' + colFirst">
      <span>{{itemTitle}}</span>
    </div>
    <div v-bind:class="'col-md-' + colSec">
      <slot name="itemPannel"></slot>
    </div>
    <br>
  </div>
</template>

<script>
export default {
  props: {
    itemTitle: String,
    colFirst: {
      default: 3,
      type: Number,
    },
    colSec: {
      default: 9,
      type: Number,
    },
  }
}
</script>

<style>
.item {
  padding-left:   20px;
  padding-top:    10px;
  padding-bottom: 10px;
}
</style>
