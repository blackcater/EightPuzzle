/**
 * 基础函数
 */

/**
 * 打乱数组
 * @param arr 需要打乱的数组
 * @returns {Array} 返回打乱后的数组
 */
function shuffleArr(arr) {
  let len = arr.length
    , i = len
    , tmp = null
    , iRandom = null
    , rArr = [];
  rArr = rArr.concat(arr);
  while(i-- ){
    if (i !== (iRandom = Math.floor(Math.random()*len))) {
      tmp = rArr[i];
      rArr[i] = rArr[iRandom];
      rArr[iRandom] = tmp;
    }
  }
  return rArr;
}

/**
 * 获取数据的逆序数, 奇数返回false, 偶数返回true
 * @param arr array 需要获取逆序数的数组
 * @param bol boolean 返回结果是否为布尔值的布尔值
 * @returns {number/boolean} 有第二个参数
 */
function getInversionNumber(arr, bol){
  let num = 0
    , len = arr.length;

  for (let i=0; i< len; i++ ){
    for (let j=i+1; j<len; j++){
      if(arr[i] > arr[j]) {
        num++;
      }
    }
  }

  if (!bol) {
    return num;
  } else {
    return (num%2 === 0);
  }
}

/**
 * 将数组转化为数据对象
 * @param arr
 * @returns {object}
 */
function transformArrToData(arr) {
  var obj = {};
  for (let i=0; i<arr.length; i++) {
    obj[arr[i]] = i+'';
  }
  return obj;
}

/**
 *
 */
function cloneArr(arr){
  let nArr = [];
  return nArr.concat(arr);
}

export default {
  shuffleArr: shuffleArr,
  getInversionNumber: getInversionNumber,
  transformArrToData: transformArrToData,
  cloneArr: cloneArr
};

export {shuffleArr, getInversionNumber, transformArrToData, cloneArr};
