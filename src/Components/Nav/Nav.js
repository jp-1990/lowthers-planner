import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../../sass/materialize.scss';
import classes from './Nav.module.scss';

const Nav = (props) => {
  const [menuState, setMenuState] = useState('closed');
  const [widthHeight, setWidthHeight] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  // reset width and height on resize
  useEffect(() => {
    const handleResize = () => {
      setWidthHeight([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', handleResize);
    return (_) => window.removeEventListener('resize', handleResize);
  });

  // toggle mobile menu
  const toggleMenuHandler = () => {
    if (menuState === 'closed') {
      setMenuState('open');
      document.getElementById('navbar').classList.remove(classes.closed);
      document.getElementById('navbar').classList.add(classes.open);
    } else {
      setMenuState('closed');
      document.getElementById('navbar').classList.remove(classes.open);
      document.getElementById('navbar').classList.add(classes.closed);
    }
  };

  // mobile nav bar jsx
  const mobileNavJsx = () => {
    return (
      <>
        <div className={classes.Container} onClick={toggleMenuHandler}>
          <div
            className={
              menuState === 'open'
                ? `${classes.Hamburger} ${classes.MenuOpen}`
                : classes.Hamburger
            }
          ></div>
        </div>
        <div>
          <ul
            id='nav-mobile'
            className={menuState === 'open' ? classes.mobNav : classes.None}
          >
            <li className={props.active === 'home' ? 'active' : null}>
              <NavLink to='/home'>Home</NavLink>
            </li>
            <li className={props.active === 'planner' ? 'active' : null}>
              <NavLink to='/planner'>Planner</NavLink>
            </li>
            <li className={props.active === 'customers' ? 'active' : null}>
              <NavLink to='/customers'>Customers</NavLink>
            </li>
            <li className={props.active === 'sign in' ? 'active' : null}>
              <NavLink to='/signin'>Sign In</NavLink>
            </li>
          </ul>
        </div>
      </>
    );
  };

  // standard nav bar jsx
  const standardNavJsx = () => {
    return (
      <div className={`${classes.nav} col l10 offset-l2 xl9 offset-xl2`}>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          <li className={props.active === 'home' ? `active ${classes.active}` : null}>
            <NavLink to='/home'>Home</NavLink>
          </li>
          <li className={props.active === 'planner' ? `active ${classes.active}` : null}>
            <NavLink to='/planner'>Planner</NavLink>
          </li>
          <li className={props.active === 'customers' ? `active ${classes.active}` : null}>
            <NavLink to='/customers'>Customers</NavLink>
          </li>
          <li className={props.active === 'sign in' ? `active ${classes.active}` : null}>
            <NavLink to='/signin'>Sign In</NavLink>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <>
      <nav
        id='navbar'
        className={` ${classes.Menu} row`}
        style={{
          position: 'absolute',
          top: '0',
          zIndex: '500',
        }}
      >
        <div className='nav-wrapper green darken-4'>
          <div>
            <Link
              to='/'
              className={`${classes.logo} brand-logo col s2 offset-s2 l1 offset-l1`}
            >
              Lowthers
            </Link>
          </div>
          {widthHeight[0] < 993 ? mobileNavJsx() : standardNavJsx()}
        </div>
      </nav>
      <div
        style={{ position: 'relative', height: '64px', zIndex: '100' }}
      ></div>
    </>
  );
};

export default Nav;
