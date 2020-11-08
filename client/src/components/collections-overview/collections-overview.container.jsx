import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";

import CollectionsOverview from "./collections-overview.comp";
import WithSpinner from "../with-spinner/with-spinner.component";
import {selectIsCollectionsLoaded} from "../../redux/shop/shop.selectors";

const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectIsCollectionsLoaded(state)
});

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview);


export default CollectionsOverviewContainer;