import React from 'react'
import { Navigate } from 'react-router-dom';
import { routes } from '../../constants/routes';

export function RouteWrapper({
    component: Component,
    redirectHome
}) {

    const ACCESS_TOKEN = "accessToken";
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    /**
     * Redirect user to Log in page if he tries to access a route
     * without authentication.
     */
    if (!accessToken) {
        return <Navigate to={routes.LOGIN} />;
    }

    /**
     * Redirect user to Home page if he tries to access a route
     * that doesn't exists.
     */
    if (redirectHome) {
        return <Navigate to={routes.APP + routes.HOME} />;
    }

    /**
     * If not included on previous cases, redirect user to the desired route.
     */
    return (
        <Component />
    );
}

export default RouteWrapper;
