import React from 'react';
import  {Route,Link,Switch} from 'react-router-dom';
//import { getallMeetings } from '../services/Meetings';
import AddMeeting from './AddMeeting';

class Meetings extends React.Component {
    state = {
        status: Meetings.LOADED_Meetings,
        datefilter:'',
        searchparam: '',
        meetings: [],
        error: ''
    };

    setSelectedDatefilter = ( event ) => {
        this.setState({
            setSelectedDatefilter: event.target.value
        });
    }
    setSelectedSearchparam= ( event ) => {
        this.setState({
            setSelectedSearchparam: event.target.value
        });
    }
    handlesubmit(event){
        event.preventDefault();
    }

    render() {
        const { status, datefilter,searchparam, meetings, error } = this.state;
        let el;

        switch( status ) {
            case Meetings.Status.LOADING_Meetings:
                el = <div>Loading meetings for selected date</div>
                break;
            case Meetings.Status.LOADED_Meetings:
                el = (
                <ul className="list-group">{meetings.map( meeting => (<div className="list-item"><li>{meeting.name}</li><div><span>{meeting.startTime.hours}</span> - <span>{meeting.endTime.Minutes}</span></div></div>) )}</ul>)
                break;
            case Meetings.Status.ERROR_LOADING_Meetings:
                el = <div>{error.message}</div>
                break;
            default:
                el = null;
        }

        return (
            <div className="container">
                    <div>
                            <Link to={this.props.match.url}>Filter/Search Meeting</Link>
                            &nbsp;&nbsp;
                            <Link to={`${this.props.match.url}/add`}>Add Meeting</Link>
                            </div>
                            <div>
                            <Switch>
                            <Route path={`${this.props.match.path}/add`} component={AddMeeting} />
                            <Route path={this.props.match.path} component={Meetings} />
                            </Switch>
                    </div>
                <h1>
                    Search for Meetings
                </h1>
                <hr />
                <div className="float-left">
                <form onSubmit={this.handlesubmit}>
                <label>
                    <div>Date</div><br/>
                    <select value={this.datefilter} onChange={this.setSelectedDatefilter}>
                    <option value="past">past</option>
                     <option value="present">present</option>
                    <option value="future">future</option>
                    <option value="all">all</option>
                    </select>
                 </label>
                 <br/>
                  <div>
                      <div>Search for</div><br/>
                    <input type="text" name="search for"id="search-param" value={this.searchparam} onChange={this.setSelectedSearchparam} />
                  </div>
                  <br/>
                  <input type="submit" value="Submit" />
                  </form>
                </div>
                {el}
            </div>
        );
    }

    /*searchMeetingsAPICall() {
        getallMeetings( this.state.datefilter , this.state.searchparam)
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
    }*/
    
    /*componentDidMount() { // this is called only after first render
        this.searchMeetingsAPICall();
    }*/

    /*componentDidUpdate( oldProps, oldState ) { //is called whenever state changes (setState called) ot props change (parent re-renders child)
        if( oldState.datefilter !== this.state.datefilter ) { // i.e. if selectedDate has changed...
            this.makeMeetingsAPICall();
        }
        else if( oldState.searchparam !== this.state.searchparam ) { // i.e. if selectedDate has changed...
            this.makeMeetingsAPICall();
        }
        else
        {
            if(oldState.datefilter !== this.state.datefilter && oldState.searchparam !== this.state.searchparam){
                this.makeMeetingsAPICall();
            }
        }
    }*/
}

Meetings.Status = {
    LOADING_Meetings: 'LOADING_Meetings',
    LOADED_Meetings: 'LOADED_Meetings',
    ERROR_LOADING_Meetings: 'ERROR_LOADING_Meetings'
};

export default Meetings;