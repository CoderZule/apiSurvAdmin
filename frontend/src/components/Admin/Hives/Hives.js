import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import tableIcons from '../../MaterialTableIcons';
import DeleteConfirmationDialogHive from './DeleteConfirmationDialogHive';
import { getAllHives, deleteHive } from '../../../actions/hiveActions';

export default function Hives() {

    const dispatch = useDispatch();
    const hivesState = useSelector(state => state.getAllHivesReducer);
    const { error, loading, hives } = hivesState;
    const [deleteHiveId, setDeleteHiveId] = useState(null);

    useEffect(() => {
        dispatch(getAllHives());
    }, []);

    const handleDeleteHive = () => {
        dispatch(deleteHive(deleteHiveId));
        setDeleteHiveId(null); 
    };

    return (
        <div style={{ overflowX: 'auto', width: '100vw' }}>
            <MaterialTable
                columns={[
                    {
                        title: 'Couleur',
                        render: rowData => (
                            <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">{rowData.Color}</h6>
                                </div>
                            </div>
                        ),
                        customFilterAndSearch: (term, rowData) => ((rowData.Color).toLowerCase()).indexOf(term.toLowerCase()) !== -1
                    },
                    {
                        title: 'Type',
                        render: rowData => (
                            <p className="text-xs font-weight-bold mb-0">
                                {rowData.Type}
                            </p>
                        ),
                        customFilterAndSearch: (term, rowData) => ((rowData.Type).toLowerCase()).indexOf(term.toLowerCase()) !== -1

                    },
                    {
                        title: 'Source',
                        render: rowData => ( <p className="text-xs font-weight-bold mb-0">{rowData.Source}</p>),
                        customFilterAndSearch: (term, rowData) => ((rowData.Source).toLowerCase()).indexOf(term.toLowerCase()) !== -1

                    },
                    {
                        title: 'But',
                        render: rowData => (<p className="text-xs font-weight-bold mb-0">{rowData.SunExposure}</p>),
                        customFilterAndSearch: (term, rowData) => ((rowData.SunExposure).toLowerCase()).indexOf(term.toLowerCase()) !== -1

                     },
                     {
                        title: 'Force de la colonie',
                        field: 'Colony.strength',
                        render: rowData => <p className="text-xs font-weight-bold mb-0">{rowData.Colony.strength}</p>,
                    },
                    {
                        title: 'Tempérament de colonie',
                        field: 'Colony.temperament',
                        render: rowData => <p className="text-xs font-weight-bold mb-0">{rowData.Colony.temperament}</p>,
                    },
                    {
                        title: 'Rucher',
                        field: 'Apiary',
                        render: rowData => (
                            rowData.Apiary && (
                                <p className="text-xs font-weight-bold mb-0">
                                    {rowData.Apiary.Name} 
                                </p>
                            )
                        ),
                        customFilterAndSearch: (term, rowData) => ((rowData.Apiary.Name).toLowerCase()).indexOf(term.toLowerCase()) !== -1

                    },
                    
                    {
                        title: 'Actions',
                        render: rowData => (
                            <div>
                                <Link to={`/admin/hive/edit/${rowData._id}`}>
                                    <i className="fas fa-edit" style={{ color: '#FEE502', marginRight: '8px' }}></i>
                                </Link>
                                <i className="fas fa-trash" style={{ color: 'red', cursor: 'pointer' }} onClick={() => setDeleteHiveId(rowData._id)}></i>
                            </div>
                        )
                    }
                ]}
                data={hives.data}
                title={<h6>Liste Ruches</h6>}
                icons={tableIcons}
                options={{
                    padding: 'dense',
                    pageSize: 4,
                    pageSizeOptions: [2, 3, 4],
                }}
            />

            <DeleteConfirmationDialogHive
                open={deleteHiveId !== null}
                onClose={() => setDeleteHiveId(null)}
                onConfirm={handleDeleteHive}
            />
        </div>
    );
}
