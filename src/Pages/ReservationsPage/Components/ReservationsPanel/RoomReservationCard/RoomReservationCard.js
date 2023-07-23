import React, { useEffect, useState } from 'react';
import './RoomReservationCard.css';
import CheckoutModal from '../../../../../Interfaces/CheckoutModal/CheckoutModal';
import UpgradeModal from '../../../../../Interfaces/UpgradeModal/UpgradeModal';



const RoomReservationCard = ({ roomInfo, appConfig, auth, fireStoreDB }) => {
    // modalOpen use STate to open and close the modal for checkout and upgrade=
    const [modalOpen, setModalOpen] = useState(false);
    const [upgradeModal, setUpgradeModal] = useState(false);


    // changes the color of the status pof the room information
    const getStatusColor = () => {
        if (roomInfo.paid === true) {
            return 'green';
        } else {
            return 'blue';
        }
    };

    // function that set the modal to false, hiding from the user
    const handleModal = () => {
        setModalOpen(false);
    }

    // function that sets and opens the upgrade modal
    const upgradeRoomService = () => {
        setUpgradeModal(true);
    }

    // function that sets false the upgrade modal, hiding it
    const upgradeRoomModalHandle = () => {
        setUpgradeModal(false);
    }




    return (
        <div id={roomInfo.title} className="reservation-card">
            {modalOpen &&
                <CheckoutModal fireStoreDB={fireStoreDB} closeModal={handleModal} roomInfo={roomInfo} />
            }
            {upgradeModal &&
                <UpgradeModal closeModal={upgradeRoomModalHandle} fireStoreDB={fireStoreDB} roomInfo={roomInfo} />
            }
            <div onClick={upgradeRoomService} className="reservation-details">
                <h2>{roomInfo.title}</h2>
                <p>
                    Start Date: {roomInfo.startDate}<br />
                    End Date: {roomInfo.endDate}
                </p>
            </div>
            <button className={`status-button ${getStatusColor()}`} onClick={() => { setModalOpen(true) }}>
                {roomInfo.paid === false ? 'Checkout' : 'Confirmed'}
            </button>
        </div>
    );
};

export default RoomReservationCard;
