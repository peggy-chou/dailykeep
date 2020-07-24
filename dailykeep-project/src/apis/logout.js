var express = require('express');
var router = express.Router();

console.log('RESTful api Logout installed!')

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

router
  .post('/', (req, res) => {
    res.clearCookie('SID');
    res.json({status: STATUS_MSG});
  })

module.exports = router;
