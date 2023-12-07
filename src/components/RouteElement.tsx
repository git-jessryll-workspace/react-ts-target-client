import React from "react"
import { Navigate } from "react-router-dom"

interface RouteElementProps {
    element: React.ReactNode;
    isAuthenticated: Boolean;
};

const RouteElement: React.FC<RouteElementProps> = ({ element, isAuthenticated }) => {
    return isAuthenticated ? element : <Navigate to={"/login"} replace />
}

export default RouteElement;