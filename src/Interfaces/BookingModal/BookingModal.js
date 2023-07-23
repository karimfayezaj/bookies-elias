
import Modal from './Components/Modal';

import { getFirestore, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import './BookingModal.css';

import { useEffect, useState } from 'react';

// The booking modal is a reusable component that is just triggered and shown when needed
// it has mutiple props which are named props
// hideModal refering the function that would close/ hide the  modal from the user
// auth refers to the authentication Instance of the application by the user
// app config, is the apoplication configuration used to created and connect to the firebase features
// room Number refers to the title of the room
// list of rooms, is the list of all the available rooms
// room Price is just the price that the room will cost



const BookingModal = ({ hideModal, auth, appConfig, roomNumber, listOfRooms, roomPrice }) => {
    // creates the firestore database instance, with the getFirestore function
    const firestoreDB = getFirestore(appConfig);
    // create a state for a variable called startDate
    const [startDate, setStartDate] = useState('');
    // create a state for a variable called endDate
    const [endDate, setEndDate] = useState('');
    // create an array for a variable state called features
    const [features, setFeatures] = useState([]);

    // function used to reserve a room , its a async function
    const reserveRoom = async () => {
        // the function await this builtin function of the firestore
        // setDoc, sets the value of a specific document found in firestore dataset, with the path related to 
        // /room number , which is the title of the room that he wants to reserve
        // followed by the user uid , making it personnaly to himself 
        await setDoc(doc(firestoreDB, `/${roomNumber}/`, `${auth.currentUser.uid}`), {
            // writes this JSON object into the the dataset
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



    // this function is just ran once, to be fetch the features of the room that the user is reserving
    const getFeatures = () => {
        const features = [];
        // it looks inside the list of rooms
        for (const item of listOfRooms) {
            // if the item title (room title) equals the room number entered by the user
            // the condition is met
            if (item.title === roomNumber) {

                // the item has features which are the values we are requiring here
                // so we push into the state array features all the values as <p>  JSX tags with their element as child to them
                item.features.forEach(element => {
                    features.push(<p>{element}</p>);
                });
            }
        }
        // just return the features const when the funtion is created and called upon
        return features;
    };

    // use effect is a hook used to make a code run once only
    useEffect(() => {
        // here the variable features receives the return value of the getFeatures fiunction
        const features = getFeatures();
        // sets this variable to the state of the features , which is the varaible used to be rendered into the UI
        setFeatures(features);
    }, [roomNumber]);

    // the Modal is returned to come above the actual screen that the UI is rendering, 
    // showing a small windown to make the user interact with

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