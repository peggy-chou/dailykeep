<template>
  <div>
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" v-bind:class="disabledSymbol('laquo')">
          <router-link :to="{ name: $route.name, params: {pageNum: 1} }" 
            class="page-link" tabindex="-1" aria-label="First">
            <span aria-hidden="true">&laquo;</span>
          </router-link>
        </li>
        <li class="page-item" v-bind:class="disabledSymbol('laquo')">
          <router-link :to="{ name: $route.name, params: {pageNum: (pageNum-1<1) ? 1 : (pageNum-1)} }"
            class="page-link" tabindex="-1" aria-label="Previous">
            <span aria-hidden="true">&lsaquo;</span>
          </router-link>
        </li>
        <!-- page namber start -->
        <li name="first" class="page-item" v-bind:style="{ 'display': displayPage('first')}">
          <router-link :to="{ name: $route.name, params: {pageNum: firstPage} }">
            {{firstPage}}
          </router-link>
        </li>
        <li class="page-item disabled" v-bind:style="{'display': displaySymbol('hellipLeft')}">
          <a class="page-link" href="#" tabindex="-1">&hellip;</a>
        </li>
        <!-- 1 ... (n-2) (n-1) n -->
        <li name="last3" class="page-item" v-bind:style="{'display': displayPage('last3')}">
          <router-link :to="{ name: $route.name, params: {pageNum: lastPage-2} }">
            {{lastPage-2}}
          </router-link>
        </li>
        <li name="previous" class="page-item" v-bind:style="{ 'display': displayPage('previous')}">
          <router-link :to="{ name: $route.name, params: {pageNum: previousPage} }">
            {{previousPage}}
          </router-link>
        </li>
        <li name="current" class="page-item active">
          <router-link :to="{ name: $route.name, params: {pageNum: currentPage} }">
            {{currentPage}}
          </router-link>
        </li>
        <li name="next" class="page-item" v-bind:style="{'display': displayPage('next')}">
          <router-link :to="{ name: $route.name, params: {pageNum: nextPage} }">
            {{nextPage}}
          </router-link>
        </li>
        <!-- 1 2 3 ... n -->
        <li name="top3" class="page-item" v-bind:style="{'display': displayPage('top3')}">
          <router-link :to="{ name: $route.name, params: {pageNum: firstPage+2} }">
            {{firstPage+2}}
          </router-link>    
        </li>
        <li class="page-item disabled" v-bind:style="{'display': displaySymbol('hellipRight')}">
          <a class="page-link" href="#" tabindex="-1">&hellip;</a>
        </li>
        <li name="last" class="page-item" v-bind:style="{'display': displayPage('last')}">
          <router-link :to="{ name: $route.name, params: {pageNum: lastPage} }">
            {{lastPage}}
          </router-link>
        </li>
        <!-- page namber end -->
        <li class="page-item" v-bind:class="disabledSymbol('raquo')">
          <router-link :to="{ name: $route.name, params: {pageNum: (pageNum+1>lastPage) ? lastPage : (pageNum+1)} }"
            class="page-link" tabindex="-1" aria-label="Previous">
            <span aria-hidden="true">&rsaquo;</span>
          </router-link>
        </li>
        <li class="page-item" v-bind:class="disabledSymbol('raquo')">
          <router-link :to="{ name: $route.name, params: {pageNum: lastPage} }" 
            class="page-link" tabindex="-1" aria-label="Last">
            <span aria-hidden="true">&raquo;</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
const FIRST_PAGE = 1

export default {
  data() {
    return {
      firstPage: FIRST_PAGE,
      previousPage: Number,
      currentPage: Number,
      nextPage: Number,
    }
  },
  props:{
    totalEntries: Number,
    entriesPerPage: Number,
    pageNum: Number,
  },
  created() {
    this.calPage()
  },
  computed: {
    lastPage() {  
      return (this.totalEntries===0) ? 1 : Math.ceil(this.totalEntries / this.entriesPerPage)
    }, 
  },
  methods: {
    calPage() {
      this.currentPage = (this.pageNum > this.lastPage) ? this.lastPage : this.pageNum
      this.previousPage = this.currentPage-1
      this.nextPage = this.currentPage+1 
    },
    displayPage(mode) {
      switch (mode)
      {
        case 'first':
          return (this.currentPage===this.firstPage) ? 'none' : 'inline'
        case 'previous':
          return (this.previousPage<=this.firstPage) ? 'none' : 'inline'
        case 'next':
          return (this.nextPage>=this.lastPage) ? 'none' : 'inline'
        case 'last':
          return (this.currentPage===this.lastPage) ? 'none' : 'inline'
        case 'top3':
          return (this.currentPage===this.firstPage && this.lastPage>3) ? 'inline' : 'none'
        case 'last3':
          return (this.currentPage===this.lastPage && this.lastPage>3) ? 'inline' : 'none' 
        default:
          return ''
      }
    },
    displaySymbol(symbol) {
      switch (symbol)
      {
        case 'hellipLeft':
          return (this.lastPage>4 && this.currentPage-this.firstPage>2) ? 'inline' : 'none'
        case 'hellipRight':
          return (this.lastPage>4 && this.lastPage-this.currentPage>2) ? 'inline' : 'none'
        default:
          return ''
      }
    },
    disabledSymbol(symbol) {
      switch (symbol)
      {
        case 'laquo':
          return (this.currentPage===this.firstPage) ? 'disabled' : ''
        case 'raquo':
          return (this.currentPage===this.lastPage) ? 'disabled' : ''
        default:
          return ''
      }
    }
  },
  watch: {
    pageNum() {
      this.calPage()
    },
    lastPage() {
      this.calPage()
    }
  },
}
</script>

<style>
.pagination > li > a, .pagination > li > span {
  border-width: 0px;
}
.page-link:focus {
  box-shadow: none;
}
</style>