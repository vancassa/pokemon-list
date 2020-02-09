import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

function AuthorizedRoute(props) {
    const { hasAccess, children } = props;

    if (hasAccess) {
        return <>{children}</>;
    }
    return <Redirect to="/" />;
}

const mapStateToProps = state => ({
    hasAccess: state.initialData
});

export default connect(mapStateToProps)(AuthorizedRoute);
