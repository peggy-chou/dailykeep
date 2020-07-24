var qs = require('qs')
var _ = require('lodash')

var readEntriesFromTable = function (tableData, httpReq, key, allowReqFields) {
  let limit = 10
  let offset = 1
  let fields = []

  if ('limit' in httpReq.query) {
    limit = parseInt(httpReq.query.limit)
  }

  if ('offset' in httpReq.query) {
    offset = parseInt(httpReq.query.offset)
  }
  offset = offset -1
  limit = offset + limit
  limit = (limit > tableData.length)?tableData.length:limit

  if ('fields' in httpReq.query) {
    fields = httpReq.query.fields.split(',')
  }

  return tableData
    .filter( (el) => {
      if (key in httpReq.query) {
        return (el[key] === httpReq.query[key])
      }
      else {
        return true
      }
    })
    .slice(offset, limit)
    .map((el) => {
      let resObj = {}

      if (fields.length > 0) {
        foreach
        fields.forEach( (i) => {
          if (typeof el[i]!== 'undefined') {
            resObj[i] = el[i]
          }
        })
        resObj[key] = el[key]
      }
      else {
        resObj = el
      }
      return resObj
    })
}

var updateEntriesToTable = function (tableData, httpReq, key, allowReqFields) {
  tableData.filter( (el) => {
    return (el[key] == httpReq.query[key])
  })
  .forEach( (el) => {
    for (let i in httpReq.query) {
      if (allowReqFields.indexOf(i) != -1) {
        if (typeof el[i] === 'number') {
          el[i] = parseInt(httpReq.query[i])
        }
        else if (typeof el[i] === 'boolean') {
          el[i] = (httpReq.query[i] == 'true')
        }
        else {
          el[i] = httpReq.query[i]
        }
      }
    }
  })
}

var generateArrayQery = function  (httpReq, sampleObj){
  let tmpObj
  let arrayQery = {}
  tmpObj= qs.parse(httpReq.url.slice(2), {parseArrays: false})
  delete tmpObj['method']
  for(let key in tmpObj)
  {
    if(Array.isArray(sampleObj[key])) {
      arrayQery[key] = []
      for(let i in tmpObj[key]){
        arrayQery[key][i] = tmpObj[key][i]
      }
    }
    else {
       arrayQery[key] = tmpObj[key]
    }
  }
  return arrayQery
}

var updateEntriesToTableArrayType = function (tableData, reqQery, key, allowReqFields, isAllMachFlag) {
  let isError = false
  try{
    tableData.filter( (el) => {
      return (el[key] == reqQery[key])
    })
    .forEach( (el) => {
      for (let i in reqQery) {
        if (allowReqFields.indexOf(i) != -1) {
          //req data type is array, AAA:[1,2,3,4]
          if(isAllMachFlag) {
            for(let index=0;index<el[i].length;index++) {
              if(reqQery[i][index] === undefined) {
                isError = true
                throw BreakException
              } 
            }
          }
          for(let j in reqQery[i])
          {
            if(typeof el[i][j] === 'number') {
              el[i][j] = parseInt(reqQery[i][j])
            }
            else if (typeof el[i] === 'boolean') {
              el[i][j] = (reqQery[i][j] == 'true')
            }
            else{
              el[i][j] = reqQery[i][j]
            } 
          }
        }
      }
    })
  }
  catch(e){
    return isError
  }
}

//global type
var readDataFromObject  = function (objectData, httpReq, allowReqFields) {
  let fields = []
  let retObj = {}
  if ('fields' in httpReq.query) {
    fields = httpReq.query.fields.split(',')
  }

  Object
  .keys(objectData)
  .filter((key)=> {
    if(fields.length > 0) {
      return (fields.indexOf(key) >= 0)
    }
    else {
      return true
    }
  })
  .forEach((key)=> {
    let tmpObj = {}
    tmpObj[key] = objectData[key]
    retObj = Object.assign(retObj, tmpObj)
  }) 
  return retObj
}

//global type
var updateDataToObject = function (objectData, httpReq, allowReqFields) {
  let isError = false
  try{
    for (let key in httpReq.query) {
      if(key === 'method') {
        continue
      }
      if (allowReqFields.indexOf(key) >= 0) {
        if (typeof objectData[key] === 'number') {
          objectData[key] = parseInt(httpReq.query[key])
        }
        else if (typeof objectData[key] === 'boolean') {
          objectData[key] = (httpReq.query[key] == 'true')
        }
        else {
          objectData[key] = httpReq.query[key]
        }
      }
      else {
        isError = true
        throw BreakException
      }
    }
  }catch(e){
    return isError
  }
}

var strToArray = function(inputString) {
  let resultArray = []
  let tempArray = _.split(inputString, ',')

  tempArray.forEach( element => {
    if (element.includes('-')) {
      let head = Number.parseInt(_.split(element, '-')[0])
      let tail =  Number.parseInt(_.split(element, '-')[1])
      resultArray.push( _.range(head, tail+1) )
    }
    else {
      resultArray.push( _.parseInt(element) )
    }
  })
  return ( _.flattenDeep(resultArray) )
}

var arrayToStr = function(inputArr) {
  let current = inputArr[0]
  let tail = inputArr[0]
  let tempHead = 0
  let tempArray = []

  _.uniq(inputArr).forEach( (element, index, arr) => {
    current = element
    if ( element === arr[index+1] - 1 ) {
      if (tempHead === 0) tempHead = element
      tail = arr[index+1]
    }
    else {
      if ( (tempHead != 0) && (tail > tempHead) ) {
        let str = tempHead.toString() + "-" + tail.toString()
        tempArray.push(str)
        tempHead = 0
      }
      else if (tempHead === 0) {
        tempArray.push(element.toString())
      }
    }
  })
  return (tempArray.join())
}

var strToPortArray = function(inputString) {
  let resultArray = []
  let tempArray = []
  if(!inputString.includes(','))
    tempArray[0] = inputString
  else
    tempArray = inputString.split(',')

  tempArray.forEach( element => {
    if (element.includes('-')) {
      let head = element.split('-')[0]
      head = head.split('/')[1]    
      head =  Number.parseInt(head)
      let tail =  element.split('-')[1]
      tail = tail.split('/')[1]    
      tail =  Number.parseInt(tail)
      for(let i = head; i <= tail; ++i) {
        resultArray.push( '0/'+i )
      }
    }
    else {
      resultArray.push( element )
    }
  })
  return ( resultArray )
}

var isEmptyObject = function (e) {
  var t;
  for (t in e)
    return 0;
  return 1
}

var convertIpStringToInt = function(ipString) {
  if (_.isNumber(ipString))
  {
    return ipString
  }
  let ipStr = ipString.split('.')
  return (parseInt(ipStr[0]) << 24) + (parseInt(ipStr[1]) << 16) + (parseInt(ipStr[2]) << 8) + parseInt(ipStr[3])
}

module.exports = {
  readEntriesFromTable,
  updateEntriesToTable,
  updateEntriesToTableArrayType,
  generateArrayQery,
  readDataFromObject,
  updateDataToObject,
  strToArray,
  arrayToStr,
  strToPortArray,
  isEmptyObject,
  convertIpStringToInt
}
