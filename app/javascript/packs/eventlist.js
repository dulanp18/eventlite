import React from 'react'
import Event from './event'


const Eventlist = props => (
    <div>
        {props.events.map((event) =>{
      return (
        <Event key={event.id} event={event} />
        )
      })}
    </div>
)

export default Eventlist
