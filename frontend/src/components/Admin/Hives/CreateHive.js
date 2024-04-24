import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllApiaries } from '../../../actions/apiaryActions';
import { createHive } from '../../../actions/hiveActions';
import Error from '../../Error';
import Loading from '../../Loading';
import Success from '../../Success';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default function CreateHive() {


    const colors = ['Rouge', 'Bleu', 'Vert', 'Jaune', 'Orange', 'Violet', 'Rose', 'Marron', 'Blanc', 'Noir'];

    const types = [
        '12x10',
        '14x12',
        'AZ',
        'BeeHaus',
        'Bienenkiste',
        'CDB',
        'Commercial',
        'Dadant',
        'Dartington',
        'Farrar',
        'Flow',
        'Italica-Carlini',
        'Langstroth',
        'Langstroth Poly',
        'Layens',
        'Local c',
        'Local S',
        'Ruche Long Box',
        'National',
        'Norsk Mal',
        'Nucleus',
        'Autre',
        'Rose OSB',
        'Segeberger',
        'Simplex',
        'Smith',
        'Spaarkast',
        'Ruche à barres supérieures',
        'WBC',
        'Warre',
        'Zander'
    ];

    const source = ['Colonie Achetée', 'Noyau Acheté', 'Paquet Acheté', 'Noyau Capturé', 'Découpé', 'Piège Sorti', 'Divisé', 'Supplanté'];

    const purpose = ['Production de Miel', 'Production d\'Abeilles', 'Élevage de Reines', 'R&D', 'Autre'];

    const strength = ['Très Faible', 'Faible', 'Modérée', 'Forte', 'Très forte'];
    const temperament = ['Calme', 'Nerveuse', 'Agressive'];


    const dispatch = useDispatch();
    const apiariesState = useSelector(state => state.getAllApiariesReducer);
    const { apiaries } = apiariesState;


    useEffect(() => {
        dispatch(getAllApiaries());
    }, []);

    const [Color, setColor] = useState('');
    const [Type, setType] = useState('');
    const [Source, setSource] = useState('');
    const [Purpose, setPurpose] = useState('');
    const [Added, setAdded] = useState(new Date());
    const [Note, setNote] = useState('');
    const [Colony, setColony] = useState({
        strength: '',
        temperament: '',
        supers: 0,
        frames: 0
    });
    const [Queen, setQueen] = useState({
        seen: false,
        marked: false,
        color: '',
        hatched: 0,
        status: '',
        installed: new Date(),
        queen_state: '',
        race: '',
        clipped: false,
        origin: '',
        temperament: '',
        note: ''
    });
    const [Apiary, setApiary] = useState('');

    const handleDateChange = (date) => {
        setAdded(date);
    };

    const createApiaryState = useSelector((state) => state.createApiaryReducer);
    const { error, loading, success } = createApiaryState;



    function handleCreateApiary(e) {
        e.preventDefault();

        const hive = {
            Color,
            Type,
            Source,
            Purpose,
            Added,
            Note,
            Colony,
            Queen,
            Apiary


        };

        console.log(hive);
        dispatch(createHive(hive)).then(() => {
            window.location.reload();
        });

    }


    return (
        <div className="row justify-content-center">
            <div className="col-8">
                {loading && <Loading />}
                {success && <Success success="Ruche créée avec succès" />}
                {error && <Error error="Quelque chose s'est mal passé" />}

                <div className="card shadow-lg bg-white rounded">
                    <div className="card-header pb-0">
                        <h6>Créer Ruche</h6>
                    </div>
                    <div className="card-body">
                        <form className="row" onSubmit={handleCreateApiary}>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Couleur</label>
                                <select required className="form-select" value={Color} onChange={(e) => setColor(e.target.value)}>
                                    <option value="" disabled>Choisissez une couleur</option>
                                    {colors.map((color, index) => (
                                        <option key={index} value={color}>{color}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Type</label>
                                <select required className="form-select" value={Type} onChange={(e) => setType(e.target.value)}>
                                    <option value="" disabled>Sélectionnez un type</option>
                                    {types.map((type, index) => (
                                        <option key={index} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-6 mb-3">
                                <select required className="form-select" value={Type} onChange={(e) => setSource(e.target.value)}>
                                    <label className="form-label">Source</label>
                                    <option value="" disabled>Sélectionnez la source</option>
                                    {source.map((source, index) => (
                                        <option key={index} value={source}>{source}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-6 mb-3">
                                <select required className="form-select" value={Purpose} onChange={(e) => setPurpose(e.target.value)}>
                                    <label className="form-label">But</label>
                                    <option value="" disabled>Sélectionnez le but</option>
                                    {purpose.map((purpose, index) => (
                                        <option key={index} value={purpose}>{purpose}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div>
                                    <label className="form-label">Date d'ajout</label>
                                </div>
                                <div>
                                    <DatePicker
                                        selected={Added}
                                        onChange={handleDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        className="form-control"
                                    />
                                </div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Rucher</label>
                                <select
                                    name="apiary"
                                    className="form-select"
                                    value={Apiary}
                                    onChange={(e) => setApiary(e.target.value)}
                                >
                                    <option value="" disabled>Sélectionnez rucher</option>
                                    {Array.isArray(apiaries.data) && apiaries.data.map((apiary) => (

                                        <option key={apiary._id} value={apiary._id}>
                                            {apiary.Name}
                                        </option>

                                    ))}
                                </select>
                            </div>

                            <div className="col-md-12 mb-3">
                                <label className="form-label">Note</label>
                                <textarea
                                    className="form-control"
                                    rows="2"
                                    value={Note}
                                    onChange={(e) => setNote(e.target.value)}
                                />
                            </div>
                            <fieldset>
                                <legend>Informations sur la colonie</legend>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <select required className="form-select" value={Colony.strength} onChange={(e) => setColony({ ...Colony, strength: e.target.value })}>
                                            <label className="form-label">Force</label>
                                            <option value="" disabled>Sélectionnez la force</option>
                                            {strength.map((strength, index) => (
                                                <option key={index} value={strength}>{strength}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <select required className="form-select" value={Colony.temperament} onChange={(e) => setColony({ ...Colony, temperament: e.target.value })}>
                                            <label className="form-label">Tempérament</label>
                                            <option value="" disabled>Sélectionnez le tempérament</option>
                                            {temperament.map((temperament, index) => (
                                                <option key={index} value={temperament}>{temperament}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Supers</label>
                                        <input required type="number" placeholder="Supers" className="form-control" value={Colony.supers} onChange={(e) => setColony({ ...Colony, supers: e.target.value })} />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Cadres</label>
                                        <input required type="number" placeholder="Cadres" className="form-control" value={Colony.frames} onChange={(e) => setColony({ ...Colony, frames: e.target.value })} />
                                    </div>
                                </div>
                            </fieldset>




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
