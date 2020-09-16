import React from 'react';
import { getCalendar } from '../services/Calendar';

class Calendar extends React.Component {
    state = {
        status: Calendar.LOADED_CALENDAR,
        selectedDate: new Date().toISOString().substr( 0, 10 ),
        meetings: null,
        error: null
    };

    setSelectedDate = ( event ) => {
        this.setState({
            selectedDate: event.target.value
        });
    }

    render() {
        const { status, selectedDate, meetings, error } = this.state;
        let el;

        switch( status ) {
            case Calendar.Status.LOADING_CALENDAR:
                el = <div>Loading meetings for selected date</div>
                break;
            case Calendar.Status.LOADED_CALENDAR:
                el = (
                    <ul className="list-group">{meetings.map( meeting => <li className="list-item">{meeting.name}</li> )}</ul>
                );
                break;
            case Calendar.Status.ERROR_LOADING_CALENDAR:
                el = <div>{error.message}</div>
                break;
            default:
                el = null;
        }

        return (
            <div className="container">
                <h1>
                    Calendar
                </h1>
                <hr />
                <div className="float-right">
                    <input type="date" id="calendar-date" value={selectedDate} onChange={this.setSelectedDate} />
                </div>
                {el}
            </div>
        );
    }

    makeCalendarAPICall() {
        getCalendar( this.state.selectedDate )
            .then(meetings => {
                this.setState({
                    meetings,
                    status: Calendar.Status.LOADED_CALENDAR
                });
            })
            .catch(error => {
                this.setState({
                    error,
                    status: Calendar.Status.ERROR_LOADING_CALENDAR
                });
            });
    }
    
    componentDidMount() { // this is called only after first render
        this.makeCalendarAPICall();
    }

    componentDidUpdate( oldProps, oldState ) { //is called whenever state changes (setState called) ot props change (parent re-renders child)
        if( oldState.selectedDate !== this.state.selectedDate ) { // i.e. if selectedDate has changed...
            this.makeCalendarAPICall();
        }
    }
}

Calendar.Status = {
    LOADING_CALENDAR: 'LOADING_CALENDAR',
    LOADED_CALENDAR: 'LOADED_CALENDAR',
    ERROR_LOADING_CALENDAR: 'ERROR_LOADING_CALENDAR'
};

export default Calendar;