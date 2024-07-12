import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import tableIcons from '../../MaterialTableIcons';
import DeleteConfirmationDialogApiary from './DeleteConfirmationDialogApiary';
import { getAllApiaries, deleteApiary } from '../../../actions/apiaryActions';
import io from 'socket.io-client';

export default function Apiaries() {
    const dispatch = useDispatch();
    const apiariesState = useSelector(state => state.getAllApiariesReducer);
    const { error, loading, apiaries } = apiariesState;
    const [deleteApiaryId, setDeleteApiaryId] = useState(null);


    useEffect(() => {
        dispatch(getAllApiaries());

         const socket = io('http://localhost:3001'); 

         socket.on('apiariesChange', (change) => {
            console.log('Real-time update received:', change);

             dispatch(getAllApiaries());
        });

         return () => {
            socket.disconnect();
        };
    }, [dispatch]);

  

    const handleDeleteApiary = () => {
        dispatch(deleteApiary(deleteApiaryId));
        setDeleteApiaryId(null); 
    };

    return (
        <div style={{ overflowX: 'auto', width: '100vw' }}>
            <MaterialTable
                columns={[
                    {
                        title: 'Rucher',
                        render: rowData => (
                            <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">{rowData.Name}</h6>
                                </div>
                            </div>
                        ),
                        customFilterAndSearch: (term, rowData) => ((rowData.Name).toLowerCase()).indexOf(term.toLowerCase()) !== -1
                    },
                    {
                        title: 'Fourrage',
                        render: rowData => (
                            <p className="text-xs font-weight-bold mb-0">
                                {rowData.Forages}
                            </p>
                        ),
                        customFilterAndSearch: (term, rowData) => ((rowData.Forages).toLowerCase()).indexOf(term.toLowerCase()) !== -1

                    },
                    {
                        title: 'Type',
                        render: rowData => ( <p className="text-xs font-weight-bold mb-0">{rowData.Type}</p>),
                        customFilterAndSearch: (term, rowData) => ((rowData.Type).toLowerCase()).indexOf(term.toLowerCase()) !== -1

                    },
                    {
                        title: 'Exposition au soleil',
                        render: rowData => (<p className="text-xs font-weight-bold mb-0">{rowData.SunExposure}</p>),
                        customFilterAndSearch: (term, rowData) => ((rowData.SunExposure).toLowerCase()).indexOf(term.toLowerCase()) !== -1

                     },
                     {
                        title: 'Gouvernorat',
                        field: 'Location.governorate',
                        render: rowData => <p className="text-xs font-weight-bold mb-0">{rowData.Location.governorate}</p>,
                    },
                    {
                        title: 'Délégation',
                        field: 'Location.city',
                        render: rowData => <p className="text-xs font-weight-bold mb-0">{rowData.Location.city}</p>,
                    },
                    {
                        title: 'Propriétaire',
                        field: 'Owner',
                        render: rowData => (
                            rowData.Owner && (
                                <p className="text-xs font-weight-bold mb-0">
                                    {rowData.Owner.Firstname} {rowData.Owner.Lastname} (CIN: {rowData.Owner.Cin})
                                </p>
                            )
                        ),
                        customFilterAndSearch: (term, rowData) => ((rowData.Owner.Firstname + ' ' + rowData.Owner.Lastname).toLowerCase()).indexOf(term.toLowerCase()) !== -1

                    },
                    
                    {
                        title: 'Actions',
                        render: rowData => (
                            <div>
                                <Link to={`/admin/apiary/edit/${rowData._id}`}>
                                    <i className="fas fa-edit" style={{ color: '#FEE502', marginRight: '8px' }}></i>
                                </Link>
                                <i className="fas fa-trash" style={{ color: 'red', cursor: 'pointer' }} onClick={() => setDeleteApiaryId(rowData._id)}></i>
                            </div>
                        )
                    }
                ]}
                data={apiaries.data}
                title={<h6>Liste Ruchers</h6>}
                icons={tableIcons}
                options={{
                    padding: 'dense',
                    pageSize: 4,
                    pageSizeOptions: [2, 3, 4],
                    headerStyle: {
                        zIndex: 0, // Adjust the zIndex as needed
                    }
                }}
            />

            <DeleteConfirmationDialogApiary
                open={deleteApiaryId !== null}
                onClose={() => setDeleteApiaryId(null)}
                onConfirm={handleDeleteApiary}
            />
        </div>
    );
}
