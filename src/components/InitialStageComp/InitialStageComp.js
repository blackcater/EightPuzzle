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
        <EightPuzzleStateComp stat={this.props.startArr} />
        <span className={styles.tranformBtn} onClick={this.props.clickHandler}> 结束状态> </span>
        <EightPuzzleStateComp stat={this.props.endArr} />
      </div>
    )
  }
}
