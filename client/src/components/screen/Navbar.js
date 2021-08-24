import React, { useState, useRef, useEffect} from 'react';
import {FaBars} from 'react-icons/fa';
import {linksCenter, linksLeft} from '../routing/data';
import logo from '..image/logo.svg'
import '../styles/App.css';

const Navbar = () => {
    const[link, setLink] = useState(false);
    const linksContainerRef = useRef(null);
    const linksRef = useRef(null);
    const toggleLinks = () => {
        setLink(!link)
    }
    useEffect(() => {
        const linksHeight = linksRef.current.getBoundingClientRect().linksHeight;
        if(link) {
            linksContainerRef.current.style.height = '${linksHeight}px';
        }else{
            linksContainerRef.current.style.height = '0px';
        }
    }, [link])

    return (
        <nav>
        <div className='nav-center'>
          <div className='nav-header'>
            <img src={logo} className='logo' alt='logo' />
            <button className='nav-toggle' onClick={toggleLinks}>
              <FaBars />
            </button>
          </div>
          <div className='links-container' ref={linksContainerRef}>
            <ul className='linksCenter' ref={linksRef}>
              {linksCenter.map((link) => {
                const { id, url, text } = link;
                return (
                  <li key={id}>
                    <a href={url}>{text}</a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className='links-container' ref={linksContainerRef}>
            <ul className='linksLeft' ref={linksRef}>
              {linksLeft.map((link) => {
                const { id, url, text } = link;
                return (
                  <li key={id}>
                    <a href={url}>{text}</a>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* <ul className='social-icons'>
            {social.map((socialIcon) => {
              const { id, url, icon } = socialIcon;
              return (
                <li key={id}>
                  <a href={url}>{icon}</a>
                </li>
              );
            })}
          </ul> */}
        </div>
      </nav>
    );
}

export default Navbar
