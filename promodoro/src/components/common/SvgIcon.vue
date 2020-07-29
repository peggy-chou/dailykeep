<template> 
  <svg :class="svgClass" :style="{ width: widthNum+'px', height: heightNum+'px' }" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg> 
</template> 

<script>
export default {
  name: "svg-icon",
  props: {
    iconClass: { 
      type: String, 
      required: true 
    },
    className: { 
      type: String 
    },
    widthNum: {
      type: Number
    },
    heightNum: {
      type: Number
    },
  },
  computed: {
    iconName() {
      return `#${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className;
      } else {
        return "svg-icon";
      }
    }
  }
};
</script> 

<style scoped>
.svg-icon {
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>