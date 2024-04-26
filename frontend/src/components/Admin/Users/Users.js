import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import tableIcons from '../../MaterialTableIcons';
import DeleteConfirmationDialogUser from './DeleteConfirmationDialogUser';
import { getAllUsers, deleteUser } from '../../../actions/userActions';
import io from 'socket.io-client'; // Import socket.io-client

export default function Users() {
    const dispatch = useDispatch();
    const usersState = useSelector(state => state.getAllUsersReducer);
    const { error, loading, users } = usersState;
    const [deleteUserId, setDeleteUserId] = useState(null);

    useEffect(() => {
        dispatch(getAllUsers());

        // Initialize socket connection
        const socket = io('http://localhost:3001'); 

        // Listen for 'usersChange' event from the server
        socket.on('usersChange', (change) => {
            console.log('Real-time update received:', change);

            // Trigger fetchUsers to update the user list
            dispatch(getAllUsers());
        });

        // Clean up socket connection when component unmounts
        return () => {
            socket.disconnect();
        };
    }, [dispatch]);

    const handleDeleteUser = () => {
        dispatch(deleteUser(deleteUserId));
        setDeleteUserId(null); // Reset deleteUserId after delete action
    };

    return (
        <div style={{ overflowX: 'auto', width: '100vw' }}>
            <MaterialTable
                columns={[
                    {
                        title: 'Utilisateur',
                        render: rowData => (
                            <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">{rowData.Firstname} {rowData.Lastname}</h6>
                                </div>
                            </div>
                        ),
                        customFilterAndSearch: (term, rowData) => ((rowData.Firstname + ' ' + rowData.Lastname).toLowerCase()).indexOf(term.toLowerCase()) !== -1
                    },
                    {
                        title: 'Rôle',
                        render: rowData => (
                            <p className="text-xs font-weight-bold mb-0">
                                {rowData.Role}
                            </p>
                        )
                    },
                    {
                        title: 'Cin',
                        render: rowData => <p className="text-xs font-weight-bold mb-0">{rowData.Cin}</p>
                    },
                    {
                        title: 'Email',
                        render: rowData => <p className="text-xs font-weight-bold mb-0">{rowData.Email}</p>,
                        customFilterAndSearch: (term, rowData) => (rowData.Email.toLowerCase()).indexOf(term.toLowerCase()) !== -1
                    },
                    {
                        title: 'Actions',
                        render: rowData => (
                            <div>
                                <Link to={`/admin/user/edit/${rowData._id}`}>
                                    <i className="fas fa-edit" style={{ color: '#FEE502', marginRight: '8px' }}></i>
                                </Link>
                                <i className="fas fa-trash" style={{ color: 'red', cursor: 'pointer' }} onClick={() => setDeleteUserId(rowData._id)}></i>
                            </div>
                        )
                    }
                ]}
                data={users.data}
                title={<h6>Liste Utilisateurs</h6>}
                icons={tableIcons}
                options={{
                    padding: 'dense',
                    pageSize: 4,
                    pageSizeOptions: [2, 3, 4],
                }}
            />

            <DeleteConfirmationDialogUser
                open={deleteUserId !== null}
                onClose={() => setDeleteUserId(null)}
                onConfirm={handleDeleteUser}
            />
        </div>
    );
}
