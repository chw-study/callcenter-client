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
import {submitEvent} from '../actions';
import Switch from 'material-ui/Switch';
import Checkbox from 'material-ui/Checkbox';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import {makePopup} from '@typeform/embed';
import querystring from 'querystring';

class Record extends Component {
  constructor(props) {
    super(props);
    this.formUrl = TYPEFORMS.default
    if (!this.formUrl) {
      throw new Error('No Typeform URL!')
    }
    this.state = { code: this.props.record.code.toUpperCase() }
  }

  _onAttempted = () => {
    store.dispatch(submitEvent(this.props.record._id, 'attempted', this.props.record))
  }

  _noConsent = () => {
    store.dispatch(submitEvent(this.props.record._id, 'noConsent', this.props.record))
  }

  _onSubmit = (e) => {
    e.preventDefault()
    store.dispatch(submitEvent(this.props.record._id, 'called', this.props.record, { code: this.state.code }))
  }

  _onAnswered = (e) => {
    e.preventDefault()
    const { record } = this.props;

    const qs = querystring.stringify({
      messageid: record._id,
      workerphone: record.senderPhone,
      patientphone: record.patientPhone,
      worker: record.workerName,
      patient: record.patientName,
      visitdate: moment(record.serviceDate['$date']).format("dddd, MMMM Do"),
      code: record.code.toLowerCase().trim()
    });

    const typeform = makePopup(`${this.formUrl}?${qs}`, { mode: 'drawer_left'})
    typeform.open()
  }

  _onChange = (e) => {
    this.setState({ code: e.target.value })
  }

  render() {
    const { record } = this.props
    const actionsStyles = { justifyContent: 'space-between', padding: '1em 0'}


    return (
      <Card className="record">

        <CardContent className="content">
          <div className="info"> <h3>Visited:</h3> <span> {moment(record.serviceDate['$date']).format("dddd, MMMM Do")} </span></div>
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
