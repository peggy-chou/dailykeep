<template>
  <div class="cell_contanier">
    <div class="cell_left">    
        {{headerName | capitalize }}
    </div>
    <div class="cell_right">
        <div class="cell_right_up">
          <button type="button" class="btn btn-default btn-xs noBorder" aria-label="Right Align" v-on:click="sort_child(sortName,'up')">
            <span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
          </button>
        </div>
        <div class="cell_right_down">
          <button type="button" class="btn btn-default btn-xs noBorder" aria-label="Right Align" v-on:click="sort_child(sortName, 'down')">
            <span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
          </button>
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
  props:{
    headerName:String,
    sortName:String,
  },
  methods : {
    sort_child(sort_name, sort_rule) {
      this.$emit("sort",sort_name,sort_rule)
    }
  },
}
</script>


<style>
.noBorder {
  border:0px;
}

.cell_contanier {
  display: flex;
  align-items: center;
}

.cell_right {
  display: flex;
  margin-left: 10px;
  flex-direction: column;
}

.cell_left {
  flex: 1;
}
</style>