import Modal from "../BookingModal/Components/Modal";
import React, { useEffect, useState } from 'react';
import './UpgradeModal.css';


import { getAuth } from "firebase/auth";

import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';



const CheckoutModal = ({ closeModal, roomInfo, fireStoreDB }) => {
    const auth = getAuth();
    const [paidFee, setPaidFee] = useState();

    const payReservation = async () => {
        await updateDoc(doc(fireStoreDB, `/${roomInfo.title}/`, `${auth.currentUser.uid}`), {
            Upgraded: true,
            TimeStamp: serverTimestamp(),
        }).then(() => {
            console.log("Successful Upgrad")
        }).catch((error) => {
            console.log(error);
        })
    }

    const checkFees = async () => {
        await getDoc(doc(fireStoreDB, `/${roomInfo.title}/`, `${auth.currentUser.uid}`))
            .then((snapShot) => {
                setPaidFee(snapShot.data().Paid);
            })
    }


    useEffect(() => {
        checkFees();
    })

    return <Modal>
        <div>
            <h3>Do you want to upgrade to full features?</h3>
            <div className="button-row">
                <button onClick={() => payReservation()}>Upgrade</button>
                <button onClick={() => closeModal()}>Cancel</button>
            </div>

        </div>
    </Modal>;
}


export default CheckoutModal;