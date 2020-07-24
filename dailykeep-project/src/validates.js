import Vue from 'vue'
import VeeValidate from 'vee-validate'
import * as RegexpRules from './regexpRule'

Vue.use(VeeValidate)

//validate between
export const betweenValidator = {
  getMessage(field, params, data) {
    return 'The field must be a number and between ' + params[0] + ' and ' + params[1] + '.'
  },
  validate(value, obj) {
    return ( (value >= parseInt(obj[0])) && (value <= parseInt(obj[1])) )
  }
}

//validate specify number and range
export const specify_rangeValidator = {
  getMessage(field, params, data) {
    return 'The field must be a number and between ' + params[1] + ' and ' + params[2] + ' or equal to ' + params[0] + '.'
  },
  validate(value, obj) {
    return ( (value >= parseInt(obj[1])) && (value <= parseInt(obj[2])) || (value == parseInt(obj[0]))  )
  }
}

//validate betweenInteger
export const integerValidator = {
  getMessage(field, params, data) {
    return 'The field must be an integer.'
  },
  validate(value, obj) {
    return ( RegexpRules.integerPatt.test(value)  )
  }
}

//validate max
export const maxValidator = {
  getMessage(field, params, data) {
    return 'This field may not be greater than ' + params + ' characters.'
  },
  validate(value, obj) {
    return ( value.toString().length <= parseInt(obj) )
  }
}

//validate min
export const minValidator = {
  getMessage(field, params, data) {
    return 'This field must be at least ' + params + ' characters.'
  },
  validate(value, obj) {
    return ( value.toString().length >= parseInt(obj) )
  }
}

//validate max_value
export const max_valueValidator = {
  getMessage(field, params, data) {
    return 'This field must be ' + params + ' or less.'
  },
  validate(value, obj) {
    return ( value <= parseInt(obj) )
  }
}

//validate min_value
export const min_valueValidator = {
  getMessage(field, params, data) {
    return 'This field must be ' + params + ' or more.'
  },
  validate(value, obj) {
    return ( value >= parseInt(obj) )
  }
}

//validate require
export const requiredValidator = {
  getMessage(field, params, data) {
    return 'This field is required.'
  },
  validate(value) {
    return RegexpRules.requiredPatt.test(value)
  }
}

// validate
export const macAddrValidator = {
  getMessage(field, params, data) {
    return 'Invalid MAC Address.'
  },
  validate(value) {
    return RegexpRules.macPatt.test(value)
  }
}

// ipv4 validator
export const ipv4Validator = {
  getMessage(field, params=[], data) {
    let [error] = params
    return error || 'Invalid IPv4 Address.'
  },
  validate(value) {
    return RegexpRules.ipv4Patt.test(value)
  }
}

export const ipv4SubnetValidator = {
  getMessage(field, params, data) {
    return 'Invalid IPv4 prefix or prefix Length.'
  },
  validate(value) {
    return RegexpRules.ipv4SubnetPatt.test(value)
  }
}

// ipv4&ipv6 Address validator
export const ipAddrValidator = {
  getMessage(field, params, data) {
    return 'Invalid IP Address.'
  },
  validate(value) {
    return RegexpRules.ipAddrPatt.test(value)
  }
}

// submask vaildator
export const submaskValidator = {
  getMessage(field, params, data) {
    return 'Invalid Mask Address.'
  },
  validate(value) {
    return RegexpRules.submaskPatt.test(value)
  }
}

// ipv6 validator
export const ipv6Validator = {
  getMessage(field, params, data) {
    return 'Invalid IPv6 Address.'
  },
  validate(value) {
    return RegexpRules.ipv6Patt.test(value)
  }
}

// IPv6 Address validator
export const ipv6AddrValidator = {
  getMessage(field, params, data) {
    return 'Invalid IPv6 Address.'
  },
  validate(value) {
    return RegexpRules.ipv6AddrPatt.test(value)
  }
}

// IPv6 prefix and prefix length validator
export const ipv6AddrPrefixValidator = {
  getMessage(field, params, data) {
    return 'Invalid IPv6 prefix/prefix length.'
  },
  validate(value) {
    return RegexpRules.ipv6AddrPrefixPatt.test(value)
  }
}

// hex validator
export const hexValidator = {
  getMessage(field, params, data) {
    return 'Invalid HEX value.'
  },
  validate(value) {
    return RegexpRules.hexPatt.test(value)
  }
}

// line length validator
export const lineValidator = {
  getMessage(field, params, data) {
    return 'Terminal Length must be in the range of 5 to 48 or 0.'
  },
  validate(value) {
    return RegexpRules.linePatt.test(value)
  }
}

