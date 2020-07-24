/* Custom Utils - put common functions here */

export const strToArray = function(inputString) {
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

export const arrayToStr = function(inputArr) {
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


export const generateSentData = function(dataSetObj, dataCurrentObj, mode){
  let dataSendArray = []
  let dbChanges = []
  let tmpObj = {}
  for(let y in dataSetObj)
  {
    if(!_.isEqual(dataSetObj[y], dataCurrentObj[y])) {
      if(_.isArray(dataSetObj[y])) {
        let tmpObj2 = {}
        tmpObj2[y] = []
        dataSetObj[y].forEach((element, index) => {
          if(!_.isEqual(element, dataCurrentObj[y][index])) {
            if(isNaN(Number(element))){
              tmpObj2[y][index] = element
            }
            else {
              tmpObj2[y][index]  = Number(element)
            }
            if(dbChanges.indexOf(index) < 0) {
              dbChanges.push(index)
            }
          }
        })
        dataSendArray.push(tmpObj2)
      }
      else{
        tmpObj[y] = dataSetObj[y]
      }
    }
  }
  if(Object.keys(tmpObj).length > 0){
    dataSendArray.push(tmpObj)
  }
  switch(mode) {
    case 'dataSendArray' : 
      return dataSendArray
    case 'dbChanges' : 
      return dbChanges.sort()
    default:
      return (dataSendArray.length === 0)
  }
}

export const generateSentDataArrayType = function(dataSetArray, dataCurrentArray, mode){
  let dataSendArray = []
  let dbChanges = []
  let tmpObj = []
  for(let y in dataSetArray)
  {
    if(!_.isEqual(dataSetArray[y], dataCurrentArray[y])) {
      if(dbChanges.indexOf(y) < 0) {
        dbChanges.push(y)
      }
      tmpObj.push(dataSetArray[y])
    }
  }
  if(Object.keys(tmpObj).length > 0 ){
    dataSendArray = tmpObj
  }
  switch(mode) {
    case 'dataSendArray' : 
      return dataSendArray
    case 'dbChanges' : 
      return dbChanges.sort()
    default:
      return (dataSendArray.length === 0)
  }
}

export const ipToInteger = function(inputString) {
  return inputString.split('.').reduce(function(ipInt, octet) { return (ipInt<<8) + parseInt(octet, 10)}, 0) >>> 0;
}

export const integerToIp = function(ipInt) {
  return ( (ipInt>>>24) +'.' + (ipInt>>16 & 255) +'.' + (ipInt>>8 & 255) +'.' + (ipInt & 255) );
}