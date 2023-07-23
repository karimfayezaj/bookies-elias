/* eslint-disable react-hooks/exhaustive-deps */

import { Fragment, useState, useRef } from 'react';

import { Preferences } from "@capacitor/preferences";

// Import the App styling CSS file
import './App.css';

// Import the functions you need from the SDKs you need
// the initializeApp is to create a connection between the application and the firebase cloud solution
import { initializeApp } from "firebase/app";

// Import the needed hooks, or functions
// from the firebase/auth library
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";



// import  the created reacr components
// the login page and the user home page are screens seen at the UI
// the Modal and the Snackbar are features that are used for feedback and Data fetching
import LoginPage from './Pages/LoginPage/LoginPage';
import UserHomePage from './Pages/UserHomePage/UserHomePage';
import BookingModal from './Interfaces/BookingModal/BookingModal';

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



// we create an application constant that fills the initialization of the firebase application
// it uses the parameters used in the firebase configuration variables
const app = initializeApp(firebaseConfig);
console.log(app);
// here the authentication process is used to try to connect the users to the firebase cloud
const auth = getAuth(app);



// all the rooms are listed witht their id ,  title , resumer, price and features.
const listOfRooms = [
  { id: 'Room41.jpeg', resume: 'Queen bed for 1', title: 'Special 1', price: 10, features: ['', 'Wifi', 'Air Conditioner', 'Breakfast Buffet'] },
  { id: 'Room42.jpeg', resume: 'Queen bed for 2', title: 'Double Couple', price: 15, features: ['Wifi', 'Air Conditioner', 'Breakfast Buffet'] },
  { id: 'Room43.jpeg', resume: 'Separate bed for 2', title: 'Good Business', price: 13, features: ['Wifi', 'Air Conditioner', 'Pool Access', 'Breakfast Buffet'] },
  { id: 'Room44.jpeg', resume: 'Queen bed for 2', title: 'Sea Suite', price: 20, features: ['Wifi', 'Air Conditioner', 'Pool Access', 'Breakfast Buffet'] },
  { id: 'Room45.jpeg', resume: 'Singles for 3', title: 'Triple Single', price: 21, features: ['Wifi', 'Air Conditioner', 'Pool Access', 'Breakfast Buffet'] },
  { id: 'Room46.jpeg', resume: 'Queen bed + 1', title: 'Family Deal', price: 30, features: ['Wifi', 'Air Conditioner', 'Pool Access', 'Breakfast Buffet'] },
];





// here all the work would be done, to program and develop and the functionality of the application

