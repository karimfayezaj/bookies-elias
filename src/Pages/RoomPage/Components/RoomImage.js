import './RoomImage.css';


// roomImage just places the images when needed, and if no data found
// it just renders a downloading text...


const RoomImage = ({ roomId, roomPrice }) => {
    return <div>
        <img id={roomId} alt="Downloading..." />
        <div className='price-tag'>
            <span className='price-span'>Price: {roomPrice} (USD/Night)</span>
        </div>
    </div>


}


export default RoomImage;