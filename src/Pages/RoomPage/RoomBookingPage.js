/* eslint-disable jsx-a11y/alt-text */
import { useEffect } from "react";
import RoomCard from "./Components/RoomCard";
import { getDownloadURL, getStorage, ref as Sref } from "firebase/storage";
import './RoomBookingPage.css';


const RoomBookingPage = ({ appConfig, listOfRooms, showBookingPage }) => {
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
    return <div className="push-page-up">
        <RoomCard roomInfo={listOfRooms[0]} showBookingPage={() => showBookingPage(listOfRooms[0].title)} />
        <RoomCard roomInfo={listOfRooms[1]} showBookingPage={() => showBookingPage(listOfRooms[1].title)} />
        <RoomCard roomInfo={listOfRooms[2]} showBookingPage={() => showBookingPage(listOfRooms[2].title)} />
        <RoomCard roomInfo={listOfRooms[3]} showBookingPage={() => showBookingPage(listOfRooms[3].title)} />
        <RoomCard roomInfo={listOfRooms[4]} showBookingPage={() => showBookingPage(listOfRooms[4].title)} />
        <RoomCard roomInfo={listOfRooms[5]} showBookingPage={() => showBookingPage(listOfRooms[5].title)} />
    </div>

}


export default RoomBookingPage;