import React, { useState, useEffect } from 'react';
import { getAllForages } from '../../actions/forageActions';
import { getAllUsers } from '../../actions/userActions';

import { useDispatch, useSelector } from 'react-redux';


export default function Dashboard() {
  const dispatch = useDispatch();

  const usersState = useSelector(state => state.getAllUsersReducer);
  const { users } = usersState;

  const foragesState = useSelector(state => state.getAllForagesReducer);

  const { forages } = foragesState;


  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllForages());


  }, [dispatch]);



  const calculateProgress = (count, maxCount) => {
    if (maxCount === 0) {
      return 0;
    }
    return (count / maxCount) * 100;
  };
  const userCount = users.data ? users.data.length : 0;
  const forageCount = forages.data ? forages.data.length : 0;




  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Tableau de bord</h1>
      </div>

      <div className="row">
        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card border-left-secondary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">
                    Utilisateurs
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{userCount}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-users fa-2x text-gray-300"></i>
                </div>
              </div>
              <div className="progress mt-3">
                <div
                  className="progress-bar bg-secondary"
                  role="progressbar"
                  style={{ width: `${calculateProgress(userCount, 50)}%` }}
                  aria-valuenow={userCount}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>


        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Fourrages
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{forageCount}</div>
                </div>
                <div className="col-auto">
                  <i className="fab fa-envira fa-2x text-gray-300"></i>
                </div>
              </div>
              <div className="progress mt-3">
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: `${calculateProgress(forageCount, 50)}%` }}
                  aria-valuenow={forageCount}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div >
  );
}
