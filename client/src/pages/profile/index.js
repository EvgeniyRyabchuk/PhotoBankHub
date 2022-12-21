import React from 'react';
import {useSelector} from "react-redux";

const Profile = () => {

    const { user } = useSelector(store => store.user);

    return (
        <div>
            <h1>Profile</h1>

            <h3>Name: {user.full_name}</h3>
            <h3>Email: {user.email}</h3>
            <h3>About: {user.about}</h3>
            <a href={user.website}>{user.website}</a>
            <h3>{user.role.name}</h3>
        </div>
    );
};

export default Profile;