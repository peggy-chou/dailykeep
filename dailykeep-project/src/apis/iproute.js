var express = require('express');
var router = express.Router();
var apis = require('./apis.js');

console.log('RESTful api IP Route installed!')

// Sample Data

var sample_data = {
  ipAddresses: [ 
    {
      nextHopInfo: [
        {
          nextHop: "directly connected",
          timestamp: "",
          description: "",
          interface: "0/3"
        }
      ],
      metric: 1,
      routeType: "C",
      preference: 0,
      ipWithMask: "1.1.1.0/24"
    },
    {
      nextHopInfo: [
        {
          nextHop: "directly connected",
          timestamp: "",
          description: "",
          interface: "0/3"
        }
      ],
      metric: 0,
      routeType: "C",
      preference: 0,
      ipWithMask: "10.10.10.0/24"
    },
    {
      nextHopInfo: [
        {
          nextHop: "10.10.10.10",
          timestamp: "",
          description: "testttt5",
          interface: "0/3"
        }
      ],
      metric: 0,
      routeType: "S U    ",
      preference: 0,
      ipWithMask: "10.10.20.0/24"
    },
    {
      nextHopInfo: [
        {
          nextHop: "1.1.1.5",
          timestamp: "",
          description: "",
          interface: "0/3"
        }
      ],
      metric: 0,
      routeType: "S",
      preference: 22,
      ipWithMask: "10.10.30.0/24"
    },
    {
      nextHopInfo: [
        {
          nextHop: "directly connected",
          timestamp: "",
          description: "",
          interface: "loopback_1"
        }
      ],
      metric: 0,
      routeType: "C",
      preference: 0,
      ipWithMask: "11.11.111.0/24"
    },
    {
      nextHopInfo: [
        {
          nextHop: "",
          timestamp: "",
          description: "",
          interface: "0/3"
        }
      ],
      metric: 0,
      routeType: "S",
      preference: 1,
      ipWithMask: "30.10.30.0/24"
    },
    {
      nextHopInfo: [
        {
          nextHop: "10.10.10.2",
          timestamp: "",
          description: "",
          interface: "0/3"
        }
      ],
      metric: 0,
      routeType: "S",
      preference: 150,
      ipWithMask: "200.200.200.0/24"
    },
    {
      nextHopInfo: [
        {
          nextHop: "10.10.10.2",
          timestamp: "",
          description: "",
          interface: "0/3"
        }
      ],
      metric: 0,
      routeType: "S",
      preference: 150,
      ipWithMask: "210.200.200.0/24"
    },
    {
      nextHopInfo: [
        {
          nextHop: "10.10.10.2",
          timestamp: "",
          description: "",
          interface: "0/3"
        }
      ],
      metric: 0,
      routeType: "S",
      preference: 150,
      ipWithMask: "220.200.200.0/24"
    },
    {
      nextHopInfo: [
        {
          nextHop: "10.10.10.2",
          timestamp: "",
          description: "",
          interface: "0/3"
        }
      ],
      metric: 0,
      routeType: "S",
      preference: 150,
      ipWithMask: "230.200.200.0/24"
    },
    {
      nextHopInfo: [
        {
          nextHop: "10.10.10.2",
          timestamp: "",
          description: "",
          interface: "0/3"
        }
      ],
      metric: 0,
      routeType: "S",
      preference: 150,
      ipWithMask: "240.200.200.0/24"
    },
    {
      nextHopInfo: [
        {
          nextHop: "10.10.10.2",
          timestamp: "",
          description: "",
          interface: "0/3"
        }
      ],
      metric: 0,
      routeType: "S",
      preference: 150,
      ipWithMask: "250.200.200.0/24"
    },
    {
      nextHopInfo: [
        {
          nextHop: "10.10.10.2",
          timestamp: "",
          description: "",
          interface: "0/3"
        }
      ],
      metric: 0,
      routeType: "S",
      preference: 150,
      ipWithMask: "260.200.200.0/24"
    },
  ],
}

// Status
const STATUS_MSG = {
  response_code: 200,
  msg: 'OK',
  more_info: '',
  error_code: 0
}

router
  .get('/', (req, res) => {
    res.json({
      ipAddresses: apis.readEntriesFromTable(sample_data.ipAddresses, req, 'ipAddress'),
      count: sample_data.ipAddresses.length,
      status: STATUS_MSG
    })
  })
  .put('/', (req, res) => {
    sample_data.ipAddresses.forEach( (el, index, arr) => {
      if (el.ipWithMask == req.query.ipWithMask) {
        el.nextHopInfo.forEach( (nexthop, nexthopIndex, nexthopArr)=>{
          if (nexthop.nextHop == req.query.nexthopIp || nexthop.interface == req.query.interface) {
            sample_data.ipAddresses[index].nextHopInfo[nexthopIndex].description = 
              (req.query.description == undefined)?'':req.query.description
            sample_data.ipAddresses[index].preference = 
              (req.query.preference == undefined)?'':req.query.preference
          }
        })
      }
    })
    res.json({
      status: STATUS_MSG
    })
  })
  .post('/', (req,res) => {
    var nextHop = ''
    var intf = ''
    var cidr = 0; 
    var maskNodes = req.query.subnetMask.match(/(\d+)/g); 
    for(var i in maskNodes) 
    {
      cidr += (((maskNodes[i] >>> 0).toString(2)).match(/1/g) || []).length; 
    }
    var ipWithMask = req.query.ipAddress+'/'+cidr

    if (req.query.nextHop == 'null0') {
      nextHop = req.query.nextHop
    }
    else if (req.query.nextHop == 'nexthopIp') {
      nextHop = req.query.nexthopIp
    }
    else if (req.query.nextHop == 'interface') {
      nextHop = ''
      intf = req.query.interface
    }
    else if (req.query.nextHop == 'vlanId') {
      nextHop = ''
      intf = 'vlan ' + req.query.vlanId
    }
    var obj = []
    obj.push({
      nextHop: nextHop,
      description: (req.query.description == undefined)?'':req.query.description,
      interface: intf,
      timestamp: '',
    })
    sample_data.ipAddresses.forEach( (el, index, arr) => {
      if (el.ipWithMask == ipWithMask) {
        el.nextHopInfo.push({obj})
      }
    })

    sample_data.ipAddresses.push({
      ipWithMask: ipWithMask,
      routeType: 'S',
      metric: 0,
      preference: (req.query.preference == undefined)?0:req.query.preference,
      nextHopInfo: obj
    })

    res.json({ 
      status: STATUS_MSG 
    })
  })
  .delete('/', (req, res) => {
    sample_data.ipAddresses.forEach( (el, index, arr) => {
      if (el.ipWithMask == req.query.ipWithMask) {
        if (el.nextHopInfo.length == 1) {
          sample_data.ipAddresses.splice(index, 1)
        }
        else {
          el.nextHopInfo.forEach( (nexthop, nexthopIndex, arr)=>{
            if (nexthop.nexthopIp == req.query.nexthopIp && nexthop.interface == req.query.interface) {
              sample_data.ipAddresses[index].nextHopInfo.splice(nexthopIndex, 1)
            }
          })
        }
      }
    })
    res.json({ 
      status: STATUS_MSG 
    })
  })
module.exports = router;
