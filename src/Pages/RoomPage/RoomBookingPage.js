/* eslint-disable jsx-a11y/alt-text */

import { useEffect } from "react";
import "./RoomBookingPage.css";
import RoomCard from "./Components/RoomCard";




import { getDownloadURL, getStorage, ref as Sref } from "firebase/storage";


const RoomBookingPage = ({ appConfig, listOfRooms }) => {
    const storage = getStorage(appConfig);

    useEffect(() => {
        listOfRooms.forEach(roomNumber => {
            const pathReference = Sref(storage, roomNumber.id);
            async function fetchData() {
                await getDownloadURL(pathReference)
                    .then((url) => {
                        const img = document.getElementById(roomNumber.id);
                        img.setAttribute('src', url);
                    }).catch((error) => {
                        console.log(error);
                    });
            }
            fetchData();
        })
    });
    return <div>
        <RoomCard roomInfo={listOfRooms[0]} />
        <RoomCard roomInfo={listOfRooms[1]} />
        <RoomCard roomInfo={listOfRooms[2]} />
        <RoomCard roomInfo={listOfRooms[3]} />

    </div>

}


export default RoomBookingPage;