import Modal from "../BookingModal/Components/Modal";
import React, { useEffect, useState } from 'react';


import { getAuth } from "firebase/auth";

import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';

import Stripe from "stripe";



const CheckoutModal = ({ closeModal, roomInfo, fireStoreDB }) => {

    const stripe = Stripe("sk_test_51NUejFJhB08sJbHo43sFd1vigUgoWuGELzsHJyBB1VN1jrzV1QnDiSYLMQBghHGexR0QgtoJrOXJZ8NIVV1LwUWZ006NKQ829q");

    console.log(stripe);
    const auth = getAuth();
    const [paidFee, setPaidFee] = useState();

    const payReservation = async () => {
        await updateDoc(doc(fireStoreDB, `/${roomInfo.title}/`, `${auth.currentUser.uid}`), {
            Paid: true,
            TimeStamp: serverTimestamp(),
        }).then(() => {
            console.log("Successful Creation")
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
            <h3>Your total fees are:</h3>
            {paidFee ? <p>Fully Paid</p> : <p>{roomInfo.price} $</p>}

            <button onClick={() => payReservation()}>Reserve</button>
            <button onClick={() => closeModal()}>Close</button>
        </div>
    </Modal>;
}


export default CheckoutModal;