<template>
  <modal-dialog
    v-bind:headerName="headerName"
    v-bind:width="400"
    v-bind:height="215"
    v-on:close="$emit('close')"
    v-on:setting="$emit('setting')">
    <div slot="modalBody" class="delete-content">{{content}}</div>
  </modal-dialog>
</template>

<script>
import ModalDialog from "../components/ModalDialog"

export default {
  data() {
    return {
    }
  },
  props: {
    headerName: {
      default () {return this.$t('general.deleteConfirm')},
      type: String,
    },
    content: {
      default () {return this.$t('general.deleteAlert')},
      type: String,
    }
  },
  components: {
    ModalDialog,
  },
}
</script>

<style>
.delete-content {
  height: 60px;
  display: flex;
  text-align: left;
  /* align-items: center;
  justify-content: center; */
}
</style>