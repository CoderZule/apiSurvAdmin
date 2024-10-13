import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import tableIcons from '../../MaterialTableIcons';
import DeleteConfirmationDialogForage from './DeleteConfirmationDialogForage';
import { getAllForages, deleteForage } from '../../../actions/forageActions';
import io from 'socket.io-client';


export default function Forages() {

    const dispatch = useDispatch();
    const foragesState = useSelector(state => state.getAllForagesReducer);
    const { error, loading, forages } = foragesState;
    const [deleteForageId, setDeleteForageId] = useState(null);

     useEffect(() => {
        dispatch(getAllForages());

        const socket = io('http://localhost:3001');
        socket.on('forageChange', (change) => {
            console.log('Real-time update received:', change);
            dispatch(getAllForages());
        });

        return () => {
            socket.disconnect();
        };
    }, [dispatch]);

    const handleDeleteForage = () => {
        dispatch(deleteForage(deleteForageId));
        setDeleteForageId(null);
    };

 
    return (
        <>          
        <MaterialTable
            columns={[
             
                {
                    title: 'Nom Fourrage',
                    render: rowData => (
                        <p className="text-xs font-weight-bold mb-0">
                            {rowData.Name}
                        </p>
                    ),
                    customFilterAndSearch: (term, rowData) => (rowData.Name.toLowerCase()).indexOf(term.toLowerCase()) !== -1

                },
               
                {
                    title: 'Actions',
                    render: rowData => (
                        <div>
                            <Link to={`/admin/forage/edit/${rowData._id}`}>
                                <i className="fas fa-edit" style={{ color: '#FEE502', marginRight: '8px' }}></i>
                            </Link>
                            <i
                                className="fas fa-trash"
                                style={{ color: 'red', cursor: 'pointer' }}
                                onClick={() => {
                                    console.log('Delete Forage ID:', rowData._id);
                                    setDeleteForageId(rowData._id);
                                }}
                            ></i>
                        </div>
                    )
                }
            ]}
            data={forages.data}
            title={<h6>Liste Fourrages</h6>}
            icons={tableIcons}
            options={{
                padding: 'dense',
                pageSize: 4,
                pageSizeOptions: [2, 3, 4],
                headerStyle: {
                    zIndex: 0,
                }
            }}
        />

            <DeleteConfirmationDialogForage
                open={deleteForageId !== null}
                onClose={() => {
                    setDeleteForageId(null);
                }}
                onConfirm={handleDeleteForage}
            />
        </>
    );
}
