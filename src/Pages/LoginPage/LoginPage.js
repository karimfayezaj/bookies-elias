import LoginInterface from './LoginInterface/LoginInterface';
import SignUpInterface from './SignUpInterface/SignupInterface';
import './LoginPage.css';
import { useState } from 'react';

import '../../Components/HorizontalDivider/HorizontalDivider';

const LoginPage = ({ handleSubmitLogin, loginRef, errorMessage, handleSubmitSignUp, signUpRef }) => {
    // create an object that uses the authentication features of getAuth called auth
    const [loginRender, setLoginRender] = useState(false);

    const changePageState = () => {
        setLoginRender(!loginRender);
    }


    const renderErrorMessage = () => {
        switch (errorMessage) {
            case 'auth/invalid-email':
                return "Invalid User";
            case 'auth/user-not-found':
                return "User Not Found";
            case 'auth/wrong-password':
                return "Wrong Password";
            case 'auth/too-many-requests':
                return "Too many Requests";
            default:
                return null;
        }
    }


    return (
        <div className="login-container">
            {loginRender ?
                <LoginInterface
                    renderErrorMessage={renderErrorMessage}
                    loginRef={loginRef}
                    handleSubmitLogin={handleSubmitLogin}
                /> :
                <SignUpInterface
                    renderErrorMessage={renderErrorMessage}
                    signUpRef={signUpRef}
                    handleSubmitSignUp={handleSubmitSignUp}
                />
            }
            <div onClick={changePageState}>
                {loginRender ? <p>SignUp</p> : <p>Login</p>}
            </div>
        </div >
    );
};

export default LoginPage;
