import Dashboard from "../components/Admin/Dashboard";
import Profile from "../components/Admin/Profile/Profile";

import Users from "../components/Admin/Users/Users";
import CreateUser from "../components/Admin/Users/CreateUser";
import EditUser from "../components/Admin/Users/EditUser";
import DeleteConfirmationDialogUser from "../components/Admin/Users/DeleteConfirmationDialogUser";

import UserRequests from "../components/Admin/UserRequests/UserRequests";
import UserPasswordReset from "../components/Admin/UserRequests/UserPasswordReset";

import Forages from "../components/Admin/Forages/Forages";
import CreateForage from "../components/Admin/Forages/CreateForage";
import EditForage from "../components/Admin/Forages/EditForage";
import DeleteConfirmationDialogForage from "../components/Admin/Forages/DeleteConfirmationDialogForage";



const routes = [

    //Admin Perso Routes
    { path: '/admin', exact: true, name: 'Admin' },
    { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/admin/profile', exact: true, name: 'Dashboard', component: Profile },

    //Users Crud Routes
    { path: '/admin/users', exact: true, name: 'Users', component: Users },
    { path: '/admin/user/create', exact: true, name: 'CreateUser', component: CreateUser },
    { path: '/admin/user/edit/:_id', exact: true, name: 'EditUser', component: EditUser },
    { path: '/admin/user/delete/:_id', exact: true, name: 'DeleteUser', component: DeleteConfirmationDialogUser },

    //User Requests  Routes
    { path: '/admin/users_requests', exact: true, name: 'Forages', component: UserRequests },
    { path: '/admin/users_requests/resetpassword/:_id', exact: true, name: 'EditForage', component: UserPasswordReset },


    //Forages Crud Routes
    { path: '/admin/forages', exact: true, name: 'Forages', component: Forages },
    { path: '/admin/forage/create', exact: true, name: 'CreateForage', component: CreateForage },
    { path: '/admin/forage/edit/:_id', exact: true, name: 'EditForage', component: EditForage },
    { path: '/admin/forage/delete/:_id', exact: true, name: 'DeleteForage', component: DeleteConfirmationDialogForage },




]

export default routes;