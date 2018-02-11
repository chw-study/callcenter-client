import React, { Component } from 'react';

import './Feed.css';
import Button from 'material-ui/Button';
import {loadRecords} from '../actions';
import Record from './Record';
import {store} from '../store';
import './Feed.css'

class Feed extends Component {

  constructor(props) {
    super(props)
    this._loadMore()
  }

  _loadMore = () => {
    store.dispatch(loadRecords(this.props.records.size))
  }

  render() {
    const { records } = this.props;
    const recs = Array.from(records.values()).map((r,i) => {
      return <li key={i}> <Record record={r} /> </li>
    });
    return (
      <div className="feed">
        <h2 className="feed-title"> Call Records: </h2>
        <ul>
          {recs}
        </ul>
        <div className="load-more">
          <Button
            raised
            onClick={this._loadMore}> Load More</Button>
        </div>
      </div>
    );
  }
}

export default Feed;
