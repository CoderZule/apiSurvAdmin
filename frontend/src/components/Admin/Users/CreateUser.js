import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../../actions/userActions';
import Error from '../../Error';
import Loading from '../../Loading';
import Success from '../../Success';
import io from 'socket.io-client';

export default function CreateUser() {
    const [Firstname, setFirstname] = useState('');
    const [Lastname, setLastname] = useState('');
    const [Phone, setPhone] = useState('');
    const [Cin, setCin] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Role, setRole] = useState('');
    const [showSuccess, setShowSuccess] = useState(false); 

    const createUserState = useSelector((state) => state.createUserReducer);
    const { error, loading, success } = createUserState;

    const dispatch = useDispatch();

    useEffect(() => {
        const socket = io('http://localhost:3001');

        return () => {
            socket.disconnect();
        };
    }, []);

    function handleCreateUser(e) {
        e.preventDefault();

        const user = {
            Firstname,
            Lastname,
            Phone,
            Cin,
            Email,
            Password,
            Role
        };

        dispatch(createUser(user)).then(() => {
            // Reset input fields to empty values after successful user creation
            setFirstname('');
            setLastname('');
            setPhone('');
            setCin('');
            setEmail('');
            setPassword('');
            setRole('');
            // Show success message
            setShowSuccess(true);
            // Hide success message after 3 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        }).catch((error) => {
            // Handle error if dispatch fails
            console.error('Error creating user:', error);
        });
    }
    return (
        <div className="row justify-content-center">
            <div className="col-8">
                {loading && <Loading />}


                <div className="card shadow-lg bg-white rounded">
                    <div className="card-header pb-0">
                        <h6>Créer Utilisateur</h6>
                    </div>
                    <div className="card-body">
                        <form className="row" onSubmit={handleCreateUser}>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Nom</label>
                                <input required type="text" placeholder="Nom" className="form-control" value={Lastname} onChange={(e) => setLastname(e.target.value)} />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Prénom</label>
                                <input required type="text" placeholder="Prénom" className="form-control" value={Firstname} onChange={(e) => setFirstname(e.target.value)} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Tel</label>
                                <input required type="text" placeholder="Tel" className="form-control" value={Phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Cin</label>
                                <input required type="text" placeholder="Cin" className="form-control" value={Cin} onChange={(e) => setCin(e.target.value)} />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Rôle</label>
                                <select name="Role" className="form-select" value={Role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="" disabled>Sélectionnez un rôle</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Apiculteur">Apiculteur</option>
                                    <option value="Assistance intermédiaire">Assistance intermédiaire</option>
                                    <option value="Niveau Stratégique">Niveau Stratégique</option>
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Email</label>
                                <input required type="email" placeholder="Email" className="form-control" value={Email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Mot de passe</label>
                                <input required type="password" placeholder="Mot de passe" className="form-control" value={Password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className='row justify-content-center'>
                                {showSuccess && <Success success="Utilisateur créé avec succès" />}
                                {error && <Error error="Quelque chose s'est mal passé" />}

                                <div className="col-md-6 mb-3">
                                    <button type="submit" className="btn btn-primary">Créer</button>
                                </div>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}
