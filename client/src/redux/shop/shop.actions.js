import shopActionTypes from "./shop.types";
import {firestore, convertCollectionsSnapShotToMap} from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({
    type: shopActionTypes.FETCH_COLLECTION_START
});

export const fetchCollectionsSuccess = collections => ({
    type: shopActionTypes.FETCH_COLLECTION_SUCCESS,
    payload: collections
});

export const fetchCollectionsFailure = errorMessage => ({
    type: shopActionTypes.FETCH_COLLECTION_FAILURE,
    payload: errorMessage
});

export const fetchCollectionsStartAsync = () => dispatch => {
    const collectionRef = firestore.collection('collections');
    dispatch(fetchCollectionsStart());
    collectionRef.get().then(response => {
        const collectionsMap = convertCollectionsSnapShotToMap(response);
        dispatch(fetchCollectionsSuccess(collectionsMap));
    }).catch(e => dispatch(fetchCollectionsFailure(e.message)));
};