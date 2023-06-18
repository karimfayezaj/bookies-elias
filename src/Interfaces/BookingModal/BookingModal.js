
import Modal from './Components/Modal';

import { getDatabase, ref, set } from 'firebase/database';
import './BookingModal.css';

import { useState } from 'react';


const BookingModal = ({ hideModal, auth, appConfig, roomNumber }) => {
    const database = getDatabase(appConfig);
    console.log(auth.currentUser);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const reserveRoom = async () => {
        console.log('Reserve Room');
        await set(ref(database, `/Reservations/${roomNumber}/${auth.currentUser.uid}`), {
            Starting: startDate,
            Ending: endDate,
            Confirmed: false,
            Paid: false,
        }).then((response) => {
            console.log(response);
        })
    }
    return <Modal>
        <div>
            <h3>Select Dates for {roomNumber}</h3>
            <div className="date-picker">
                <label>Start Date:</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <div className="date-picker">
                <label>End Date:</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
            <div className="modal-buttons">
                <button onClick={reserveRoom}>Reserve</button>
                <button onClick={() => hideModal()}>Cancel</button>
            </div>
        </div>
    </Modal >

}


export default BookingModal;