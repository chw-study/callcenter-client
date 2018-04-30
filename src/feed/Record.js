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

class Record extends Component {
  constructor(props) {
    super(props);
    const {_id, code} = this.props.record;

    // TODO: randomly pick a code when we have multiple!!
    // pick form to send to based on code
    const formUrl = TYPEFORMS.default

    // If we did not find a url, remove the record and log an error (this is useless)
    // TODO: do something with these errors!
    if (!formUrl) {
      store.dispatch(removeRecord(_id))
      console.error('no valid typeform for this record with service code: ', code)
    }

    // These are the "hidden" fields in our Typeform
    const qs = querystring.stringify({
      worker: props.record.workerPhone,
      visitdate: moment(props.record.timestamp['$date']).format("dddd, MMMM Do"),
      code: code.toLowerCase().trim()
    });
    this.typeform = makePopup(`${formUrl}?${qs}`, { mode: 'drawer_left'});
    this.state = { code: code.toUpperCase() }
  }

  _onAttempted = () => {
    store.dispatch(submitAttempt(this.props.record._id));
  }

  _noConsent = () => {
    store.dispatch(submitUpdate(this.props.record._id, { noConsent: true }))
  }

  _onAnswered = (e) => {
    e.preventDefault();
    this.typeform.open();
  }

  _onSubmit = (e) => {
    e.preventDefault();
    store.dispatch(submitUpdate(this.props.record._id, { called: true, code: this.state.code }));
  }

  _onChange = (e) => {
    this.setState({ code: e.target.value })
  }

  render() {
    const { record } = this.props;
    const actionsStyles = { justifyContent: 'space-between', padding: '1em 0'};


    return (
      <Card className="record">

        <CardContent className="content">
          <div className="info"> <h3>Visited:</h3> <span> {moment(record.timestamp['$date']).format("dddd, MMMM Do, h:mm a")} </span></div>
          <div className="info"> <h3>Worker Name:</h3> <span> {record.workerName} </span></div>
          <div className="info"> <h3>Patient Name:</h3> <span> {record.patientName} </span></div>
          <div className="info"> <h3>Patient Phone:</h3> <span> {record.patientPhone} </span></div>
          <form>
            <h3> Service Code : </h3> <TextField value={this.state.code.toUpperCase() } onChange={this._onChange } placeholder={"was " + record.code.toUpperCase()}/>
          </form>
        </CardContent>

        <CardActions style={actionsStyles}>
          { record.inProgress ? <CircularProgress  /> :
            <Button variant="raised" color="secondary"
                dense
                className="attempted"
              onClick={this._onAttempted}> No Answer </Button>  }
            { record.inProgress ? <CircularProgress  /> :
              <Button variant="raised" color="secondary"
                  dense
                  className="submit"
                onClick={this._noConsent}> No consent </Button> }
            { record.inProgress ? <CircularProgress  /> :
              <Button variant="raised" color="primary"
                  dense
                  className="submit"
                onClick={this._onAnswered}> On Phone </Button> }
            { record.inProgress ? <CircularProgress  /> :
              <Button variant="raised"
                  dense
                  className="submit"
                onClick={this._onSubmit}> Finished </Button> }

        </CardActions>
      </Card>
    );
  }
}

export default Record;
