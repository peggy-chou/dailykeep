<template>
  <div class="layout-row cell-outter">
    <div
      class="cell title cell"
      v-bind:style="{flex: cellFirst}">
      <div>
        <b style="color:red" v-if="required">&#10033&nbsp</b>
        {{title}}</div>  
    </div>
    <div
      class="cell content"
      v-bind:style="{flex: cellSec + ' 0'}">
      <div slot name="cellModify">
        <slot name="cellModify">
          <span>{{content}}</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    title: String,
    content: String,
    required: {
      type: Boolean,
      default: false,
    },
    cellFirst: {
      type: Number,
      default: 25,
    },
    cellSec: {
      type: Number,
      default: 75,
    },
  },
}
</script>

<style>
.cell-outter{
  flex: 1;
}
.cell {
  text-align: left;
  font-weight: normal;
  display:flex;
  flex-shrink: 0;
  align-items:center;
}
.cell > div{
  flex: 1;
  border: 1px solid white;
  height: 100%;
  display:flex;
  align-items:center;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
}
.title {
  background-color: #efda81;
  font-weight: bold;
}

.content {
  background-color: #f9f6e3;
  overflow: hidden;
  word-break: break-word;
}
</style>
