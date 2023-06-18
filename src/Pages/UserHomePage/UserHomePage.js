import RoomBookingPage from '../RoomPage/RoomBookingPage';
import BottomAppBar from './BottomAppBar/BottomAppBar';
import ReservationsPage from '../ReservationsPage/ReservationsPage';
import './UserHomePage.css';
import { useState } from 'react';
import SettingsPage from '../SettingsPage/SettingsPage';


const UserHomePage = ({ logOutUser, appConfig, listOfRooms, showBookingPage, auth }) => {
    const [PageState, setPageState] = useState('0');
    const changePageState = (pageState) => {
        setPageState(pageState);
    }

    console.log(PageState);

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