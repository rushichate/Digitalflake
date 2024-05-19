import React, { useState } from 'react';
import "./LoginSignup.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';

function LoginSignup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                const res = await axios.post('http://localhost:8000/admin/login', { email, password });
                alert(res.data.message);
                localStorage.setItem('token', res.data.token);
                if (res.data.message === "Login Successful") {
                    navigate('/dashboard');
                }
            } else {
                const res = await axios.post('http://localhost:8000/admin/register', { first_name, last_name, email, password });
                alert(res.data.message);
                window.location.reload();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <Nav />
            <div className='log-container'>
                <div className='log'>
                    <h2>{isLogin ? 'Login' : 'Signup'}</h2>
                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <>
                                <label htmlFor="firstname">First Name:</label>
                                <input type="text" id="firstname" value={first_name} onChange={(e) => setFirst_name(e.target.value)} required />
                                <label htmlFor="lastname">Last Name:</label>
                                <input type="text" id="lastname" value={last_name} onChange={(e) => setLast_name(e.target.value)} required />
                            </>
                        )}
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type='submit'>{isLogin ? 'Login' : 'Signup'}</button>
                    </form>
                    <p>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <Link onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Signup" : "Login"}</Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default LoginSignup;
