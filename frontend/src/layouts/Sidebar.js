import React from 'react';

import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (


         <ul className="navbar-nav sidebar sidebar-dark " id="accordionSidebar" style={{ backgroundColor: '#977700'}}>

         <a className="sidebar-brand d-flex align-items-center justify-content-center mt-3" href="index.html">
         <div className="sidebar-brand-icon mt-4">
    <img src="/img/logo.png" alt="Logo" style={{ maxWidth: '80%', height: 'auto' }} />
</div>

 </a>


 <hr className="sidebar-divider my-0  mt-4"/>

             <li className="nav-item active">
                <Link className="nav-link" to="/admin/dashboard">
                    <i className="fas fa-fw fa-tachometer-alt" ></i>
                    <span >Tableau de bord</span></Link>
            </li>

             <hr className="sidebar-divider"/>

             <div className="sidebar-heading" >
                Interface
            </div>

             <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#user"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i className="fas fa-users" style={{ marginRight:'10px'}}></i>
                    <span  >Utilisateurs</span>
                </a>
                <div id="user" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <Link className="collapse-item" to="/admin/user/create" >Créer</Link>
                        <Link className="collapse-item" to="/admin/users" >Liste</Link>
                    </div>
                </div>
            </li>

             <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#rucher"
                    aria-expanded="true" aria-controls="collapseUtilities">
                    <i className="fas fa-map-signs" style={{marginRight:'10px'}}></i>
                    <span >Ruchers</span>
                </a>
                <div id="rucher" className="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                    <Link className="collapse-item" to="/admin/apiary/create" >Créer</Link>
                        <Link className="collapse-item" to="/admin/apiaries" >Liste</Link>
                        
                    </div>
                </div>
            </li>

            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#ruche"
                    aria-expanded="true" aria-controls="collapseUtilities">
                    <i className="fas fa-archive" style={{marginRight:'10px'}}></i>
                    <span >Ruches</span>
                </a>
                <div id="ruche" className="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                    <Link className="collapse-item" to="/admin/hive/create" >Créer</Link>
                        <Link className="collapse-item" to="/admin/hives" >Liste</Link>
                        
                    </div>
                </div>
            </li>
             
           

             

        </ul>
         
      
 
  
    );
};

export default Sidebar;
