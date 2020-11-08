import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import Checkout from "./pages/checkout/checkout.comp";

import SignInUp from "./pages/sign-in-up/sign-in-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import {setCurrentUser} from "./redux/user/user.action";
import {selectCurrentUser} from "./redux/user/user.selectors";

import "./App.css";

const App = ({currentUser, setCurrentUser}) => {

 //    unsubscribeFromAuth = null;
 //
 // componentDidMount() {
 //     const {setCurrentUser, collectionsArray} = this.props;
 //     this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
 //         if (userAuth) {
 //             const userRef = await createUserProfileDocument(userAuth);
 //
 //             userRef.onSnapshot(snapshot => {
 //                 setCurrentUser(
 //                     {
 //                        id: snapshot.id,
 //                        ...snapshot.data()
 //                     }
 //                     );
 //             })
 //         } else {
 //             setCurrentUser(userAuth)
 //         }
 //     });
 // }
 //
 //    componentWillUnmount() {
 //      this.unsubscribeFromAuth();
 //  }

    useEffect(() => {
        console.log('UseEffect Fired!!!');
        auth.onAuthStateChanged(async userAuth => {
         if (userAuth) {
             const userRef = await createUserProfileDocument(userAuth);

             userRef.onSnapshot(snapshot => {
                 setCurrentUser(
                     {
                        id: snapshot.id,
                        ...snapshot.data()
                     }
                     );
             })
         } else {
             setCurrentUser(userAuth)
         }
     });
    },[setCurrentUser]);

    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path='/checkout' component={Checkout}/>
          <Route exact path="/sign-in" render={() => currentUser ? (<Redirect to='/'/>):(<SignInUp/>)} />
        </Switch>
      </div>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);