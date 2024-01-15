import React, { useState } from "react";
import "./SettingsPage.css";


// This page does not provide much to the user
// it just fills the user data
// but does not feedback anything to the end user

const SettingsPage = ({ logOutUser }) => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    return (
        <div className="profile">
            <h1>Profile</h1>
            <div className="profile-info">
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Phone Number</label>
                <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </div>
            <div>
                <button onClick={() => {
                    logOutUser();  
                }}>Logout</button>
            </div>
        </div>
    );
};

export default SettingsPage;
