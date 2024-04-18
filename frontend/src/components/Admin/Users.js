import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../Loading'
import Error from '../Error'

import { getAllUsers} from "../../actions/userActions"
import MaterialTable from 'material-table';
import tableIcons from "../MaterialTableIcons";


export default function Users() {
    const dispatch = useDispatch()
    const usersstate = useSelector(state => state.getAllUsersReducer)
    const { error, loading, users } = usersstate

    useEffect(() => {

        dispatch(getAllUsers())

    }, [])
  
    return (
        <div style={{ overflowX: 'auto' , width: '100vw' }}> {/* Set overflow-x to auto */}

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
                    render: () => (
                        <div>
                            <a href="#">
                                <i className="fas fa-edit" style={{ color: '#FEE502', marginRight: '8px' }}></i>
                            </a>
                            <a href="#">
                                <i className="fas fa-trash" style={{ color: 'red' }}></i>
                            </a>
                        </div>
                    )
                }
                
                
            ]}
            data={users.data}
            title={<h6>Liste utilisateurs</h6>}
            icons={tableIcons}
            options={{
                padding: 'dense',
                pageSize: 4,
                pageSizeOptions: [2, 3, 4],
            }}
        />
</div>
    );
    
}