// sntp Client Port validator
export const sntpClientPortValidator = {
  getMessage(field, params, data) {
    return 'SNTP Client Port must be the value 0 or 123 or in the range from 1025 to 65535.'
  },
  validate(value) {
    return RegexpRules.sntpClientPortPatt.test(value)
  }
}

// hex between validator
export const hexBetweenValidator = {
  getMessage(field, params, data) {
    return 'The field must be between ' + params[0] + ' and ' + params[1] + '.'
  },
  validate(value, obj) {
    return ( (parseInt(value, 16) >= parseInt(obj[0], 16)) && (parseInt(value, 16) <= parseInt(obj[1], 16)) )
  }
}

// TOR only. Interface validtor
export const interfaceValidator = {
  getMessage(field, params, data) {
    return 'Invalid Interface.'
  },
  validate(value) {
    return RegexpRules.interfacePatt.test(value)
  }
}

// TOR only. Interface 0/1~0/78 validtor
export const port78Validator = {
  getMessage(field, params, data) {
    return 'Invalid Interface.'
  },
  validate(value) {
    return RegexpRules.port78Patt.test(value)
  }
}

// TOR only. Interface 0/1~0/128 validtor
export const port128Validator = {
  getMessage(field, params, data) {
    return 'Invalid Interface.'
  },
  validate(value) {
    return RegexpRules.port128Patt.test(value)
  }
}

// TOR only. Interface with serviceport/networkport validtor
export const srcIntfValidator = {
  getMessage(field, params, data) {
    return 'Invalid Source Interface.'
  },
  validate(value) {
    return RegexpRules.srcIntfPatt.test(value)
  }
}

// DNS validtor
export const dnsValidator = {
  getMessage(field, params, data) {
    return 'Invalid DNS.'
  },
  validate(value) {
    return RegexpRules.dnsPatt.test(value)
  }
}

// TOR only. Ports validtor.
export const portsValidator = {
  getMessage(field, params=[], data) {
    let [error] = params
    return error || 'Invalid Ports.'
  },
  validate(value , obj) {
    let array = []
    let success = true
    value.split(",").some((entry) => {
      let data = entry.split("-")
      let port = []
      let contData = []

      if (data.length == 1) {
        entry = entry.trim()
        if (entry.match(RegexpRules.port128Patt)||entry.match(RegexpRules.lagPatt)) {
          array.push(entry)
        }
        else {
          if (typeof obj[0] !== 'undefined' && obj[0] == 'accept0/0' &&
            (entry.match(RegexpRules.portZeroPatt))) {
            array.push(entry)
          }
          else
          {
            success = false
            return false
          }
        }
      }
      else {
        data[0] = data[0].trim()
        data[1] = data[1].trim()
        if (!(data[0].match(RegexpRules.port128Patt)||data[0].match(RegexpRules.lagPatt)) ||
            !(data[1].match(RegexpRules.port128Patt)||data[1].match(RegexpRules.lagPatt))) {
            success = false
            return false
        }

        port[0] = (data[0][0]==0) ? data[0].replace(/0[/]+/g, "") : data[0].replace(/3[/]+/g, "")
        port[1] = (data[1][0]==0) ? data[1].replace(/0[/]+/g, "") : data[1].replace(/3[/]+/g, "")

        if (data[0][0]==0 && data[1][0]==3) {
          contData = _.concat( _.map(_.range( _.parseInt(port[0]), 79), i=>( data[0][0] + '/' + i.toString())),
                               _.map(_.range(1, _.parseInt(port[1])+1), i=>( data[1][0] + '/' + i.toString())))
        }
        else {
          contData = _.map( _.range(_.parseInt(port[0]), _.parseInt(port[1])+1),
                            i => ( data[0][0] + '/' + i.toString()))
        }
        array = _.concat(array, contData)        
      }
    })

    if (_.uniq(array).length !== array.length) {
        return false
    }
    return (success)?true:false
  }
}

// TOR only. VLAN format as 4/x validtor.
export const portVlanValidator = {
  getMessage(field, params, data) {
    return 'Invalid VLAN format. Please enter VLAN format as 4/x.'
  },
  validate(value) {
    return RegexpRules.portVlanPatt.test(value)
  }
}

export const portsVlanValidator = {
  getMessage(field, params, data) {
    return 'Invalid Ports.'
  },
  validate(value) {
    return RegexpRules.portsVlanPatt.test(value)
  }
}

