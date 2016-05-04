/**
 * 展示一个状态下的八数码
 */
import React, { Component } from 'react';

import styles from './EightPuzzleStateComp.css'
import STATE from '../../stores/position.json';

export default class EightPuzzleStateComp extends Component {
  static propTypes = {
    stat: React.PropTypes.array.isRequired,
    tiktok: React.PropTypes.array,
    stateChangeHandler: React.PropTypes.func
  };
  state = {
    data: this.props.stat,
    index: 0 // 当前进行到第几步
  };
  timer = null; // 设置定时器
  componentDidMount(){
    if (this.props.tiktok) {
      this.timer = setInterval(function(){
        let cState = this.state.data; // 当前状态
        let index = this.state.index;

        if (this.props.tiktok.length == (index+1)) {
          clearInterval(this.timer);
        }

        let val = this.props.tiktok[index]; // 要与哪个值交换
        let ind = cState.indexOf(0); // 0所在的位置
        let vInd = cState.indexOf(val); // val所在位置
        let tmp = cState[ind];
        cState[ind] = cState[vInd];
        cState[vInd] = tmp;
        ++index;
        this.setState({
          data: cState,
          index: index
        });
      }.bind(this), 1000);
    }
  }
  componentWillUnmount(){
    clearInterval(this.timer);
  }
  render() {
    let data = this.state.data;
    return (
      <ul className={styles.box}>
        <li style={STATE[data.indexOf(1)]} className={styles.minBox} ref="1" key="1">1</li>
        <li style={STATE[data.indexOf(2)]} className={styles.minBox} ref="2" key="2">2</li>
        <li style={STATE[data.indexOf(3)]} className={styles.minBox} ref="3" key="3">3</li>
        <li style={STATE[data.indexOf(4)]} className={styles.minBox} ref="4" key="4">4</li>
        <li style={STATE[data.indexOf(5)]} className={styles.minBox} ref="5" key="5">5</li>
        <li style={STATE[data.indexOf(6)]} className={styles.minBox} ref="6" key="6">6</li>
        <li style={STATE[data.indexOf(7)]} className={styles.minBox} ref="7" key="7">7</li>
        <li style={STATE[data.indexOf(8)]} className={styles.minBox} ref="8" key="8">8</li>
        <li style={STATE[data.indexOf(0)]} className={styles.zeroMinBox} ref="8" key="0">0</li>
      </ul>
    )
  }
}
