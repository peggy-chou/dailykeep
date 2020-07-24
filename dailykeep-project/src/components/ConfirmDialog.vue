<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="pagetitle col-md-12">{{ headerName }}</h5>
        </div>
        <div class="modal-body mb-5">
          {{content}}
        </div>
        <div class="modal-footer">
          <button 
            v-show="confirmBtn"
            type="submit" 
            class="btn btn-primary btn-sm dialogBtn"
            v-on:click="$emit('confirm')">{{$t('button.ok')}}</button>
          <button
            v-show="okBtn"
            class="btn btn-primary btn-sm dialogBtn"
            type="button"
            v-on:click="$emit('setting')">{{$t('button.ok')}}</button>
          <button
            v-show="cancelBtn"
            class="btn btn-default btn-sm dialogBtn"
            type="button"
            v-on:click="$emit('close')">{{$t('button.cancel')}}</button>
        </div>
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
    headerName: {
      default: 'Notice',
      type: String,
    },
    content: {
      type: String,
    },
    confirmBtn: {
      type: Boolean,
      default: true,
    },
    okBtn: {
      type: Boolean,
      default: false,
    },
    cancelBtn: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 27) {
        this.$emit('close')
      }
      else if (e.keyCode == 13) {
        this.$emit('confirm')
      }
    });
  },
}
</script>

<style type="text/css">
.modal-content {
  width: 20%;
  min-width: 380px;
  margin: 0px auto;
  transition: all .3s ease;
}
.modal-body {
  margin: 0;
}
</style>