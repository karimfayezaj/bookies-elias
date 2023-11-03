import Modal from "../BookingModal/Components/Modal";
import React, { useEffect, useState } from 'react';
import './CancelOrderModal.css';


import { getAuth } from "firebase/auth";

import { doc, getDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';

import SnackBar from '../../Components/SnackBar/SnackBar';


// checkout modal is also a modal that is rendered tio the user to make him interact with the application
// it has three props , close modal which is triggered to close and hide the modal
// room info which is the room information passed on to this components
// firestoreDB reference that would be used to update  the document sets inside the firestore instance

const CancelOrderModal = ({ closeModal, roomInfo, fireStoreDB , listOfRooms,updateState }) => {
    // auth variable gets the authenticated instance of the user
    const auth = getAuth();
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');
    const [startDate, setStartDate] = useState('');
    // create a state for a variable called endDate
    const [endDate, setEndDate] = useState('');

    // here to handle the snack bar state
    const [feedbackMessage, setFeedBackMessage] = useState('');


    const requestToDelete = async () => {
        try{
            await deleteDoc(doc(fireStoreDB, `/${roomInfo.title}/` , `${auth.currentUser.uid}`))
            .then((res)=> {
                closeModal();
                updateState();
            })
        }catch{

        }
    } 

    return <Modal>
        {showSnackBar && <SnackBar message={snackMessage} />}
        <div>
            <h2>Do you want to cancel your reservation?</h2>
            <div className="row-orientation" style={{marginTop: 15}}>
                <button onClick={() => closeModal()}>Hold</button>
                 <button onClick={() => {
                    console.log("Remove this reservation");
                    requestToDelete();
                }}>Remove</button>
            </div>
        </div>
    </Modal>;
}


export default CancelOrderModal;