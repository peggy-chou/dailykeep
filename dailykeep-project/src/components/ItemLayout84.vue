<template>
  <div class="item">
    <div class="col-md-8">
      <span>{{itemTitle}}</span>
    </div>
    <div class="col-md-4">
      <slot name="itemPannel"></slot>
    </div>
    <br>
  </div>
</template>

<script>
export default {
  props: {
    itemTitle: String
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