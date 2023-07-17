import './RoomImage.css';


const RoomImage = ({ roomId, roomPrice }) => {
    return <div>
        <img id={roomId} alt="Downloading..." />
        <div className='price-tag'>
            <span className='price-span'>Price: {roomPrice} (USD/Night)</span>
        </div>
    </div>


}


export default RoomImage;