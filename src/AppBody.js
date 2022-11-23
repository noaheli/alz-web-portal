import './AppBody.scss';
import React from 'react';
import ToDo from './ToDo';

export default class AppBody extends React.Component {

    render() {
      
      return (
      <div className="body" >
        <ToDo />
      </div>);
    }
  }