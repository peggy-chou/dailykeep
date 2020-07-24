var express = require('express');
var router = express.Router();

console.log('RESTful api Login installed!')

// Sample Data
var sample_data = {

}

// Status
const STATUS_MSG = {
  response_code: 200,
  msg: 'OK',
  more_info: '',
  error_code: 0
}

const ERROR_STATUS_MSG = {
  response_code: 401,
  msg: 'Unauthorized',
  more_info: 'Invalid username or password.',
  error_code: -26
}

const USERNAME = "admin"
const PASSWORD = ""

router
  .post('/', (req, res) => {

    if ('username' in req.query && 'password' in req.query) {
      if (req.query.username === USERNAME && req.query.password === PASSWORD) {
        res.cookie('SID', 'thisisabook', {
          maxAge: 14400000,
        })
        res.json({
          SID: "thisisabook",
          accessLevel: 15,
          status: STATUS_MSG
        })
        return
      }
    }
    res.status(401).json({
      status: ERROR_STATUS_MSG
    })
  })

module.exports = router;
