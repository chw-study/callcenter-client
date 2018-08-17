import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from './history';
import { Main } from './main';
import './App.css';
import { Route } from 'react-router';
import { ConnectedRouter, push } from 'react-router-redux';

class App extends Component {

  render() {
          return (
            <ConnectedRouter history={history}>
              <Route exact path="/" render={(rp) => <Main {...rp} {...this.props} /> }/>
            </ConnectedRouter>
          );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  }
};

export default connect(mapStateToProps)(App);
