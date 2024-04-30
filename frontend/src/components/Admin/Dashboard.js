import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../actions/userActions';
import { getAllApiaries } from '../../actions/apiaryActions';
import { getAllHives } from '../../actions/hiveActions';
import { useDispatch, useSelector } from 'react-redux';


export default function Dashboard() {
  const dispatch = useDispatch();

  const usersState = useSelector(state => state.getAllUsersReducer);
  const { users } = usersState;

  const hivesState = useSelector(state => state.getAllHivesReducer);
  const { hives } = hivesState;

  const apiariesState = useSelector(state => state.getAllApiariesReducer);
  const { apiaries } = apiariesState;

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllApiaries());
    dispatch(getAllHives());


  }, [dispatch]);



  const calculateProgress = (count, maxCount) => {
    if (maxCount === 0) {
      return 0;
    }
    return (count / maxCount) * 100;
  };

  const userCount = users.data ? users.data.length : 0;
  const apiaryCount = apiaries.data ? apiaries.data.length : 0;
  const hiveCount = hives.data ? hives.data.length : 0;

 

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
                  Ruchers
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">{apiaryCount}</div>
              </div>
              <div className="col-auto">
                <i className="fas fa-map-signs fa-2x text-gray-300"></i>
              </div>
            </div>
            <div className="progress mt-3">
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${calculateProgress(apiaryCount, 50)}%` }}
                aria-valuenow={apiaryCount}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-4 col-md-6 mb-4">
        <div className="card border-left-warning shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                  Ruches
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">{hiveCount}</div>
              </div>
              <div className="col-auto">
                <i className="fas fa-archive fa-2x text-gray-300"></i>
              </div>
            </div>
            <div className="progress mt-3">
              <div
                className="progress-bar bg-warning"
                role="progressbar"
                style={{ width: `${calculateProgress(hiveCount, 50)}%` }}
                aria-valuenow={hiveCount}
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
