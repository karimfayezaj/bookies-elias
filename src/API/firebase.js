
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


    let startDateReservation;
    let endDateReservation;


    querySnapShot.forEach((document) => {
        if (reserveID === document.data().ReservationId) {
            startDateReservation = new Date(document.data().Starting);
            endDateReservation = new Date(document.data().Ending);
            userReservationDates.push({
                "ID": document.data().ReservationId,
                "Start": document.data().Starting,
                "End": document.data().Ending
            });
        } else {
            roomReservations.push({
                "ID": document.data().ReservationId,
                "Start": document.data().Starting,
                "End": document.data().Ending
            });
        }
    });

    roomReservations.forEach((element) => {
        console.log(Date(element.Start));
        if(Date(element.Start) >= startDateReservation 
            && Date(element.Start) <= endDateReservation
        ){
            console.log("Yes")
        }else{
            console.log("No")
        }
    })

    console.log(startDateReservation);
    console.log(endDateReservation);
   

    
    return querySnapShot;
}

