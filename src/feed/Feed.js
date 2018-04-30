import React, { Component } from 'react';

import './Feed.css';
import Button from 'material-ui/Button';
import {setDistrict, loadRecords} from '../actions';
import Record from './Record';
import {store} from '../store';
import { CircularProgress } from 'material-ui/Progress';
import './Feed.css'
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

class Feed extends Component {

  constructor(props) {
    super(props)
    if (this.props.records.size < 1) {
      this._loadMore()
    }
  }

  _loadMore = () => {
    store.dispatch(loadRecords(this.props.records.size))
  }

  handleChange = name => event => {
    store.dispatch(setDistrict(event.target.value))
    // this.setState({ [name]: event.target.value });
  };

  render() {
    const { records } = this.props;
    const recs = Array.from(records.values()).map((r,i) => {
      return <li key={i}> <Record record={r} /> </li>
    });
    const options = [ "Kenema", "Western Area", "Kambia", "Tonkolili", "Test" ].map(district => {
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
