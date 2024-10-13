import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createForage } from '../../../actions/forageActions';
import Error from '../../Error';
import Loading from '../../Loading';
import Success from '../../Success';
import io from 'socket.io-client';


export default function CreateForage() {
    const [Name, setname] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const createForageState = useSelector((state) => state.createForageReducer);
    const { error, loading, success } = createForageState;

    const dispatch = useDispatch();

    useEffect(() => {
        const socket = io('http://localhost:3001');

        return () => {
            socket.disconnect();
        };
    }, []);

    function handleCreateForage(e) {
        e.preventDefault();

        const forage = {
            Name
        };

        dispatch(createForage(forage)).then(() => {

            setname('');
            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        }).catch((error) => {

            console.error('Error creating forage:', error);
        });
    }

    const namePattern = /^[a-zA-Z\u0600-\u06FF' -]+$/;


    function handleNameChange(value) {
        if (namePattern.test(value) || value === '') {
            setname(value);
        }
    }


    return (
        <div className="row justify-content-center">
            <div className="col-12">
                {loading && <Loading />}


                <div className="card shadow-lg bg-white rounded">
                    <div className="card-header pb-0">
                        <h6>Créer Fourrage</h6>
                    </div>
                    <div className="card-body">
                        <form className="row justify-content-center" onSubmit={handleCreateForage}>
                            <div className="col-md-6 mb-3">
                                <label className="form-label" style={{ display: 'block', textAlign: 'center' }}>
                                    Nom fourrage (اسم العلف)
                                </label>

                                <input required type="text" placeholder="Nom fourrage" className="form-control" value={Name} onChange={e => handleNameChange(e.target.value)}
                                />
                            </div>




                            <div className='row justify-content-center'>
                                {showSuccess && <Success success="Fourrage créé avec succès" />}
                                {error && <Error error="Quelque chose s'est mal passé" />}

                                <div className="col-md-4 mb-3">
                                    <button type="submit" className="btn ">Créer</button>
                                </div>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}
