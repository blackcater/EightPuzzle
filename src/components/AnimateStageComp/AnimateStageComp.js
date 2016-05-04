import React, { Component } from 'react';

import EightPuzzleStateComp from '../EightPuzzleStateComp/EightPuzzleStateComp';

import styles from './AnimateStageComp.css';

export default class AnimateStageComp extends Component {
  static propTypes = {
    sState: React.PropTypes.array,
    eState: React.PropTypes.array,
    tiktok: React.PropTypes.array,
    states: React.PropTypes.array
  };
  state = {
    ind: 0,
    cState: this.props.sState
  };
  stateChangeHandler(){

  }
  render(){
    return (
      <div className={styles.animateStage}>
        <EightPuzzleStateComp stat={this.state.cState} tiktok={this.props.tiktok} stateChangeHandler={this.stateChangeHandler.bind(this)}/>
      </div>
    )
  }
}