// TOR only. Interface Loopback format as 6/x validtor.
export const portLoopbackValidator = {
  getMessage(field, params, data) {
    return 'Invalid Loopback format. Please enter Loopback format as 6/x.'
  },
  validate(value) {
    return RegexpRules.portLoopbackPatt.test(value)
  }
}

// TOR only. Lag validtor.
export const lagValidator = {
  getMessage(field, params, data) {
    return 'Invalid Lag.'
  },
  validate(value , obj) {
    let array = []
    let success = true
    value.split(",").some((entry) => {
      let data = entry.split("-")
      let port = []
      let contData = []

      if (data.length == 1) {
        entry = entry.trim()
        if (entry.match(RegexpRules.lagPatt)) {
          array.push(entry)
        }
        else {
          success = false
          return false
        }
      }
      else {
        data[0] = data[0].trim()
        data[1] = data[1].trim()
        if (!(data[0].match(RegexpRules.port128Patt)||data[0].match(RegexpRules.lagPatt)) ||
            !(data[1].match(RegexpRules.port128Patt)||data[1].match(RegexpRules.lagPatt))) {
            success = false
            return false
        }

        port[0] = (data[0][0]==0) ? data[0].replace(/0[/]+/g, "") : data[0].replace(/3[/]+/g, "")
        port[1] = (data[1][0]==0) ? data[1].replace(/0[/]+/g, "") : data[1].replace(/3[/]+/g, "")

        if (data[0][0]==0 && data[1][0]==3) {
          contData = _.concat( _.map(_.range( _.parseInt(port[0]), 79), i=>( data[0][0] + '/' + i.toString())),
                               _.map(_.range(1, _.parseInt(port[1])+1), i=>( data[1][0] + '/' + i.toString())))
        }
        else {
          contData = _.map( _.range(_.parseInt(port[0]), _.parseInt(port[1])+1),
                            i => ( data[0][0] + '/' + i.toString()))
        }
        array = _.concat(array, contData)        
      }
    })

    if (_.uniq(array).length !== array.length) {
        return false
    }
    return (success)?true:false
  }
}

// VLAN validtor
export const vlanValidator = {
  getMessage(field, params, data) {
    return 'Invalid VLAN.'
  },
  validate(value) {
    if (!value.match(RegexpRules.vlanPatt)) {
          return false
      }
      let array = []

      value.split(",").forEach((s) => {
        let data = s.split("-")
        let contData = []

        if (data.length == 1) array.push(s)
        else {
          contData = _.range(_.parseInt(data[0]), _.parseInt(data[1])+1)
          contData = _.map(contData, i => i.toString())
          array = _.concat(array, contData)
        }
      })

      if (_.uniq(array).length !== array.length) {
          return false
      }

      return true
  }
}

export const dvlanValidator = {
  getMessage(field, params, data) {
    return 'Invalid Ethertype. Max to 4 ethertypes.'
  },
  validate(value) {
    return RegexpRules.dvlanPatt.test(value)
  }
}

export const acronymValidator = {
  getMessage(field, params, data) {
    return 'IInvalid acronym. Up to 4 chars.'
  },
  validate(value) {
    return RegexpRules.acronymPatt.test(value)
  }
}

export const tzValidator = {
  getMessage(field, params, data) {
    return 'Invalid time zone format. <-12:00 ~ 14:00>'
  },
  validate(value) {
    return RegexpRules.tzPatt.test(value)
  }
}

export const dateValidator = {
  getMessage(field, params, data) {
    return 'Invalid date format. Format is hh:mm:ss. Valid Range for hh:0-23 mm: 0-59 ss: 0-59.'
  },
  validate(value) {
    return RegexpRules.datePatt.test(value)
  }
}

export const summerValidator = {
  getMessage(field, params, data) {
    return 'Invalid date format. Use hh:mm_DD/MM/YYYY(2000-2097)'
  },
  validate(value) {
    return RegexpRules.summerPatt.test(value)
  }
}

export const weekValidator = {
  getMessage(field, params, data) {
    return 'Invalid date format. Use hh:mm_DD/WW/MM DD: 1(Sun)~7(Sat) WW: 1~5(Week) MM: 1~12(Month)'
  },
  validate(value) {
    return RegexpRules.weekPatt.test(value)
  }
}

export const timeValidator = {
  getMessage(field, params, data) {
    return 'Invalid date format. Format is hh:mm. Valid Range for hh:0-23 mm: 0-59.'
  },
  validate(value) {
    return RegexpRules.timePatt.test(value)
  }
}

