
import Modal from './Components/Modal';

import { getFirestore, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import './BookingModal.css';

import { useEffect, useState } from 'react';


const BookingModal = ({ hideModal, auth, appConfig, roomNumber, listOfRooms, roomPrice }) => {
    const firestoreDB = getFirestore(appConfig);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [features, setFeatures] = useState([]);

    console.log(roomPrice);



    const reserveRoom = async () => {
        console.log('Reserve Room');

        await setDoc(doc(firestoreDB, `/${roomNumber}/`, `${auth.currentUser.uid}`), {
            BookedBy: auth.currentUser.uid,
            RoomNumber: roomNumber,
            Starting: startDate,
            Ending: endDate,
            Paid: false,
            TimeStamp: serverTimestamp(),
            Price: roomPrice,
            Upgraded: false,
        }).then(() => {
            console.log("Successful Creation")
        }).catch((error) => {

            console.log(error);
        })
    }

    const getFeatures = () => {
        const features = [];
        for (const item of listOfRooms) {
            if (item.title === roomNumber) {
                item.features.forEach(element => {
                    features.push(<p>{element}</p>);
                });
            }
        }
        return features;
    };

    useEffect(() => {
        const features = getFeatures();
        setFeatures(features);
    }, [roomNumber]);

    return <Modal>
        <div>
            <h3>Special Features of this room</h3>
            <div>
                {features}
            </div>
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