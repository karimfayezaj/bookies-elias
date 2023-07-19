import React, { useEffect, useState } from 'react';
import './RoomReservationCard.css';
import CheckoutModal from '../../../../../Interfaces/CheckoutModal/CheckoutModal';
import UpgradeModal from '../../../../../Interfaces/UpgradeModal/UpgradeModal';

const RoomReservationCard = ({ roomInfo, appConfig, auth, fireStoreDB }) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [upgradeModal, setUpgradeModal] = useState(false);


    const getStatusColor = () => {
        if (roomInfo.paid === true) {
            return 'green';
        } else {
            return 'blue';
        }
    };

    const handleModal = () => {
        setModalOpen(false);
    }

    const upgradeRoomService = () => {
        console.log("Upgrade Room")
        setUpgradeModal(true);
    }

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
