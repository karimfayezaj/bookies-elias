import './LoginPage.css';



const LoginPage = ({ handleSubmitLogin, loginRef, errorMessage }) => {
    // create an object that uses the authentication features of getAuth called auth
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
            <form ref={loginRef} className="login-form" onSubmit={handleSubmitLogin}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <div>
                    {renderErrorMessage()}
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
