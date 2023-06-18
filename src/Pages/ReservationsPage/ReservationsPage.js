import './ReservationsPage.css';
import Calendar from '../../Interfaces/Calendar/Calendar';

import ReservationsPanel from './Components/ReservationsPanel/ReservationPanel';


const ReservationsPage = ({ auth }) => {
    console.log(auth.currentUser);

    return <div className='push-page-up'>
        <Calendar />
        <ReservationsPanel />
    </div>

}


export default ReservationsPage;