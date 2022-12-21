import React, {useRef, useState} from 'react';
import {useAction} from "../../../hooks/useAction";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {Button} from "@mui/material";

const LogIn = () => {

    const { login } = useAction();

    const navigate = useNavigate();

    const [email, setEmail] = useState('nicholasrobinson@gmail.com');
    const [password, setPassword] = useState('password');

    const submit = async (e) => {
        e.preventDefault();
        await login(email, password);
        navigate(`/profile`);
    }

    const logInAsNewClientJeka = () => {
        setEmail('jeka.rubchuk@gmail.com');
        setPassword('123456789');
    }
    return (
        <div>
            <h1>Log In</h1>

            <form action="" onSubmit={submit}>
                <input type="text"
                       name='email'
                       onChange={(e) =>
                           setEmail(e.target.value)}
                       value={email}/>
                <br/>
                <br/>
                <input
                    type="password"
                    name='password'
                    onChange={(e) =>
                        setPassword(e.target.value)}
                    value={password}
                />
                <br/>
                <br/>
                <button>Submit</button>
            </form>


            <Button
                onClick={logInAsNewClientJeka}
                variant='contained'
            >
                Log in as Jeka
            </Button>
        </div>
    );
};

export default LogIn;