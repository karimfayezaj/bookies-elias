/* eslint-disable react-hooks/exhaustive-deps */
// import { getDatabase, ref, get, child } from "firebase/database";
// import { useEffect, useState } from "react";\

import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get, onValue } from 'firebase/database';
import RoomReservationCard from "./RoomReservationCard/RoomReservationCard";


const ReservationsPanel = ({ appConfig, auth, listOfReservations }) => {

    const [roomData, setRoomData] = useState([]);
    const database = getDatabase(appConfig);
    let databaseRef;


    const filteredReservations = listOfReservations.filter((value, index, self) => {
        return self.indexOf(value) === index;
    });


    const fetchRoomData = async () => {
        for (const element of filteredReservations) {
            databaseRef = ref(
                database,
                `Reservations/${element.title}/${auth.currentUser.uid}`
            );
            onValue(databaseRef, (snapShot) => {
                const data = snapShot.val();
                if (data !== null) {
                    setRoomData((roomData) => [...roomData, data]);
                }
            })
        }
    };


    const filterRoomData = async () => {
        await fetchRoomData();
        console.log(roomData);
    }

    useEffect(() => {
        filterRoomData();
    }, [listOfReservations]);


    return (
        <div className="reservation-panel">
            {roomData.filter((value, index, self) => {
                return self.indexOf(value) === index;
            }).map((data) => {
                return <RoomReservationCard
                    id={data.RoomNumber}
                    appConfig={appConfig}
                    auth={auth}
                    roomInfo={{
                        title: data.RoomNumber,
                        confirmed: data.Confirmed,
                        paid: data.Paid,
                        startDate: data.Starting,
                        endDate: data.Ending
                    }} />
            }
            )}
        </div>
    );


}

export default ReservationsPanel;