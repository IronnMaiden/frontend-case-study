import React, { Component } from 'react';
import MeetingsService from '../services/meetings.js';

class AddMeeting extends Component {
    state = {
        values: {
            date:'',
            start_time:'',
            end_time:'',
            description:'',
            emailid_attendees:''
            
        },
        errors: {
            date:[],
            start_time:[],
            end_time:[],
            description:[],
            emailid_attendees:[]
        }
    };

    isValid = () => {
        return Object.values( this.state.errors ).every( arr => arr.length === 0 );
    }

    validateForm = () => {
        const errors = {
            date:[],
            start_time:[],
            end_time:[],
            description:[],
            emailid_attendees:[]
        };

        const { date , start_time , end_time , description , emailid_attendees } = this.state.values;

        if( date === '' ) {
            errors.date.push( 'date is required' );
            console.log( errors );
        }

        this.setState(
            ( curState ) => {
                return {
                    ...curState,
                    errors
                };
            }
        );
    }

    updateValues = ( event ) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        this.setState(
            ( curState ) => {
                return {
                    ...curState,
                    values: {
                        ...curState.values,
                        [inputName]: inputValue
                    }
                };
            },
            this.validateForm
        );
    }

    addMeeting = ( event ) => {
        event.preventDefault();

        MeetingService.addMeeting( this.state.values, this.props.match.params.id )
            .then(meeting => {
                alert( `The meeting has been added successfully` );
            })
            .catch( error => alert( `Something went wrong (${error.message})` ) );
    }

    render() {
        const {date,start_time , end_time , description , emailid_attendees} = this.state.values;
        const { 
            date: dateErrs,
            start_time : start_timeErrs,
            end_time: end_timeErrs,
            description: descriptionErrs,
            emailid_attendees: emailid_attendeesErrs
            
        } = this.state.errors;


        return (
            <div className="container">
                <div className="row my-4">
                    <div className="col-12">
                        <h3>
                            Details of meetings
                        </h3>
                        <hr />
                    </div>
                </div>
                <div className="col-12">
                    <form noValidate onSubmit={this.addMeeting}>
                        <div className="form-group row">
                            <label htmlFor="sequenceId" className="col-sm-3 col-form-label">Date</label>
                            <div className="col-sm-9">
                                <input className={`form-control ${date.length === 0 ? 'is-valid' : 'is-invalid'}`} type="Date" name="date" id="date" placeholder="" aria-describedby="dateHelpId" onChange={this.updateValues} value={date} />
                                <small id="dateeHelpId" className="text-muted">date is on which meeting is held</small>
                                <small className="invalid-feedback">
                                    {dateErrs.map(error => <div key={error}>{error}</div>)}
                                </small>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-3 col-form-label">Start Time</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="start_time" id="start_time" placeholder=""  aria-describedby="start_timeHelpId" onChange={this.updateValues} value={start_time} />
                                <small id="startHelpId" className="text-muted">Start Time  of the Meeting</small>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="speaker" className="col-sm-3 col-form-label">End Time</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="end_time" id="end_time" placeholder="" aria-describedby="end_timeHelpId" onChange={this.updateValues} value={end_time} />
                                <small id="end_timeHelpId" className="text-muted">The end time of the meeting </small>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="duration" className="col-sm-3 col-form-label">Description</label>
                            <div className="col-sm-9">
                                <input type="number" className="form-control" name="description" id="description" placeholder="" aria-describedby="descriptionHelpId" onChange={this.updateValues} value={description} />
                                <small id="descriptionHelpId" className="text-muted">The description of meeting</small>
                            </div>
                        </div>
                
                        <div className="form-group row">
                            <div className="offset-sm-3 col-sm-9">
                                <button type="submit" className="btn btn-primary mr-2" disabled={!this.isValid()}>Add Meeting</button>
                                <button type="button" className="btn btn-danger">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddMeeting;