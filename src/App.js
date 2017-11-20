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

    return (
      <div className="app">
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} className="tabs" fullWidth centered>
            <Tab label="Feed" />
            <Tab label="Attempted" />
            <Tab label="Called" />
          </Tabs>
        </AppBar>
        {value === 0 &&<Feed records={this.props.records}/>}
        {value === 1 && <div>Recently attempted calls (disabled) </div>}
        {value === 2 && <div>Called records (disabled) </div>}
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    records: state.records
  }
};

export default connect(mapStateToProps)(App);
