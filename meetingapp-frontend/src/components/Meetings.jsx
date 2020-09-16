import React from 'react';
import { getMeetings } from '../services/Meetings';

class Meetings extends React.Component {
    state = {
        status: Meetings.LOADED_Meetings,
        searchparam: '',
        meetings: '',
        error: ''
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
            case Meetings.Status.LOADING_Meetings:
                el = <div>Loading meetings for selected date</div>
                break;
            case Meetings.Status.LOADED_Meetings:
                el = (
                    <ul className="list-group">{meetings.map( meeting => <li className="list-item">{meeting.name}</li> )}</ul>
                );
                break;
            case Meetings.Status.ERROR_LOADING_Meetings:
                el = <div>{error.message}</div>
                break;
            default:
                el = null;
        }

        return (
            <div className="container">
                <h1>
                    Meetings
                </h1>
                <hr />
                <div className="float-right">
                    <input type="date" id="Meetings-date" value={selectedDate} onChange={this.setSelectedDate} />
                </div>
                {el}
            </div>
        );
    }

    makeMeetingsAPICall() {
        getMeetings( this.state.selectedDate )
            .then(meetings => {
                this.setState({
                    meetings,
                    status: Meetings.Status.LOADED_Meetings
                });
            })
            .catch(error => {
                this.setState({
                    error,
                    status: Meetings.Status.ERROR_LOADING_Meetings
                });
            });
    }
    
    componentDidMount() { // this is called only after first render
        this.makeMeetingsAPICall();
    }

    componentDidUpdate( oldProps, oldState ) { //is called whenever state changes (setState called) ot props change (parent re-renders child)
        if( oldState.selectedDate !== this.state.selectedDate ) { // i.e. if selectedDate has changed...
            this.makeMeetingsAPICall();
        }
    }
}

Meetings.Status = {
    LOADING_Meetings: 'LOADING_Meetings',
    LOADED_Meetings: 'LOADED_Meetings',
    ERROR_LOADING_Meetings: 'ERROR_LOADING_Meetings'
};

export default Meetings;