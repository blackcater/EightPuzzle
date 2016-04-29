// 八数码值
let EIGHT_NUMBER = [1, 2, 3, 4, 5, 6, 7, 8, 0];

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
    return (4%2 === 0);
  }
}

export default {
  shuffleArr: shuffleArr,
  getInversionNumber: getInversionNumber
}
