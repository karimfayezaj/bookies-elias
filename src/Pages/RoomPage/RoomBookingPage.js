/* eslint-disable jsx-a11y/alt-text */
import { useEffect } from "react";
import RoomCard from "./Components/RoomCard";
import { getDownloadURL, getStorage, ref as Sref } from "firebase/storage";
import './RoomBookingPage.css';


const RoomBookingPage = ({ appConfig, listOfRooms, showBookingPage }) => {
    // the storage instance is used to fetch the images that would be rendered at the room booking page
    const storage = getStorage(appConfig);

    // the use effect runs the code once, since no dependencies are being chosen.
    useEffect(() => {
        // for each room in list of rooms
        listOfRooms.forEach(roomNumber => {
            // a path is created an reference to the storage cloud , where the roomnumber id is used as parameter
            const pathReference = Sref(storage, roomNumber.id);

            async function fetchData() {
                // get download url from the path reference of every room in the list
                await getDownloadURL(pathReference)
                    .then((url) => {
                        // locking the downloaded image to the DOM element with the same iD of the image
                        const img = document.getElementById(roomNumber.id);
                        // setting the attritubute to render the url to the src prop of the image tag
                        img.setAttribute('src', url);
                    }).catch((error) => {
                        console.log(error);
                    });
            }
            fetchData();
        })
    });

    // renders all the room Card related to the list
    return <div>
        <RoomCard roomInfo={listOfRooms[0]} showBookingPage={() => showBookingPage(listOfRooms[0].title)} />
        <RoomCard roomInfo={listOfRooms[1]} showBookingPage={() => showBookingPage(listOfRooms[1].title)} />
        <RoomCard roomInfo={listOfRooms[2]} showBookingPage={() => showBookingPage(listOfRooms[2].title)} />
        <RoomCard roomInfo={listOfRooms[3]} showBookingPage={() => showBookingPage(listOfRooms[3].title)} />
        <RoomCard roomInfo={listOfRooms[4]} showBookingPage={() => showBookingPage(listOfRooms[4].title)} />
        <RoomCard roomInfo={listOfRooms[5]} showBookingPage={() => showBookingPage(listOfRooms[5].title)} />
        <div className="pusher-up"></div>
    </div>

}


export default RoomBookingPage;