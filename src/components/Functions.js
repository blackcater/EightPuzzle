/**
 * 基础函数
 */

import STEP from '../stores/step.json';
import DIRECTION from '../stores/direction.json';

/**
 * 打乱数组
 *
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
 *
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
 *
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
 * 数组拷贝
 *
 * @param arr
 * @returns {Array.<int>} 返回新的数组
 */
function cloneArr(arr){
  let nArr = [];
  return nArr.concat(arr);
}


/**
 * 八数码核心算法部分, 采用启发式的算法, 返回其间交换的过程
 * 启发式算法的核心是公式: f(x) = a*g(x)+b*h(x)
 *        f(x) : 为表达式的结果, 越小越好
 *        g(x) : 表示对应位置相等的个数
 *        h(x) : 不在位上的数字到达对应位置需要走多少步之和
 *        a    : g(x)的系数 为正数
 *        b    : h(x)的系数 为负数
 *
 * @param sState 开始的状态
 * @param eState 结束的状态
 * @param a int 5
 * @param b int -1
 * @returns {Array} 返回交换过程
 */
function getExchangeProcess(sState, eState, a=5, b=-1) {
  let tiktok = [];
  sState = cloneArr(sState);
  eState = cloneArr(eState);
  while (sState.join(', ') != eState.join(eState)) {
    let index = sState.indexOf(0); // 0所在的位置
    let directions = DIRECTION[index];
    let mayStates = {}; // 存储所有可能的状态 ----- 4个方向变化之后的状态
    // let maySteps = {}; // 4个新状态下的不在位数据到达位置所需要的步数之和

    // 获取4个新状态
    for (let direct in directions) {
      mayStates[direct] = getExchangeState(sState, index, directions[direct], direct);
    }

    // 获取最好的变化结果
    let result = getExchangeResult(mayStates, eState, a, b);
    sState = result.sState;
    tiktok.push(result.result);
  }

  return tiktok;
}

/**
 * 获取最优的变化结果
 *
 * 结果的选择是通过 启发式算法得到的, 公式为 : f(x) = a*g(x)+b*h(x)
 *
 * @param mayStates {array} 可能会到达的状态
 * @param eState {array} 结束状态
 * @param a {int} 系数a 正数
 * @param b {int} 系数b 负数
 * @returns {object} 变化结果
 */
function getExchangeResult(mayStates, eState, a, b) {

  let resultSets = {};

  for (let direct in mayStates) {
    let nState = mayStates[direct]; // 某个方向上的状态
    resultSets[direct] = getFxOfState(nState, eState, a, b);  // 获取函数 f(x)的值, 添加进结果集中
  }

  // 搜寻最好的结果
  let direction = null
    , result = null;
  for (let direct in resultSets) {
    if (direction === null) {
      direction = direct;
    }

    if (result === null) {
      result = resultSets[direct];
    } else {
      // f(x)值越小, 说明这种状态变化越好
      if (resultSets[direct] < result) {
        direction = direct;
        result = resultSets[direct];
      }
    }
  }

  return {
    sState: mayStates[direction],
    result: result,
    direction: direction
  };
}

/**
 * 交换状态的两项,得到新的状态
 *
 * @param arr 需要交换的数组
 * @param sInd 0所在的位置
 * @param eInd 交换对象
 * @param direct 交换方向
 */
function getExchangeState(arr, sInd, eInd, direct) {
  arr = cloneArr(arr);
  let tmp = arr[sInd];
  arr[sInd] = arr[eInd];
  arr[eInd] = tmp;
  return arr;
}

/**
 * 计算出 启发式算法 f(x) = a*g(x)+b*h(x)的值
 *
 * @param nState array 数组, 新的状态
 * @param eState array 数组, 结果状态
 * @param a int 默认为5
 * @param b int 默认为-1
 * @return {int} 数值
 */
function getFxOfState(nState, eState, a, b){
  let gx = 0;
  let hx = 0;
  for (let nInd in nState) {
    let nVal = nState[nInd]
      , eInd = eState.indexOf(nVal)
      , stepInd = '';

    if (eInd === nInd) {
      gx++;
    }

    if (eInd > nInd) {
      stepInd = nInd + '-' + eInd;
    } else {
      stepInd = eInd + '-' + nInd;
    }
    hx += STEP[stepInd];
  }

  return (a*gx+b*hx);
}

export default {
  shuffleArr: shuffleArr,
  getInversionNumber: getInversionNumber,
  transformArrToData: transformArrToData,
  cloneArr: cloneArr,
  getExchangeProcess: getExchangeProcess,
  getFxOfState: getFxOfState
};

export {shuffleArr, getInversionNumber, transformArrToData, cloneArr, getExchangeProcess, getFxOfState};
