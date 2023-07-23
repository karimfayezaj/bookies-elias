import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons';
import "./RoomCard.css";

import RoomImage from './RoomImage';



// room card is a reusable component 
// it renders the room information and the it shows the booking page if clicked

const RoomCard = ({ roomInfo, showBookingPage }) => {
    return <div className="card">
        <RoomImage roomId={roomInfo.id} roomPrice={roomInfo.price} />
        <div className="card-content">
            <p className="card-title">{roomInfo.title}</p>
            <button onClick={() => {
                console.log(`Book this room ${roomInfo.id}`);
                showBookingPage();
            }}>
                <FontAwesomeIcon icon={faBook} className="card-button-icon" />
                <p className="card-button-text">{roomInfo.resume}</p>
            </button>
        </div>
    </div>;


}

export default RoomCard;