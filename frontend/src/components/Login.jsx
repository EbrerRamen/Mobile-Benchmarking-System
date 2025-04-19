import React, { useState } from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom'; // 🟢 import useNavigate
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // 🟢 create navigate function

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Logged in Successfully");
            navigate('/home'); // 🟢 redirect to home page
        } catch (err) {
            console.log(err);
            alert("Login failed. Please check your email and password.");
        }
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label htmlFor="email">
                    Email:
                    <input type="text" onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label htmlFor="password">
                    Password:
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type='submit'> Login</button>
                <p>Don't have an account? <Link to="/signup">Register</Link></p>
            </form>
        </div>
    );
};

export default Login;
