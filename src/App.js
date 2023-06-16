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
import { useEffect, useState, useRef } from 'react';
import UserHomePage from './Pages/UserHomePage/UserHomePage';



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


// // getDatabase calls and connects to the database of the application initialized above
// const database = getDatabase(app);
// // databaseRef give a ref to the database we are going to store data in
// const databaseRef = ref(database);
// console.log(databaseRef);



// const listOfRooms = [
//   { id: 'Room40.jpeg', resume: 'Single bed for 1' },
//   { id: 'Room41.jpeg', resume: 'Queen bed for 1' },
//   { id: 'Room42.jpeg', resume: 'Queen bed for 2' },
//   { id: 'Room43.jpeg', resume: 'Separate bed for 2' },
// ];



const App = () => {
  const credentials = useRef();
  const currentUser = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginRef = useRef();

  // const checkUserAvailability = async () => {
  //   const email = await Preferences.get({ key: 'Email' });
  //   const password = await Preferences.get({ key: 'Password' });
  //   credentials.current = [email.value, password.value];
  //   if (credentials.current[0] === "") {
  //     console.log("Loging In")
  //     await signInWithEmailAndPassword(auth, credentials.current[0], credentials.current[1],
  //     ).then(async (userCredentials) => {
  //       currentUser.current = userCredentials.user;
  //       setIsLoggedIn(true);
  //     }).catch((error) => {
  //       setIsLoggedIn(false);
  //       console.log(error.code);
  //       console.log(error.message);
  //     })
  //   }
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await signInWithEmailAndPassword(auth, loginRef.current.username.value, loginRef.current.password.value,
    ).then(async (userCredentials) => {
      const user = userCredentials.user;
      await Preferences.set({
        'key': 'Email',
        'value': loginRef.current.username.value,
      });
      await Preferences.set({
        'key': 'Password',
        'value': loginRef.current.password.value,
      });
      console.log(user);
      setIsLoggedIn(true);
    }).catch((error) => {
      setIsLoggedIn(false);
      console.log(error.code);
      console.log(error.message);
    })
  };

  const logOutUser = async () => {
    await Preferences.set({ key: 'Email', value: '' });
    await Preferences.set({ key: 'Password', value: '' });
    setIsLoggedIn(false);
    console.log("Logging Out");
  }



  // useEffect(() => { checkUserAvailability() });


  return (
    <div>
      {/* <RoomBookingPage appConfig={app} listOfRooms={listOfRooms} /> */}
      {isLoggedIn
        ? <UserHomePage currentUser={currentUser} logOutUser={logOutUser} />
        : <LoginPage authConfig={auth} handleSubmitLogin={handleSubmit} loginRef={loginRef} />
      }



    </div>
  );
}

export default App;
