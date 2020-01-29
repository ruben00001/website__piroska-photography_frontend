import React from 'react';
import { Spring, config } from 'react-spring/renderprops';
import { withRouter } from 'react-router';
import mainImage from '../../img/Erith.jpg';
import withLoadingScreen from '../components/withLoadingScreen';

const Home = props => {
  const { showPage, animatePage, onImagesLoad } = props;

  return (
    <div className='home'>
      <Spring
        from={{ opacity: 0, transform: 'scale(0.85)' }}
        to={{
          opacity: !showPage ? 0 : 1,
          transform: !animatePage ? 'scale(0.85)' : 'scale(1)'
        }}
        config={config.slow}
      >
        {props => (
          <div style={props} className='home_main-container'>
            <div className='home_image'>
              <img onLoad={onImagesLoad} src={mainImage} alt=''></img>
              <h1 className='home_title home_title--main'>
                Piros <br /> Photography
              </h1>
              {/* <h2 className='home_title home_title--catalogue'>CATALOGUE N&deg;001 </h2> */}
              <h2 className='home_title home_title--locations'>
                london &nbsp; budapest &nbsp; the world
              </h2>
            </div>
          </div>
        )}
      </Spring>
    </div>
  );
};

export default withLoadingScreen(withRouter(Home), '/home', true);
