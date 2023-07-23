import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCalendar, faUser } from '@fortawesome/free-solid-svg-icons';
import './BottomAppBar.css';

// this componeent is rendered at the bottom of the page, and will stay fixed to the bottom of the screen
// it has 3 icon buttons, which upon their click , triggers a function called changePageState
// passing a paramter that specifies the page state that should be rendered

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