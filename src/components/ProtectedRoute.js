import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { auth, db } from '../firebase/setup'; // Ensure these are imported correctly
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserRole = async () => {
            const user = auth.currentUser;

            if (user) {
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    setRole(userSnap.data().role);
                } else {
                    setRole("user"); // Default role if no role is found
                }
            }

            setLoading(false);
        };

        fetchUserRole();
    }, []);

    if (loading) return <div>Loading...</div>;

    // If the role is not admin, redirect to a 404 page or home
    if (role !== "admin") {
        return <Navigate to="/404" replace />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired, // Define the expected prop type for children
};

export default ProtectedRoute;
