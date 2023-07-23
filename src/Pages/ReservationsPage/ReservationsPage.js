import './ReservationsPage.css';
import Calendar from '../../Interfaces/Calendar/Calendar';

import ReservationsPanel from './Components/ReservationsPanel/ReservationPanel';
import { useEffect, useState } from 'react';






// Reservations page shows the user reservations
const ReservationsPage = ({ auth, appConfig, listOfRooms }) => {

    // this state the list of reservation 
    const [listOfReservations, setListOfReservations] = useState([]);


    //the use effect hook makes the code run once 
    useEffect(() => {
        // running over each of the room in the list of rooms
        listOfRooms.forEach(element => {
            // set the reservation to the element needed
            setListOfReservations((prevReservations) => [...prevReservations, element]);
        });
    }, [listOfRooms]);

    return <div className='push-page-up'>
        <div className='Calendar'>
            <Calendar />
        </div>
        <div className='ReservationsPanel'>
            <ReservationsPanel
                auth={auth}
                appConfig={appConfig}
                listOfReservations={listOfReservations}
            />
        </div>
    </div>

}


export default ReservationsPage;