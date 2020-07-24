<template>
  <form v-on:submit.prevent="validateBeforeSubmit()">
    <transition name="modal" >
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container" v-bind:style="{ width: width+'px', height: height+'px'}">
            <div class="modal-header">
              <span class="pagetitle text-left col-md-12">{{headerName}}</span>
            </div>
            <div class="modal-body" v-bind:style="{height: (height-125) +'px'}">
              <slot name="modalBody"></slot>
            </div>
            <div class="modal-footer">
              <button
                v-show="okBtn"
                class="btn btn-primary btn-sm dialogBtn"
                type="submit"
                v-bind:disabled="lockOk"
                ref="okBtn">{{$t('button.ok')}}</button>
              <button
                v-show="cancelBtn"
                class="btn btn-default btn-sm dialogBtn"
                type="button"
                v-on:click="$emit('close')">{{$t('button.cancel')}}</button>
              <div v-on:focus="(Object.keys(refs).length!=0)?refs.focusFirst.focus():foucsBtn()" tabindex="0"></div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </form>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  props: {
    headerName: String,
    height: Number,
    width: {
      type: Number,
      default: 350,
    },
    okBtn: {
      type: Boolean,
      default: true,
    },
    cancelBtn: {
      type: Boolean,
      default: true,
    },
    validator: {
      type: Object,
      default: null,
    },
    refs: {
      type: Object,
      default: Object,
    },
    lockOk: {
      type: Boolean,
      default: null,
    }
  },
  created() {
    document.addEventListener("keydown", this.keydownHandler);
  },
  mounted(){
    this.$bus.$on("keydown", (e) => {
      if (e.keyCode == 27) {
        this.$emit('close')
      }
    })
    if (this.refs && this.refs.focusFirst) {
      this.refs.focusFirst.focus()
    }
    document.body.classList.add("stop-scroll")
    this.$on('close', ()=>{
      document.body.classList.remove("stop-scroll")
      this.$bus.$off('keydown')
    })
  },
  methods:{
    deliever() {
      this.$emit("setting")
      this.$emit("close")
    },
    validateBeforeSubmit() {
      if (this.validator != null) {
        this.validator.validateAll().then(success => {
          if (!success)
            return;
          else
            this.deliever()
        });
      }
      else {
        this.deliever()
      }
    },
    foucsBtn() {
      this.$refs.okBtn.focus()
    },
    keydownHandler(e) {
      if (e.keyCode == 27) {
        this.$emit('close')
      }
      else if (e.keyCode == 13) {
        if(this.lockOk != null) {
          if (!this.lockOk)
            this.validateBeforeSubmit()
        }
        else
          this.validateBeforeSubmit()
      }
    }
  },
  destroyed() {
    document.removeEventListener('keydown', this.keydownHandler)
  }
}
</script>

<style type="text/css">
.stop-scroll{
  overflow: hidden;
}

.dialogBtn {
  width: 112px;
  height: 34px;
  padding-left: 28px;
  padding-right: 28px;
}

.input.is-active, .input:active,
.input:focus,
.textarea.is-active,
.textarea:active,
.textarea:focus {
    border-color: #00d1b2;
    outline: none;
}

/* dialog */
.modal-mask {
  position: fixed;
  z-index: 2017;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .7);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  margin: 0px auto;
  padding: 0px;
  background-color: #F4F4F4;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  max-height: 100%;   
  overflow-y: auto; 
}

.modal-header {
  width: 100%;
  background-color: #EEE;
  margin-bottom: 16px;
  border-width: thin;
  padding: 10px;
  border: #9C9C9C;
  border-bottom-style: solid;
  color: #000;
}

.modal-body {
  margin: 0px;
  padding: 6px 20px;
}

.modal-footer {
  padding: 10px 20px;
}
</style>
