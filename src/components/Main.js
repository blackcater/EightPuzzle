require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import InitialStageComp from './InitialStageComp/InitialStageComp';
import AnimateStageComp from './AnimateStageComp/AnimateStageComp';
import EightPuzzleStateComp from './EightPuzzleStateComp/EightPuzzleStateComp';

import {shuffleArr, getInversionNumber} from './Functions';
import jsonp from 'jsonp';

import styles from './Main.css';


let Eight_Number = [1, 2, 3, 4, 5, 6, 7, 8, 0];
let sState = shuffleArr(Eight_Number);
let eState = shuffleArr(Eight_Number);

while (getInversionNumber(sState, true) !== getInversionNumber(eState, true)) {
  eState = shuffleArr(eState);
}


class AppComponent extends React.Component {
  state = {
    ele: <InitialStageComp sState={sState} eState={eState} />,
    bottom: <input type="button" value="Start" className={styles.startBtn} onClick={this.clickHandler.bind(this)}/>
  };
  clickHandler(){
    // 请求
    let sStr = encodeURIComponent(sState.join(','));
    let eStr = encodeURIComponent(eState.join(','));
    let that = this;

    jsonp('http://localhost:3000/eightpuzzle?sState='+sStr+'&eState='+eStr, {
      timeout: 200000,
      name: 'jsonp'
    }, function(err, data){
      let result = eval(data);
      this.setState({
        ele: <AnimateStageComp tiktok={result.tiktok} states={result.states} sState={sState} eState={eState}/>,
        bottom: <div className={styles.stateText}>
          <EightPuzzleStateComp stat={sState} />
          <EightPuzzleStateComp stat={eState} />
        </div>
      });
    }.bind(that));


    function jsonpeightpuzzle(data){
      return data
    }
  }
  render() {
    return (
      <div className={styles.stage}>
        <div className={styles.container} ref="container">
          {
            this.state.ele
          }
        </div>
        {
          this.state.bottom
        }
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
