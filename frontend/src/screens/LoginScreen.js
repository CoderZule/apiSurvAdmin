import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../actions/userActions";
import { Redirect } from 'react-router-dom';
import Error from "../components/Error";
import Loading from "../components/Loading";
import './Login.css';

const LoginScreen = () => {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [ShowPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const loginState = useSelector((state) => state.loginUserReducer);
    const { loading, error, currentUser } = loginState; // Get currentUser from state
    const dispatch = useDispatch();

    const login = () => {
        const user = { Email, Password };
        dispatch(loginUser(user));
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!ShowPassword);
    };

    // Redirect to dashboard if currentUser exists (user is authenticated)
    if (currentUser) {
        return <Redirect to="/admin/dashboard" />;
    }

    return (
        <div className='login-screen-box'>
            <img src="/img/logo.png" className="loginlogo" alt="logo" />
            <p className='title'>Connectez-vous à votre compte</p>
            {loading && <Loading />}
            {error && <Error error="Informations invalides" />}
            <div>
            <p className="label">E-mail</p>

                <div className="input-container">
                    <i style={{ color: '#977700' }}className="fas fa-envelope left-icon"></i>

                    <input
                        required
                        type="email"
                        placeholder="exemple@apisurv.com"
                        className="form-control"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <p className="label">Mote de passe</p>

                <div className="input-container">
                    <i style={{ color: '#977700' }} className="fas fa-lock left-icon"></i>
                    <input
                        required
                        type={ShowPassword ? "text" : "password"} // Ensure password starts as hidden
                        placeholder="********"
                        className="form-control"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <i
                        className={`fas ${ShowPassword ? 'fa-eye' : 'fa-eye-slash'} right-icon`}
                        onClick={togglePasswordVisibility}
                    ></i>
                </div>
                <button onClick={login} type="submit">Se connecter</button>
                <p className='forgetPass'>Mot de passe oublié?</p>
            </div>
        </div>
    );
};

export default LoginScreen;
