import './LoginPage.css';



const LoginPage = ({ handleSubmitLogin, loginRef }) => {
    // create an object that uses the authentication features of getAuth called auth

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
            </form>
        </div>
    );
};

export default LoginPage;
