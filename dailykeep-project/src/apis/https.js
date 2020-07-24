var express = require('express');
var router = express.Router();

console.log('RESTful api https installed!')

// Sample Data
var sample_data = {
  mode: "enabled",
  port: 443,
  protocolLevel: "TLS1.2",
  maxSessions: 16,
  hardTimeout: 24,
  softTimeout: 60,
  certificateStatus: "Https ready",
  certificateGeneration: "false"
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
    let resObj = {}
    let fields = []

    if ('fields' in req.query) {
      fields = req.query.fields.split(',')
      for (let index in fields) {
        let fieldName = fields[index]
        if (fieldName in sample_data) {
          resObj[fieldName] = sample_data[fieldName]
        }
        else {
          res.status(500).json({status: {
            response_code: 500,
            msg: 'Error',
            more_info: 'Parameter not found',
            error_code: -29
          }})
          return
        }
      }
    }
    else {
      for (let i in sample_data) {
        resObj[i] = sample_data[i]
      }
    }
    resObj['status'] = STATUS_MSG
    res.json(resObj)
  })
  .put('/', (req, res) => {
    
    for (let i in req.query) {
      if (i in sample_data) {
        console.log(sample_data[i]) 
        if (typeof sample_data[i] == 'number') {
          
          sample_data[i] = parseInt(req.query[i])
        }
        else {
          sample_data[i] = req.query[i]
        }
      }
    }
    res.json({
      status: STATUS_MSG
    })
  })

module.exports = router;
