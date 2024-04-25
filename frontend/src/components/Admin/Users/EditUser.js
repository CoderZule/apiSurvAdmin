import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById, editUser } from '../../../actions/userActions';
import Error from '../../Error';
import Loading from '../../Loading';
import Success from '../../Success';

export default function EditUser(props) {
    const [Firstname, setFirstname] = useState('');
    const [Lastname, setLastname] = useState('');
    const [Cin, setCin] = useState('');
    const [Role, setRole] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');


    const dispatch = useDispatch();
    const userId = props.match.params._id

    const getUserByIdState = useSelector((state) => state.getUserByIdReducer);
    const { loading, error, user } = getUserByIdState;

    const editUserState = useSelector((state) => state.editUserReducer);
    const { editloading, editerror, editsuccess } = editUserState;

    useEffect(() => {
        console.log("User ID:", userId);
        dispatch(getUserById(userId));
    }, [dispatch, userId]);

    useEffect(() => {
        if (user) {

            setFirstname(user.Firstname);
            setLastname(user.Lastname);
            setCin(user.Cin);
            setRole(user.Role);
            setEmail(user.Email);
            setPassword(user.Password);

        }
    }, [user]);

    function handleEditUser(e) {
        e.preventDefault();

        const editedUser = {
            _id: userId,
            Firstname,
            Lastname,
            Cin,
            Role,
            Email,
            Password
        };

        dispatch(editUser(editedUser));
    }


    return (
        <div className="row justify-content-center">
            <div className="col-8">
                {loading && <Loading />}
  
                <div className="card shadow-lg bg-white rounded">
                    <div className="card-header pb-0">
                        <h6>Modifier Utilisateur</h6>
                    </div>
                    <div className="card-body">
                        <form className="row" onSubmit={handleEditUser}>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Nom</label>
                                <input required type="text" placeholder="Nom" className="form-control" value={Lastname} onChange={(e) => setLastname(e.target.value)} />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Prénom</label>
                                <input required type="text" placeholder="Prénom" className="form-control" value={Firstname} onChange={(e) => setFirstname(e.target.value)} />
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
                                {editsuccess && <Success success="Utilisateur mis à jour avec succès" />}
                                {editerror && <Error error="Quelque chose s'est mal passé lors de la mise à jour de l'utilisateur" />}

                                <div className="col-md-6 mb-3">
                                    <button type="submit" className="btn btn-primary">Modifier</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
