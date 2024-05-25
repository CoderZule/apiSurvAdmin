import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllApiaries } from '../../../actions/apiaryActions';
import { getHiveById, editHive } from '../../../actions/hiveActions';

import Error from '../../Error';
import Loading from '../../Loading';
import Success from '../../Success';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import io from 'socket.io-client';
import QRCode from 'react-qr-code';

export default function EditHive(props) {

  useEffect(() => {
    const socket = io('http://localhost:3001');

    return () => {
      socket.disconnect();
    };
  }, []);
  const dispatch = useDispatch();

  //Ruche infos
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
  const temperament = [
    "Agressive",
    "Nerveuse",
    "Calme",
 
  ];
  //Queen Details
  const status = ['Acceptée', 'Cellule royale', 'Vierge', 'Insérée'];
  const queen_state = ['Cellule découverte', 'Cellule operculée', 'Émergée', 'Accouplée', 'Mature', 'Vieille', 'Inconnue'];
  const race = [
    'Abeille intermissa d\'Afrique du Nord',
    'Abeille saharienne',
    'Abeille de l\'Atlas',
    'Abeille carnica',
    'Abeille italienne'
  ];
  const queenColors = ['Rouge', 'Bleu', 'Vert', 'Jaune', 'Blanc'];
  const queen_origin = ['Achetée', 'Fabriquée', 'Essaim capturé', 'Autre'];



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
  const [Colony, setColony] = useState({
    strength: '',
    temperament: '',
    supers: 0,
    frames: 0
  });
  const [Queen, setQueen] = useState({
    color: '',
    isMarked: false,
    hatched: 0,
    status: '',
    installed: new Date(),
    queen_state: '',
    race: '',
    clipped: false,
    origin: '',
    temperament: ''
  });
  const [Apiary, setApiary] = useState('');
  const [hasQueen, setHasQueen] = useState(false);



  const hiveId = props.match.params._id;

  const getHiveByIdState = useSelector((state) => state.getHiveByIdReducer);
  const { loading, error, hive } = getHiveByIdState;


  const editHiveState = useSelector((state) => state.editHiveReducer);
  const { editloading, editerror, editsuccess } = editHiveState;



  useEffect(() => {
    dispatch(getHiveById(hiveId));
  }, [dispatch, hiveId]);

  useEffect(() => {
    if (!Queen.isMarked) {
      setQueen({ ...Queen, color: '' }); // Reset color if isMarked is false
    }
  }, [Queen.isMarked]);


  useEffect(() => {
    if (hive) {
      setColor(hive.Color);
      setType(hive.Type);
      setSource(hive.Source);
      setPurpose(hive.Purpose);
      setAdded(new Date(hive.Added));
      setColony(hive.Colony);
      setApiary(hive.Apiary);


      if (hive.Queen && hive.Queen.status !== '') {
        setHasQueen(true);
        setQueen(hive.Queen);
      }



    }
  }, [hive]);

  const handleDateChange = (date) => {
    setAdded(date);
  };
  const handleQueenInstalledDateChange = (date) => {
    setQueen({ ...Queen, installed: date });
  };




  const handleEditHive = (e) => {
    e.preventDefault();

    let editedQueen = hasQueen ? Queen : null;

    const editedHive = {
      _id: hiveId,
      Color,
      Type,
      Source,
      Purpose,
      Added,
      Colony,
      Queen: editedQueen,
      Apiary
    };

    dispatch(editHive(editedHive));
  };
  return (
    <div className="row justify-content-center">
      <div className="col-12">
        {loading && <Loading />}

        <div className="card shadow-lg bg-white rounded">
          <div className="card-header pb-0">
            <h6>Modifier Ruche</h6>
          </div>
          <div className="card-body">

            <form className="row" onSubmit={handleEditHive}>

              <fieldset>
                <legend className='text-center'>Générales</legend>
                <div className='row'>
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
                    <label className="form-label">Source</label>
                    <select required className="form-select" value={Source} onChange={(e) => setSource(e.target.value)}>
                      <option value="" disabled>Sélectionnez la source</option>
                      {source.map((source, index) => (
                        <option key={index} value={source}>{source}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">But</label>
                    <select required className="form-select" value={Purpose} onChange={(e) => setPurpose(e.target.value)}>
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

                </div>
              </fieldset>

              <fieldset>
                <legend className='text-center'>Colonie</legend>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Force</label>
                    <select required className="form-select" value={Colony.strength} onChange={(e) => setColony({ ...Colony, strength: e.target.value })}>
                      <option value="" disabled>Sélectionnez la force</option>
                      {strength.map((strength, index) => (
                        <option key={index} value={strength}>{strength}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Tempérament</label>
                    <select required className="form-select" value={Colony.temperament} onChange={(e) => setColony({ ...Colony, temperament: e.target.value })}>
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


              <fieldset>
                <legend className='text-center'>Reine</legend>

                <div className="col-md-6 mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="hasQueen"
                      checked={hasQueen}
                      onChange={(e) => setHasQueen(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="hasQueen">
                      A une reine
                    </label>
                  </div>
                </div>

                {hasQueen && (
                  <div className='row'>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Statut</label>
                      <select required className="form-select" value={Queen.status} onChange={(e) => setQueen({ ...Queen, status: e.target.value })}>
                        <option value="" disabled>Sélectionner le statut de reine</option>
                        {status.map((status, index) => (
                          <option key={index} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Éclos</label>
                      <select required className="form-select" value={Queen.hatched} onChange={(e) => setQueen({ ...Queen, hatched: e.target.value })}>
                        <option value="" disabled>Sélectionnez l'année d'éclosion</option>
                        {Array.from({ length: 10 }).map((_, index) => {
                          const year = new Date().getFullYear() - index;
                          return <option key={year} value={year}>{year}</option>;
                        })}
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <div>
                        <label className="form-label">Date d'installation</label>
                      </div>
                      <div>
                        <DatePicker
                          selected={Queen.installed}
                          onChange={handleQueenInstalledDateChange}
                          dateFormat="dd/MM/yyyy"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">État de reine</label>
                      <select required className="form-select" value={Queen.queen_state} onChange={(e) => setQueen({ ...Queen, queen_state: e.target.value })}>
                        <option value="" disabled>Sélectionnez l'état de la Reine</option>
                        {queen_state.map((queen_state, index) => (
                          <option key={index} value={queen_state}>{queen_state}</option>
                        ))}
                      </select>
                    </div>


                    <div className='row'>
                      <div className="col-md-6 mb-3">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="clipped"
                            checked={Queen.clipped}
                            onChange={(e) => setQueen({ ...Queen, clipped: e.target.checked })}
                          />
                          <label className="form-check-label" htmlFor='clipped'>Clippée</label>
                        </div>
                      </div>


                      <div className="col-md-6 mb-3">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="isMarked"
                            checked={Queen.isMarked}
                            onChange={(e) => setQueen({ ...Queen, isMarked: e.target.checked })}
                          />
                          <label className="form-check-label" htmlFor='marked'>Marquée</label>
                        </div>
                      </div>


                    </div>

                    {Queen.isMarked && (
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Couleur</label>
                        <select
                          required
                          className="form-select"
                          value={Queen.color}
                          onChange={(e) => setQueen({ ...Queen, color: e.target.value })}
                        >
                          <option value="" disabled>Sélectionnez la couleur</option>
                          {queenColors.map((color, index) => (
                            <option key={index} value={color}>{color}</option>
                          ))}
                        </select>
                      </div>
                    )}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Race</label>
                      <select required className="form-select" value={Queen.race} onChange={(e) => setQueen({ ...Queen, race: e.target.value })}>
                        <option value="" disabled>Sélectionnez la race reine</option>
                        {race.map((race, index) => (
                          <option key={index} value={race}>{race}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Origine</label>
                      <select required className="form-select" value={Queen.origin} onChange={(e) => setQueen({ ...Queen, origin: e.target.value })}>
                        <option value="" disabled>Sélectionnez l'origine de la reine</option>
                        {queen_origin.map((queen_origin, index) => (
                          <option key={index} value={queen_origin}>{queen_origin}</option>
                        ))}
                      </select>
                    </div>




                  </div>
                )}
              </fieldset>

              <div className='row justify-content-center'>
                {editloading && <Loading />}
                {editsuccess && <Success success="Ruche modifiée avec succès" />}
                {editerror && <Error error="Quelque chose s'est mal passé" />}
                <div className="col-md-4 mb-3">
                  <button type="submit" className="btn ">Modifier</button>
                </div>

                <QRCode value={hiveId} size={100} />

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
}
