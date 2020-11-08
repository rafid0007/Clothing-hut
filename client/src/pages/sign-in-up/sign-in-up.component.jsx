import React from 'react';
import './sign-in-up.scss';
import SignIn from "../../components/sign-in/sign-in.component";
import SignUP from "../../components/sign-up/sign-up.component";

const SignInUp = () => (

        <div className='sign-in-up'>
            <SignIn/>
            <SignUP/>
        </div>
);

export default SignInUp;