import React, {useState} from 'react';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custombutton.component";
import {auth, SignInWithGoogle} from "../../firebase/firebase.utils";
import './sign-in.styles.scss';

const SignIn = () => {
    const [userCredentials, setUserCredentials] = useState({email:'', password: ''});

    const {email, password} = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await auth.signInWithEmailAndPassword(email,password);
            setUserCredentials({...userCredentials, email:'', password:''});
        } catch (e) {
            alert(e);
        }
    };

    const handleChange = event => {
        const {name, value} = event.target;
        setUserCredentials({...userCredentials, [name]: value});
        // console.log(this.state.email,this.state.password);
    };
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={handleSubmit}>
                    <FormInput label='Email' type="email" name='email' value={email} required handleChange={handleChange}/>
                    <FormInput label='Password' type="password" name='password' value={password} required handleChange={handleChange}/>
                    <div className="buttons">
                        <CustomButton type="submit">
                            Sign in
                        </CustomButton>
                        <CustomButton type="button" onClick={SignInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton>
                    </div>
                </form>
            </div>
        );
};

export default SignIn;