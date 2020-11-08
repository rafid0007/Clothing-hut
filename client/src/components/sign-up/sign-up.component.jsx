import React, {useState} from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custombutton.component";
import {auth,createUserProfileDocument} from "../../firebase/firebase.utils";

import './sign-up.styles.scss';

const SignUP = () => {

    const [userCredentials, setUserCredentials] = useState({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        });

    const handleChange = e => {
      const {name ,value} = e.target;
      setUserCredentials({...userCredentials, [name]:value});
    };

    const {displayName, email, password, confirmPassword} = userCredentials;

    const handleSubmit = async e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }
        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);

            await createUserProfileDocument(user, {displayName});

            setUserCredentials({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        } catch (e) {
            alert(e);
        }
    };

        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={handleSubmit}>
                    <FormInput
                        type='text'
                        name = 'displayName'
                        value = {displayName}
                        handleChange = {handleChange}
                        label= 'Display Name'
                        required
                    />
                    <FormInput
                        type='email'
                        name = 'email'
                        value = {email}
                        handleChange = {handleChange}
                        label= 'Email'
                        required
                    />
                    <FormInput
                        type='password'
                        name = 'password'
                        value = {password}
                        handleChange = {handleChange}
                        label= 'Password'
                        required
                    />
                    <FormInput
                        type='password'
                        name = 'confirmPassword'
                        value = {confirmPassword}
                        handleChange = {handleChange}
                        label= 'Confirm Password'
                        required
                    />
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        )
};

export default SignUP;