export const pwdExcludeValidator = {
  getMessage(field, params, data) {
    return 'Invalid Password Exclude Keywords format. Max to 3 keywords.'
  },
  validate(value) {
    let array = []
    value.split(",").some((entry) => {
      array.push(entry)
    })
    if (_.uniq(array).length !== array.length) {
        return false
    }
    return RegexpRules.pwdExcludePatt.test(value)
  }
}

export const duidValidator = {
  getMessage(field, params, data) {
    return 'Invalid duid format.'
  },
  validate(value) {
    return RegexpRules.duidPatt.test(value)
  }
}

export const valCoValValidator = {
  getMessage(field, params, data) {
    return 'Invalid ASN:Value or IP:Value.'
  },
  validate(value) {
    return RegexpRules.valCoValPatt.test(value)
  }
}

export const ethertypeValidator = {
  getMessage(field, params, data) {
    return 'Invalid Ethertype.'
  },
  validate(value) {
    return RegexpRules.ethertypePatt.test(value)
  }
}
export const ethertypeOpenFlowValidator = {
  getMessage(field, params, data) {
    return 'Invalid Ethertype.'
  },
  validate(value) {
    return RegexpRules.ethertypeOpenFlowPatt.test(value)
  }
}
export const dscpValidator = {
  getMessage(field, params, data) {
    return 'The DSCP value in the range of 0 to 63 or a DSCP keyword (af11, af12, af13, af21, af22, af23, af31, af32, af33, af41, af42, af43  be, cs0, cs1, cs2, cs3, cs4, cs5, cs6, cs7, ef).'
  },
  validate(value) {
    return RegexpRules.dscpPatt.test(value)
  }
}

export const dscpQosValidator = {
  getMessage(field, params, data) {
    return 'The DSCP value must be in the range of (10, 12, 14, 18, 20, 22, 26, 28, 30, 34, 36, 38, 0, 8, 16, 24, 32, 40, 48, 56, 46) or a DSCP keyword (af11, af12, af13, af21, af22, af23, af31, af32, af33, af41, af42, af43  be, cs0, cs1, cs2, cs3, cs4, cs5, cs6, cs7, ef).'
  },
  validate(value) {
    return RegexpRules.dscpQosPatt.test(value)
  }
}

export const tosValidator = {
  getMessage(field, params, data) {
    return 'Invalid TOS. Use 00 ~ FF'
  },
  validate(value) {
    return RegexpRules.tosPatt.test(value)
  }
}

export const ipProtocolValidator = {
  getMessage(field, params, data) {
    return 'Invalid IP Protocol. Use 1 ~ 254'
  },
  validate(value) {
    return RegexpRules.ipProtocolPatt.test(value)
  }
}

export const l4PortValidator = {
  getMessage(field, params, data) {
    return 'Invalid L4 port. Use 0 ~ 65535'
  },
  validate(value) {
    return RegexpRules.l4PortPatt.test(value)
  }
}

export const halfCharValidator = {
  getMessage(field, params, data) {
    return 'Invalid half-characters format.'
  },
  validate(value) {
    return RegexpRules.halfPatt.test(value)
  }
}

export const notQuotValidator = {
  getMessage(field, params, data) {
    return 'Allow up to 2000 half-characters, also allow special symbols, except for the ‘"’.'
  },
  validate(value) {
    return RegexpRules.notQuotPatt.test(value)
  }
}

export const authenMethodLoginValidator = {
  getMessage(field, params, data) {
    return 'Invalid Authentication Method Login format.'
  },
  validate(value) {
    let array = []
    value.split(",").some((entry) => {
      array.push(entry)
    })
    if (_.uniq(array).length !== array.length) {
        return false
    }
    return RegexpRules.authenMethodLoginPatt.test(value)
  }
}

export const authenMethodEnableValidator = {
  getMessage(field, params, data) {
    return 'Invalid Authentication Method Enable format.'
  },
  validate(value) {
    let array = []
    value.split(",").some((entry) => {
      array.push(entry)
    })
    if (_.uniq(array).length !== array.length) {
        return false
    }
    return RegexpRules.authenMethodEnablePatt.test(value)
  }
}

export const authenMethodHttpHttpsValidator = {
  getMessage(field, params, data) {
    return 'Invalid Authentication Method HTTP/HTTPS format.'
  },
  validate(value) {
    let array = []
    value.split(",").some((entry) => {
      array.push(entry)
    })
    if (_.uniq(array).length !== array.length) {
        return false
    }
    return RegexpRules.authenMethodHttpHttpsPatt.test(value)
  }
}

