import Modal from "../BookingModal/Components/Modal";
import React, { useEffect, useState } from 'react';
import './UpgradeModal.css';


import { getAuth } from "firebase/auth";

import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';

import SnackBar from '../../Components/SnackBar/SnackBar';


// checkout modal is also a modal that is rendered tio the user to make him interact with the application
// it has three props , close modal which is triggered to close and hide the modal
// room info which is the room information passed on to this components
// firestoreDB reference that would be used to update  the document sets inside the firestore instance

const UpgradeModal = ({ closeModal, roomInfo, fireStoreDB , listOfRooms }) => {
    // auth variable gets the authenticated instance of the user
    const auth = getAuth();
    const [paidFee, setPaidFee] = useState();
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');
    const [startDate, setStartDate] = useState('');
    // create a state for a variable called endDate
    const [endDate, setEndDate] = useState('');

    // here to handle the snack bar state
    const [feedbackMessage, setFeedBackMessage] = useState('');

    const listOfOptions = () => {
        
    }

    useEffect(()=> {
        listOfOptions();
    },[listOfRooms]);

    return <Modal>
        {showSnackBar && <SnackBar message={snackMessage} />}
        <div>
            <h2>Do you want to upgrade your stay?</h2>
            <div className="row-orientation">
                <h3  style={{flex:1}}>Options:</h3>
                <select style={{flex: 3}}>
                   {listOfRooms.map((element, index)=> {
                    return <option value={`${element.title}`} key={index}>
                        {`${element.title}`}
                        </option>
                    })}
                </select>
            </div>
            <div className="row-orientation" style={{marginTop: 15}}>
                <button onClick={() => {console.log("Upgrade Stay")
                }}>Upgrade</button>
                 <button onClick={() => {
                    console.log('Hi Aldop');
                    closeModal();
                }
                }>Cancel</button>
            </div>
        </div>
    </Modal>;
}


export default UpgradeModal;