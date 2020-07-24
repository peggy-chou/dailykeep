<template>
  <div>
    <loading v-if="isLoading"></loading>
    <page-layout v-else v-bind:pageTitle="$t('webServer.title')">
      <div v-if="this.isCompleted && resStatus.more_info!==''" 
        v-bind:class="(resStatus.response_code == 200)?'alert alert-info':'alert alert-danger'"
        role="alert">
        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
        {{resStatus.more_info}}
      </div>
      <div v-if="this.isProgress||this.isServerRestart" class="alert alert-warning" role="alert">
        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
        {{this.isServerRestart===true? $t('webServer.serverRestartWarnMsg'): $t('sysRuntime.copyTrans')}}
      </div>
      <div >
        <!-- HTTP -->
        <span class="subtitle">{{ $t('webServer.http') }}</span>
        <div class="float-right">
          <action-button
            v-bind:lockEdit="httpsEditToApply"
            v-bind:lockApply="!hasModified||inputNumberErr"
            v-bind:isEdit="editToApply"
            v-on:edit="editData('http')"
            v-on:apply="(dataToSet.mode==='disabled' && dataToCurrent.mode==='enabled')?showHttpWarn=true:applyData('http')"
            v-on:cancel="cancelData('http')">
          </action-button>
          <delete-dialog
            v-if="showHttpWarn"
            v-bind:headerName="'Warning'"
            v-bind:content="$t('webServer.warnMsg')"
            v-on:close="showHttpWarn=false"
            v-on:setting="applyData('http')">
          </delete-dialog> 
        </div>
        <div class="layout-row mt-4">
          <attr-table-cell v-bind:title="$t('webServer.unsecureMode')" v-bind:cellFirst="25" v-bind:cellSec="75">
            <div slot="cellModify">
              <div v-if="editToApply">
                <select v-model="dataToSet.mode">
                  <option value='enabled'>{{$t('general.enabled')}}</option>
                  <option value='disabled'>{{$t('general.disabled')}}</option>
                </select>
              </div>
              <div v-else-if="typeof dataToCurrent.mode !== 'undefined'">
                {{(dataToCurrent.mode==='enabled')? $t('general.enabled'): $t('general.disabled')}}
              </div>
            </div>
          </attr-table-cell>
        </div>
        <div class="layout-row">
        <attr-table-cell v-bind:title="$t('webServer.port')" v-bind:cellFirst="25" v-bind:cellSec="25">
          <div slot="cellModify">  
            <div v-if="editToApply">
              <input-number-box
                v-bind:value="dataToSet.port"
                v-bind:name="'port'"
                v-bind:rule="'specify_range:80,1024,65535'"
                v-on:input="numChange">
              </input-number-box>
              <span class="errMsg">({{ $t('webServer.portHint') }})</span>
            </div>
            <div v-else>{{dataToCurrent.port}}</div>
          </div>
        </attr-table-cell>
        <attr-table-cell v-bind:title="$t('webServer.maxSession')" v-bind:cellFirst="25" v-bind:cellSec="25">
          <div slot="cellModify">  
            <div v-if="editToApply">
              <input-number-box
                v-bind:value="dataToSet.maxSessions"
                v-bind:name="'maxSessions'"
                v-bind:rule="'required|between:0,16'"
                v-on:input="numChange">
              </input-number-box>
            </div>
            <div v-else>{{dataToCurrent.maxSessions}}</div>
          </div>
        </attr-table-cell>
        </div>
        <div class="layout-row">
        <attr-table-cell v-bind:title="$t('webServer.httpHardTimeout')" v-bind:cellFirst="25" v-bind:cellSec="25">
          <div slot="cellModify">
            <div v-if="editToApply">
              <input-number-box
                v-bind:value="dataToSet.hardTimeout"
                v-bind:name="'hardTimeout'"
                v-bind:rule="'required|between:1,168'"
                v-on:input="numChange">
              </input-number-box>
            </div>
            <div v-else-if="typeof dataToCurrent.hardTimeout !== 'undefined'">{{dataToCurrent.hardTimeout+' '+$t('general.hour')}}</div>
          </div>
        </attr-table-cell>
        <attr-table-cell v-bind:title="$t('webServer.httpSoftTimeout')" v-bind:cellFirst="25" v-bind:cellSec="25">
          <div slot="cellModify">
            <div v-if="editToApply">
              <input-number-box
                v-bind:value="dataToSet.softTimeout"
                v-bind:name="'softTimeout'"
                v-bind:rule="'required|between:1,60'"
                v-on:input="numChange">
              </input-number-box>
            </div>
            <div v-else-if="typeof dataToCurrent.softTimeout !== 'undefined'">{{dataToCurrent.softTimeout+' '+$t('general.minute')}}</div>
          </div>
        </attr-table-cell>
        </div>
        <hr>
        <!-- HTTPS -->
        <span class="subtitle">{{ $t('webServer.https') }}</span>
        <div class="float-right">
          <action-button
            v-bind:lockEdit="editToApply"
            v-bind:lockApply="!httpsHasModified||httpsInputNumberErr"
            v-bind:isEdit="httpsEditToApply"
            v-on:edit="editData('https')"
            v-on:apply="(httpsDataToSet.mode==='disabled' && httpsDataToCurrent.mode==='enabled')?showHttpsWarn=true:applyData('https')"
            v-on:cancel="cancelData('https')">
          </action-button>
          <delete-dialog
            v-if="showHttpsWarn"
            v-bind:headerName="'Warning'"
            v-bind:content="$t('webServer.warnMsg')"
            v-on:close="showHttpsWarn=false"
            v-on:setting="applyData('https')">
          </delete-dialog> 
        </div>
        <div class="layout-row mt-4">
          <attr-table-cell v-bind:title="$t('webServer.secureMode')" v-bind:cellFirst="25" v-bind:cellSec="25">
            <div slot="cellModify">
              <div v-if="httpsEditToApply">
                <select v-model="httpsDataToSet.mode">
                  <option value='enabled'>{{$t('general.enabled')}}</option>
                  <option value='disabled'>{{$t('general.disabled')}}</option>
                </select>
              </div>
              <div v-else-if="typeof httpsDataToCurrent.mode !== 'undefined'">
                {{(httpsDataToCurrent.mode==='enabled')? $t('general.enabled'): $t('general.disabled')}}
              </div>
            </div>
          </attr-table-cell>
          <attr-table-cell v-bind:title="$t('webServer.securePort')" v-bind:cellFirst="25" v-bind:cellSec="25">
            <div slot="cellModify">  
              <div v-if="httpsEditToApply">
                <input-number-box
                  v-bind:value="httpsDataToSet.port"
                  v-bind:name="'port'"
                  v-bind:rule="'specify_range:443,1024,65535'"
                  v-on:input="httpsNumChange">
                </input-number-box>
                <span class="errMsg">({{ $t('webServer.portHint') }})</span>
              </div>
              <div v-else>{{httpsDataToCurrent.port}}</div>
            </div>
          </attr-table-cell>
        </div>
        <div class="layout-row">
          <attr-table-cell v-bind:title="$t('webServer.secureProtocol')" v-bind:cellFirst="25" v-bind:cellSec="25">
            <div slot="cellModify">
              <div>{{httpsDataToCurrent.protocolLevel}}</div>
            </div>
          </attr-table-cell>
          <attr-table-cell v-bind:title="$t('webServer.httpsMaxSession')" v-bind:cellFirst="25" v-bind:cellSec="25">
            <div slot="cellModify">  
              <div v-if="httpsEditToApply">
                <input-number-box
                  v-bind:value="httpsDataToSet.maxSessions"
                  v-bind:name="'maxSessions'"
                  v-bind:rule="'required|between:0,16'"
                  v-on:input="httpsNumChange">
                </input-number-box>
              </div>
              <div v-else>{{httpsDataToCurrent.maxSessions}}</div>
            </div>
          </attr-table-cell>
        </div>
        <div class="layout-row">
          <attr-table-cell v-bind:title="$t('webServer.httpsHardTimeout')" v-bind:cellFirst="25" v-bind:cellSec="25">
            <div slot="cellModify">
              <div v-if="httpsEditToApply">
                <input-number-box
                  v-bind:value="httpsDataToSet.hardTimeout"
                  v-bind:name="'hardTimeout'"
                  v-bind:rule="'required|between:1,168'"
                  v-on:input="httpsNumChange">
                </input-number-box>
              </div>
              <div v-else-if="typeof httpsDataToCurrent.hardTimeout !== 'undefined'">{{httpsDataToCurrent.hardTimeout+' '+$t('general.hour')}}</div>
            </div>
          </attr-table-cell>
          <attr-table-cell v-bind:title="$t('webServer.httpsSoftTimeout')" v-bind:cellFirst="25" v-bind:cellSec="25">
            <div slot="cellModify">
              <div v-if="httpsEditToApply">
                <input-number-box
                  v-bind:value="httpsDataToSet.softTimeout"
                  v-bind:name="'softTimeout'"
                  v-bind:rule="'required|between:1,60'"
                  v-on:input="httpsNumChange">
                </input-number-box>
              </div>
              <div v-else-if="typeof httpsDataToCurrent.softTimeout !== 'undefined'">{{httpsDataToCurrent.softTimeout+' '+$t('general.minute')}}</div>
            </div>
          </attr-table-cell>
        </div>
        <hr>
        <!-- Certificate -->
        <span class="subtitle">{{ $t('webServer.Certificate') }}</span>
        <div class="float-right">
          <button
            class="btn btn-primary"
            type="button"
            v-bind:disabled="isCreating"
            v-on:click="showCreateModal=true">{{ $t('button.create') }}
          </button>
          <button
            class="btn btn-default"
            type="button"
            v-bind:disabled="isCreating||!isCertExist"
            v-on:click="showDeleteModal=true">{{ $t('button.delete') }}
          </button> 
          <delete-dialog
            v-if="showCreateModal"
            v-bind:headerName="'Create'"
            v-bind:content="$t('webServer.createContent')"
            v-on:close="showCreateModal=false"
            v-on:setting="createCert">
          </delete-dialog>  
          <delete-dialog
            v-if="showDeleteModal"
            v-on:close="showDeleteModal=false"
            v-on:setting="deleteCert">
          </delete-dialog>
          <delete-dialog
            v-if="showUploadModal"
            v-bind:headerName="$t('general.transferConfirm')"
            v-bind:content="$t('general.mgmtBlockedAlert')"
            v-on:close="showUploadModal=false"
            v-on:setting="uploadCert()">
          </delete-dialog>
        </div>
        <div class="layout-row mt-4">
          <attr-table-cell v-bind:title="$t('webServer.certStatus')" v-bind:cellFirst="25" v-bind:cellSec="25">
            <div slot="cellModify">
              <div>{{httpsDataToCurrent.certificateStatus}}</div>
            </div>
          </attr-table-cell>
          <attr-table-cell v-bind:title="$t('webServer.certProgress')" v-bind:cellFirst="25" v-bind:cellSec="25">
            <div slot="cellModify">
              <div>{{(httpsDataToCurrent.certificateGeneration=='true')?$t('general.true'): $t('general.false')}}</div>
            </div>
          </attr-table-cell>
        </div>
        <hr>
        <!-- Copy Certificate -->
        <span class="subtitle">{{ $t('webServer.uploadCertificate') }}</span>
        <div class="float-right">
          <button
            class="btn btn-primary my-sm-1"
            type="button"
            v-on:click="showUploadModal=true"
            v-bind:disabled="isLockApply || isProgress===true">
            {{$t('button.upload')}}
          </button>
        </div>
        <div class="layout-row mt-4">
          <attr-table-cell v-bind:title="$t('webServer.certName')" v-bind:cellFirst="25" v-bind:cellSec="25">
            <div slot="cellModify">
              <input type="file" id="srcFile" name="srcFile" v-on:change="handleFileUpload($event)">
            </div>
          </attr-table-cell>
          <attr-table-cell v-bind:title="$t('webServer.certType')" v-bind:cellFirst="25" v-bind:cellSec="25">
            <div slot="cellModify">
              <select 
                v-model="downloadDst"
                style="width: 170px">
                <option value="dhstrong">{{ $t('webServer.dhstrong')}}</option>
                <option value="dhweak">{{ $t('webServer.dhweak') }}</option>
                <option value="root">{{ $t('webServer.root')}}</option>
                <option value="server">{{ $t('webServer.server')}}</option>
              </select>
            </div>
          </attr-table-cell>
        </div>
      </div> 
    </page-layout>
  </div>   
