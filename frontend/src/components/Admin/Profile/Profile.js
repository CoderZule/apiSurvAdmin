import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserById, editUser } from '../../../actions/userActions';
import Error from '../../Error';
import Loading from '../../Loading';
import Success from '../../Success';
import './Profile.css';
import io from 'socket.io-client';

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export default function Profile() {

    useEffect(() => {
        const socket = io('http://localhost:3001');

        return () => {
            socket.disconnect();
        };
    }, []);


    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.loginUserReducer.currentUser);
    const getUserByIdState = useSelector(state => state.getUserByIdReducer);
    const { loading, error, user } = getUserByIdState;
    const editUserState = useSelector(state => state.editUserReducer);
    const { editloading, editerror, editsuccess } = editUserState;

    const [Firstname, setFirstname] = useState('');
    const [Lastname, setLastname] = useState('');
    const [Phone, setPhone] = useState('');
    const [Cin, setCin] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    useEffect(() => {
        if (currentUser) {
            const { _id } = currentUser;
            dispatch(getUserById(_id));
        }
    }, [dispatch, currentUser]);

    useEffect(() => {
        if (user) {
            const { Firstname, Lastname, Phone, Cin, Email, Password } = user;
            setFirstname(Firstname);
            setLastname(Lastname);
            setPhone(Phone);
            setCin(Cin);
            setEmail(Email);
            setPassword(Password);
        }
    }, [user]);

    const handleEditUser = (e) => {
        e.preventDefault();

        const editedUser = {
            _id: currentUser._id,
            Firstname,
            Lastname,
            Phone,
            Cin,
            Email,
            Password
        };

        dispatch(editUser(editedUser));
    };

    const namePattern = /^[a-zA-Z' -]+$/;

    function handleFirstnameChange(value) {
        if (namePattern.test(value) || value === '') {
            setFirstname(value);
        }
    }

    function handleLastnameChange(value) {
        if (namePattern.test(value) || value === '') {
            setLastname(value);
        }
    }
    return (
        <div className="container">
            <div className="row gutters">
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                    <div className="card h-100">
                        <div className="card-body">
                            <div className="account-settings">
                                <div className="user-profile">
                                    <div className="user-avatar">
                                        <img src="/img/undraw_profile.svg" alt="Admin" />
                                    </div>
                                    <h5 className="user-name">{`${Firstname} ${Lastname}`}</h5>
                                    <h6 className="user-email">{Email}</h6>
                                </div>
                                <div className="about">
                                    <h5>Rôle</h5><p>{currentUser.Role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                    <div className="card h-100">
                        <div className="card-body">
                            <div className="row gutters">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <h6 className="mb-2 text-primary">Détails personnels</h6>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="fullName">Nom</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="fullName"
                                            value={Lastname}
                                            onChange={e => handleLastnameChange(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="fullName">Prénom</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="fullName"
                                            value={Firstname}
                                            onChange={e => handleFirstnameChange(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="eMail">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="eMail"
                                            value={Email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label className="form-label">Tel</label>
                                        <PhoneInput

                                            country="FR"
                                            value={Phone}
                                            onChange={setPhone}
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="cin">CIN</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="cin"
                                            value={Cin}
                                            onChange={(e) => setCin(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="password">Mot de passe</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            value={Password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row gutters">
                                {editsuccess && <Success success="Mise à jour du profil réussie" />}
                                {editerror && <Error error="Une erreur s'est produite lors de la mise à jour du profil" />}
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6"></div> 
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                                    <div className="text-right">
                                        <button type="submit" onClick={handleEditUser} className="btn btn-primary">Modifier</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
