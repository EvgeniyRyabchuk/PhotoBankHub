import React, {useState} from 'react';
import {useAction} from "../../../hooks/useAction";
import {useNavigate} from "react-router-dom";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";

const Register = () => {

    const { register } = useAction();

    const [name, setName] = useState('Jeka');
    const [email, setEmail] = useState('jeka.rubchuk@gmail.com');
    const [password, setPassword] = useState('123456789');
    const [roleId, setRoleId] = useState('1');

    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        const newUser = {name, email, roleId, password};
        await register(newUser);
        navigate(`/login`);
    }

    return (
        <div>
            <h1>Register</h1>

            <form action="" onSubmit={submit}>

                <input
                    type="text"
                    name='name'
                    onChange={(e) =>
                           setName(e.target.value)}
                    value={name}
                />

                <br/>
                <br/>

                <input
                    type="email"
                    name='email'
                    onChange={(e) =>
                           setEmail(e.target.value)}
                    value={email}
                />

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

                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                        Register As
                    </FormLabel>
                    <RadioGroup
                        onChange={(e, value) => {
                            setRoleId(value);
                        }}
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue={1}

                    >
                        <FormControlLabel value="1" control={<Radio />} label="Client" />
                        <FormControlLabel value="2" control={<Radio />} label="Creator" />
                    </RadioGroup>
                </FormControl>

                <br/>

                <button>Submit</button>
            </form>


        </div>
    );
};

export default Register;