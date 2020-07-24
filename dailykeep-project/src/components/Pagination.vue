<template>
    <div >
        <nav class="pull-right" aria-label="Page navigation">
          <ul class="pagination">
            <li>
              <router-link :to="{ name: moduleName, params: { pageNum: lastPage }}">
                <span aria-hidden="true">&laquo;</span>
              </router-link>
            </li>
            <li v-for="page in pages" :class="{ active: page == pageNum }">
              <router-link :to="{ name: moduleName, params: { pageNum: page }}">{{ page }}</router-link>
            </li>
            <li>
              <router-link :to="{ name: moduleName, params: { pageNum: nextPage }}">
                <span aria-hidden="true">&raquo;</span>
              </router-link>
            </li>
          </ul>
        </nav>
    </div>
</template>

<script>

export default {
  data() {
    return {

    }
  },
  props:{
    pageData:Number, // fakeTotal item total
    pageNum:Number, // nowPage
    pageCount:Number, // 10
    moduleName:String,
  },
  computed:{
    totalPage() {
      return Math.ceil(this.pageData / this.pageCount)
    },
    nextPage() {
      return Math.min(this.pageNum + 1, this.totalPage)
    },
    lastPage() {
      return Math.max(1, this.pageNum - 1)
    },
    pages() {
      return Array(this.totalPage).fill().map((e, i) => i + 1) // [1,2,3...,10]
    },
  },
  methods : {
    
  },
  created(){
    
  },
}
</script>

<style>
.pagination {
  font-size: 12px;
  font-weight: bold;
}
</style>