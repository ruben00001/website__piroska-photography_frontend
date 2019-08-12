import React, { Component } from 'react';

class LoadingWidget extends Component {

  constructor(props) {
    super(props);

    this.state = {
      num1: 3,
      num2: 2
    }
  }

  componentDidMount() {
    this.changeNum1();
    this.changeNum2();
  }

  rdmNum = (x, y) => {
    return x + Math.random() * (y - x);
  }

  changeNum1 = () => {
    let interval = this.rdmNum(300, 1400);
    this.setState({
      num1: Math.floor(this.rdmNum(1, 9))
    });
    setTimeout(() => {
      this.changeNum1()
    }, interval);
  }

  changeNum2 = () => {
    let interval = this.rdmNum(300, 1400);
    this.setState({
      num2: Math.floor(this.rdmNum(1, 9))
    });
    setTimeout(() => {
      this.changeNum2()
    }, interval);
  }

  render() {
    return (
      <div className='loading-widget'>
        <p>01{this.state.num1}&deg;01{this.state.num2}</p>
      </div>
    )
  }
}

export default LoadingWidget;