import React, { useEffect, useState } from 'react';
import './RoomReservationCard.css';
import CheckoutModal from '../../../../../Interfaces/CheckoutModal/CheckoutModal';
import UpgradeModal from '../../../../../Interfaces/UpgradeModal/UpgradeModal';
import RescheduleModal from '../../../../../Interfaces/RescheduleModal/RescheduleModal';
import CancelOrderModal from '../../../../../Interfaces/CancelOrderModal/CancelOrderModal';



const RoomReservationCard = ({ roomInfo, appConfig, auth, fireStoreDB , listOfRooms , updateState }) => {
    // modalOpen use STate to open and close the modal for checkout and upgrade=
    const [modalOpen, setModalOpen] = useState(false);
    const [upgradeModal, setUpgradeModal] = useState(false);
    const [rescheduleModal, setRescheduleModal] = useState(false);
    const [cancelOrderModal, setCancelOrderModal] = useState(false);


    const upgradeCloseModal = () => {
        setUpgradeModal(false);
    }

    const rescheduleCloseModal = () => {
        setRescheduleModal(false);
    }

    const cancelOrderCloseModal = () => {
        setCancelOrderModal(false);
    }

 
    return (
        <div id={roomInfo.title} className='reservation-card'>
            {upgradeModal &&
                <UpgradeModal 
                    closeModal={upgradeCloseModal} 
                    fireStoreDB={fireStoreDB} 
                    roomInfo={roomInfo}
                    listOfRooms={listOfRooms}
                    appConfig={appConfig}
                />
            }
            {rescheduleModal &&
                <RescheduleModal 
                    closeModal={rescheduleCloseModal} 
                    appConfig={appConfig}
                    roomInfo={roomInfo}
                    auth={auth}
                /> 
            }
            {cancelOrderModal &&
                <CancelOrderModal
                    closeModal={setCancelOrderModal}
                    fireStoreDB={fireStoreDB}
                    roomInfo={roomInfo}
                    updatetState={updateState}
                    
                />
            }
            <div style={{ display:'flex' , justifyContent:'flex-start', flexDirection:'row'}}>
                <div style={{flex: 1, flexDirection:'column'}}>
                    <h2>{roomInfo.title}</h2>
                    <h4>{roomInfo.orderId}</h4>
                    <p>Price: {roomInfo.price}$</p>
                </div>
                <div style={{display:'flex' , flexDirection:'column'}}>
                    <p>
                        {roomInfo.startDate}
                    </p>
                    <p>
                        {roomInfo.endDate}
                    </p>
                </div>
            </div>
            <div style={{display:'flex' , flexDirection:'row'}}>
                <button onClick={()=> {
                    console.log("Open Reschedule Modal");
                    setRescheduleModal(true);
                    }}>
                    Edit
                </button>
                <button onClick={()=> {
                    console.log("Open Upgrade Modal");
                    setUpgradeModal(true);
                }}>
                    Upgrade
                </button>
                <button onClick={()=> {
                    console.log("Open Cancel Modal");
                    setCancelOrderModal(true);
                }}>
                    Cancel
                </button>
            </div>
        </div>
        
    );
};

export default RoomReservationCard;





// <div id={roomInfo.title} className="reservation-card">
//             {modalOpen &&
//                 <CheckoutModal fireStoreDB={fireStoreDB} closeModal={handleModal} roomInfo={roomInfo} />
//             }
//             {upgradeModal &&
//                 <UpgradeModal closeModal={upgradeRoomModalHandle} fireStoreDB={fireStoreDB} roomInfo={roomInfo} />
//             }
//             <div onClick={upgradeRoomService} className="reservation-details">
//                 <h2>{roomInfo.title}</h2>
//                 <p>
//                     Start Date: {roomInfo.startDate}<br />
//                     End Date: {roomInfo.endDate}
//                 </p>
//             </div>
//             <button className={`status-button ${getStatusColor()}`} onClick={() => { setModalOpen(true) }}>
//                 {roomInfo.paid === false ? 'Checkout' : 'Confirmed'}
//             </button>
//         </div>