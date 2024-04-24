import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../actions/userActions';
import { createApiary } from '../../../actions/apiaryActions';
import Error from '../../Error';
import Loading from '../../Loading';
import Success from '../../Success';

export default function CreateApiary() {
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

    const forages = ["Thym", "Lavande", "Romarin", "Eucalyptus", "Arbres d'agrumes", "Luzerne", "Trèfle", "Fleurs sauvages", "Caroubier", "Acacia"];
    
    const types = ["Base", "Migratoire", "Fixe", "Autre"];
    
    const sunExposureOptions = ["Ensoleillé", "Semi-ombragé", "Ombragé", "Autre"];


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
    const [Owner, setOwner] = useState('');

    const createApiaryState = useSelector((state) => state.createApiaryReducer);
    const { error, loading, success } = createApiaryState;



    function handleCreateApiary(e) {
        e.preventDefault();

        const apiary = {
            Name,
            Forages,
            Type,
            SunExposure,
            Location,
            Owner

        };

        console.log(apiary);
        dispatch(createApiary(apiary)).then(() => {
            window.location.reload();
        });

    }


    return (
        <div className="row justify-content-center">
            <div className="col-8">
                {loading && <Loading />}
                {success && <Success success="Rucher créé avec succès" />}
                {error && <Error error="Quelque chose s'est mal passé" />}

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
                                <label className="form-label">Fourrage</label>
                                <select name="Forages" className="form-select" value={Forages} onChange={(e) => setForages(e.target.value)}>
                                    <option value="" disabled>Sélectionnez un fourrage</option>
                                    {forages.map((forage, index) => (
                                        <option key={index} value={forage}>{forage}</option>
                                    ))}
                                </select>
                            </div>

                            
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Type</label>
                                 <select name="Type" className="form-select" value={Type} onChange={(e) => setType(e.target.value)}>
                                    <option value="" disabled>Sélectionnez un type</option>
                                    {types.map((type, index) => (
                                        <option key={index} value={type}>{type}</option>
                                    ))}
                                </select>


                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Exposition au soleil</label>
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
                                <input required type="number" placeholder="Latitude" className="form-control" value={Location.latitude} onChange={(e) => setLocation({ ...Location, latitude: e.target.value })} />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Longitude</label>
                                <input required type="number" placeholder="Longitude" className="form-control" value={Location.longitude} onChange={(e) => setLocation({ ...Location, longitude: e.target.value })} />
                            </div>

                            <div className="col-md-6 mb-3">
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


                            <div className="col-md-6 mb-3">
                                <button type="submit" className="btn btn-primary">Créer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}
