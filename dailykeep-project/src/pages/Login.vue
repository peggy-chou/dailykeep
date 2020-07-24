<template>
    <div class="d-flex flex-column bg-canvas-light-1" style="height: 100vh !important;">
      <div v-if="$root.isLoading">
        <loading></loading>
      </div>
      <div v-else 
        class="d-flex flex-grow-1 flex-shrink-0 align-items-sm-center justify-content-center py-sm-4">
        <div class="col col-sm-auto card flex-row px-0" style="border: none;">
          <div class="pt-7 pb-8 px-6 px-sm-7" style="width: 476px;">
            <div class="px-0 px-sm-1">
              <div class="d-flex mb-7">
                <span></span>
              </div>
              <h1 class="h3 mb-7" style="font-size: 1.625em;">
                <br>{{productName}}
              </h1>
              <p class="mb-1 host-name" style="font-size: 1.2em; font-weight: 100;">
                {{$t('general.hostNameTitle')}}
                <br>{{systemName}}
              </p>
              <div class="mt-7 mb-7">
                <div class="form-group">
                  <input 
                    autofocus
                    type="text"
                    v-bind:placeholder="$t('access.userName')"
                    class="form-control"
                    v-model="username"
                    v-on:keyup.enter="login">
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    v-bind:placeholder="$t('access.password')"
                    class="form-control"
                    v-model="password"
                    v-on:keyup.enter="login">
                </div>
              </div>
              <button class="btn btn-lg btn-primary btn-block mb-4" v-on:click="login">
                {{$t('button.login')}}
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- footer -->
      <footer class="py-3 px-4 text-dark bg-white bg-sm-transparent">
        <div align="right">{{ $t('general.copyright') }}</div>
      </footer>
      <!-- Invalid dialog -->
      <div v-if="isErr">
        <confirm-dialog
          v-bind:headerName="$t('general.invalidLogin')"
          v-bind:content="errMsg"
          v-on:confirm="isErr=false">
        </confirm-dialog>
      </div>
    </div>
</template>

<script>
import Loading from "../components/Loading"
import ConfirmDialog from '../components/ConfirmDialog'

const LOGIN_API = '/open/v1/login'
const MACHINE_API = '/open/v1/machine'

export default {
  data() {
    return {
      productName: "",
      systemName: "",
      username: "",
      password: "",
      errMsg: "",
      isErr: false,
      readCount: 1,
    }
  },
  created() {
    // this.readSysName()
  },
  mounted(){
    document.title = this.$t('button.login') + this.$t('general.titleSuffix')
  },
  components: {
    Loading,
    ConfirmDialog
  },
  methods: {
    readSysName() {
      this.$http({
        method: 'get',
        url: MACHINE_API,
      })
      .then( res => {
        this.productName = this.parseMachineModel(_.cloneDeep(res.data.machineModel))
        this.systemName = _.cloneDeep(res.data.systemName)
      })
      .catch( err => {
        if (this.readCount <= 3) {
          this.readSysName()
        }
        this.readCount += 1
      })
    },
    login() {
      this.$http({
        method: 'post',
        url: LOGIN_API,
        params: {
          username: this.username,
          password: this.password,
        }
      })
      .then( res => { // success
        this.$router.push('/')
      })
      .catch( error => { // error
        this.isErr = true
        this.errMsg = error.response.data.status.more_info
        this.resetInput()
      })
    },
    resetInput() {
      this.username = ""
      this.password = ""
    },
  }
}
</script>
