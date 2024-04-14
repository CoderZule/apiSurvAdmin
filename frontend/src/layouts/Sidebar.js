import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Sidebar = () => {
    return (
        <div id="wrapper">

         <ul className="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar" style={{ backgroundColor: '#FEE502' }}>

             <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">apiSurv</div>
            </a>

             <hr className="sidebar-divider my-0"/>

             <li className="nav-item active">
                <a className="nav-link" href="index.html">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Tableau de bord</span></a>
            </li>

             <hr className="sidebar-divider"/>

             <div className="sidebar-heading">
                Interface
            </div>

             <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#user"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i className="fas fa-fw fa-cog"></i>
                    <span>Utilisatuers</span>
                </a>
                <div id="user" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <a className="collapse-item" href="buttons.html">Créer</a>
                        <a className="collapse-item" href="cards.html">Liste</a>
                    </div>
                </div>
            </li>

             <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#rucher"
                    aria-expanded="true" aria-controls="collapseUtilities">
                    <i className="fas fa-fw fa-wrench"></i>
                    <span>Rucher</span>
                </a>
                <div id="rucher" className="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                         <a className="collapse-item" href="utilities-color.html">Créer</a>
                        <a className="collapse-item" href="utilities-border.html">Liste</a>
                        
                    </div>
                </div>
            </li>

            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#ruche"
                    aria-expanded="true" aria-controls="collapseUtilities">
                    <i className="fas fa-fw fa-wrench"></i>
                    <span>Ruche</span>
                </a>
                <div id="ruche" className="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                         <a className="collapse-item" href="utilities-color.html">Créer</a>
                        <a className="collapse-item" href="utilities-border.html">Liste</a>
                        
                    </div>
                </div>
            </li>
             
           

             

        </ul>
         
        <div id="content-wrapper" className="d-flex flex-column">

             <div id="content">

        <Navbar/>
               
            
 
            </div>
 
           <Footer/>
 
        </div>
 
    </div>
    );
};

export default Sidebar;
