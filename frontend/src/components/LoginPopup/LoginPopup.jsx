import React, { useContext, useState, useEffect } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPopup = ({ setShowLogin }) => {
    const { setToken, url, loadCartData } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Sign Up");

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        // Check if user is already logged in
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken);
            loadCartData({ token: savedToken });
            setShowLogin(false);
        }
    }, [setToken, loadCartData, setShowLogin]);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        let new_url = url;
        if (currState === "Login") {
            new_url += "/api/user/login";
            try {
                const response = await axios.post(new_url, data);
                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                    loadCartData({ token: response.data.token });

                    // Show toast message before redirecting
                    toast.success("Login successful! 🎉");

                    setTimeout(() => {
                        setShowLogin(false);
                        window.location.href = "/"; // Redirect after toast shows
                    }, 1500); // Delay to allow toast to display
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error("Login failed! Please try again.");
            }
        } else {
            // Registration process
            new_url += "/api/user/register";
            try {
                const response = await axios.post(new_url, data);
                if (response.data.success) {
                    toast.success("Registration successful! Please log in.");
                    setCurrState("Login"); // Switch to login state after registration
                    setData({ email: "", password: "", name: "" }); // Clear input fields
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error("Registration failed! Please try again.");
            }
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onSubmit} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2> <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" && (
                        <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />
                    )}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                </div>
                <button type="submit">{currState === "Login" ? "Login" : "Create account"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login" ? (
                    <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
                ) : (
                    <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
                )}
            </form>
        </div>
    );
};

export default LoginPopup;
