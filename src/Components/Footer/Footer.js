import React from 'react';
import classes from './Footer.module.scss';

const Footer = () => {
  const address = () => {
    return (
      <p className='grey-text text-lighten-4'>
        32 Smithson Road <br /> Norwich <br /> NR12 9HZ
      </p>
    );
  };

  const email = ['greenleaf', 'garden', 'ing', '@', 'gmail', '.com'];

  const contact = () => {
    return (
      <p className='grey-text text-lighten-4'>
        07789 314750 <br /> {email[0]}
        <span style={{ display: 'none' }}>8sk23n4</span>
        {email[1]}
        <span style={{ display: 'none' }}>8sk23n4</span>
        {email[2]}
        <span style={{ display: 'none' }}>8sk23n4</span>
        {email[3]}
        <span style={{ display: 'none' }}>8sk23n4</span>
        {email[4]}
        <span style={{ display: 'none' }}>8sk23n4</span>
        {email[5]}
        <span style={{ display: 'none' }}>8sk23n4</span>
      </p>
    );
  };

  return (
    <footer className={`${classes.footer} page-footer green darken-4`}>
      <div className='container'>
        <div className='row'>
          <div className='col s12 m10 l8'>
            <h5 className='white-text'>Greenleaf Gardening Services Ltd.</h5>
            {address()}
            {contact()}
          </div>
          <div className='col s12 m2 l2 offset-l2'>
            <ul>
              <li>
                <a className='grey-text text-lighten-3' href='#!'>
                  <ion-icon name='logo-facebook'></ion-icon>
                </a>
              </li>
              <li>
                <a className='grey-text text-lighten-3' href='#!'>
                  <ion-icon name='logo-instagram'></ion-icon>
                </a>
              </li>
              <li>
                <a className='grey-text text-lighten-3' href='#!'>
                  <ion-icon name='logo-linkedin'></ion-icon>
                </a>
              </li>
              <li>
                <a className='grey-text text-lighten-3' href='#!'>
                  <ion-icon name='logo-twitter'></ion-icon>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='footer-copyright'>
        <p className='container' style={{ fontWeight: '300' }}>
          © 2020 J.Plummer. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
