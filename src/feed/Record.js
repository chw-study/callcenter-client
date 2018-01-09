import React, { Component } from 'react';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import moment from 'moment';
import './Record.css';
import Input from 'material-ui/Input';
import {store} from '../store';
import { CircularProgress } from 'material-ui/Progress';
import {submitAttempt, submitUpdate} from '../actions';
import Switch from 'material-ui/Switch';
import Checkbox from 'material-ui/Checkbox';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import {makePopup} from '@typeform/embed';
import querystring from 'querystring';

class Record extends Component {
  constructor(props) {
    super(props);
    // const {notes = '', code = ''} = this.props.record;
    // console.log(this.props.record)

    // pick form to send to (from db? lookup on client side for now?)
    const formUrl = 'https://nandanrao.typeform.com/to/HdYFRZ'
    const qs = querystring.stringify({
      worker: props.record.worker,
      visitdate: moment(props.record.timestamp['$date']).format("dddd, MMMM Do")
    });
    this.typeform = makePopup(`${formUrl}?${qs}`, { mode: 'drawer_left'});
    this.state = {};
  }

  componentWillReceiveProps(props) {
    const {notes = '', code = '', called = false} = props.record || {};
    this.setState({notes, code, called})
  }

  _onAttempted = () => {
    store.dispatch(submitAttempt(this.props.record._id));
  }

  _onSubmit = (e) => {
    e.preventDefault();
    this.typeform.open();
    // store.dispatch(submitUpdate(this.props.record._id, this.state));
  }

  _onChange = (key, e) => {
    const val = key === 'called' ? e.target.checked : e.target.value;
    this.setState({ [key]: val});
  }

  render() {
    const { record } = this.props;
    const actionsStyles = { justifyContent: 'space-between'};


    return (
      <Card className="record">

        <CardContent className="content">
          <div className="info"> <h3>Time Visited:</h3> <span> {moment(record.timestamp['$date']).format("dddd, MMMM Do YYYY, h:mm:ss a")} </span></div>
          <div className="info"> <h3>Worker:</h3> <span> {record.worker} </span></div>
          <div className="info"> <h3>Patient Name:</h3> <span> {record.name} </span></div>
          <div className="info"> <h3>Patient Phone:</h3> <span> {record.phone} </span></div>
          <div className="info"> <h3>Text Message:</h3> <span> {record.text} </span></div>
          <form onSubmit = {this._onSubmit}>

            <FormControlLabel
              control = {
                  <Checkbox value="called" onChange={ e => this._onChange('called', e)} checked={this.state.called ? true : false} aria-label="called"/>
              }
              label="Called"
                  />
            <Input
              className="treatment-code"
              placeholder="Treatment Code"
              onChange = { e => this._onChange('code', e) }
              value={this.state.code}
              margin="normal"
              />
            <TextField
              className="notes"
              placeholder="Notes"
              onChange = { e => this._onChange('notes', e)}
              value={this.state.notes}
              fullWidth
              margin="normal"
              />
          </form>

        </CardContent>

        <CardActions style={actionsStyles}>
          { record.inProgress ? <CircularProgress  /> :
            <Button
                dense
                className="submit"
                onClick={this._onSubmit}> Submit </Button> }
          { record.inProgress ? <CircularProgress  /> :
          <Button
            dense
            className="attempted"
            onClick={this._onAttempted}> Attempted</Button>  }
        </CardActions>
      </Card>
    );
  }
}

export default Record;
