import React, { useEffect, useState } from 'react';
import './RoomReservationCard.css';
import { getDatabase, ref, get, onValue } from 'firebase/database';

const RoomReservationCard = ({ roomInfo, appConfig, auth }) => {



    const getStatusColor = () => {
        if (roomInfo.confirmed === 'confirmed' && roomInfo.paid === false) {
            return 'yellow';
        } else if (roomInfo.paid === true) {
            return 'green';
        } else {
            return 'blue';
        }
    };
    return (
        <div id={roomInfo.title} className="reservation-card">
            <div className="reservation-details">
                <h2>{roomInfo.title}</h2>
                <p>
                    Start Date: {roomInfo.startDate}<br />
                    End Date: {roomInfo.endDate}
                </p>
            </div>
            <button className={`status-button ${getStatusColor()}`} onClick={() => { }}>
                {roomInfo.confirmed === 'confirmed' && roomInfo.paid === false ? 'Paid' : 'Confirm'}
            </button>
        </div>
    );
};

export default RoomReservationCard;
