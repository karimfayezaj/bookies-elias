/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';

import { getFirestore, doc, getDoc } from 'firebase/firestore';
import RoomReservationCard from "./RoomReservationCard/RoomReservationCard";


const ReservationsPanel = ({ appConfig, auth, listOfReservations }) => {

    const [roomData, setRoomData] = useState([]);
    const fireStoreDB = getFirestore(appConfig);

    const filteredReservations = listOfReservations.filter((value, index, self) => {
        return self.indexOf(value) === index;
    });


    const fetchRoomData = async () => {
        for (const element of filteredReservations) {
            await getDoc(doc(fireStoreDB, `${element.title}`, `${auth.currentUser.uid}`))
                .then((snapShot) => {
                    const data = snapShot.data();
                    if (data != null) {
                        setRoomData((room) => [...room,
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


    const filterRoomData = async () => {
        await fetchRoomData();
    }

    useEffect(() => {
        filterRoomData();
    }, [listOfReservations]);



    return <div>
        {roomData}
    </div>
}

export default ReservationsPanel;
