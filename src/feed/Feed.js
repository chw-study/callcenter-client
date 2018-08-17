import React, { Component } from 'react';

import './Feed.css';
import Button from '@material-ui/core/Button';
import {setDistrict, loadRecords} from '../actions';
import Record from './Record';
import {store} from '../store';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Feed.css'
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {push} from 'react-router-redux';

class Feed extends Component {

  constructor(props) {
    super(props)
    if (this.props.records.size < 1) {
      this._loadMore(this.props.district)
    }
  }

  _loadMore = (district) => {
    store.dispatch(loadRecords(district))
  }

  handleChange = name => event => {
    const district = event.target.value
    store.dispatch(push(`?district=${district}`))
    this._loadMore(district)
  };

  render() {
    const { records } = this.props;

    const recs = Array.from(records.values()).map((r,i) => {
      return <li key={i}> <Record record={r} /> </li>
    });
    const options = [ "Bo", "Bombali", "Kenema", "Western Area", "Kambia", "Tonkolili", "Test" ].map(district => {
      return <option className="districtOption" key={district} value={district}>{district}</option>
    });
    return (
      <div className="feed">
        <div className="selectDistrict">
          <FormControl>
          <InputLabel htmlFor="district-label">District</InputLabel>
          <Select
            native
            value={this.props.district}
            onChange={this.handleChange('district')}
            inputProps={{
              id: 'district-label',
            }}
          >
            { options }
          </Select>
        </FormControl>
        </div>
        {recs.length > 0 ? <ul> {recs} </ul> :  <div className="progress"><CircularProgress /> </div>}
      </div>
    );
  }
}

export default Feed;
