
import Modal from './Components/Modal';

import SnackBar from "../../Components/SnackBar/SnackBar";

import { getFirestore, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import './BookingModal.css';

import { useEffect, useState } from 'react';


import emailjs from '@emailjs/browser';
import { checkRoomValidity } from '../../API/firebase';
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

    // here to handle the snack bar state
    const [feedbackMessage, setFeedBackMessage] = useState('');

    const [token,setToken] = useState('');


    const [roomInfo , setRoomInfo] = useState();
    let title = roomNumber;

    
    

    
    const createRoomInfo = () => {
        for (let index = 0; index < listOfRooms.length; index++) {
            const element = listOfRooms[index];
            if(element.title === roomNumber){
                setRoomInfo({
                    title: element.title,
                    price: element.price,
                })
            }
        }
    }


    const validateDate = () =>{
        let now = Date.now();
        let date1 = new Date(startDate);
        let date2 = new Date(endDate);
        if(date1 < now ||  date2 < now){
            console.log('You cannot choose a date prior to tomorrow');
            setFeedBackMessage('You cannot choose a date prior to tomorrow');
        }
        else if(date1 > date2){
            console.log("Start Date cannot be after your end date");
            setFeedBackMessage('Start Date cannot be after your end date')
        }
        else{
            console.log(`Dates Validated\nStart Date: ${startDate}\nEnd Date: ${endDate}`);
            checkRoomValidity(appConfig ,roomInfo , {startDate,endDate , token,title,},setFeedBackMessage)
        }
    }

    const createReservationToken = () => {
        
        let authID = auth.currentUser.uid;
        let time = Date.now().toString();
        console.log(authID+time);
        let tokenID = 
            authID.substring(0 , 2) + 
            time.substring(time.length , time.length-2) + 
            authID.substring(authID.length - 1 , authID.length - 4);
        console.log(tokenID);

        setToken(tokenID);
    }

    useEffect(() => {
        createReservationToken();
        createRoomInfo();
    },[])


    // function used to reserve a room , its a async function


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
                <button onClick={validateDate}>Reserve</button>
                <button onClick={() => hideModal()}>Cancel</button>
            </div>
        </div>
        <div>
            <p>{feedbackMessage}</p>
        </div>
    </Modal >

}


export default BookingModal;