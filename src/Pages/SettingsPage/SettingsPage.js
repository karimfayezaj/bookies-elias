const SettingsPage = ({ logOutUser, auth }) => {
    return <div>
        <p>Settings Page</p>
        <button onClick={logOutUser} className='push-page-up'>Log Out</button>
    </div>

}

export default SettingsPage;