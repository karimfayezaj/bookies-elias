import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCalendar, faUser } from '@fortawesome/free-solid-svg-icons';
import './BottomAppBar.css';

const BottomAppBar = ({ changePageState }) => {
    return <div className="bottom-app-bar">
        <button className="bottom-app-bar-button" onClick={() => changePageState('0')}>
            <FontAwesomeIcon icon={faHome} />
            <span>Rooms</span>
        </button>
        <button className="bottom-app-bar-button" onClick={() => changePageState('1')}>
            <FontAwesomeIcon icon={faCalendar} />
            <span>Reservations</span>
        </button>
        <button className="bottom-app-bar-button" onClick={() => changePageState('2')}>
            <FontAwesomeIcon icon={faUser} />
            <span>Profile</span>
        </button>
    </div>
}



export default BottomAppBar;