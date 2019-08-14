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
    setTimeout(() => {
      this.changeNum('num1');
      this.changeNum('num2');
    }, 1300);
  }

  rdmNum = (x, y) => {
    return x + Math.random() * (y - x);
  }

  changeNum = (stateKey) => {
    if (!this.props.stopLoader) {
      let interval = this.rdmNum(300, 1400);
      this.setState({ [stateKey]: Math.floor(this.rdmNum(1, 9)) });
      setTimeout(() => {
        this.changeNum(stateKey)
      }, interval);
    }
  }

  render() {
    return (
      <div className='loading-widget'>
        <p>01{this.state.num1}&deg;01{this.state.num2}</p>
        <h1>{this.props.hello}</h1>
      </div>
    )
  }
}

export default LoadingWidget;