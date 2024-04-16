import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/userActions';
import { Redirect } from 'react-router-dom'; 

export default function Navbar() {
    const userstate = useSelector((state) => state.loginUserReducer);
    const { currentUser } = userstate;
    const dispatch = useDispatch();

    // Add a state variable to track logout
    const [loggedOut, setLoggedOut] = React.useState(false);

    // Function to handle logout
    const handleLogout = () => {
        dispatch(logoutUser());
        setLoggedOut(true); // Set loggedOut to true on logout
    };

    // If loggedOut is true, redirect to login page
    if (loggedOut) {
        return <Redirect to="/" />;
    }

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{currentUser.Firstname} {currentUser.Lastname}</span>
                        <img className="img-profile rounded-circle" src="/img/undraw_profile.svg" alt="Profile"/>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="userDropdown">
                        <a className="dropdown-item" href="#">
                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Profil
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Se déconnecter
                        </a>
                    </div>
                </li>
            </ul>
        </nav>
    );
}
