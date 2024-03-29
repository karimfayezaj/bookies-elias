import Modal from "../BookingModal/Components/Modal";
import React, { useEffect, useState } from 'react';
import SnackBar from '../../Components/SnackBar/SnackBar';


import { getFirestore, setDoc, doc, serverTimestamp } from 'firebase/firestore';




import { checkRoomValidity } from "../../API/firebase";

// checkout modal is also a modal that is rendered tio the user to make him interact with the application
// it has three props , close modal which is triggered to close and hide the modal
// room info which is the room information passed on to this components
// firestoreDB reference that would be used to update  the document sets inside the firestore instance

const RescheduleModal = ({ closeModal, roomInfo, appConfig, auth }) => {
    // auth variable gets the authenticated instance of the user

    const firestoreDB = getFirestore(appConfig);

    const [showSnackBar, setShowSnackBar] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');
    const [startDate, setStartDate] = useState('');
    // create a state for a variable called endDate
    const [endDate, setEndDate] = useState('');
    const [token,setToken] = useState('');

    // here to handle the snack bar state

    let title = roomInfo.title;

    const createReservationToken = () => {
        let authID = auth.currentUser.uid;
        let time = Date.now().toString();
        let tokenID = 
            authID.substring(0 , 2) + 
            time.substring(time.length , time.length-2) + 
            authID.substring(authID.length - 1 , authID.length - 4);
        setToken(tokenID);
    }


    useEffect(() => {
        createReservationToken();
    }, [])


    const validateDate = () =>{
        let now = Date.now();
        let date1 = new Date(startDate);
        let date2 = new Date(endDate);
        if(date1 < now ||  date2 < now){
            console.log('You cannot choose a date prior to tomorrow');
            setSnackMessage('You cannot choose a date prior to tomorrow');
        }
        else if(date1 > date2){
            console.log("Start Date cannot be after your end date");
            setSnackMessage('Start Date cannot be after your end date');
        }
        else{
            console.log(`Dates Validated\nStart Date: ${startDate}\nEnd Date: ${endDate}`);
            checkRoomValidity(appConfig , roomInfo,{startDate , endDate,token , title},setSnackMessage);
        }
        setShowSnackBar(true);
        setTimeout(() => {
            setShowSnackBar(false);
        } , 2000);
    }





    // function used to reserve a room , its a async function
    

    return <Modal>
        {showSnackBar && <SnackBar message={snackMessage} />}
        <div>
            <h2>Do you want to reschedule your stay?</h2>
            <div className="row-orientation">
                <h3  style={{flex: 2}}>Start Date:</h3>
                <input 
                    style={{flex: 3}}
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <div className="row-orientation">
                <h3 style={{flex: 2}}>End Date:</h3>
                <input
                    style={{flex: 3}}
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
            <div className="row-orientation" style={{marginTop: 15}}>
                <button onClick={() => validateDate()}>Reschedule</button>
                <button onClick={() => {
                    setEndDate("");
                    setStartDate("");
                }}>Reset Dates</button>
                 <button onClick={() => closeModal()}>Close</button>
            </div>
        </div>
    </Modal>;
}


export default RescheduleModal;





    // // upgradeReservation , an async function that awaits the update Doc feature, to the document firesotreDB
    // // it cvhanges just the specific Upgraded to true , making all the features to the user reserved room
    // const upgradeReservation = async () => {
    //     await updateDoc(doc(fireStoreDB, `/${roomInfo.title}/`, `${auth.currentUser.uid}`), {
    //         Upgraded: true,
    //         // chnages the timeStamp to the specific time of the user ugrade request
    //         TimeStamp: serverTimestamp(),
    //     }).then(() => {
    //         // sets to show the snackbar to the user
    //         setShowSnackBar(true);
    //         // sets the snack message to the Text
    //         setSnackMessage('Updated Successfully');
    //         // create a timeout interval to show the message for 2000
    //         setTimeout(() => { //after these two seconds the funcrtion set show snakc bar to false would be executed,
    //             // hiding the snackbar from the user 
    //             setShowSnackBar(false)
    //         }, 2000);
    //     }).catch((error) => {
    //         // just sets the snacjk message to the error code if encountered
    //         setSnackMessage(error.code);
    //     })
    // }

    // // this function check the fess required from the client / user
    // const checkFees = async () => {
    //     // it await to get the values from the document inside the firestore DB 
    //     await getDoc(doc(fireStoreDB, `/${roomInfo.title}/`, `${auth.currentUser.uid}`))
    //         .then((snapShot) => {
    //             // set the Paid fee variable state to the snaposhot received from the request
    //             setPaidFee(snapShot.data().Paid);
    //         })
    // }




    // // we only required the checkfees to be run once
    // // so the useEffect hook is used
    // useEffect(() => {
    //     checkFees();
    // })