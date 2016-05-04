/**
 * 初始化Stage
 */
import React, { Component } from 'react';
import EightPuzzleStateComp from '../EightPuzzleStateComp/EightPuzzleStateComp';

import styles from './InitialStateComp.css';

export default class InitialStageComp extends Component {
  render(){
    return (
      <div className={styles.initialState}>
        <EightPuzzleStateComp stat={this.props.sState} />
        <span className={styles.tranformBtn}> 结束状态> </span>
        <EightPuzzleStateComp stat={this.props.eState} />
      </div>
    )
  }
}
