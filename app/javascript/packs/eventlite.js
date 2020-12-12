import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import Eventlist from './eventlist'
import EventForm from './eventform'

class Eventlite extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: this.props.events,
      title: '',
      start_datetime: '',
      location: ''
    }
  }

  handleInput = (event) => {
    const name = event.target.name;
    const newState = {};
    newState[name] = event.target.value
    this.setState(newState);
    event.preventDefault();
  }

  handleSubmit = (event) => {
    event.preventDefault
    let newEvent = {title: this.state.title, start_datetime: this.state.start_datetime,location:this.state.location }
    axios({
      method: 'POST',
      url: '/events',
      data: {event: newEvent},
      headers: {
        'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
      }
    })
    .then(response => {
      this.addNewEvent(response.data);
    })
    .catch(error => {
      console.log(error);
    })
    event.preventDefault();
  }

  addNewEvent = (event) => {
    const events = [event, ...this.state.events].sort(function(a, b){
      return new Date(a.start_datetime) - new Date(b.start_datetime)
    })
    this.setState({events: events})
  }

  render() {
    return (
      <div>
        <EventForm handleInput = {this.handleInput}
          handleSubmit = {this.handleSubmit}
          title = {this.state.title}
          start_datetime = {this.state.start_datetime}
          location = {this.state.location} />
        <Eventlist events={this.state.events} />
      </div>
      )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('events_data')
  const data = JSON.parse(node.getAttribute('data'))
  ReactDOM.render(
    <Eventlite events={data} />, document.body.appendChild(document.createElement('div'))
    )
})
