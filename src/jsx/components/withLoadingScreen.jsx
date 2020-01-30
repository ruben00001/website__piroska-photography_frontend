import React, { Component } from 'react';
import { LoadingScreen } from '../components/LoadingScreen';
import Navbar from '../layout/navbar/Navbar';


const withLoadingScreen = (WrappedComponent, navPage, navNoLogo) => {
  class WithLoadingScreen extends Component {
    constructor(props) {
      super(props)

      this.state = {
        imageLoading: true,
        removeLoadingWidget: false,
        stopLoadingWidget: false,
        showLoadingReminder: false,
        showPage: false,
        animatePage: false
      }
    }

    componentDidMount() {
      this.showLoadingReminder = setInterval(() => {
        this.setState({
          showLoadingReminder: true
        });
        setTimeout(() => {
          this.setState({
            showLoadingReminder: false
          });
        }, 5000);
      }, 15000);
    }

    componentWillUnmount() {
      // if(this.state.removeLoadingWidget) {
        this.setState({
          showLoadingReminder: false
        });
        clearInterval(this.showLoadingReminder);
        this.showLoadingReminder = 0;
      // }
    }

    // showLoadingReminder;

    onImagesLoad = () => {
      const timeOut = (state, time) => {
        setTimeout(_ => {
          this.setState({
            [state]: !this.state[state]
          })
        }, time);
      }

      timeOut('stopLoadingWidget', 1900);
      timeOut('removeLoadingWidget', 2800);
      timeOut('showPage', 3350);
      timeOut('animatePage', 3550);
      timeOut('imageLoading', 3850);
    }


    render() {
      return (
        <>
          {
            this.state.imageLoading &&
            <LoadingScreen
              removeLoadingWidget={this.state.removeLoadingWidget}
              stopLoadingWidget={this.state.stopLoadingWidget}
              showLoadingReminder={this.state.showLoadingReminder}
            />
          }
          {
            this.state.showPage &&
            <Navbar
              currentPage={navPage}
              noLogo={navNoLogo}
            />
          }
          <WrappedComponent
            showPage={this.state.showPage}
            animatePage={this.state.animatePage}
            onImagesLoad={this.onImagesLoad}
            {...this.props}
          />
        </>
      )
    }
  }
  return WithLoadingScreen;
}

export default withLoadingScreen;