import './ReservationsPage.css';
import Calendar from '../../Interfaces/Calendar/Calendar';

import ReservationsPanel from './Components/ReservationsPanel/ReservationPanel';
import { useEffect, useState } from 'react';


const ReservationsPage = ({ auth, appConfig, listOfRooms }) => {
    const [listOfReservations, setListOfReservations] = useState([]);

    useEffect(() => {
        listOfRooms.forEach(element => {
            setListOfReservations((prevReservations) => [...prevReservations, element.title]);
        });
    }, [listOfRooms])


    return <div className='push-page-up'>
        <div className='Calendar'>
            <Calendar />
        </div>
        <div className='ReservationsPanel'>
            <ReservationsPanel
                auth={auth}
                appConfig={appConfig}
                listOfRooms={listOfReservations}
            />
        </div>
    </div>

}


export default ReservationsPage;