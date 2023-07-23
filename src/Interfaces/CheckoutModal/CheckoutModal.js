import Modal from "../BookingModal/Components/Modal";
import React, { useEffect, useState } from 'react';


import { getAuth } from "firebase/auth";

import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import SnackBar from "../../Components/SnackBar/SnackBar";



// checkout modal is also a modal that is rendered tio the user to make him interact with the application
// it has three props , close modal which is triggered to close and hide the modal
// room info which is the room information passed on to this components
// firestoreDB reference that would be used to update  the document sets inside the firestore instance

const CheckoutModal = ({ closeModal, roomInfo, fireStoreDB }) => {

    const auth = getAuth();
    const [paidFee, setPaidFee] = useState();

    const [showSnackBar, setShowSnackBar] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');



    // payReservation , an async function that awaits the update Doc feature, to the document firesotreDB
    // it cvhanges just the specific Upgraded to true , making all the features to the user reserved room

    const payReservation = async () => {
        await updateDoc(doc(fireStoreDB, `/${roomInfo.title}/`, `${auth.currentUser.uid}`), {
            Paid: true,
            TimeStamp: serverTimestamp(),
        }).then(() => {
            // sets to show the snackbar to the user
            setShowSnackBar(true);
            // sets the snack message to the Text
            setSnackMessage('Paid Successfully');
            // create a timeout interval to show the message for 2000
            setTimeout(() => { //after these two seconds the funcrtion set show snakc bar to false would be executed,
                // hiding the snackbar from the user 
                setShowSnackBar(false)
            }, 2000);
        }).catch((error) => {
            // just sets the snacjk message to the error code if encountered
            setSnackMessage(error.code);
        })
    }


    // this function check the fess required from the client / user
    const checkFees = async () => {
        // it await to get the values from the document inside the firestore DB 
        await getDoc(doc(fireStoreDB, `/${roomInfo.title}/`, `${auth.currentUser.uid}`))
            .then((snapShot) => {
                // set the Paid fee variable state to the snaposhot received from the request
                setPaidFee(snapShot.data().Paid);
            })
    }



    // we only required the checkfees to be run once
    // so the useEffect hook is used
    useEffect(() => {
        checkFees();
    })


    return <Modal>
        {showSnackBar && <SnackBar message={snackMessage} />}
        <div>
            <h3>Your total fees are:</h3>
            {paidFee ? <p>Fully Paid</p> : <p>{roomInfo.price} $</p>}

            <button onClick={() => payReservation()}>Reserve</button>
            <button onClick={() => closeModal()}>Close</button>
        </div>
    </Modal>;
}


export default CheckoutModal;