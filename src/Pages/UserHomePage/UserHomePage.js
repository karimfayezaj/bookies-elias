import RoomBookingPage from '../RoomPage/RoomBookingPage';
import BottomAppBar from './BottomAppBar/BottomAppBar';
import ReservationsPage from '../ReservationsPage/ReservationsPage';
import './UserHomePage.css';
import { useState } from 'react';
import SettingsPage from '../SettingsPage/SettingsPage';

// Renders the page that will be shown first when the user gets authenticated and logged in
const UserHomePage = ({ logOutUser, appConfig, listOfRooms, showBookingPage, auth }) => {
    // this state choose which interface  should be shown to the user
    const [PageState, setPageState] = useState('0');
    // the this function changes the state of the page to the given parameter
    const changePageState = (pageState) => {
        setPageState(pageState);
    }


    // this function is called upon changing the state ofthe interface
    // the page state  0, renders the room booking page
    // the page  state 1 , renders the Reservation OPage of the user
    // the page state 2 , renders the settings of the users
    const renderPageState = () => {
        if (PageState === '0') {
            return <RoomBookingPage
                appConfig={appConfig}
                listOfRooms={listOfRooms}
                showBookingPage={showBookingPage}
                auth={auth}
            />
        }
        else if (PageState === '1') {
            return <ReservationsPage
                appConfig={appConfig}
                auth={auth}
                listOfRooms={listOfRooms}
            />
        }
        else {
            return <SettingsPage
                logOutUser={logOutUser}
                auth={auth}
            />
        }

    }


    return <div>
        {renderPageState()}
        <BottomAppBar changePageState={changePageState} />
    </div>
}


export default UserHomePage;