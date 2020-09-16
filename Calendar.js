import axios from 'axios';

function getCalendar( datefilter) {
    return axios.get( 
        `http://localhost:3000/calender?date=${datefilter}`,
        
    )
    .then( response => response.data );
}

export {
    getCalendar
}