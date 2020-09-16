import axios from 'axios';

function getCalendar( date ) {
    return axios.get( 
        `http://localhost:3000/calender?date=${date}`,
        
    )
                .then( response => response.data );
}

export {
    getCalendar
}