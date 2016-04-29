require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import InitialStageComp from './InitialStageComp/InitialStageComp';
import AnimateStageComp from './AnimateStageComp/AnimateStageComp';

import {shuffleArr, getInversionNumber} from './Functions';

import styles from './Main.css';

let EightPuzzle = [0, 1, 2, 3, 4, 5, 6, 7, 8]; // 0表示空白方格

class AppComponent extends React.Component {
  clickHandler(){
    this.refs.container.children = <AnimateStageComp />;
  }
  render() {
    var arr1 = shuffleArr(EightPuzzle);
    var arr2 = shuffleArr(EightPuzzle);
    // 如果他们的逆序数不相等, 在打乱,直到相等
    while (getInversionNumber(arr1, true) !== getInversionNumber(arr2, true)) {
      arr2 = shuffleArr(EightPuzzle);
    }
    return (
      <div className={styles.stage}>
        <div className={styles.container} ref="container">
          <InitialStageComp startArr={arr1} endArr={arr2} clickHandler={this.clickHandler.bind(this)}/>
        </div>
        <input type="button" value="Start" className={styles.startBtn}/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
