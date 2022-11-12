import './App.css';
import AppHeader from './AppHeader';
import AppBody from './AppBody';
import HamburgerSidebar from './HamburgerMenu';
import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AppHeader />
        <AppBody />
        <HamburgerSidebar />
      </div>
    );
  }
}

export default App;