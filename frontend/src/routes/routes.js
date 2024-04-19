import Dashboard from "../components/Admin/Dashboard";

import Users from "../components/Admin/Users/Users";
import CreateUser from "../components/Admin/Users/CreateUser";
import EditUser from "../components/Admin/Users/EditUser";
import DeleteConfirmationDialog from "../components/Admin/Users/DeleteConfirmationDialog";


import Apiaries from "../components/Admin/Apiaries/Apiaries";


const routes =  [
    {path : '/admin', exact: true, name: 'Admin'},
    {path: '/admin/dashboard', exact:true, name:'Dashboard', component:Dashboard},
    
    {path: '/admin/users', exact:true, name:'Users', component:Users},
    {path: '/admin/user/create', exact:true, name:'CreateUser', component:CreateUser},
    {path: '/admin/user/edit/:_id', exact:true, name:'EditUser', component:EditUser},
    {path: '/admin/user/delete/:_id', exact:true, name:'DeleteUser', component:DeleteConfirmationDialog},
   
    {path: '/admin/apiaries', exact:true, name:'Apiaires', component:Apiaries},



]

export default routes;