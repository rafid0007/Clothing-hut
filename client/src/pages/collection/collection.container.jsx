import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";

import CollectionPage from "./collection.comp";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import {selectIsCollectionsLoaded} from "../../redux/shop/shop.selectors";

const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectIsCollectionsLoaded(state)
});

const CollectionPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage);


export default CollectionPageContainer;