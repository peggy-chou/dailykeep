<template>
  <div>
    <div class="number-input">
      <button 
        class="count"
        v-on:click="valueMinus()"
        v-bind:disabled="buttonDisable||lockInput"
        v-bind:style="{ width: height+'px', height: height+'px'}"></button>
      <input 
        type="text"
        name="valueToSet"
        v-model="valueToSet"
        v-on:keypress='validateInput($event.target.value)'
        v-bind:placeholder="placeholder"
        v-bind:disabled="lockInput"
        v-bind:style="{ width: width+'px', height: height+'px', }"
        v-bind:class="(errors.has('valueToSet'))?'number-input-error':''"
        v-validate.initial="rule+'|integer'"
        v-on:input="updateValue($event.target.value)">
      <button
        class="plus count"
        v-on:click="valueAdd()"
        v-bind:disabled="buttonDisable||lockInput"
        v-bind:style="{ width: height+'px', height: height+'px'}"></button>
    </div>
    <div class="errMsgNum" v-if="errors.has('valueToSet')">
      <span v-show="errors.has('valueToSet')" class="input-error">{{ errors.first('valueToSet') }}</span>
    </div>
  </div>
</template>

<script>

const regex = /^[-+]?\d+$/;

export default {
  data: function () {
    return {
      valueToSet: this.value,
      lockBtn: {
        type: Boolean,
        default: false,
      },
    }
  },
  props: {
    height: {
      type: Number,
      default: 30,
    },
    width: {
      type: Number,
      default: 75,
    },
    placeholder: {
      type: String,
      default: ''
    },
    rule: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    value: {
      type: [String,Number],
      default: '',
    },
    lockInput: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    updateValue(val) {
      if (val == '') {
        this.valueToSet = val
        this.lockBtn = false
      } 
      else {
        this.valueToSet = (this.validateInput(val))?parseInt(val):val
      }
    },
    valueAdd() {
      this.valueToSet = (this.valueToSet != '')?parseInt(this.valueToSet) + 1:parseInt(this.valueToSet + 1)
    },
    valueMinus() {
      this.valueToSet = (this.valueToSet != '')?parseInt(this.valueToSet) - 1:parseInt(this.valueToSet - 1)
    },
    validateInput(evt) {
      if (regex.test(evt)){
        this.lockBtn = false
        return true
      }
      else {
        this.lockBtn = true
        return false
      }
    },
  },    
  computed:{
    buttonDisable() {
      return (this.lockBtn == true)?true:false
    },
  },
  watch: {
    valueToSet: function() {
      setTimeout(() => {
        this.$emit('input', this.name, this.valueToSet, this.errors.has('valueToSet'))
      }, 0)
    },
    value: function() {
      this.valueToSet = this.value
    },
  }
}
</script>

<style>
button.count {
  border-radius: 1px;
  font-weight: bold;
  font-size: 14px;
}
button.count.disabled,
button.count:disabled {
  opacity: 0.4;
  box-shadow: 0 1px 0 rgba(35, 35, 35, 0.2);
}
button.count:hover,
button.count.hover {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.5), 0 0 0 3px rgba(13, 103, 203, 0.5);
}
input[type="number"] {
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;
}
input[type=text]::-webkit-inner-spin-button,
input[type=text]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
.number-input {
  flex-wrap: wrap;
  display: inline-flex;
}
.number-input,
.number-input * {
  box-sizing: border-box;
}
.number-input button {
  outline:none;
  -webkit-appearance: none;
  background-color: #ffffff;
  border: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0;
  position: relative;
}
.number-input button:before,
.number-input button:after {
  display: inline-block;
  position: absolute;
  content: '';
  width: 1rem;
  height: 2px;
  background-color: #555555;
  transform: translate(-50%, -50%);
}

@media screen and(-ms-high-contrast:active),(-ms-high-contrast:none){
  /* for IE10, IE11 */
  .number-input {
    display: inline-block;
  }
  .number-input button:before,
  .number-input button:after {
    margin-top: 14px;
    margin-left: 6px;
  }
  .number-input button {
    vertical-align: top;
  }
  .number-input input[type=text] {
    line-height: 1px;
    vertical-align: top;
  }
}

@supports (-ms-ime-align:auto) {
  /* for Edge */
  .number-input {
    display: inline-block;
  }
  .number-input button:before,
  .number-input button:after {
    top: 14px;
  } 
  .number-input button {
    vertical-align: top;
  }
  .number-input input[type=text] {
    line-height: 1px;
    vertical-align: top;
  }
}

.number-input button.plus:after {
  transform: translate(-50%, -50%) rotate(90deg);
}
.number-input input[type=text] {
  max-width: 194px;
  padding: 9px;
  border: solid rgb(238, 238, 238);
  border-width: 0 2px;
  text-align: center;
}
.number-input-error  {
  box-shadow: 0 1px 2px rgba(112, 112, 112, 0.48) inset;
  border-color: red !important;
  border-width: 2px !important;
  background-color: #fafafa;
  color: #ff3860;
}
</style>