<template>
  <div>
    <div class="row" id="headerBar">
      <div class="col-sm-6" id="pageTitle">
        <span class="pageTitleStyle">
          <div v-if="pageTitle">{{pageTitle}}</div>
          <slot v-else name="customizeTitle"></slot>
        </span>
      </div>
      <div class="col-sm-6" style="padding-right: 45px;" align="right">
      <slot name="controlPanel"></slot>
      </div>
    </div>
    <div class="alert alert-danger" role="alert" v-if="$root.errorMsg">
      <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
      {{$root.errorMsg}}
    </div>
    <loading v-if="$root.isLoading"></loading>
    <div id="contentPanel" v-else>
      <slot name="middlePanel"></slot>
      <slot name="bottomPanel"></slot>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Loading from "./Loading.vue"
  export default {
    props:{
      pageTitle: String,
      default: null,
    },
    components: {
      Loading,
    }
  }
</script>

<style>
#contentPanel
{
  padding-top: 20px;
}

#headerBar
{
  border-bottom: 1px solid #ccc;
  padding: 20px 0px 10px 0px;
  display: flex;
  align-items:center;
}

.pageTitleStyle {
  font-size: 18px;
  font-weight: bold;
}
</style>
