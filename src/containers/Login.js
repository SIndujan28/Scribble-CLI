import React, { useState } from "react";
import {FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";

import { useFormFields } from "../libs/hooksLib";
import "./Login.css";
import LoaderButton from "../components/LoaderButton";

export default function Login(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: ""
    });
    function validateForm() {
        return fields.email.length > 0 && fields.password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            await Auth.signIn(fields.email, fields.password);
            props.userHasAuthenticated(true);
            props.history.push("/");
        } catch (e) {
            alert(e.message);}
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                         autoFocus
                         type="email"
                         value={fields.email}
                         onChange={e => handleFieldChange(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        value={fields.password}
                        onChange={e => handleFieldChange(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <LoaderButton block bsSize="large" disabled={!validateForm()} isLoading={isLoading} type="submit">
                    Login
                </LoaderButton>
            </form>
        </div>);
        }
