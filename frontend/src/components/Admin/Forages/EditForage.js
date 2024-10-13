import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getForageById, editForage } from '../../../actions/forageActions';
import Error from '../../Error';
import Loading from '../../Loading';
import Success from '../../Success';
import io from 'socket.io-client';

 
export default function EditForage(props) {

    useEffect(() => {
        const socket = io('http://localhost:3001');

        return () => {
            socket.disconnect();
        };
    }, []);

    const [Name, setname] = useState('');

    const dispatch = useDispatch();
    const forageId = props.match.params._id

    const getForageByIdState = useSelector((state) => state.getForageByIdReducer);
    const { loading, error, forage } = getForageByIdState;

    const editForageState = useSelector((state) => state.editForageReducer);
    const { editloading, editerror, editsuccess } = editForageState;

    useEffect(() => {
        console.log("Forage ID:", forageId);
        dispatch(getForageById(forageId));
    }, [dispatch, forageId]);

    useEffect(() => {
        if (forage) {

            setname(forage.Name);
        

        }
    }, [forage]);

    function handleEditForage(e) {
        e.preventDefault();

        const editedForage = {
            _id: forageId,
           Name
          
        };

        dispatch(editForage(editedForage));
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
                        <h6>Modifier Fourrage</h6>
                    </div>
                    <div className="card-body">
                    <form className="row justify-content-center"  onSubmit={handleEditForage}>
                            <div className="col-md-6 mb-3">
                            <label className="form-label" style={{ display: 'block', textAlign: 'center' }}>
                                    Nom fourrage (اسم العلف)
                                </label>
                                <input required type="text" placeholder="Nom fourrage" className="form-control" value={Name} onChange={e => handleNameChange(e.target.value)} />
                            </div>

                             


                            <div className='row justify-content-center'>
                                {editsuccess && <Success success="Fourrage mis à jour avec succès" />}
                                {editerror && <Error error="Quelque chose s'est mal passé lors de la mise à jour du fourrage" />}

                                <div className="col-md-4 mb-3">
                                    <button type="submit" className="btn ">Modifier</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
