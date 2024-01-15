import Modal from "../BookingModal/Components/Modal";
import React, { useEffect, useState } from 'react';
import './UpgradeModal.css';


import { getAuth } from "firebase/auth";

import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';

import SnackBar from '../../Components/SnackBar/SnackBar';
import { checkRoomValidity } from "../../API/firebase";


// checkout modal is also a modal that is rendered tio the user to make him interact with the application
// it has three props , close modal which is triggered to close and hide the modal
// room info which is the room information passed on to this components
// firestoreDB reference that would be used to update  the document sets inside the firestore instance

const UpgradeModal = ({ appConfig , closeModal, roomInfo, fireStoreDB , listOfRooms }) => {
    // auth variable gets the authenticated instance of the user
    const auth = getAuth();
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');
    const [startDate, setStartDate] = useState('');
    // create a state for a variable called endDate
    const [endDate, setEndDate] = useState('');

    const [selectedValue , setSelectedValue] = useState('');

    // here to handle the snack bar state
    const [feedbackMessage, setFeedBackMessage] = useState('');

    const [token,setToken] = useState('');
    const createReservationToken = () => {
        let authID = auth.currentUser.uid;
        let time = Date.now().toString();
        let tokenID = 
            authID.substring(0 , 2) + 
            time.substring(time.length , time.length-2) + 
            authID.substring(authID.length - 1 , authID.length - 4);
        setToken(tokenID);
    }


    return <Modal>
        {showSnackBar && <SnackBar message={snackMessage} />}
        <div>
            <h2>Do you want to upgrade your stay?</h2>
            <div className="row-orientation">
                <h3  style={{flex:1}}>Options:</h3>
                <select style={{flex: 3}} onChange={
                    (e) => setSelectedValue(e.target.value)}>
                   {listOfRooms.map((element, index)=> {
                    return <option value={`${element.title}`} key={index}>
                        {`${element.title}`}
                        </option>
                        console.log(element.title);
                    })}
                </select>
            </div>
            <div className="row-orientation" style={{marginTop: 15}}>
                <button onClick={() => {
                    let title = selectedValue;
                    checkRoomValidity(appConfig , 
                        roomInfo , 
                        {startDate , endDate , token, title} ,
                        setFeedBackMessage);
                }}>Upgrade</button>
                 <button onClick={() => {
                    closeModal();
                }
                }>Cancel</button>
            </div>
        </div>
    </Modal>;
}


export default UpgradeModal;