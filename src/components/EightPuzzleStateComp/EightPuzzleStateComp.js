/**
 * 展示一个状态下的八数码
 */
import React, { Component } from 'react';

import styles from './EightPuzzleStateComp.css'
import STATE from '../../stores/position.json';
import {transformArrToData} from '../Functions';

export default class EightPuzzleStateComp extends Component {
  static zIndex = 100; // 层级初始指
  static timer = null; // 计时器
  static propTypes = {
    stat: React.PropTypes.array.isRequired,
    data: React.PropTypes.object,
    tiktok: React.PropTypes.array
  };
  state = {
    data: transformArrToData(this.props.stat),
    index: 0 // 当前进行到第几步
  };
  componentWillMount(){
    if (this.props.tiktok && this.props.tiktok.length !== 0) {
      clearInterval(this.timer);
      this.timer = setInterval(this.exchangeHandler.bind(this), 1000);
    }
  }
  componentWillUnmount(){
    clearInterval(this.timer);
  }
  exchangeHandler(){
    // 加入数字变化 倒计时 TODO

    // 变化位置
    var tiktok = this.props.tiktok;
    var data = this.state.data;
    var index = this.state.index;
    var ind = tiktok[index];
    var tmp = data[ind];
    if (index > (tiktok.length - 1)) {
       return;
    }
    data[ind] = data[0];
    data[0] = tmp;
    index++;
    this.setState({
      data: data,
      index: index
    });
  }
  render() {
    var data = this.state.data;
    return (
      <ul className={styles.box}>
        <li style={STATE[data[this.props.stat[0]]]} className={styles.minBox} ref={this.props.stat[0]} key="0">{this.props.stat[0]}</li>
        <li style={STATE[data[this.props.stat[1]]]} className={styles.minBox} ref={this.props.stat[1]} key="1">{this.props.stat[1]}</li>
        <li style={STATE[data[this.props.stat[2]]]} className={styles.minBox} ref={this.props.stat[2]} key="2">{this.props.stat[2]}</li>
        <li style={STATE[data[this.props.stat[3]]]} className={styles.minBox} ref={this.props.stat[3]} key="3">{this.props.stat[3]}</li>
        <li style={STATE[data[this.props.stat[4]]]} className={styles.minBox} ref={this.props.stat[4]} key="4">{this.props.stat[4]}</li>
        <li style={STATE[data[this.props.stat[5]]]} className={styles.minBox} ref={this.props.stat[5]} key="5">{this.props.stat[5]}</li>
        <li style={STATE[data[this.props.stat[6]]]} className={styles.minBox} ref={this.props.stat[6]} key="6">{this.props.stat[6]}</li>
        <li style={STATE[data[this.props.stat[7]]]} className={styles.minBox} ref={this.props.stat[7]} key="7">{this.props.stat[7]}</li>
        <li style={STATE[data[this.props.stat[8]]]} className={styles.minBox} ref={this.props.stat[8]} key="8">{this.props.stat[8]}</li>
      </ul>
    )
  }
}
