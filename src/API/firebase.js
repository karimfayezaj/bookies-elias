
import { getFirestore, getDocs, doc,collection,  serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


export const checkRoomValidity = async (appConfig ,roomTitle, reserveID) => {
    console.log("Check Room Validity");

    const fireStoreDB  = getFirestore(appConfig);
    const auth = getAuth(appConfig);

    const collectionRef = collection(fireStoreDB, `${roomTitle}`);

    const roomReservations = [];

    const userReservationDates  = [];
    


    const querySnapShot = await getDocs(collectionRef);


    querySnapShot.forEach((document) => {
        if(reserveID === document.data().ReservationId){
            userReservationDates.push({
                "ID": document.data().ReservationId, 
                "Start": document.data().Starting , 
                "End": document.data().Ending
            })
        }else{
            roomReservations.push({
                "ID": document.data().ReservationId, 
                "Start": document.data().Starting , 
                "End": document.data().Ending
            })
        }  
    })


    console.log(userReservationDates);

    console.log(roomReservations);
    return querySnapShot;
}

