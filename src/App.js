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
            <Tab label="Instructions" />
          </Tabs>
        </AppBar>
        {value === 0 && <Feed records={this.props.records}/>}
        {value === 1 && <div className="instructions"> No instructions yet! </div>}
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
