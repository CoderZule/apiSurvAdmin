import React from 'react';
import Sidebar from './Sidebar';

import '../dashboard_assets/css/sb-admin-2.min.css';
import  '../dashboard_assets/vendor/fontawesome-free/css/all.min.css';


 import '../dashboard_assets/vendor/bootstrap/js/bootstrap.bundle.min.js';
 
 
 
    
const MasterLayout = () => {
    return (
        <div id='page-top' >
             
                <Sidebar/>

                
    <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
    </a>
 
    <div className="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a className="btn btn-primary" href="login.html">Logout</a>
                </div>
            </div>
        </div>
    </div>

    
        </div>
    );
};

export default MasterLayout;
