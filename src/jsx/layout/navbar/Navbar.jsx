import React from 'react';
// import { Spring, config } from 'react-spring/renderprops';
import { useSpring, config, animated, interpolate } from "react-spring";
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';

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


// export default Navigation;


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
