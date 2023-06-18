import { getDatabase, ref, get, child } from "firebase/database";
import { useEffect, useState } from "react";


const ReservationsPanel = ({ appConfig, auth, listOfReservations }) => {
    console.log(listOfReservations);



    // const database = getDatabase(appConfig);
    // const databaseRef = ref(database);
    const renderReservations = () => {
        return <p>{listOfReservations}</p>;
    }


    // useEffect(() => {
    //     async function fetchData() {
    //         for (const roomNumber of listOfRooms) {
    //             const snapShot = await get(child(databaseRef, `/Reservations/${roomNumber.title}/${auth.currentUser.uid}`));
    //             setListOfReservations((listOfReservations) => [...listOfReservations, snapShot.toJSON()]);
    //             console.log(snapShot.toJSON());
    //         }
    //     }

    //     fetchData();
    // }, [auth.currentUser.uid, databaseRef, listOfRooms]);




    return <div>
        {renderReservations()}
    </div>


}

export default ReservationsPanel;