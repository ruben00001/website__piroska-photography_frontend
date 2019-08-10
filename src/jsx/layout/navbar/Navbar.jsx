import React from 'react';
// import { Spring, config } from 'react-spring/renderprops';
import { useSpring, config, animated, interpolate } from "react-spring";
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';

function Navigation () {

  const [toggle, setToggle] = React.useState(false);

  const p1 = useSpring({
    s: toggle ? -3.75 : 0,
    config: config.stiff
  });

  const p2 = useSpring({
    y: toggle ? 45 : 0,
    config: config.stiff
  });


  return (
    <div onClick={() => setToggle(prev => !prev)} className='navbar'>
      <div className='navbar_toggler'
        
      >
        <animated.div className='navbar_toggler_line navbar_toggler_line--1'
          style={{
            transform: interpolate([p1.s, p2.y], (s, y) => {
              return `translateY(0, ${s}px) rotate(${y}deg)`
            })
          }}
        />
      </div>
    </div>

  );
  // return (
  //   <div className='navbar'>
  //     <div onClick={props.toggleNav} className='navbar_toggler'>
  //       <Spring
  //         from={{ transform: 'translateY(0px)' }}
  //         to={{ transform: !props.openNav ? 'translateY(3.75px)' : 'rotate(0deg)' }}
  //         config={config.slow}
  //       >
  //         {props =>
  //           <div style={props} className='navbar_toggler_line navbar_toggler_line--1'></div>
  //         }
  //       </Spring>
  //       {/* <Spring
  //         from={{ transform: 'translateY(0px)' }}
  //         to={{ transform: !props.openNav ? 'translateY(-3.75px)' : 'rotate(0deg)' }}
  //         config={config.slow}
  //       >
  //         {props =>
  //           <div style={props} className='navbar_toggler_line navbar_toggler_line--2'></div>
  //         }
  //       </Spring> */}
  //     </div>
  //   </div>

  // );
}
// const Navigation = (props) => {
//   let navbarStyle = {};
//   if (props.menuOpen) {
//     navbarStyle = { background: 'black' };
//   }

//   return (
//     <Navbar className='navbar fixed-top' bg="none" expand=''
//       style={navbarStyle}
//       expanded={props.menuOpen}
//       onToggle={props.changeMenu}
//     >
//       <Navbar.Toggle className='ml-auto navbar__control custom-toggler' aria-controls="basic-navbar-nav"
//         onClick={props.changeMenu}
//       />
//       <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="ml-auto">
//           <Nav.Link onClick={props.goHome} value=''>Home</Nav.Link>
//           <Nav.Link onClick={props.goStories} value='stories'>Stories</Nav.Link>
//           <Nav.Link onClick={props.goGallery} value='gallery'>Gallery</Nav.Link>
//           <Nav.Link onClick={props.goAbout} value='about'>About</Nav.Link>
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//   );
// }

export default Navigation;


// class Navigation extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       menuOpen: false
//     }
//   }

//   changeMenu = () => {
//     this.setState({
//       menuOpen: !this.state.menuOpen
//     });
//   }

//   handleClickOutside = evt => {
//     this.setState({
//       menuOpen: false
//     });  
//   }

//   render() {
//     let navbarStyle = {};
//     if(this.state.menuOpen) {
//       navbarStyle = { background: 'white' };
//     }
//     return (
//       <Navbar className='navbar fixed-top' bg="none" expand=''
//         style={navbarStyle} 
//         expanded={this.state.menuOpen}
//         onToggle={this.changeMenu}
//       >
//         <Navbar.Toggle className='ml-auto navbar__control custom-toggler' aria-controls="basic-navbar-nav" 
//          onClick={this.changeMenu} 
//         />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ml-auto">
//             <Nav.Link href="/">Home</Nav.Link>
//             <Nav.Link href='/stories'>Stories</Nav.Link>
//             <Nav.Link href="/gallery">Gallery</Nav.Link>
//             <Nav.Link href="/about">About</Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar>
//     );
//   }
// }

// export default onClickOutside(Navigation);
