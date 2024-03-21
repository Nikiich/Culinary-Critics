import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleBasedWrapper = ({ roles, children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (roles.some(role => user.roles[role])) {
        return children;
    }

    return <Navigate to="/" />;
};

export default RoleBasedWrapper;