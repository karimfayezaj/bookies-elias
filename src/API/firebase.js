
import { getFirestore, getDocs, getDoc, doc,collection, deleteDoc, serverTimestamp , setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import emailjs from '@emailjs/browser';


export const checkRoomValidity = async (appConfig ,roomInfo, newDates , returnMessage) => {
    console.log(`${newDates.title} from Check Room Validity` );


    const fireStoreDB  = getFirestore(appConfig);
    const auth = getAuth(appConfig);
    let collectionTitle;
    let previousRoom;
    if(roomInfo.title == newDates.title){
        console.log("Changing Dates");
        collectionTitle = roomInfo.title;
    }else{
        console.log("Changing Rooms");
        collectionTitle = newDates.title;
    }

    const collectionRef = collection(fireStoreDB, `${collectionTitle}`);
    const roomReservations = [];

    const querySnapShot = await getDocs(collectionRef);
    let checkingStartDate;
    let checkingEndDate;
    let userStartDate = new Date(newDates.startDate);
    let userEndDate = new Date(newDates.endDate);


    console.log(newDates);
    


    const reserveRoom = async () => {

        if(roomInfo.title == newDates.title){
        console.log("Changing Dates");
        
        // the function await this builtin function of the firestore
        // setDoc, sets the value of a specific document found in firestore dataset, with the path related to 
        // /room number , which is the title of the room that he wants to reserve
        // followed by the user uid , making it personnaly to himself 
        await setDoc(doc(fireStoreDB, `/${roomInfo.title}/`, `${auth.currentUser.uid}`), {
            // writes this JSON object into the the dataset
            BookedBy: auth.currentUser.uid,
            RoomNumber: roomInfo.title,
            Starting: newDates.startDate,
            Ending: newDates.endDate,
            Paid: false,
            TimeStamp: serverTimestamp(),
            Price: roomInfo.price,
            Upgraded: false,
            ReservationId: newDates.token,
        }).then((res) => {
            returnMessage = res;
            emailjs.send("service_kugyynq", "template_9dn8r5l", {
                to: "karimfayez.aj@gmail.com",
                from: `${auth.currentUser.email}`,
                fromdate: `${newDates.startDate}`,
                todate: `${newDates.endDate}`,
                roomtitle: `${roomInfo.roomNumber}`,
                reservationId: `${newDates.token}`
            }, "sh7cLilG6_GixAMSC");
        }).catch((error) => {
            console.log(error);
        });
        }
        else{
            console.log("Changing Rooms");
            console.log("Fetching Data...");

            await getDoc(doc(fireStoreDB, `${roomInfo.title}`, `${auth.currentUser.uid}`))
                .then((snapShot) => {
                    // data is the snapshot data of the request
                    const data = snapShot.data();
                    // if the data is different than null
                    if (data != null) {
                            previousRoom={                           
                                "title": data.RoomNumber,
                                "paid": data.Paid,
                                "startDate": data.Starting,
                                "endDate": data.Ending,
                                "price": data.Price,
                                "orderId": data.ReservationId,
                            };
                        }
                        console.log("Done Fetching Data")
                    }
                    
                );
            
            console.log(previousRoom);

        console.log("Fetching Data...");
        let authID = auth.currentUser.uid;
        let time = Date.now().toString();
        console.log(authID+time);
        let tokenID = 
            authID.substring(0 , 2) + 
            time.substring(time.length , time.length-2) + 
            authID.substring(authID.length - 1 , authID.length - 4);
            await setDoc(doc(fireStoreDB, `/${newDates.title}/`, `${auth.currentUser.uid}`), {
                // writes this JSON object into the the dataset
                BookedBy: auth.currentUser.uid,
                RoomNumber: newDates.title,
                Starting: previousRoom.startDate,
                Ending: previousRoom.endDate,
                Paid: false,
                TimeStamp: serverTimestamp(),
                Price: roomInfo.price,
                Upgraded: false,
                ReservationId: tokenID,
            }).then((res) => {
                returnMessage = res;
                emailjs.send("service_kugyynq", "template_9dn8r5l", {
                    to: "karimfayez.aj@gmail.com",
                    from: `${auth.currentUser.email}`,
                    fromdate: `${previousRoom.startDate}`,
                    todate: `${previousRoom.endDate}`,
                    roomtitle: `${newDates.title}`,
                    reservationId: `${tokenID}`
                }, "sh7cLilG6_GixAMSC");
            }).catch((error) => {
                console.log(error);
            });
            await deleteDoc(doc(fireStoreDB, `/${roomInfo.title}/` , `${auth.currentUser.uid}`))
        }
}



    querySnapShot.forEach((document) => {
        if(auth.currentUser.uid != document.data().BookedBy){
            roomReservations.push({
                "ReservationId": document.data().ReservationId,
                "Start": document.data().Starting,
                "Ending": document.data().Ending,
            });
        }
    });
    
    roomReservations.forEach((element) => {
        checkingEndDate = new Date(element.Ending);
        checkingStartDate = new Date(element.Start);
        if(userEndDate > checkingStartDate && userEndDate <= checkingEndDate){
            returnMessage("Reservation already in place, End Date to be changed");
        }else if(userStartDate >= checkingStartDate && userStartDate < checkingEndDate){
            returnMessage("Reservation already in place, Start Date to be changed");
        }
        else if(userStartDate <= checkingStartDate && userEndDate >= checkingEndDate){
            returnMessage("Reservation already in place, Dates Overlapped");
        }
        else{
            returnMessage("Reservation Validated");
            reserveRoom();
        }
    })

}