const App = () => {


  // to start with , the variable that would be used trhough the application
  // here the useRef hook was used instead of the useState
  // to not keep track of the states when shifting between the login and sign up page
  const loginRef = useRef();
  const signUpRef = useRef();



  // isLoggedIn keeps track of the user if he is logged in or not, starting with false.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // writes the message to the screen of the user, starting with an empty value
  const [errorMessage, setErrorMessage] = useState();
  // decides on showing or hiding the modal, starting with false ( hiding the modal)
  const [modal, setModal] = useState(false);
  // write the room Number that the user is trying to book
  const [roomNumbertoBook, setRoomNumbertoBook] = useState('');
  // decides on showing or hiding the snackbar, starting with false ( hiding the snackbar)
  const [showSnackBar, setShowSnackBar] = useState(false);
  // write the room price that the user is trying to pay for
  const [roomPrice, setRoomPrice] = useState();
  // writes the message to the screen of the user on the snackbar, starting with an empty value
  const [snackMessage, setSnackMessage] = useState('');


  // function that just calls the change of the state of the modal to false, hiding it from the user
  const hideModal = () => setModal(false);



  // function that just calls the change of the state of the modal to true, showing it to the user
  const showModal = (roomNumber) => {
    // the function gets one parameter which is the room number that the user clicked on and is trying to book
    // change the state of the the modal to true, and show it to the user
    setModal(true);
    // sets the room number state to the paramter of the function received
    setRoomNumbertoBook(roomNumber);
    // loops in the list of rooms array, to find the value of the room title which is also the room number
    for (const item in listOfRooms) {
      // if the room title matches the  room number, it enters the conditional block
      if (listOfRooms[item].title === roomNumber) {
        // it sets the roomPrice state to the value of the price of this specific room
        setRoomPrice(listOfRooms[item].price);
      }
    }
  }



  // this handle the submit action to sing In the user with his email and password
  // its an async function because the has to wait for a response to decide on what to do next

  const handleSubmit = async (event) => {
    // this prevents the application from refreshing its state when this button is clicked
    event.preventDefault();

    // this is where the application awaits a specfic line of code to be executed
    await signInWithEmailAndPassword(auth, loginRef.current.username.value, loginRef.current.password.value,
      // signInWithEmailAndPassword is a function that firebase provides for authenticating its user
      // it receives back a response with user credentials that would be used to 
    ).then(async (userCredentials) => {
      // const user = userCredentials.user;
      // the Preferences set to native devices the login credentials to make it easier for the user to login
      //sets the email to the value of the username or email
      await Preferences.set({
        'key': 'Email',
        'value': loginRef.current.username.value,
      });

      // all sets the password value to the loginRef value of the password input
      await Preferences.set({
        'key': 'Password',
        'value': loginRef.current.password.value,
      });

      // it awaits for these 2 commands to work
      // then sets the isLoggedIn state to true.
      setIsLoggedIn(true);
    }).catch((error) => {
      // if any error is encountered the message error would be show to the screen
      setIsLoggedIn(false);
      setErrorMessage(error.code);
    })
  };


  // this handle the submit action to sing Up the user with his email and password
  // its an async function because the has to wait for a response to decide on what to do next

  const handleSubmitSignUp = async (event) => {
    // this prevents the application from refreshing its state when this button is clicked
    event.preventDefault();
    // here the createUserWithEmailPassword function also a builtin firebase function, an async function
    await createUserWithEmailAndPassword(
      // it takes auth as a parameter
      auth,
      // the signUpRef hook based reference values for the email and password that woulfd be created
      signUpRef.current.username.value,
      signUpRef.current.password.value,
    )
      .then((userCredentials) => {

        // sets the show snack bar to true, showing it to the user
        setShowSnackBar(true);
        // this set timeout function is used to show wait a speicfic amount of time as 2000 milliseconds, 
        //and then execute another function or command, which here is to set the showsnackbar state to false
        setTimeout(() => {
          setShowSnackBar(false);
        }, 2000);
        // sets the snack bar message to created successfully
        setSnackMessage('Created Successfully');
      }).catch((error) => {
        // set logged in state to false, making sure the user does not get signed in
        setIsLoggedIn(false);
        // shows the snack bar to the ui
        setShowSnackBar(true);
        // sets a timeout of 2 seconds
        setTimeout(() => {
          // hides the snackbar from the user
          setShowSnackBar(false);
        }, 2000);
        // sets the snackbar message to the error code received from the response of the function
        setSnackMessage(error.code);
      })
  }

  // logout function , logout the user from its authenticated application
  const logOutUser = async () => {
    // sets the preferences EMail and Password to empty strings
    await Preferences.set({ key: 'Email', value: '' });
    await Preferences.set({ key: 'Password', value: '' });
    // sets log in state to false, loggin out the user from the application
    setIsLoggedIn(false);
  }



  // here is the rendered application components
  return (
    // Fragment is used to integrate Modal and Snack Bar to the applications
    <Fragment>{
      // check the true or false value of modal variable and conditionally rendered the booking Modal or Not
      modal && <BookingModal
        // Booking modal takes these props to its internal components to be used
        hideModal={hideModal}
        auth={auth}
        appConfig={app}
        roomNumber={roomNumbertoBook}
        listOfRooms={listOfRooms}
        roomPrice={roomPrice}
      />
    }
      {
        // conditional renderes the snackbar depending on the value of shwoSnackBar
        showSnackBar && <SnackBar message={snackMessage} />
      }
      <main>
        {isLoggedIn // if the user isLoggedIn, the UI renders the UserHome Page which takes into account these props to be used
          ? <UserHomePage
            logOutUser={logOutUser}
            appConfig={app}
            auth={auth}
            listOfRooms={listOfRooms}
            showBookingPage={showModal}

          />
          : <LoginPage
            // if the user is not LoggedIn then the loginPage is rendered to make the user authenticated to the application
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
