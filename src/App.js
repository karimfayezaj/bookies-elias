/* eslint-disable react-hooks/exhaustive-deps */

import { Fragment, useState, useRef } from 'react';

import { Preferences } from "@capacitor/preferences";

// Import the App styling CSS file
import './App.css';

// Import the functions you need from the SDKs you need
// the initializeApp is to create a connection between the application and the firebase cloud solution
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

import Stripe from 'stripe';



import LoginPage from './Pages/LoginPage/LoginPage';
import UserHomePage from './Pages/UserHomePage/UserHomePage';
import BookingModal from './Interfaces/BookingModal/BookingModal';
import ShowSnackBar from './Components/SnackBar/ShowSnackBar';
import SnackBar from './Components/SnackBar/SnackBar';



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

const stripe = Stripe("pk_test_51NUejFJhB08sJbHob06mvJAmvz7lEorf1GEkCA7HBoNMaS1V18bzXeLZc4ArQoClaN7u6Rbd41FtoVzgPmYBzNlj00y2BPcSwZ");




const app = initializeApp(firebaseConfig);
console.log(app);
const auth = getAuth(app);


const listOfRooms = [
  { id: 'Room41.jpeg', resume: 'Queen bed for 1', title: 'Special 1', price: 10, features: ['', 'Wifi', 'Air Conditioner', 'Breakfast Buffet'] },
  { id: 'Room42.jpeg', resume: 'Queen bed for 2', title: 'Double Couple', price: 15, features: ['Wifi', 'Air Conditioner', 'Breakfast Buffet'] },
  { id: 'Room43.jpeg', resume: 'Separate bed for 2', title: 'Good Business', price: 13, features: ['Wifi', 'Air Conditioner', 'Pool Access', 'Breakfast Buffet'] },
  { id: 'Room44.jpeg', resume: 'Queen bed for 2', title: 'Sea Suite', price: 20, features: ['Wifi', 'Air Conditioner', 'Pool Access', 'Breakfast Buffet'] },
  { id: 'Room45.jpeg', resume: 'Singles for 3', title: 'Triple Single', price: 21, features: ['Wifi', 'Air Conditioner', 'Pool Access', 'Breakfast Buffet'] },
  { id: 'Room46.jpeg', resume: 'Queen bed + 1', title: 'Family Deal', price: 30, features: ['Wifi', 'Air Conditioner', 'Pool Access', 'Breakfast Buffet'] },
];



const App = () => {

  console.log(stripe.elements);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginRef = useRef();
  const signUpRef = useRef();
  const [errorMessage, setErrorMessage] = useState();
  const [modal, setModal] = useState(false);
  const [roomNumbertoBook, setRoomNumbertoBook] = useState('');
  const [showSnackBar, setShowSnackBar] = useState(false);

  const [snackMessage, setSnackMessage] = useState('');


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

  const handleSubmitSignUp = async (event) => {
    event.preventDefault();
    await createUserWithEmailAndPassword(
      auth,
      signUpRef.current.username.value,
      signUpRef.current.password.value,
    )
      .then((userCredentials) => {
        console.log('User Created');
        setShowSnackBar(true);
        setTimeout(() => {
          setShowSnackBar(false);
        }, 2000);
        setSnackMessage('Created Successfully');
      }).catch((error) => {
        setIsLoggedIn(false);
        setShowSnackBar(true);
        setTimeout(() => {
          setShowSnackBar(false);
        }, 2000);
        setSnackMessage(error.code);
      })
  }


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
        listOfRooms={listOfRooms}
      />
    }
      {
        showSnackBar && <SnackBar message={snackMessage} />
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
            handleSubmitSignUp={handleSubmitSignUp}
            signUpRef={signUpRef}
          />
        }
      </main>
    </Fragment>);

}

export default App;
