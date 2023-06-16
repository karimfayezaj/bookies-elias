import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'



const RoomCard = ({ roomInfo }) => {
    return <div className="card">
        <img id={roomInfo.id} alt="Rendering..." />
        <button onClick={() => console.log(`Book this room ${roomInfo.id}`)}>
            <FontAwesomeIcon icon={faBook} className="card-button-icon " />
            <p>{roomInfo.resume}</p>
        </button>
    </div>;


}

export default RoomCard;