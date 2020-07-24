<template>
<div>
  <page-layout pageTitle="RESTful API testing">
    <slot name="controlPanel"></slot>
    <div style="padding: 20px;">
      <div style="padding-top: 5px;">
        <h3>API</h3>
        <div class="row form-group">
          <div class="col-xs-5">
            <input type="text" v-model="url" placeholder="/apiNames" class="form-control" list="api_list" @input="urlInput">
            <datalist id="api_list">
              <option v-for="item in displayApiList">{{item}}</option>
            </datalist>
          </div>
          <div class="col-xs-2">
            <select v-model="method" class="form-control">
              <option value="post">Create</option>
              <option value="get">Read</option>
              <option value="put">Update</option>
              <option value="delete">Delete</option>
            </select>
          </div>
        </div>
        <div v-show="!isAdding">
          <button type="button" class="btn btn-primary" v-on:click="apply">submit</button>
          <button type="button" class="btn btn-default" v-on:click="reset">reset</button>
        </div>
      </div>
      <div style="padding-top: 5px;">
        <h3>Req Params</h3>
        <table class="table table-striped" width="600px">
          <thead>
            <tr>
              <th width="30px"></th>
              <th width="150px">key</th>
              <th>value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in params">
              <td><input type="checkbox" v-model="item.checked"></td>
              <td>
                <div v-if="item.checked">
                  <input type="text" v-model="item.key">
                </div>
                <div v-else>{{item.key}}</div>
              </td>
              <td>
                <div v-if="item.checked">
                  <input type="text" v-model="item.value" v-on:keyup.enter="edit">
                </div>
                <div v-else>{{item.value}}</div>
              </td>
            </tr>
            <tr v-if="isAdding">
              <td></td>
              <td><input type="text" v-model="newKey" placeholder="key"></td>
              <td><input type="text" v-model="newValue" placeholder="value" v-on:keyup.enter="add"></td>
            </tr>
          </tbody>
        </table>
        <button type="button" class="btn btn-default" v-on:click="add" v-show="isAdding">add</button>
        <button type="button" class="btn btn-default" v-on:click="cancelAdd" v-show="isAdding">cancel</button>
        <button type="button" class="btn btn-default" v-on:click="isAdding = true" v-show="!isAdding && !hasChecked">add</button>
        <button type="button" class="btn btn-default" v-on:click="edit" v-show="!isAdding && hasChecked">apply</button>
        <button type="button" class="btn btn-default" v-on:click="remove" v-show="!isAdding && hasChecked">delete</button>
        <button type="button" class="btn btn-default" v-on:click="params = [];cancelAdd();" v-show="!isAdding && !hasChecked">reset</button>
      </div>
      <div style="padding-top: 5px;">
        <h3>Response JSON</h3>
        <pre>{{result}}</pre>
      </div>
    </div>
  </page-layout>
</div>
</template>

<script>
import PageLayout from '../components/PageLayout'

const ARRAY_PARAM_REGEX = /^(\w+)\[(\d+)\]?/

