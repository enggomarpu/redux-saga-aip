import React, { useEffect, useState } from 'react'
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './eventCalender.scss'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import Header from '../../Header/Header'
import Sidebar from '../../Sidebar/Sidebar'
import AllEvents from './all-events'

const locales = {
  'en-US': require('date-fns/locale/en-US'),
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const EventCalendar = (props) => {
  var eventsData = []
  const [Events, setEvents] = useState([])
  const [StartDate, setStartDate] = useState()

  useEffect(() => {
    if (props.location.state) {
      let date = new Date(props.location.state.currentEvent.start)
      setStartDate(date)
      props.location.state.events.map((eve) => {
        eventsData.push({
          start: new Date(eve.EventDate),
          end: new Date(eve.EventDate),
          title: eve.EventName,
        })
      })
      setEvents(eventsData)
    } else {
      setStartDate(new Date())
    }
  }, [props.location.state])

  return (
    <>
      <Header heading='Event' />
      <div className='main'>
        <div className='siderbar'>
          <Sidebar />
        </div>
        <div className='main-wrapper'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card simple-card'>
                <div className='card-body'>
                  {Events && StartDate && (
                    <div className='card-body'>
                      <Calendar
                        className="custom-calander"
                        selectable
                        defaultView={Views.WEEK}
                        onView={() => {}}
                        defaultDate={StartDate}
                        localizer={localizer}
                        events={Events}
                        startAccessor='start'
                        endAccessor='end'
                        style={{ height: 500 }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <AllEvents/>
          </div>
        </div>
      </div>
    </>
  )
}

export default EventCalendar