export const authenListNameValidator = {
  getMessage(field, params, data) {
    return 'default, defaultList, networkList, enableList and enableNetList are reserved.'
  },
  validate(value) {
    if (value === 'default' || value === 'defaultList' || value === 'networkList' ||
        value === 'enableList' || value === 'enableNetList') {
      return false
    }
    else {
      return true
    }
  }
}

export const authenMethodDefaultListValidator = {
  getMessage(field, params, data) {
    return 'Error! The list is already applied to console. Removal of local or enable method is not valid'
  },
  validate(value) {
    let flag = 0
    value.split(",").some((entry) => {
      if (entry === 'local' || entry === 'enable') {
        flag = 1
      }
    })
    if (flag === 1) {
      return true
    }
    else {
      return false
    }
  }
}

export const authenMethodEnableListValidator = {
  getMessage(field, params, data) {
    return 'The list is already applied to console. Removal of enable method is not valid'
  },
  validate(value) {
    let flag = 0
    value.split(",").some((entry) => {
      if (entry === 'enable') {
        flag = 1
      }
    })
    if (flag === 1) {
      return true
    }
    else {
      return false
    }
  }
}

export const authorListNameValidator = {
  getMessage(field, params, data) {
    return 'defaultList and dfltCmdAuthList are reserved.'
  },
  validate(value, obj) {
    if (value === 'default' || value === 'dfltCmdAuthList' ) {
      return false
    }
    else {
      return true
    }
  }
}

export const accountListNameValidator = {
  getMessage(field, params, data) {
    return 'default, dfltExecList, dfltCmdList and dfltDot1xList are reserved.'
  },
  validate(value, obj) {
    if (value === 'default' || value === 'dfltExecList' || value === 'dfltCmdList' || value === 'dfltDot1xList' ) {
      return false
    }
    else {
      return true
    }
  }
}

export const routerIdValidator = {
  getMessage(field, params, data) {
    return 'Invalid Router ID.'
  },
  validate(value) {
    return RegexpRules.routerIdPatt.test(value)
  }
}

export const areaIdValidator = {
  getMessage(field, params, data) {
    return 'Invalid Area ID.'
  },
  validate(value) {
    return RegexpRules.areaIdPatt.test(value)
  }
}

export const clusterIdValidator = {
  getMessage(field, params, data) {
    return 'Enter the cluster ID as an integer or in dotted notation in the range <1-4294967295>'
  },
  validate(value) {
    return RegexpRules.clusterIdPatt.test(value)
  }
}

export const betweenUnlimitValidator = {
  getMessage(field, params, data) {
    return 'The field must be unlimited or between ' + params[0] + ' and ' + params[1] + '.'
  },
  validate(value, obj) {
    return ( (value >= parseInt(obj[0])) && (value <= parseInt(obj[1])) )
  }
}

export const updateSrcValidator = {
  getMessage(field, params, data) {
    return 'Accept [slot/port], [vlan_<1-4093>] or [loopback_<0-63>]'
  },
  validate(value, obj) {
    let ret
    if (obj[0] === 'ET-9032BF-FOS')
    {
      ret = RegexpRules.port128Patt.test(value)
    }
    else
    {
      ret = RegexpRules.port78Patt.test(value)
    }

    if (ret == false)
    {
      ret = RegexpRules.vlanInterfacePatt.test(value)

      if (ret == false)
      {
        ret = RegexpRules.loopbackInterfacePatt.test(value)
      }
    }

    return ret
  }
}

export const interfaceVlanValidator = {
  getMessage(field, params, data) {
    return 'Accept [slot/port] or [vlan_<1-4093>]'
  },
  validate(value, obj) {
    let ret
    if (obj[0] === 'ET-9032BF-FOS')
    {
      ret = RegexpRules.port128Patt.test(value)
    }
    else
    {
      ret = RegexpRules.port78Patt.test(value)
    }

    if (ret == false)
    {
      ret = RegexpRules.vlanInterfacePatt.test(value)
    }

    return ret
  }
}

export const fcmapValidator = {
  getMessage(field, params, data) {
    return 'Enter values in the range 0x0 to 0xffffff.'
  },
  validate(value) {
    return RegexpRules.fcmapPatt.test(value)
  }
}

export const portPhysicalLagValidator = {
  getMessage(field, params, data) {
    return 'Invalid interface, it should be physical port or LAG port [slot/port].'
  },
  validate(value, obj) {
    let ret
    if (obj[0] === 'ET-9032BF-FOS')
    {
      ret = RegexpRules.port128Patt.test(value)
    }
    else
    {
      ret = RegexpRules.port78Patt.test(value)
    }

    if (ret == false)
    {
      ret = RegexpRules.lagPatt.test(value)
    }

    return ret
  }
}