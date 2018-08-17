import React, { Component } from 'react';
import Feed from './feed/Feed';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Instructions from './Instructions';
import AppBar from '@material-ui/core/AppBar';
import querystring from 'querystring';

export class Main extends Component {

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {

    const { value } = this.state;

    const district = querystring.parse(this.props.location.search)['?district'] || 'Test'

    const getTab = (val) => {
      return value === 0 ? <Feed district={district} records={this.props.records}/> : <Instructions />
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
    )
  }
}
