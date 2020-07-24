<template>
  <div>
    <page-layout>
      <div slot="customizeTitle">
        <div v-if="currentVrf">
          <router-link class="pageTitleStyle moreBtn" :to="{name: 'iproute', params: {tabName: 'vrf', pageNum: prePage}}">
            <a>{{$t('ipRoute.title')}}</a>
          </router-link>
          <span>{{'> VRF ' + currentVrf}}</span>
        </div>
        <div v-else class="pagetitle">{{$t('ipRoute.title')}}</div>
      </div>
      <div slot="controlPanel">
        <apply-button
          v-on:apply="read(1,10);warnMsg='';"
          v-on:cancel="filterCancel()"
          v-bind:lockApply="isFilterApplyLock">
        </apply-button>
        <ip-route-create
          v-bind:vrf="currentVrf"
          v-bind:isShowModal="showCreateModal" 
          v-on:notifyShowModal="showCreateModal=false"
          v-on:createEntry="createEntry">
        </ip-route-create>
        <delete-dialog
          v-if="showDeleteModal"
          v-on:close="showDeleteModal=false"
          v-on:setting="deleteGroup">
        </delete-dialog>
      </div>
      <div slot="middlePanel">
        <div v-if="warnMsg!==''" class="alert alert-warning" role="alert">
          <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          {{ warnMsg }}
        </div>
        <div class="tab" v-if="!currentVrf">
          <button 
            class="tablinks"
            v-on:click="changeTab('default')"
            v-bind:class="(currentTab==='default')?'active':''">{{ $t('general.default') }}
          </button>
          <button
            class="tablinks"
            v-on:click="changeTab('vrf')"
            v-bind:class="(currentTab==='vrf')?'active':''">{{ $t('ipRouteSummary.vrf') }}
          </button>
        </div>
        <div v-if="currentTab==='default' || currentVrf">
          <div class="layout-row">
            <attr-table-cell v-bind:title="$t('ipRoute.filterDataTitle')">
              <div slot="cellModify">
                <div>
                  <input 
                    type="radio"
                    v-bind:value="false"
                    v-model="needFilter">
                  <span>{{ $t('ipRoute.noFilterHint') }}</span>
                </div>
                <div>
                  <div class="float-left" style="width: auto; padding: 6px 0px; margin-right: 4px;">
                    <input 
                      type="radio"
                      v-bind:value="true"
                      v-model="needFilter">
                    <span>{{ $t('ipRoute.filterOption') }}</span>
                  </div>
                  <div class="float-left">
                    <div class="d-inline-block float-left" style="padding: 8px 0px; margin-right: 6px;">
                      <span>{{ $t('general.mode') }}</span>
                      <select 
                        v-model="modeSet" 
                        v-bind:disabled="!needFilter">
                        <option value="">{{$t('general.default')}}</option>
                        <option value="all">{{$t('general.all')}} </option>
                        <option value="hwfailure">{{$t('ipv6Route.hwfailure')}} </option>
                        <option value="connected">{{$t('rip.connected')}} </option>
                        <option value="static">{{$t('general.static')}} </option>
                        <option value="bgp">{{$t('rip.bgp')}} </option>
                        <option value="ospf">{{$t('rip.ospf')}} </option>
                        <option v-if="currentTab==='default'" value="rip">{{$t('rip.title')}} </option>
                      </select>
                    </div>
                    <div class="d-inline-block">
                      <div>
                        <span>{{ $t('general.ipAddress') }}</span>
                        <input 
                          v-validate.initial="filterParams.destMask?'required|ipv4':'ipv4'"
                          v-model="filterParams.destIp" 
                          v-bind:name="'destIp'"
                          v-bind:style="inputBoxStyle(errors.has('destIp'))"
                          v-bind:placeholder="$t('general.ipAddressPlaceholder')"
                          v-bind:disabled="!needFilter">
                      </div>
                      <div class="errMsg">
                        <span class="input-error">
                          {{ errors.has('destIp')?errors.first('destIp'):'&nbsp;' }}
                        </span>
                      </div>
                    </div>
                    <div class="d-inline-block">
                      <div>
                        <span>{{ $t('general.ipMask') }}</span>
                        <input 
                          v-validate.initial="(modeSet==='all'&&filterParams.destIp!=='')?'required|ipv4':'ipv4'"
                          v-model="filterParams.destMask" 
                          v-bind:name="'destMask'"
                          v-bind:style="inputBoxStyle(errors.has('destMask'))"
                          v-bind:placeholder="$t('general.ipMaskPlaceholder')"
                          v-bind:disabled="!needFilter">
                      </div>
                      <div class="errMsg">
                        <span class="input-error">
                          {{ errors.has('destMask')?errors.first('destMask'):'&nbsp;' }}
                        </span>
                      </div>
                    </div>
                    <div class="d-inline-block" style="position: relative; top: -6px;">
                      <input 
                        type="checkbox" 
                        v-model="filterParams.showRouteOption" 
                        v-bind:disabled="!needFilter || !(filterParams.destIp&&filterParams.destMask&&!errors.has('destIp')&&!errors.has('destMask'))">
                      <span>{{ $t('ipRoute.longerPrefixes') }}</span>
                      <div class="errMsg">
                        <span class="input-error">
                          {{ '&nbsp;' }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </attr-table-cell>
          </div>
          <div class="layout-row">
            <attr-table-cell v-bind:title="$t('ipRoute.routeType')" >
              <div slot="cellModify">
                R - RIP Derived, O - OSPF Derived, C - Connected, S - Static<br>
                B - BGP Derived, IA - OSPF Inter Area<br>
                E1 - OSPF External Type 1, E2 - OSPF External Type 2<br>
                N1 - OSPF NSSA External Type 1, N2 - OSPF NSSA External Type 2<br>
                S U - Unnumbered Peer<br>
                L - Leaked Route, K - Kernel
              </div>
            </attr-table-cell>
          </div>
          <div>
            <div style=" float: right;" class="d-inline-block my-6 ml-4">
              <button
                v-show="isCreateLock"
                class="btn btn-primary"
                type="button"
                v-on:click="showCreateModal=true"
                v-bind:disabled="isEdit">{{ $t('button.create') }}
              </button>
              <button
                v-if="!isEdit && !(currentTab === 'vrf' && !currentVrf)"
                class="btn btn-default"
                type="button"
                v-on:click="showDeleteModal=true"
                v-bind:disabled="(isCheckedDelete.length == 0)">{{ $t('button.delete') }}
              </button>
              <action-button 
                v-if="isCheckedDelete.length != 0"
                v-bind:isEdit="!isEdit"
                v-bind:lockApply="isApplyLock||hasPreferenceErrors"
                v-on:edit="updateEdit(true)"
                v-on:apply="apply"
                v-on:cancel="cancel()">
              </action-button>
            </div>
            <div style="float: right;" class="d-inline-block">
              <pure-pagin
                v-bind:totalEntries="count"
                v-bind:entriesPerPage="entriesPerPage"
                v-bind:pageNum="currentPage">
              </pure-pagin>
            </div>
          </div>
          <control-table
            v-bind:checkbox="false"
            v-bind:dbChanges="changedEntryIndex"
            v-bind:nums="entries.length"
            v-on:isChecked="selectItem"
            ref="ControlTable">
            <template slot="head">
              <th class="col-md-1">{{$t('ipRoute.routeType')}}</th>
              <th class="col-md-2">{{$t('general.ipAddress')}}</th>
              <th class="col-md-2">{{$t('ipRouteSummary.nextHop')}}</th>
              <th class="col-md-2">{{$t('ipRoute.preference')+'/'+$t('ipRoute.metric')}}</th>
              <th class="col-md-2">{{$t('ipv6Route.timeStamp')}}</th>
              <th class="col-md-1">{{$t('general.interface')}}</th>
              <th class="col-md-2">{{$t('general.description')}}</th>
            </template>
            <template scope="props" slot="body">
              <td>{{entries[props.index].routeType}}</td>
              <td>{{entries[props.index].ipWithMask}}</td>
              <td>
                <li v-for="(itemHopcontents,i) in entries[props.index].nextHopInfo">
                  <input 
                    v-if="entries[props.index].routeType.indexOf('S')>=0"
                    type="checkbox" 
                    v-model="isCheckedDelete" 
                    v-bind:value="entries[props.index].ipWithMask + props.index + i" 
                    v-on:click="checkItem($event,props.index, i)">
                  <span>{{ itemHopcontents.nextHop }}</span>
                </li>
              </td>
              <td>
                <li v-for="(itemHopcontents,i) in entries[props.index].nextHopInfo">
                  <div v-if="entryCheck(entries[props.index].ipWithMask + props.index + i)">
                    <input 
                      type="text"
                      v-validate="'required|between:1,255'"
                      v-bind:name="'preference'+ props.index + i"
                      v-bind:style="inputBoxStyle(errors.has('preference'+ props.index + i))"
                      style="width:50px; height:25px;"
                      v-model.number="itemHopcontents.preference">
                    <span>{{' / '+entries[props.index].metric}}</span>
                    <div class="errMsg">
                      <span v-show="errors.has('preference'+ props.index + i)" class="input-error">{{ errors.first('preference'+ props.index + i) }}</span>
                    </div>
                  </div>
                  <span v-else>{{entries[props.index].preference+' / '+entries[props.index].metric}}</span>
                </li>
              </td>
              <td>
                <li v-for="(itemHopcontents,i) in entries[props.index].nextHopInfo">
                  {{ itemHopcontents.timestamp }}
                </li>
              </td>
              <td>
                <li v-for="(itemHopcontents,i) in entries[props.index].nextHopInfo">
                  {{ parseIntf(itemHopcontents.interface) }}
                </li>
              </td>
              <td>
                <li v-for="(itemHopcontents,i) in entries[props.index].nextHopInfo">
                  <div v-if="entryCheck(entries[props.index].ipWithMask + props.index + i)">
                    <input
                      type="text"
                      v-bind:name="'description'+ props.index + i"
                      v-bind:style="inputBoxStyle(errors.has('description'+ props.index + i))"
                      v-model="itemHopcontents.description">
                    <div class="errMsg">
                      <span v-show="errors.has('description'+ props.index + i)" class="input-error">{{ errors.first('description'+ props.index + i) }}</span>
                    </div>
                  </div>
                  <span v-else>{{ itemHopcontents.description }}</span>
                </li>
              </td>
            </template>
          </control-table>
        </div>
        <div v-else>
          <div class="row">
            <div class="col-md-12" align="right">
              <pure-pagin
                v-bind:totalEntries="vrfTotal"
                v-bind:entriesPerPage="entriesPerPage"
                v-bind:pageNum="currentPage">
              </pure-pagin>
            </div>
          </div>
          <control-table
            v-bind:nums="vrfList.length"
            v-bind:checkbox="false">
            <template slot="head">
              <th class="col-md-6">{{$t('ipBrief.vrfName')}}</th>
              <th class="col-md-6">{{$t('general.more')}}</th>
            </template>
            <template scope="props" slot="body">
              <td>{{vrfList[props.index].vrfName}}</td>
              <td><a v-on:click="expandDetail(props.index)">
                <span class="glyphicon glyphicon-option-horizontal moreBtn"></span></a>
              </td>
            </template>
          </control-table>
        </div>
      </div>
    </page-layout>
  </div>
</template>

<script>
import PageLayout from '../components/PageLayout'
import ApplyButton from '../components/ApplyButton'
import ActionButton from '../components/ActionButton'
import ControlTable from '../components/ControlTable'
import PurePagin from '../components/PurePagin'
import DeleteDialog from "../components/DeleteDialog"
import AttrTableCell from '../components/AttrTableCell'
import IpRouteCreate from "./IpRouteCreate"
import * as RegexpRules from '../regexpRule'

const IP_ROUTE_API = '/open/v1/iproute'
const VRFS_API = '/open/v1/vrfs'
const PAGE_NAME = 'iproute'
const DEFAULT_PAGE = 10
const DEFAULT_TAB = 'default'

export default {
  data() {
    return {
      modeSet: '',
      entriesPerPage: DEFAULT_PAGE,
      entries: [],
      oldEntries: [],
      showCreateModal: false,
      showDeleteModal: false,
      isEdit: false,
      count: 0,
      vrfList: [],
      vrfTotal: 0,
      selectedDeleteData: [],
      isCheckedDelete: [],
      filterParams: {
        destIp: '',
        destMask: '',
        showRouteOption: false 
      },
      initFilterParams: {},
      warnMsg: '',
      needFilter: true,
      initNeedFilter: true
    }
  },
  computed: {
    currentTab: function() {
      return (this.$route.params.tabName)?this.$route.params.tabName:DEFAULT_TAB
    },
    isFilterApplyLock: function() {
      if(this.needFilter) {
        return this.errors.has('destIp') || this.errors.has('destMask') || (_.isEqual(this.filterParams, this.initFilterParams) && _.isEqual(this.modeSet, this.currentMode))
      }
      else {
        if(_.isEqual(this.initNeedFilter, this.needFilter)) {
          return true
        }
        else return false
      }
    },
    isApplyLock: function() {
      return ( ( this.changedEntryIndex.length == 0 ) )
    },
    hasPreferenceErrors: function() {
      return ( _.findIndex(this.errors.items, (el) => { 
        return el.field.indexOf('preference')!==-1 }) )!==-1? true: false
    },
    isCreateLock: function() {
      return ( this.isApplyLock && this.checkedEntries.length == 0 &&
        this.isCheckedDelete.length == 0 && !(this.currentTab === 'vrf' && !this.currentVrf))
    },
    changedEntryIndex: function() {
      return ( _.flatMap(this.selectedDeleteData, (el, i) =>{ 
        return ( !_.isEqual( this.entries[el.entryIndex].nextHopInfo[el.nextHopIndex], 
          this.oldEntries[el.entryIndex].nextHopInfo[el.nextHopIndex])? [i]: [] )
      }) )
    },
    checkedEntries: function() {
      return this.entries.filter( el =>{
        return ( el.isChecked === true )
      })
    },    
    offset: function() {
      return ((this.currentPage - 1) * this.entriesPerPage + 1)
    },
    currentPage: function() {
      return (this.$route.params.pageNum)?parseInt(this.$route.params.pageNum):1
    },
    currentVrf: function () {
      return this.$route.params.vrfName
    }, 
    prePage: function () {
      return (this.$route.params.prePageNum)?parseInt(this.$route.params.prePageNum):1
    },
    currentMode: function () {
      return (this.$route.params.mode)?this.$route.params.mode:''
    }
  },
  methods: {
    init(action){
      if(action!=='post') this.warnMsg = ''
      if(this.currentTab==='vrf' && !this.currentVrf) {
        this.getVrf()
      }
      else this.read()
    },
    entryCheck(value) {
      return (this.isCheckedDelete.indexOf(value) >= 0)? true : false
    },
    getVrf(offset, limit) {
      offset = (offset === undefined)?this.offset:offset
      limit = (limit === undefined)?this.entriesPerPage:limit
      this.$http({
        method: 'get',
        url: VRFS_API,
        params: {
          limit,
          offset,
        }
      })
      .then( res => {
        this.vrfTotal = res.data.count 
        this.vrfList = _.cloneDeep(res.data.vrfs)
      })
    },
    read(offset, limit) {
      this.selectedDeleteData=[]
      this.isCheckedDelete=[]
      offset = (offset === undefined)?this.offset:offset
      limit = (limit === undefined)?this.entriesPerPage:limit
      let vrf = (this.currentVrf=== undefined)? 'default':this.currentVrf
      let config = {
        vrfName: vrf,
        offset: offset,
        limit: limit
      }
      if(this.needFilter) {
        if (this.modeSet!=='') {
          config['mode'] = this.modeSet
        }
        if(this.filterParams.destIp!=='' && this.filterParams.destMask!=='') {
          config['destIp'] = this.filterParams.destIp
          config['destMask'] = this.filterParams.destMask
          if(this.filterParams.showRouteOption===true) {
            config['showRouteOption'] = 4
          }
          else {
            config['showRouteOption'] = 3
            this.filterParams.showRouteOption = false
          }
        }
        else if(this.filterParams.destIp!=='' && this.filterParams.destMask==='') {
          config['destIp'] = this.filterParams.destIp
          config['showRouteOption'] = 2
          this.filterParams.showRouteOption = false
        }
      }
      else {
        this.modeSet = ''
        this.filterParams = { destIp: '', destMask: '', showRouteOption: false }
      }

      if(this.modeSet==='' && this.filterParams.destIp==='' && this.filterParams.destMask==='' && this.filterParams.showRouteOption===false) {
        this.needFilter = false
      }
      else this.needFilter = true
      this.initNeedFilter = this.needFilter 
      this.initFilterParams = _.cloneDeep(this.filterParams)

      this.$http({
        method: 'get',
        url: IP_ROUTE_API,
        params: config
      })
      .then( res =>{
        if(this.currentMode!==this.modeSet) this.changeMode()
        this.entries = _.cloneDeep(res.data.ipAddresses)
        this.entries.forEach( element =>{
          this.$set(element, 'isChecked', false)
            element.nextHopInfo.forEach( index =>{
            this.$set(index, 'preference', element.preference)
          })
        })
        this.oldEntries = _.cloneDeep(this.entries)
        this.count = _.cloneDeep(res.data.count)
        this.updateEdit(false)
      })
    },
    apply() {
      this.clearErrorMsg()
      this.changedEntryIndex.forEach(element =>{
        this.applyAction(this.selectedDeleteData[element])
      })
    },
    applyAction(element) {
      this.$http({
        method: 'put',
        url: IP_ROUTE_API,
        params: this.appendParams(element)
      })
      .then(res =>{
        this.updateEdit(false)
        this.init('put')
      })
      .catch(err =>{
        this.updateEdit(false)
        this.init('put')
      })
    },
    appendParams(element) {
      let entry = this.entries[element.entryIndex].nextHopInfo[element.nextHopIndex]
      let oldEntry = this.oldEntries[element.entryIndex].nextHopInfo[element.nextHopIndex]
      let config = {}
      for (let i in entry) {
        if (i==='nextHop' && entry[i] !== 'directly connected' && entry[i] !== '') {
          config['nexthopIp'] = entry[i] 
        }
        config['description'] = entry['description'] 
        config['preference'] = entry['preference'] 
      }
      if (Object.keys(config).indexOf('nexthopIp') == -1) {
        config['interface'] = entry['interface'] 
      }
      config['vrfName'] = (this.currentVrf=== undefined)? 'default':this.currentVrf
      config['ipWithMask'] = this.entries[element.entryIndex].ipWithMask
      return config
    },
    updateEdit(isEdit) {
      this.isEdit = isEdit
    },
    checkWarn(moreinfo) {
      if(moreinfo!=='Success') {
        this.warnMsg = moreinfo
      }
      else {
        this.warnMsg = ''
      }
    },
    filterCancel() {
      this.filterParams = {
        destIp: '',
        destMask: '',
        showRouteOption: false
      }
      this.modeSet = ''
    },
    cancel() {
      this.updateEdit(false)
      this.init('cancel')
    },
    selectItem(index, checked) {
      if(!checked) {
        this.$set(this.entries, index, _.cloneDeep(this.oldEntries[index]))  
      }
      this.$set(this.entries[index], 'isChecked', checked)
    },
    createEntry(config) {
      this.clearErrorMsg()
      this.$http({
        method: 'post',
        url: IP_ROUTE_API,
        params: config
      })
      .then( res =>{
        this.checkWarn(res.data.status.more_info)
        if (this.currentVrf === undefined) {
          this.pushToFirstPage()
        }
        this.init('post')
      })
      .catch ( err =>{
        this.warnMsg = ''
        this.init('post')
      })
    },
    deleteGroup() {
      this.clearErrorMsg()
      let dataToDelete = []
      this.selectedDeleteData.forEach( (el, i) =>{
        dataToDelete.splice( i, 1, this.ajaxLists(el) )
      })

      this.$http.each(dataToDelete)
      .then ( res =>{
        if (this.currentVrf === undefined) {
          this.pushToFirstPage()
        }
        this.init('delete')
      })
      .catch ( (err) =>this.init('delete') )
    },
    ajaxLists (el) {
      let config = {}
      let entry = this.entries[el.entryIndex].nextHopInfo[el.nextHopIndex]
      if (entry['nextHop'] !== 'directly connected' && entry['nextHop'] !== '-') {
          config['nexthopIp'] = entry['nextHop'] 
      }
      if (Object.keys(config).indexOf('nextHop') == -1) {
        config['interface'] = entry['interface'] 
      }
      config['vrfName'] = (this.currentVrf=== undefined)? 'default':this.currentVrf
      config['ipWithMask'] = this.entries[el.entryIndex].ipWithMask
      return ({
        method: 'delete',
        url: IP_ROUTE_API,
        params: config,
      })
    },
    pushToFirstPage () {
      this.$router.push({
        name: PAGE_NAME,
        params: { pageNum: 1 }
      })
    },
    changeMode () {
      this.clearErrorMsg()
      let config = {}
      config['tabName'] = this.currentTab
      config['pageNum'] = 1
      if (this.currentVrf) {
        config['vrfName'] = this.currentVrf
        config['prePageNum'] = this.prePage
      }

      if (this.modeSet === ''){
        let pageName = (this.currentVrf)?'iproutevrf':PAGE_NAME
        this.$router.push({
          name: pageName,
          params: config
        })
      }
      else{
        let pageName = (this.currentVrf)?'iproutevrfmode':'iproutemode'
        config['mode'] = this.modeSet
        this.$router.push({
          name: pageName,
          params: config
        })
      }
    },
    checkItem(event, entryIndex, nextHopIndex){
      if(event.target.checked===true) {
        this.selectedDeleteData.push( {entryIndex: entryIndex, nextHopIndex: nextHopIndex} )
      }
      else if (event.target.checked===false) {
        let rmIndex = _.findIndex(this.selectedDeleteData, el=> {
          return (el.entryIndex === entryIndex && el.nextHopIndex === nextHopIndex)
        })
        this.selectedDeleteData.splice(rmIndex,1)
        this.entries[entryIndex].nextHopInfo[nextHopIndex] = 
          _.cloneDeep(this.oldEntries[entryIndex].nextHopInfo[nextHopIndex])
      }
    },
    changeTab(tabIndex) {
      this.clearErrorMsg()
      this.pushToFirstPage()
      this.$router.push({
        name: 'iproute',
        params: { 
          tabName: tabIndex,
          pageNum: this.currentPage,
        }
      })
    },
    expandDetail(index) {
      this.clearErrorMsg()
      this.$router.push({
        name: 'iproutevrf',
        params: {
          tabName: 'vrf',
          vrfName:this.vrfList[index].vrfName,
          prePageNum: this.currentPage,
          pageNum: 1,
        },
      })
    },
    parseIntf(intf){
      if(intf.indexOf('loopback') !== -1){
        return 'loopback ' + (intf).slice(9)
      }
      else if(intf.indexOf('vlan') !== -1){
        return 'vlan ' + (intf).slice(5)
      }
      else if (intf === 'null0') {
        return this.$t('ipRoute.null0')
      }
      return intf
    },
    inputBoxStyle(errorOccurred, disableFlag) {
      if (disableFlag) {
        return this.INPUT_BOX_DISABLE_STYLE
      }
      else {
        return (errorOccurred) ? this.INPUT_BOX_ERROR_STYLE : this.INPUT_BOX_COMMON_STYLE
      }
    },
  },
  created() {
    this.init('created')
  },  
  watch: {
    '$route' (to, from) {
      this.init('watch')
    },
  },
  components: {
    PageLayout,
    ApplyButton,
    ActionButton,
    ControlTable,
    PurePagin,
    DeleteDialog,
    AttrTableCell,
    IpRouteCreate
  },
}
</script>
