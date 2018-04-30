import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import Feed from './feed/Feed';
import AppBar from 'material-ui/AppBar';

import Tabs, {Tab} from 'material-ui/Tabs';

class App extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    const getTab = (val) => {
      return value === 0 ? <Feed district={this.props.district} records={this.props.records}/> : <div className="instructions"> No instructions yet! </div>
    }

    const body = !this.props.errors ? getTab(value) : <div className="error-message"> Something went wrong. Try to reload or try again later. Sorry! <br /> <br /> <span>{this.props.errors.toString()}</span></div>

    return (
      <div className="app">
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} className="tabs" fullWidth centered>
            <Tab label="Feed" />
            <Tab label="Instructions" />
          </Tabs>
        </AppBar>
        {body}
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  }
};

export default connect(mapStateToProps)(App);
