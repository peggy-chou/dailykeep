<template>
<li class="sidebar-nav-item">
<!-- no subModule -->
  <router-link v-if="tmpItem.to && !disable" v-bind:to="tmpItem.to" class="sidebar-nav-link" v-bind:class="active" v-on:click.native="dynamicTitle(tmpItem)">
    {{ $t(tmpItem.title) }}
  </router-link>
<!-- have subModule -->
  <button v-if="!tmpItem.to && hasChildren" type="button" class="sidebar-nav-link" 
    data-toggle="collapse" v-bind:aria-expanded="open ? true : false" v-on:click="toggle(tmpItem)" v-on:child="child">
    {{ $t(tmpItem.title) }}
    <span class="collapse-icon collapse-icon-down-reverse ml-auto"></span>
  </button>
  <ul v-show="open" class="sidebar-nav-collapse">
    <tree-view v-for="item in tmpItem.children" v-bind:tmpItem="item" v-on:opened="opened" v-on:closed="closed" v-bind:openPage="openPage" v-bind:tree="tree" v-bind:closedPage="closedPage" v-on:child="child"></tree-view>
  </ul>
</li>
</template>

<script>
export default {
  name: 'TreeView',
  data() {
    return {
      open: false,
      pathName: false,
      disable: false,
      children: 0,
      hasChildren: true

    }
  },
  
  props: {
    tmpItem: Object,
    openPage: String,
    tree: Object,
    closedPage:Array,
  },
  created(){
    this.$emit("child",1)
    if(this.tmpItem.to){
      this.pathName='/'+this.tmpItem.to.name
      if(this.tmpItem.to.params){
        Object.keys( this.tmpItem.to.params).map((objectKey, index)=> {
          this.pathName+='/'+this.tmpItem.to.params[objectKey]
        })
      }
      this.pathName+='/'
      this.$set(this.tree,this.pathName,0)
      this.$watch(()=>{return this.tree[this.pathName]},(newVal)=>{
        if(newVal==1){
          this.$emit("opened")
        }else{
          this.$emit("closed")
        }
      })
    }
  },
  computed: {
    isOpenPage(){
      return (this.tmpItem.to)&&(this.pathName!==false)?(this.pathName.indexOf(this.openPage)>=0):false
    },
    active(){
      return (this.isOpenPage===true)?'active':''
    }
  },
  methods: {
    opened(){
      this.open=true;
      this.$emit("opened")
    },
    closed(){
      this.open=false;
      this.$emit("closed")
    },
    toggle() {
      this.open = !this.open
    },
    dynamicTitle(item) {
      document.title = this.$t(item.title) + this.$t('general.titleSuffix')
    },
    child(value){
      this.children+=value
      if(!this.tmpItem.to && this.children==0){
        this.hasChildren=false
        this.$emit("child",-1)
      }
    }
  },
  watch:{
    openPage(){
      if(this.isOpenPage==true && this.openPage!==''){
        this.$emit("opened")
      } 
    },
    closedPage(){
      if(this.closedPage!=undefined){
        if(this.tmpItem.to){
          if(this.closedPage.find((value)=>{return value==this.tmpItem.to.name})!==undefined){
            this.disable=true
            this.$emit("child",-1)
          }else{
            this.disable=false
          }
        }
      }
    }
  },
  components: {}
}
</script>