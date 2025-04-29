import React from 'react';
import styles from '../styles/Sidebar.module.css';
import fluentBot from '../assets/fluent_bot-16-regular.svg';
import bars from '../assets/bars.svg';
import bitcoinMessage from '../assets/bitcoin-icons_message-outline.svg';
import homeIcon from '../assets/material-symbols-light_home-outline-rounded.svg';
import peoples from '../assets/peoples.svg';
import settings from '../assets/settings.svg';
import logo from '../assets/logo.svg';
import profileSVG from '../assets/gg_profile.svg'
import { NavLink } from 'react-router-dom';
import Logout from './Logout';

const Sidebar = () => {
  const navItems = [
    { img: homeIcon, route: '/layout/dashboard', text: 'Dashboard' },
    { img: bitcoinMessage, route: '/layout/contact-center', text: 'Contact Center' },
    { img: bars, route: '/layout/analytics', text: 'Analytics' },
    { img: fluentBot, route: '/layout/chatbot', text: 'Chatbot' },
    { img: peoples, route: '/layout/team', text: 'Team' },
    { img: settings, route: '/layout/settings', text: 'Settings' },
  ];

  return (
    <div className={styles.sidebarMainContainer}>
      <div className={styles.sidebarContainer}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.linksContainer}>
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.route}
              className={({ isActive }) => 
                `${styles.link} ${isActive ? styles.active : ''}`
              }
              end={item.route === '/dashboard'}
            >
              {({ isActive }) => (
                    <div className={styles.linkContent}>
                        <img src={item.img} alt={item.text} />
                        {isActive && <span>{item.text}</span>}
                    </div>
                )}
            </NavLink>
          ))}
        </div>
        <div className={styles.bottomContainer}>
          <Logout/>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
