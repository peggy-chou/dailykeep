<template>
  <div>
    <div>
      <button 
        class="accordion" 
        v-on:click="click()"
        v-model="accordionButton"
        v-bind:class="{active: isButtonActive}"
        v-bind:disabled="isDisabled">
        {{ title }}
      </button>
      <div class="panel nomargin" v-bind:class="'maxHeight:' + panelMaxHeight + 'px;'">
        <div v-if="isButtonActive">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isButtonActive: false,
      accordionButton: {
        type: {}
      }
    }
  },
  props: {
    title: String,
    expandId: Number,
    panelMaxHeight: {
      type: Number,
      default: 100
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    click() {
      this.isButtonActive = !this.isButtonActive
      /* Emit: 
         arg[0], isButtonActive - if the button is active means the 
                                  accordion is also expand.
         arg[1], expandId - expandId is used if there are more than 1
                            accordion occurred; to record the current
                            accordion. */
      this.$emit('isExpand', this.isButtonActive, this.expandId)
    }
  }
}
</script>

<style>
button.accordion {
    background-color: #9c8a7b;
    color: white;
    cursor: pointer;
    padding: 15px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 14px;
    transition: 0.2s;
}

button.accordion:disabled {
    background-color: #d5d5d5;
    color: rgba(35, 35, 35, 0.2);
}

button.accordion:disabled:hover {
    background-color: #9c9c9c;
    color: white;
}

button.accordion.active {
    background-color: #6e5b52;
    color: white;
    font-weight: bold;
}

button.accordion:hover {
    background-color: #9fb848;
    font-weight: bold;
    color: white;
}

button.accordion:after {
    content: '\002B';
    color: #777;
    font-weight: bold;
    float: right;
}

button.accordion.active:after {
    content: "\2212";
}

div.panel {
    background-color: white;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
}
</style>