import React from 'react'
import { useState, useEffect } from 'react'
import HttpService from '../../../shared/http.service'
import VardLogo from '../../../../src/img/card-img.png'
import { formatDistance } from 'date-fns'

const AllEvents = () => {
    const [Events, setEvents] = useState([]);

    useEffect(() => {
        get()
    }, [])

    const get = async () => {
        await HttpService.get('events')
            .then((res) => {
                if (res) {
                    setEvents(res.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const getTime = (date) => {
        return date.toLocaleTimeString('en-US')
    }

    return (
        <div className='upcoming-events'>
            <h5 className='card-title align-self-center d-flex justify-content-between'>All Events</h5>
            {Events.map((result) => {
                return (
                    <>
                        <div className='card simple-card card-border d-flex justify-content-between'>
                            <div className='row'>
                                <div className='col-auto'>
                                    <img src={VardLogo} alt='' />
                                </div>
                                <div className='col'>
                                    <div className='card-body mb-2'>
                                        <div className='align-self-center'>
                                            <h3 className='card-title'>{result.EventType}</h3>
                                        </div>
                                        <p className='card-text mb-1'>
                                            {result.EventName + ' |'}
                                            {getTime(new Date(result.EventDate)).padStart(3, "0") + ' |'}

                                            {formatDistance(
                                                new Date(result.CreatedDate),
                                                new Date()
                                            )}
                                        </p>
                                        <p className='card-text mb-1'>
                                            {result.EventDescription}
                                        </p>
                                    </div>
                                    <div className='card-footer'>
                                        <div className='checkbox-group'>
                                            <label className='btn btn-primary' for='1'>Football
                                                <span className='cross' type='button'>
                                                    <i className='fa fa-times' aria-hidden='true'></i>
                                                </span>
                                            </label>
                                            <label className='btn btn-primary' for='2'>Cricket
                                                <span className='cross' type='button'>
                                                    <i className='fa fa-times' aria-hidden='true'></i>
                                                </span>
                                            </label>
                                            <label className='btn btn-primary' for='3'>Baseball
                                                <span className='cross' type='button'>
                                                    <i className='fa fa-times' aria-hidden='true'></i>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })}
        </div>
    )
}

export default AllEvents