const API_LIST = [
  "/open/v1/registry",
  "/open/v1/telnet",
  "/open/v1/ssh",
  "/open/v1/sshkey/copy",
  "/open/v1/udld",
  "/open/v1/udldinterfaces",
  "/open/v1/udldinterfaces/reset",
  "/open/v1/ovsdb",
  "/open/v1/udld/copy",
  "/open/v1/autodiscovery",
  "/open/v1/access",
  "/open/v1/portaccess",
  "/open/v1/loopprotection",
  "/open/v1/loopprotectioninterface",
  "/open/v1/dhcpv4client",
  "/open/v1/dhcpv4clientinterfaces",
  "/open/v1/dhcpv4clientlease",
  "/open/v1/dhcpv4snooping",
  "/open/v1/dhcpv4snoopinginterfaces",
  "/open/v1/dhcpv4snoopingbinding",
  "/open/v1/dhcpv4relay",
  "/open/v1/dhcpl2relay",
  "/open/v1/dhcpl2relayinterfaces",
  "/open/v1/dhcpv6client",
  "/open/v1/dhcpv6snooping",
  "/open/v1/dhcpv6clientinterfaces",
  "/open/v1/dhcpv6snoopingbinding",
  "/open/v1/dhcpv6snoopinginterfaces",
  "/open/v1/dhcpv6relay",
  "/open/v1/dhcpv6networkstats",
  "/open/v1/dhcpv6serviceportstats",
  "/open/v1/dhcpv6binding",
  "/open/v1/l2ol3basic",
  "/open/v1/l2ol3tunnels",
  "/open/v1/l2ol3tenantsystem",
  "/open/v1/serviceportinterface",
  "/open/v1/serviceportinterfaceneighbor",
  "/open/v1/networkinterface",
  "/open/v1/networkinterfaceneighbor",
  "/open/v1/dot1p",
  "/open/v1/cos",
  "/open/v1/cosinterfaces",
  "/open/v1/randomdetect",
  "/open/v1/randomdetectinterfaces",
  "/open/v1/snmpview",
  "/open/v1/snmpuser",
  "/open/v1/snmpconfig",
  "/open/v1/snmptree",
  "/open/v1/snmptrapsourceinterface",
  "/open/v1/snmpcommunity",
  "/open/v1/evb",
  "/open/v1/evbschannel",
  "/open/v1/evbvsi",
  "/open/v1/portsecuritytables",
  "/open/v1/portsecuritytables/move",
  "/open/v1/portsecurity",
  "/open/v1/portsecurityinterfaces",
  "/open/v1/mfdbs",
  "/open/v1/fdbs",
  "/open/v1/fdbstats",
  "/open/v1/scripts",
  "/open/v1/ports",
  "/open/v1/portadvertiseinterfaces",
  "/open/v1/vrfs",
  "/open/v1/vrfinterfaces",
  "/open/v1/clibanner",
  "/open/v1/protectedgroups",
  "/open/v1/protectedports",
  "/open/v1/multiconfig",
  "/open/v1/cutthroughconfig",
  "/open/v1/ipv4sourceguard",
  "/open/v1/ipv6sourceguard",
  "/open/v1/ipv4sourceguardverify",
  "/open/v1/ipv6sourceguardverify",
  "/open/v1/multiconfig",
  "/open/v1/snoopingconfig",
  "/open/v1/snoopinginterfaces",
  "/open/v1/snoopingvlans",
  "/open/v1/snoopingqueriers",
  "/open/v1/snoopingssms",
  "/open/v1/sfptransceiver",
  "/open/v1/flowctrl",
  "/open/v1/stpconfig",
  "/open/v1/stpinstances",
  "/open/v1/stpinstancedetail",
  "/open/v1/stpinstanceinterfaces",
  "/open/v1/stpinterfaces",
  "/open/v1/stpinterfacestats",
  "/open/v1/stpstats",
  "/open/v1/stpbpdu",
  "/open/v1/stpvlans",
  "/open/v1/stpvlandetail",
  "/open/v1/stpvlaninterfaces",
  "/open/v1/pfc",
  "/open/v1/vlans",
  "/open/v1/vlaninternal",
  "/open/v1/vlanmembers",
  "/open/v1/vlanparticipation",
  "/open/v1/vlaninterfaces",
  "/open/v1/makestatic",
  "/open/v1/macvlans",
  "/open/v1/privatevlans",
  "/open/v1/privatevlantype",
  "/open/v1/privatevlaninterfaces",
  "/open/v1/switchports",
  "/open/v1/ipsubnetvlans",
  "/open/v1/dvlan",
  "/open/v1/dvlaninterfaces",
  "/open/v1/login",
  "/open/v1/logout",
  "/open/v1/protovlans",
  "/open/v1/protovlaninterfaces",
  "/open/v1/sntp",
  "/open/v1/sntpserver",
  "/open/v1/linkdependencygroups",
  "/open/v1/linkdependencygroups/clear",
  "/open/v1/lldp",
  "/open/v1/lldpinterfaces",
  "/open/v1/lldpstats",
  "/open/v1/lldpstats/clear",
  "/open/v1/lldpinterfacesstats",
  "/open/v1/lldplocalstats",
  "/open/v1/lldpremotestats",
  "/open/v1/lldpremotestats/clear",
  "/open/v1/logging",
  "/open/v1/loggingbuffered",
  "/open/v1/loggingpersistent",
  "/open/v1/logginghosts",
  "/open/v1/loopbackinterfaces",
  "/open/v1/usb",
  "/open/v1/usb/eject",
  "/open/v1/sflowagent",
  "/open/v1/sflowsource",
  "/open/v1/sflowreceivers",
  "/open/v1/garp",
  "/open/v1/garpinterfaces",
  "/open/v1/gvrpconfig",
  "/open/v1/gvrpstats",
  "/open/v1/gvrpstats/clear",
  "/open/v1/gmrpconfig",
  "/open/v1/gmrpstats",
  "/open/v1/gmrpstats/clear",
  "/open/v1/mrp",
  "/open/v1/mrpinterfaces",
  "/open/v1/mvrpconfig",
  "/open/v1/mvrpstats",
  "/open/v1/mvrpstats/clear",
  "/open/v1/mmrpconfig",
  "/open/v1/mmrpstats",
  "/open/v1/mmrpstats/clear",
  "/open/v1/config/reload",
  "/open/v1/password/clock",
  "/open/v1/portmirror",
  "/open/v1/portmirrorrspan",
  "/open/v1/portmirrorsourceports",
  "/open/v1/clocksummerrecurring",
  "/open/v1/clocksummerdate",
  "/open/v1/clock",
  "/open/v1/ehmgroups",
  "/open/v1/ehmgroupconfig",
  "/open/v1/tacacsconfig",
  "/open/v1/tacacs",
  "/open/v1/password",
  "/open/v1/ipacls",
  "/open/v1/ipaclconfig",
  "/open/v1/ipaclremarks",
  "/open/v1/ipaclidconfig",
  "/open/v1/ipaclidremarks",
  "/open/v1/ipaclcounter/clear",
  "/open/v1/dhcpserverinterfaces",
  "/open/v1/dhcpserver",
  "/open/v1/dhcpserverprefixdelegation",
  "/open/v1/silenttime",
  "/open/v1/privilegelevels",
  "/open/v1/localuseraccounts",
  "/open/v1/localuseraccounts/unlock",
  "/open/v1/iasusers",
  "/open/v1/authenticationlist",
  "/open/v1/authenticationbinding",
  "/open/v1/authorizationlist",
  "/open/v1/authorizationbinding",
  "/open/v1/accountinglist",
  "/open/v1/accountingbinding",
  "/open/v1/accountingstat",
  "/open/v1/virtuallanrouting",
  "/open/v1/mgmdinterfaces",
  "/open/v1/mgmdgroups",
  "/open/v1/mgmdstats",
  "/open/v1/mgmdstats/clear",
  "/open/v1/ipv6acls",
  "/open/v1/ipv6aclconfig",
  "/open/v1/ipv6aclremarks",
  "/open/v1/ipv6aclcounter/clear",
  "/open/v1/iphelper",
  "/open/v1/iphelperstats",
  "/open/v1/ospf",
  "/open/v1/ospfinterface",
  "/open/v1/ospfinterfacestats",
  "/open/v1/ospfabr",
  "/open/v1/ospfnetworkarea",
  "/open/v1/ospfarea",
  "/open/v1/ospfasbr",
  "/open/v1/ospflsagroup",
  "/open/v1/ospfneighbors",
  "/open/v1/ospflsdb",
  "/open/v1/ospflsdbopaque",
  "/open/v1/ospfdatabasesummary",
  "/open/v1/ospfarearanges",
  "/open/v1/ospfvirtuallink",
  "/open/v1/ospfrouter/clear",
  "/open/v1/ospfstats",
  "/open/v1/ospfstubrouter",
  "/open/v1/ospfstubrouter/clear",
  "/open/v1/ospftraffic",
  "/open/v1/ospftrafficqueue",
  "/open/v1/ospfpolicies",
  "/open/v1/ptpinterfaces",
]