</template>

<script>
  import PageLayout from '../components/PageLayout'
  import ActionButton from '../components/ActionButton'
  import AttrTableCell from '../components/AttrTableCell'
  import DeleteDialog from "../components/DeleteDialog"
  import InputNumberBox from '../components/InputNumberBox'
  import Loading from "../components/Loading"
  import * as CustomUtil from '../customUtil'

  const HTTP_URL = '/open/v1/http'
  const HTTPS_URL = '/open/v1/https'
  const CERTIFICATE_URL = '/open/v1/certificate'
  const SSL_PEM_COPY_URL = '/open/v1/sslpem/copy'

  var item
  export default {
    data() {
      return {
        inputNumberErr: false,
        httpsInputNumberErr: false,
        disableWebServer: false,
        isLoading: false,
        showHttpWarn: false,
        showHttpsWarn: false,
        editToApply: false,
        httpsEditToApply: false,
        showCreateModal: false,
        showDeleteModal: false,
        showUploadModal: false,
        dataToSet:{},
        dataToCurrent: {},
        httpsDataToSet:{},
        httpsDataToCurrent: {},
        // copy download
        downloadDst: 'dhstrong',
        source: null,
        srcFile: undefined,
        isProgress: false,
        isCompleted: false,
        /* resStatus: { response_code, more_info }, */
        resStatus: { response_code: '', more_info: '' },
        isServerRestart: false,
        applyProtocol: ''
      }
    },
    created () {
      this.disableWebServer = false
      this.isServerRestart = false
      this.read()
      this.readHttps()
    },
    computed:{
      hasModified: function() {
        return(!_.isEqual(this.dataToSet,this.dataToCurrent))
      },
      httpsHasModified: function() {
        return(!_.isEqual(this.httpsDataToSet,this.httpsDataToCurrent))
      },
      isCreating: function() {
        return (this.httpsDataToCurrent.certificateGeneration==='true') ? true : false
      },
      isCertExist: function() {
        return (this.httpsDataToCurrent.certificateStatus==='Lack certificate and private key') ? false : true
      },
      isLockApply: function() {
        return (this.srcFile == undefined) ? true : false
      },
    },
    methods: {
      numChange(name,value,err){
        this.dataToSet[name] = value
        let currentErr = document.getElementsByClassName('errMsgNum')
        if(currentErr.length>0) this.inputNumberErr = true
        else this.inputNumberErr = false
      },
      httpsNumChange(name,value,err){
        this.httpsDataToSet[name] = value
        let currentErr = document.getElementsByClassName('errMsgNum')
        if(currentErr.length>0) this.httpsInputNumberErr = true
        else this.httpsInputNumberErr = false
      },
      read() {
        this.$http({
          method: 'get',
          url: HTTP_URL,
        })
        .then( res => {
          this.editToApply = false
          this.dataToSet = _.cloneDeep(res.data)
          this.dataToCurrent = _.cloneDeep(res.data)
        })
      },
      readHttps() {
        this.$http({
          method: 'get',
          url: HTTPS_URL,
        })
        .then( res => {
          this.httpsEditToApply = false
          this.httpsDataToSet = _.cloneDeep(res.data)
          this.httpsDataToCurrent = _.cloneDeep(res.data)
        })
      },
      applyData(type) {
        this.clearErrorMsg()
        this.applyProtocol = (type=='http')?'http:':'https:'
        let url = (type=='http')?HTTP_URL:HTTPS_URL
        let entries = (type=='http')?this.dataToSet:this.httpsDataToSet
        let oldEntries = (type=='http')?this.dataToCurrent:this.httpsDataToCurrent
        this.$http({
          method: 'put',
          url: url,
          params: this.appendParams(entries,oldEntries)
        })
        .then(res => {
          let more_info = res.data.status.more_info
          if (this.disableWebServer===false) {
            if(more_info===this.$t('webServer.serverRestartWarnMsg')) {
              this.initStatus('serverRestart')
            }
            else {
              this.initStatus()
            }
            this.read()
            this.readHttps()
          }
        })
        .catch( (err) => {
          this.isServerRestart = false
          this.initStatus()
          this.read()
          this.readHttps()
        })
      },
      appendParams (dataToSet,dataToCurrent) {
        let config = {}
        for (let i in dataToSet) {
          if (dataToSet[i] !== dataToCurrent[i]) {
            if (i == 'status' ) {
              continue
            }
            if (i == 'mode' && dataToSet[i]==='disabled') {
              this.disableWebServer = true
              config[i] = dataToSet[i]
            }
            else 
              config[i] = dataToSet[i]
          }
        }
        return config
      },
      createCert(){
        this.clearErrorMsg()
        this.initStatus()
        this.$http({
          method: 'post',
          url: CERTIFICATE_URL,
          params:{}
        })
        .then( res => {
          this.read()
          this.readHttps()
          setTimeout(() => {
            this.readHttps();
          }, 2000);
        })
        .catch(error => {
          this.read()
          this.readHttps()
        })
      },
      deleteCert() {
        this.clearErrorMsg()
        this.initStatus()
        this.$http({
          method: 'delete',
          url: CERTIFICATE_URL,
          params:{}
        })
        .then( res => {
          this.read()
          this.readHttps()
        })
        .catch(error => {
          this.read()
          this.readHttps()
        })
      },
      cancelData(type) {
        this.clearErrorMsg()
        this.initStatus()
        this.read()
        this.readHttps()
      },
      editData(type) {
        if (type == 'http') {
          this.editToApply = true
        } else {
          this.httpsEditToApply = true
        }
      },
      handleFileUpload(){
        this.srcFile = event.target.files[0]
      },
      uploadCert() {
        this.clearErrorMsg()
        if(this.isCompleted) {
          this.isCompleted = false
          this.isProgress = false
          this.httpsInputNumberErr = false
          this.inputNumberErr = false
        }
        this.isProgress = true
        this.upgradeFile()
      },
      upgradeFile() {
        if(!this.srcFile){
          this.resStatus.response_code = 400
          this.resStatus.more_info = "Upload Failed."
          this.setCompleted()
          return
        }

        let formData = new FormData()
        formData.append('downloadSrc', this.srcFile)
        this.source = this.$http.CancelToken.source()

        this.$http({
          method: 'post',
          url: SSL_PEM_COPY_URL,
          data: formData,
          header: {
            'Content-Type': 'multipart/form-data'
          },
          params: {
            downloadDst: this.downloadDst,
          },
          cancelToken: this.source.token
        })
        .then((res) => {
            this.resStatus.response_code = res.data.status.response_code
            this.resStatus.more_info = res.data.status.more_info
            this.setCompleted()
        })
        .catch(err => {
          if(err.response.status == 401) {
            this.Unauthorized()
            return
          }
          this.resStatus.more_info = ''
          this.setCompleted()
        })

      },
      setCompleted() {
        this.isCompleted = true
        this.isProgress = false
        this.read()
        this.readHttps()
        this.srcFile = undefined
        this.downloadDst = 'dhstrong'
      },
      initStatus(type) {
        this.isServerRestart = (type==='serverRestart')? true: false
        this.isCompleted = false
        this.isProgress = false
        this.httpsInputNumberErr = false
        this.inputNumberErr = false
        this.srcFile = undefined
      },
      checkServerMode() {
        let currentLinkProtocol = document.location.protocol
        if(currentLinkProtocol===this.applyProtocol && this.disableWebServer===true) {
          return 'unconnect'
        }
        else {
          return 'connect'
        }
      }
    },
    components: {
      PageLayout,
      ActionButton,
      AttrTableCell,
      DeleteDialog,
      InputNumberBox,
      Loading,
    },
    destroyed() {
      if(this.source){
        this.source.cancel('Operation canceled by the user.')
      }
    },
    watch: {
      disableWebServer() {
        if (this.disableWebServer===true) {
          this.isLoading = true
          setTimeout(() => {
            if(this.checkServerMode() === 'unconnect') {
              history.go(0)
            }
            else {
              this.disableWebServer = false
              this.initStatus('serverRestart')
              this.read()
              this.readHttps()
              this.isLoading = false
            }
          }, 3000);
        }
      }
    }
  }
</script>
