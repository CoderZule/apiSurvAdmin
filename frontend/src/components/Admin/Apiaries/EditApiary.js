import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../actions/userActions';
import { getApiaryById, editApiary } from '../../../actions/apiaryActions';
import Error from '../../Error';
import Loading from '../../Loading';
import Success from '../../Success';
import io from 'socket.io-client';
import GoogleMap from './GoogleMap';
import Modal from 'react-modal';


export default function EditApiary(props) {


    useEffect(() => {
        const socket = io('http://localhost:3001');

        return () => {
            socket.disconnect();
        };
    }, []);
    const dispatch = useDispatch();

    const governorates = ["Ariana", "Beja", "Ben Arous", "Bizerte", "Gabes", "Gafsa", "Jendouba", "Kairouan", "Kasserine", "Kebili", "Le Kef", "Mahdia", "Manouba", "Medenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid", "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"];

    const citiesByGovernorate = {
        "Ariana": ["Ariana", "Raoued", "La Soukra"],
        "Beja": ["Béja", "Nefza", "Testour"],
        "Ben Arous": ["Ben Arous", "Mégrine", "Hammam Lif"],
        "Bizerte": ["Bizerte", "Menzel Bourguiba", "Mateur"],
        "Gabes": ["Gabès", "Métouia", "El Hamma"],
        "Gafsa": ["Gafsa", "Métlaoui", "Redeyef"],
        "Jendouba": ["Jendouba", "Tabarka", "Aïn Draham"],
        "Kairouan": ["Kairouan", "Sousse", "Hajeb El Ayoun"],
        "Kasserine": ["Kasserine", "Sbeitla", "Fériana"],
        "Kebili": ["Kébili", "Douz", "Souk Lahad"],
        "Le Kef": ["Le Kef", "Dahmani", "Tajerouine"],
        "Mahdia": ["Mahdia", "Bou Merdes", "Chebba"],
        "Manouba": ["Manouba", "Douar Hicher", "Oued Ellil"],
        "Medenine": ["Médenine", "Ben Gardane", "Zarzis"],
        "Monastir": ["Monastir", "Moknine", "Ksar Hellal"],
        "Nabeul": ["Nabeul", "Hammamet", "Kelibia", "Takelsa", "Menzel Bouzelfa", "Menzel Temime", "El Maâmoura", "Soliman", "Korba", "Beni Khiar", "Grombalia", "Bou Argoub"],
        "Sfax": ["Sfax", "Sakiet Ezzit", "El Jem"],
        "Sidi Bouzid": ["Sidi Bouzid", "Regueb", "Jilma"],
        "Siliana": ["Siliana", "Bou Arada", "Gaafour"],
        "Sousse": ["Sousse", "Ezzouhour", "Akouda"],
        "Tataouine": ["Tataouine", "Ghomrassen", "Remada"],
        "Tozeur": ["Tozeur", "Nefta", "Degache"],
        "Tunis": ["Tunis", "La Marsa", "Carthage"],
        "Zaghouan": ["Zaghouan", "Nadhour", "El Fahs"]
    };
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
    const [Owner, setOwner] = useState('');


    const apiaryId = props.match.params._id

    const getApiaryByIdState = useSelector((state) => state.getApiaryByIdReducer);
    const { loading, error, apiary } = getApiaryByIdState;

    const editApiaryState = useSelector((state) => state.editApiaryReducer);
    const { editloading, editerror, editsuccess } = editApiaryState;

    useEffect(() => {
        console.log("APIARY ID:", apiaryId);
        dispatch(getApiaryById(apiaryId));
    }, [dispatch, apiaryId]);

    useEffect(() => {
        if (apiary) {
            setName(apiary.Name);
            setForages(apiary.Forages);
            setType(apiary.Type);
            setSunExposure(apiary.SunExposure);
            setLocation({
                ...Location,
                latitude: apiary.Location.latitude,
                longitude: apiary.Location.longitude,
                city: apiary.Location.city,
                governorate: apiary.Location.governorate
            });
            setOwner(apiary.Owner);
            setSelectedLocation({
                latitude: apiary.Location.latitude,
                longitude: apiary.Location.longitude
            });
        }
    }, [apiary]);


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

    function handleEditApiary(e) {
        e.preventDefault();

        const editedApiary = {
            _id: apiaryId,
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

        dispatch(editApiary(editedApiary));
    }



    return (
        <div className="row justify-content-center">
            <div className="col-12">
                {loading && <Loading />}

                <div className="card shadow-lg bg-white rounded">
                    <div className="card-header pb-0">
                        <h6>Modifier Rucher</h6>
                    </div>
                    <div className="card-body">
                        <form className="row" onSubmit={handleEditApiary}>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Nom</label>
                                <input required type="text" placeholder="Nom" className="form-control" value={Name} onChange={(e) => setName(e.target.value)} />
                            </div>



                            <div className="col-md-6 mb-3">
                                <label className="form-label">Fourrage</label>
                                <select name="Forages" className="form-select" value={Forages} onChange={(e) => setForages(e.target.value)}>
                                    <option value="" disabled>Sélectionnez un fourrage</option>
                                    <option value="Thym">Thym</option>
                                    <option value="Lavande">Lavande</option>
                                    <option value="Romarin">Romarin</option>
                                    <option value="Eucalyptus">Eucalyptus</option>
                                    <option value="Arbres d'agrumes">Arbres d'agrumes</option>
                                    <option value="Luzerne">Luzerne</option>
                                    <option value="Trèfle">Trèfle</option>
                                    <option value="Fleurs sauvages">Fleurs sauvages</option>
                                    <option value="Caroubier">Caroubier</option>
                                    <option value="Acacia">Acacia</option>
                                </select>

                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Type</label>
                                <select name="Type" className="form-select" value={Type} onChange={(e) => setType(e.target.value)}>
                                    <option value="" disabled>Sélectionnez un type</option>
                                    <option value="Base">Base</option>
                                    <option value="Migratoire">Migratoire</option>
                                    <option value="Fixe">Fixe</option>
                                    <option value="Autre">Autre</option>

                                </select>


                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Exposition au soleil</label>
                                <select name="SunExposure" className="form-select" value={SunExposure} onChange={(e) => setSunExposure(e.target.value)}>
                                    <option value="" disabled>Sélectionnez une exposition au soleil</option>
                                    <option value="Ensoleillé">Ensoleillé</option>
                                    <option value="Semi-ombragé">Semi-ombragé</option>
                                    <option value="Ombragé">Ombragé</option>
                                    <option value="Autre">Autre</option>

                                </select>


                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Gouvernorat</label>
                                <select name="gouvernorat" className="form-select" value={Location.governorate} onChange={(e) => setLocation({ ...Location, governorate: e.target.value })}>
                                    <option value="" disabled>Sélectionnez un gouvernorat</option>
                                    {governorates.map((governorate, index) => (
                                        <option key={index} value={governorate}>{governorate}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Ville</label>
                                <select name="ville" className="form-select" value={Location.city} onChange={(e) => setLocation({ ...Location, city: e.target.value })}>
                                    <option value="" disabled>Sélectionnez une ville</option>
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
                            {/* Button to open the modal */}
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
                                        user.Role !== 'Admin' && (
                                            <option key={user._id} value={user._id}>
                                                {user.Firstname} {user.Lastname} (CIN: {user.Cin})
                                            </option>
                                        )
                                    ))}
                                </select>
                            </div>



                            <div className='row justify-content-center'>
                                {editsuccess && <Success success="Rucher mis à jour avec succès" />}
                                {editerror && <Error error="Quelque chose s'est mal passé lors de la mise à jour du rucher" />}

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
