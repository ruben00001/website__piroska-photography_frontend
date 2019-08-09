import React from 'react';
import './main.scss';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './jsx/pages/Home';
import Gallery from './jsx/pages/Gallery';
import Stories from './jsx/pages/Stories';
import About from './jsx/pages/About';


function App() {

  return (
    <BrowserRouter>
      <div className='root-container'>
        <Route exact path="/" render={() => <Home />} />
        <Route path="/stories" render={() => <Stories />} />
        <Route path="/gallery" render={() => <Gallery />} />
        <Route path="/about" render={() => <About />} />
      </div>
    </BrowserRouter>
  );
}

export default App;

