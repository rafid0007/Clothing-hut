import React from 'react';
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import {auth} from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.comp";
import CartDropdown from "../cart-dropdown/cart-dropdown.comp";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {selectHidden} from "../../redux/cart/cart.selectors";

import {ReactComponent as Logo} from '../../assets/crown.svg';
// import './header.styles.scss';
import {HeaderContainer,LogoContainer, OptionContainerLink,OptionsContainer} from './header.styles'

const Header = ({currentUser, hidden}) => (
        <HeaderContainer>
            <LogoContainer to='/'>
                <Logo/>
            </LogoContainer>
            <OptionsContainer>
                <OptionContainerLink to='/shop'>
                    SHOP
                </OptionContainerLink>
                <OptionContainerLink to='/contact'>
                    CONTACT
                </OptionContainerLink>
                {
                    currentUser?
                        <OptionContainerLink as='div' onClick={() => auth.signOut()}>
                            SIGN OUT
                        </OptionContainerLink>
                        :
                        <OptionContainerLink to='/sign-in'>
                            SIGN IN
                        </OptionContainerLink>
                }
                <CartIcon/>
            </OptionsContainer>
            {
                hidden ? null : <CartDropdown/>
            }
        </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectHidden
});

export default connect(mapStateToProps)(Header);