import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons';
import "./RoomCard.css";



const RoomCard = ({ roomInfo, showBookingPage }) => {
    return <div className="card">
        <img id={roomInfo.id} alt="Rendering..." />
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