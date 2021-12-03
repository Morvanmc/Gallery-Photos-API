import React, { Component } from 'react';

import './DarkMode.scss';
import { BsSun } from 'react-icons/bs';

class DarkModeToggle extends Component {
  constructor(props) {
    super(props);

    if (JSON.parse(localStorage.getItem('DARK_MODE')) === true) {
      document.body.classList.add('dark-mode');
    }

    this.state = {
      darkMode: JSON.parse(localStorage.getItem('DARK_MODE'))
    }

    this.handleModeChange = this.handleModeChange.bind(this);
  }

  handleModeChange() {
    if (!this.state.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    this.setState({
      darkMode: (!this.state.darkMode)
    });
    localStorage.setItem('DARK_MODE', !this.state.darkMode);
  }

  render() {
    return (
      <BsSun style={{ color: "#6B6A6A" }} size={25}
        onClick={this.handleModeChange} />
    );
  }
};

export default DarkModeToggle;