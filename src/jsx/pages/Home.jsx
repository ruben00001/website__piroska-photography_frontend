import React, { Component } from 'react';
import Axios from 'axios';
import Navigation from '../layout/navbar/Navbar';
import { strapiAPI } from '../../enviroment/strapi-api';
import { Spring, config } from 'react-spring/renderprops';
import { withRouter } from 'react-router';
import Navbar2 from '../layout/navbar/Navbar2';
import { Global } from '../../data/globals';
import LoadingWidget from '../components/Loading-widget';
import LoadingScreen from '../components/Loading-screen';


class Home extends Component {
  constructor(props) {
    super(props);

    this.page = React.createRef();

    this.state = {
      image: null,
      piroska: 'white',
      photography: 'white',
      imageLoaded: false,
      showPage: false,
      changeBackground: false,
      scalePage: false,
      timerDuration: 20,
      showLoadingText: 0,
      leaveAnimation: false,
      changeLeaveColor: false,
      menuOpen: false,
      openNav: false,
      loadingWidgetOut: false,
      stopLoader: false
    }
  }

  componentDidMount() {
    Axios.get(`${this.homeURL}/homes`)
      .then(response => {
        this.setState({
          image: response.data[0].image.url,
          piroska: response.data[0].piroska,
          photography: response.data[0].photography
        })
      })
  }

  homeURL = strapiAPI;

  onImageLoad = () => {
    this.setState({
      imageLoaded: true,
    })
    setTimeout(_ => {
      this.setState({
        stopLoader: true
      })
    }, 900)
    setTimeout(_ => {
      this.setState({
        loadingWidgetOut: true
      })
    }, 1300)
    setTimeout(_ => {
      this.setState({
        showPage: true
      })
    }, 1850)
    setTimeout(_ => {
      this.setState({
        scalePage: true,
      })
    }, 2050)
  }

  changeMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  }

  toggleNav = () => {
    this.setState({
      openNav: !this.state.openNav
    });
  }

  goPage = (e) => {
    let route = `/${e.currentTarget.getAttribute('value')}`;
    this.setState({
      leaveAnimation: true
    }, _ => {
      setTimeout(() => {
        this.setState({
          changeLeaveColor: true
        })
      }, 1000);
      setTimeout(() => {
        this.props.history.push(route)
      }, 2200);
    })
  }


  test = () => {

  }




  render() {
    return (
      <div className='home'>
        <div className='loading-screen'>
          <div className='x' >
            <Spring
              from={{ transform: 'translateY(100px)' }}
              to={{
                transform: !this.state.loadingWidgetOut ? 'translateY(0px)' : 'translateY(-100px)'  }}
              // to={{ transform: 'translateY(0px)' }}
              config={config.slow}
            >
              {props =>
                <div style={props}>
                  {!this.state.changeBackground &&
                    <LoadingWidget 
                      stopLoader={this.state.stopLoader}
                    />
                  }
                </div>
              }
            </Spring>
          </div>
        </div>
        {/* <Navbar2 /> */}
        {this.state.showPage &&
          <Navbar2 />
        }
        <Spring
          from={{ opacity: 0, transform: 'scale(0.85)' }}
          to={{ opacity: !this.state.showPage ? 0 : 1, transform: !this.state.scalePage ? 'scale(0.85)' : 'scale(1)' }}
          config={config.slow}
        >
          {props =>
            <div style={props} className='home_main-container'>
              <div className='home_image'>
                <img onLoad={this.onImageLoad} src={`${this.state.image}`} alt=''></img>
                <h1 className='home_title home_title--main'>Piros <br /> Photography</h1>
                <h2 className='home_title home_title--catalogue'>CATALOGUE N&deg;001 </h2>
                <h2 className='home_title home_title--locations'>london &nbsp; budapest &nbsp; the world</h2>
              </div>
            </div>
          }
        </Spring>
      </div>
    )
  }
}

export default withRouter(Home);


//   <Spring
//   from={{ opacity: 1 }}
//   to={{ opacity: !this.state.imageLoaded ? 1 : 0 }}
//   config={{ duration: 2000 }}
// >
//   {props =>
//     <ProgressBar style={props} now={this.state.progress}/>
//   }
// </Spring>

// <div className='home_main-container'>
// <div className='home_image'>
//   <img onLoad={this.onImageLoad} src={`${this.state.image}`} alt=''></img>
//   <h1 className='home_title' 
//     style={title1Style}>
//       Piroska Markus</h1>
//   <h1 className='home_title home_title--2'>Piroska Markus</h1>
//   <h1 className='home_title home_title--photo'
//     style={title2Style}>
//       Photography</h1>
// </div>
// </div>

{/* <div className='counter-container'>
<CountUp className='counter counter--home'
  end={100}
  duration={this.state.timerDuration}
  useEasing={false}
  onEnd={({ start }) => {
    start();
    this.setState({ showLoadingText: 1 }, () => setTimeout(() => {
      this.setState({
        showLoadingText: 0
      })
    }, 800))
  }}
/>
<Spring
  from={{ opacity: 0 }}
  to={{ opacity: this.state.showLoadingText }}
>
  {propsB =>
    <p style={propsB}>Loading</p>
  }

</Spring>
</div> */}