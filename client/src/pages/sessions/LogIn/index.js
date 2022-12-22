import React, {useState} from 'react';
import {useAction} from "../../../hooks/useAction";
import {useNavigate} from "react-router-dom";
import {Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup} from "@mui/material";

const LogIn = () => {

    const { login } = useAction();

    const navigate = useNavigate();

    const [email, setEmail] = useState('nicholasrobinson@gmail.com');
    const [password, setPassword] = useState('password');
    const [rememberMe, setRememberMe] = useState(true);

    const submit = async (e) => {
        e.preventDefault();
        const data =  await login(email, password, rememberMe);
        console.log(data)
        setTimeout(() =>
            navigate(`/profile`),
0);
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

                <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                    <FormGroup>
                        <FormControlLabel

                            control={
                                <Checkbox
                                    checked={rememberMe}
                                    onChange={(e, value) =>
                                        setRememberMe(value)
                                    }
                                />}
                            label="Remember Me"
                        />
                    </FormGroup>
                </Box>


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