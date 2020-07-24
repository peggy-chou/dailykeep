<template>
  <div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th width="30px" v-if="checkbox">
            <input
              v-if="checkboxAll"
              type="checkbox"
              v-bind:checked="controlSelectAll"
              v-on:change="controlSupervisor()"
              v-bind:disabled="disableCheckbox"
              ref="supervisor">
          </th>
          <slot name="head"></slot>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(n, index) in nums" v-bind:class="{active: isChecked[index]}">
          <td v-if="checkbox">
            <input type="checkbox"
              v-model="isChecked[index]"
              v-bind:disabled="isDisabled(index) || disableCheckbox"
              v-on:click="checked($event, index, oneCheck)">
          </td>
          <slot name="body" :index="index" :isChecked="isChecked[index]"></slot>
        </tr>
      </tbody>
      <tfoot></tfoot>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isChecked: {},
    }
  },
  props:{
    nums: Number,
    dbChanges: {
      default:Array,
      type:Array,
    },
    checkbox: {
      default: true,
      type: Boolean,
    },
    checkboxAll:{
      default: true,
      type: Boolean,
    },
    oneCheck: {
      default: false,
      type: Boolean,
    },
    disableCheckbox: {
      default: false,
      type: Boolean,
    }
  },
  computed: {
    controlSelectAll() { // calculate modify number to control selectAll checkbox
      let select = _.countBy(_.values(this.isChecked), Boolean).true
      if (!select) {
        select = 0
      }
      if (this.$refs.supervisor) {
        this.$refs.supervisor.indeterminate = (select < this.nums && select > 0)
      }
      return (select == this.nums && this.nums > 0)
    }
  },
  methods : {
    checked (event, index, oneCheck) {
      if(oneCheck){
        for (let num = 0; num < this.nums; num++) {
          if(index != num)
            this.isChecked[num] = false
        }
      }
      this.$emit('isChecked', index, event.target.checked)
    },
    isDisabled(index) {
      return this.dbChanges.some((current) => (index==current))

    },
    controlSupervisor() {
      let isChecked = !this.controlSelectAll
      for (let num = 0; num < this.nums; num++) {
        this.isChecked[num] = isChecked
        this.$emit('isChecked', num, isChecked)
      }
    },
    initChecks(){
      this.isChecked = {}
      for (let i=0; i<this.nums; i++) {
        this.$set(this.isChecked, i, false)
      }
    }
  },
  created(){
    this.initChecks()
  },
  watch:{
    nums(){
      this.initChecks()
    }
  }
}
</script>

<style>

th.align-center {
  text-align: center;
}

td.align-center {
  text-align: center;
}

.table thead {
  font-size: 14px;
  font-weight: bold;
  background-color: #6e5b52;
  color: white;
}

.table > thead > tr > th,
.table > tbody > tr > th,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > tbody > tr > td,
.table > tfoot > tr > td {
  padding: 0.8vw;
}

.table-hover th {
  border: 1px solid white;
}

.table-hover > tbody > tr.active:hover > td,
.table-hover > tbody > tr:hover {
  background-color: #e8ce53;
}

.table-hover > tbody > tr > td[rowspan] {
  pointer-events: none;
  background-color: #ffffff; 
}

.table-hover > tbody > tr > td.active:hover,
.table-hover > tbody > tr > th.active:hover,
.table-hover > tbody > tr.active > td,
.table-hover > tbody > tr:hover > .active,
.table-hover > tbody > tr.active:hover > th {
  background-color: #f5eeeb;
}
</style>
