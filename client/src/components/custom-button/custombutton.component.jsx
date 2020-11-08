import React from 'react';
import './custombutton.styles.scss';

const CustomButton = ({isGoogleSignIn, inverted, children, ...otherProps}) => (
        <button className={`${inverted? 'inverted' : ''}${isGoogleSignIn? 'google-sign-in' : ''} custom-button`} {...otherProps}>
            {children}
        </button>
    );


export default CustomButton;