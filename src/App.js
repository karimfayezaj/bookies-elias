/* eslint-disable react-hooks/exhaustive-deps */


import './App.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// import { getDatabase, ref } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import RoomBookingPage from './Pages/RoomPage/RoomBookingPage';
import LoginPage from './Pages/LoginPage/LoginPage';
// import { useEffect } from 'react';
import { Preferences } from "@capacitor/preferences";
import { Fragment, useState, useRef } from 'react';
import UserHomePage from './Pages/UserHomePage/UserHomePage';
import BookingModal from './Interfaces/BookingModal/BookingModal';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZsoXXiB200-D4m3XTxWfslzBeJ30zDrU",
  authDomain: "eliasazar-fece6.firebaseapp.com",
  databaseURL: "https://eliasazar-fece6-default-rtdb.firebaseio.com",
  projectId: "eliasazar-fece6",
  storageBucket: "eliasazar-fece6.appspot.com",
  messagingSenderId: "1055533390822",
  appId: "1:1055533390822:web:4127cf6996b58ee6731427",
  measurementId: "G-2Y4M42XQLW"
};
const app = initializeApp(firebaseConfig);
console.log(app);
const auth = getAuth(app);

const listOfRooms = [
  { id: 'Room41.jpeg', resume: 'Queen bed for 1', title: 'Special 1' },
  { id: 'Room42.jpeg', resume: 'Queen bed for 2', title: 'Double Couple' },
  { id: 'Room43.jpeg', resume: 'Separate bed for 2', title: 'Good Business' },
  { id: 'Room44.jpeg', resume: 'Queen bed for 2', title: 'Sea Suite' },
  { id: 'Room45.jpeg', resume: 'Singles for 3', title: 'Triple Single' },
  { id: 'Room46.jpeg', resume: 'Queen bed + 1', title: 'Family Deal' },
];



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginRef = useRef();
  const [errorMessage, setErrorMessage] = useState();
  const [modal, setModal] = useState(false);
  const [roomNumbertoBook, setRoomNumbertoBook] = useState('');




  const hideModal = () => setModal(false);

  const showModal = (roomNumber) => {
    setModal(true);
    setRoomNumbertoBook(roomNumber);
  }



  const handleSubmit = async (event) => {
    event.preventDefault();

    await signInWithEmailAndPassword(auth, loginRef.current.username.value, loginRef.current.password.value,
    ).then(async (userCredentials) => {
      const user = userCredentials.user;
      console.log(user);
      await Preferences.set({
        'key': 'Email',
        'value': loginRef.current.username.value,
      });
      await Preferences.set({
        'key': 'Password',
        'value': loginRef.current.password.value,
      });
      setIsLoggedIn(true);
    }).catch((error) => {
      setIsLoggedIn(false);
      setErrorMessage(error.code);

    })
  };

  const logOutUser = async () => {
    await Preferences.set({ key: 'Email', value: '' });
    await Preferences.set({ key: 'Password', value: '' });
    setIsLoggedIn(false);
    console.log("Logging Out");
  }

  return (
    <Fragment>{
      modal && <BookingModal
        hideModal={hideModal}
        auth={auth}
        appConfig={app}
        roomNumber={roomNumbertoBook}
      />
    }
      <main>
        {isLoggedIn
          ? <UserHomePage
            logOutUser={logOutUser}
            appConfig={app}
            auth={auth}
            listOfRooms={listOfRooms}
            showBookingPage={showModal}
          />
          : <LoginPage
            errorMessage={errorMessage}
            handleSubmitLogin={handleSubmit}
            loginRef={loginRef}
          />
        }
      </main>
    </Fragment>);

}

export default App;
