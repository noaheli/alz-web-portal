import './appHeader.css';
import React from 'react';
import logo from './cran-logo.png'
export default class appHeader extends React.Component {
    render() {
      return (
      <div className="header">
        <div className="logo-container">
            <img src={logo} className="Logo" alt="logo" />
        </div>
      </div>);
    }
  }