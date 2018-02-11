import React, { Component } from 'react';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import moment from 'moment';
import './Record.css';
import {store} from '../store';
import { TYPEFORMS } from '../constants';
import Input from 'material-ui/Input';
import { CircularProgress } from 'material-ui/Progress';
import {submitAttempt, submitUpdate, removeRecord} from '../actions';
import Switch from 'material-ui/Switch';
import Checkbox from 'material-ui/Checkbox';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import {makePopup} from '@typeform/embed';
import querystring from 'querystring';

export function randomSeed(n) {
  const i = Math.floor(Math.random() * n);
  return ['A', 'B', 'C', 'D', 'E', 'F'][i];
}

class Record extends Component {
  constructor(props) {
    super(props);
    const {_id, code} = this.props.record;

    // pick form to send to based on code
    const formUrl = TYPEFORMS[code]

    // If we did not find a url, remove the record and log an error (this is useless)
    // TODO: do something with these errors!
    if (!formUrl) {
      store.dispatch(removeRecord(_id))
      console.error('no valid typeform for this record with service code: ', code)
    }

    // These are the "hidden" fields in our Typeform
    const qs = querystring.stringify({
      worker: props.record.worker,
      visitdate: moment(props.record.timestamp['$date']).format("dddd, MMMM Do"),
      seed1: randomSeed(4),
      seed2: randomSeed(3)
    });
    this.typeform = makePopup(`${formUrl}?${qs}`, { mode: 'drawer_left'});
  }

  _onAttempted = () => {
    store.dispatch(submitAttempt(this.props.record._id));
  }

  _onAnswered = (e) => {
    e.preventDefault();
    this.typeform.open();
  }

  _onSubmit = (e) => {
    e.preventDefault();
    store.dispatch(submitUpdate(this.props.record._id, { called: true}));
  }

  render() {
    const { record } = this.props;
    const actionsStyles = { justifyContent: 'space-between'};


    return (
      <Card className="record">

        <CardContent className="content">
          <div className="info"> <h3>Visited:</h3> <span> {moment(record.timestamp['$date']).format("dddd, MMMM Do YYYY, h:mm:ss a")} </span></div>
          <div className="info"> <h3>Worker Phone:</h3> <span> {record.worker} </span></div>
          <div className="info"> <h3>Patient Name:</h3> <span> {record.name} </span></div>
          <div className="info"> <h3>Patient Phone:</h3> <span> {record.phone} </span></div>
          <div className="info"> <h3>Service Code:</h3> <span> {record.code} </span></div>
        </CardContent>

        <CardActions style={actionsStyles}>
          { record.inProgress ? <CircularProgress  /> :
            <Button raised color="accent"
                dense
                className="attempted"
              onClick={this._onAttempted}> No Answer </Button>  }
            { record.inProgress ? <CircularProgress  /> :
              <Button raised color="primary"
                  dense
                  className="submit"
                onClick={this._onAnswered}> On Phone </Button> }
            { record.inProgress ? <CircularProgress  /> :
              <Button raised
                  dense
                  className="submit"
                onClick={this._onSubmit}> Finished </Button> }

        </CardActions>
      </Card>
    );
  }
}

export default Record;
