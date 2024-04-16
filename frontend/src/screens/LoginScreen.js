import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../actions/userActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import './Login.css'; 

const LoginScreen = () => {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const loginState = useSelector((state) => state.loginUserReducer);
    const { loading, error } = loginState;
    const dispatch = useDispatch();

    const login = () => {
        const user = { Email, Password };
        dispatch(loginUser(user));
    };

    return (
        <div className='loginbox'>
            <img src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" className="avatar" alt="User Avatar" />
            <h1>Connectez-vous</h1>
            {loading && <Loading />}
            {error && <Error error="Informations invalides" />}
            <div>
                <input required type="email" placeholder="Email" className="form-control" value={Email} onChange={(e) => setEmail(e.target.value)} />
                <input required type="password" placeholder="Mot de passe" className="form-control" value={Password} onChange={(e) => setPassword(e.target.value)} />
                <input onClick={login} type="submit" value="Se connecter" />

            </div>
        </div>
    );
};

export default LoginScreen;
