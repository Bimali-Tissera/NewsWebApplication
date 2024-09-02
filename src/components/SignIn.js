import React from 'react';
import frontBanner from "../images/bannerbanner.jpg";
import logo from "../images/logo_inshorts.webp";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "../firebase/setup"; // Ensure db is imported
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';

function SignIn() {
    const navigate = useNavigate();

    const googleSignin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Check if the user already has a role set in Firestore
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                // If the user does not exist, set a default role (e.g., "user")
                await setDoc(userRef, { role: "user" });
                console.log("User role set to 'user'");
            } else {
                console.log("User role already exists:", userSnap.data().role);
            }

            // Navigate based on role
            const role = userSnap.exists() ? userSnap.data().role : "user";
            if (role === "admin") {
                navigate("/dashboard");
            } else {
                navigate("/home");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='grid grid-cols-2 bg-white h-screen'>
            <div className='text-center'>
                <img src={logo} className='h-16 ml-60 mt-32' alt="Logo" />
                <h1 className='text-black text-3xl font-semibold mt-7'>Sign in</h1>
                <button onClick={googleSignin} className="bg-gray-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded h-14 w-96 mt-14">
                    Sign In
                </button>
                <h4 className='text-black underline mt-7'>Sign in now</h4>
            </div>
            <div>
                <img src={frontBanner} className='h-screen' alt="Banner" />
            </div>
        </div>
    );
}

export default SignIn;
