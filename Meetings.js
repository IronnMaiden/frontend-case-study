import axios from 'axios';

function getallMeetings( datefilter , searchparam) {
    return axios.get( 
        `http://localhost:3000/meetings?date=${datefilter}&description=${searchparam}`,
        
    )
    /*.then( response => response.data );*/
}

function addMeeting(meeting, emailofuser){
    const meetingCopy = { ...meeting };
    //meetingCopy.sequenceId = parseInt( sessionCopy.sequenceId );
    //sessionCopy.duration = parseFloat( sessionCopy.duration );
    

    return axios.post(
        `$http://localhost:3000/meetings/`,
        meetingCopy,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then( response => response.data );

}

export {
    getallMeetings,
    addMeeting
};