/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';

import { getFirestore, doc, getDoc } from 'firebase/firestore';
import RoomReservationCard from "./RoomReservationCard/RoomReservationCard";


// the reservation panel , shows just the reservation of the user
// it has 3 props, the app configuration
// the auth instance
// the list of reservation fed by the reserbatiopn page

const ReservationsPanel = ({ appConfig, auth, listOfReservations }) => {

    // the room data use State with ana initial empty array
    const [roomData, setRoomData] = useState([]);
    // initilaize the connection to firestore with the getFirestore function
    const fireStoreDB = getFirestore(appConfig);

    // this function filters the list of reservations by just finding the value equals to the index we are looking for
    const filteredReservations = listOfReservations.filter((value, index, self) => {
        return self.indexOf(value) === index;
    });

    // thisasync function request and featch the data from the document
    const fetchRoomData = async () => {
        // for every element in the filterreservations, a request would be sent
        for (const element of filteredReservations) {
            // the reqeusyt to the get the docs
            await getDoc(doc(fireStoreDB, `${element.title}`, `${auth.currentUser.uid}`))
                .then((snapShot) => {
                    // data is the snapshot data of the request
                    const data = snapShot.data();
                    // if the data is different than null
                    if (data != null) {
                        // a new Room Reservatin Card is added the the state of the roon Data
                        setRoomData((room) => [...room,
                        // all the props are set from the data fetched online
                        <RoomReservationCard
                            fireStoreDB={fireStoreDB}
                            id={data.RoomNumber}
                            appConfig={appConfig}
                            auth={auth}
                            key={data.RoomNumber}
                            roomInfo={{
                                title: data.RoomNumber,
                                paid: data.Paid,
                                startDate: data.Starting,
                                endDate: data.Ending,
                                price: data.Price
                            }} />]);
                    }
                });
        }
    };

    // filterroom Data wait for the fetch room data function 
    // thus to have receive the data, and then update the state
    // we made a double await/async  function 

    const filterRoomData = async () => {
        await fetchRoomData();
    }

    // we have to make the code run once
    useEffect(() => {
        filterRoomData();
    }, [listOfReservations]);



    return <div>
        {roomData}
    </div>
}

export default ReservationsPanel;
