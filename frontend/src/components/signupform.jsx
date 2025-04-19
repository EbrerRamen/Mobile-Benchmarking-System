import React, { useState } from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom'; // ✅ import useNavigate
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // ✅ initialize the navigate function

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("Account Created");
            navigate('/login'); // ✅ redirect to login after signup
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <label htmlFor="email">
                    Email:
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label htmlFor="password">
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Sign Up</button>
                <p>Already Registered? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
};

export default SignUpForm;
