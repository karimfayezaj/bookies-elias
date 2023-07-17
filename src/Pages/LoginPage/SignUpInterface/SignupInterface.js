const SignUpInterface = ({ signUpRef, handleSubmitSignUp, renderErrorMessage }) => {

    return <form ref={signUpRef} className="login-form" onSubmit={handleSubmitSignUp}>
        <h2>Sign Up</h2>
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
        <button type="submit">Create User</button>
        <div>
            {renderErrorMessage()}
        </div>
    </form>

}

export default SignUpInterface;