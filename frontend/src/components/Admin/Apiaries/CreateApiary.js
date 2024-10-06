import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../actions/userActions';
import { createApiary } from '../../../actions/apiaryActions';
import Error from '../../Error';
import Loading from '../../Loading';
import Success from '../../Success';
import io from 'socket.io-client';
import GoogleMap from './GoogleMap';
import Modal from 'react-modal';
import { GovDeleg } from './GovDeleg';

import {forages, Apiarytypes, sunExposureOptions} from '../Data'

export default function CreateApiary() {


    useEffect(() => {
        const socket = io('http://localhost:3001');

        return () => {
            socket.disconnect();
        };
    }, []);





    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '70%',
            height: '50%',
            overflow: 'auto'
        }
    };




    const dispatch = useDispatch();
    const usersState = useSelector(state => state.getAllUsersReducer);
    const { users } = usersState;


    useEffect(() => {
        dispatch(getAllUsers());
    }, []);

    const [Name, setName] = useState('');
    const [Forages, setForages] = useState('');
    const [Type, setType] = useState('');
    const [SunExposure, setSunExposure] = useState('');
    const [Location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
        city: '',
        governorate: ''
    });

    function getCitiesByGovernorate(data) {
        const citiesByGovernorate = {};

        data.forEach(entry => {
            const { Gov, Deleg } = entry;

            if (!citiesByGovernorate[Gov]) {
                citiesByGovernorate[Gov] = [Deleg];
            } else {
                if (!citiesByGovernorate[Gov].includes(Deleg)) {
                    citiesByGovernorate[Gov].push(Deleg);
                }
            }
        });

        return citiesByGovernorate;
    }

     const citiesByGovernorate = getCitiesByGovernorate(GovDeleg);

    const [Owner, setOwner] = useState('');

    const createApiaryState = useSelector((state) => state.createApiaryReducer);
    const { error, loading, success } = createApiaryState;

    const [showSuccess, setShowSuccess] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState({
        latitude: 0,
        longitude: 0
    });

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };



    const handleLatitudeChange = (e) => {
        setSelectedLocation({
            ...selectedLocation,
            latitude: e.target.value
        });
    };

    const handleLongitudeChange = (e) => {
        setSelectedLocation({
            ...selectedLocation,
            longitude: e.target.value
        });
    };

    function handleCreateApiary(e) {
        e.preventDefault();

        const apiary = {
            Name,
            Forages,
            Type,
            SunExposure,
            Location: {
                ...Location,
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude
            },
            Owner
        };

        dispatch(createApiary(apiary)).then(() => {
            // Clear input fields
            setName('');
            setForages('');
            setType('');
            setSunExposure('');
            setLocation({
                latitude: 0,
                longitude: 0,
                city: '',
                governorate: ''
            });
            setOwner('');
            
            setShowSuccess(true);
            
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        });
    }




    return (
        <div className="row justify-content-center">
            <div className="col-12">
                {loading && <Loading />}


                <div className="card shadow-lg bg-white rounded">
                    <div className="card-header pb-0">
                        <h6>Créer Rucher</h6>
                    </div>
                    <div className="card-body">
                        <form className="row" onSubmit={handleCreateApiary}>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Nom</label>
                                <input required type="text" placeholder="Nom" className="form-control" value={Name} onChange={(e) => setName(e.target.value)} />
                            </div>



                            <div className="col-md-6 mb-3">
                                <label className="form-label">Fourrage (نباتات الرعي)</label>
                                <select name="Forages" className="form-select" value={Forages} onChange={(e) => setForages(e.target.value)}>
                                    <option value="" disabled>Sélectionnez un fourrage</option>
                                    {forages.map((forage, index) => (
                                        <option key={index} value={forage}>{forage}</option>
                                    ))}
                                </select>
                            </div>


                            <div className="col-md-6 mb-3">
                                <label className="form-label">Type (النوع)</label>
                                <select name="Type" className="form-select" value={Type} onChange={(e) => setType(e.target.value)}>
                                    <option value="" disabled>Sélectionnez un type</option>
                                    {Apiarytypes.map((type, index) => (
                                        <option key={index} value={type}>{type}</option>
                                    ))}
                                </select>


                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Exposition au soleil (التعرض للشمس)</label>
                                <select name="SunExposure" className="form-select" value={SunExposure} onChange={(e) => setSunExposure(e.target.value)}>
                                    <option value="" disabled>Sélectionnez une exposition au soleil</option>
                                    {sunExposureOptions.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>


                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Gouvernorat</label>
                                <select name="gouvernorat" className="form-select" value={Location.governorate} onChange={(e) => setLocation({ ...Location, governorate: e.target.value })}>
                                    <option value="" disabled>Sélectionnez un gouvernorat</option>
                                    {Object.keys(citiesByGovernorate).map((governorate, index) => (
                                        <option key={index} value={governorate}>{governorate}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Délégation</label>
                                <select name="ville" className="form-select" value={Location.city} onChange={(e) => setLocation({ ...Location, city: e.target.value })}>
                                    <option value="" disabled>Sélectionnez une Délégation</option>
                                    {Location.governorate && citiesByGovernorate[Location.governorate].map((city, index) => (
                                        <option key={index} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Latitude</label>
                                <input required type="number" placeholder="Latitude" className="form-control"
                                    value={selectedLocation.latitude} onChange={handleLatitudeChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Longitude</label>
                                <input required type="number" placeholder="Longitude" className="form-control" value={selectedLocation.longitude} onChange={handleLongitudeChange}
                                />
                            </div>
                          
                            <button type="button" className="btn mb-3" style={{ backgroundColor: "#e3e6f0", color: "#373737" }} onClick={openModal}>
                                Sélectionner les coordonnées
                            </button>

                            <Modal
                                isOpen={isModalOpen}
                                style={customStyles}
                                appElement={document.getElementById('root')}
                                onRequestClose={closeModal}
                                contentLabel="Select Coordinates"
                            >

                                <GoogleMap onLocationSelect={setSelectedLocation} />

                            </Modal>
                            <div className="col-md-12 mb-3">
                                <label className="form-label">Propriétaire</label>
                                <select
                                    name="owner"
                                    className="form-select"
                                    value={Owner}
                                    onChange={(e) => setOwner(e.target.value)}
                                >
                                    <option value="" disabled>Sélectionnez un propriétaire</option>
                                    {Array.isArray(users.data) && users.data.map((user) => (
                                        user.Role !== 'Admin' && user.Role !== 'Niveau Stratégique' && (
                                            <option key={user._id} value={user._id}>
                                                {user.Firstname} {user.Lastname} (CIN: {user.Cin})
                                            </option>
                                        )
                                    ))}
                                </select>
                            </div>



                            <div className='row justify-content-center'>
                                {showSuccess && <Success success="Rucher créé avec succès" />}
                                {error && <Error error="Quelque chose s'est mal passé" />}
                                <div className="col-md-4 mb-3">
                                    <button type="submit" className="btn">Créer</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}