export default {
  data() {
    return {
      url: "",
      result: "",
      method: "get",
      params: [],
      isAdding: false,
      newKey: "",
      newValue: "",
      displayApiList: [],
    }
  },
  computed: {
    hasChecked: function () {
      return this.params.some(el => el.checked)
    },
  },
  created() {

  },
  components: {
    PageLayout,
  },
  methods: {
    urlInput : _.debounce(function (e) {
      if (this.url !== "") {
        this.displayApiList = API_LIST.filter( el => (el.indexOf(this.url) !== -1) )
      }
      else {
        this.displayApiList = []
      }
    }, 300),
    add () {
      let item = this.params.find( el => el.key === this.newKey)

      if (item) {
        item.value = this.newValue
        item.checked = false
      }
      else {
        let obj = {
          key: this.newKey,
          value: this.newValue,
          checked: false,
        }
        this.params.push(obj)
      }

      this.newKey = ""
      this.newValue = ""
      this.isAdding = false
    },
    cancelAdd () {
      this.newKey = ""
      this.newValue = ""
      this.isAdding = false
    },
    reset () {
      this.cancelAdd()
      this.params = []
      this.method = "get"
      this.result = ""
      this.url = ""
    },
    apply () {
      let reqParams =  {}
      this.result = ""
      this.$root.loadEnable = false

      this.params.forEach(el => {
        let arr = el.key.match(ARRAY_PARAM_REGEX)
        if (arr) {
          let in_index = parseInt(arr[2])
          let in_key = arr[1]

          if (!(in_key in reqParams)) {
            // init array
            reqParams[in_key] = []
          }
          reqParams[in_key][in_index] = el.value
        }
        else {
          reqParams[el.key] = el.value
        }
      })

      // ajax
      this.$http({
          method: this.method,
          url: this.url,
          params: reqParams,
        })
        .then( res => {
          this.result = JSON.stringify(res.data, null, 2)
          this.$root.loadEnable = true
        })
        .catch( (error) => {
          this.$root.loadEnable = true
        })
    },
    remove () {
      this.params = this.params.filter (el => !el.checked)
    },
    edit () {
      this.params.forEach( el => el.checked = false)
    },
  },
}
</script>
