import React, {useEffect} from 'react';
import { Route } from 'react-router-dom';
import {connect} from "react-redux";

import {fetchCollectionsStartAsync} from "../../redux/shop/shop.actions";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";

import './shop.styles.scss';


const ShopPage = ({match, fetchCollectionsStartAsync}) => {

    // componentDidMount() {
    //     let { fetchCollectionsStartAsync } = this.props;
    //    fetchCollectionsStartAsync();
    // }

    useEffect(() => {
        console.log('shop useEffect fired!!!!');
        fetchCollectionsStartAsync();
    }, [fetchCollectionsStartAsync]);

        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionsOverviewContainer}/>
                <Route exact path={`${match.path}/:collectionId`} component={CollectionPageContainer}/>
            </div>
        );
};

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});


export default connect(null, mapDispatchToProps)(ShopPage);