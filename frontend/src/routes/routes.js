import Dashboard from "../components/Admin/Dashboard";

import Users from "../components/Admin/Users/Users";
import CreateUser from "../components/Admin/Users/CreateUser";
import EditUser from "../components/Admin/Users/EditUser";
import DeleteConfirmationDialogUser from "../components/Admin/Users/DeleteConfirmationDialogUser";


import Apiaries from "../components/Admin/Apiaries/Apiaries";
import CreateApiary from "../components/Admin/Apiaries/CreateApiary";
import EditApiary from "../components/Admin/Apiaries/EditApiary";
import DeleteConfirmationDialogApiary from "../components/Admin/Apiaries/DeleteConfirmationDialogApiary";

import Hives from "../components/Admin/Hives/Hives";
import CreateHive from "../components/Admin/Hives/CreateHive";
import EditHive from "../components/Admin/Hives/EditHive";
import DeleteConfirmationDialogHive from "../components/Admin/Hives/DeleteConfirmationDialogHive";

const routes =  [
    {path : '/admin', exact: true, name: 'Admin'},
    {path: '/admin/dashboard', exact:true, name:'Dashboard', component:Dashboard},
   
    //Users Crud Routes
    {path: '/admin/users', exact:true, name:'Users', component:Users},
    {path: '/admin/user/create', exact:true, name:'CreateUser', component:CreateUser},
    {path: '/admin/user/edit/:_id', exact:true, name:'EditUser', component:EditUser},
    {path: '/admin/user/delete/:_id', exact:true, name:'DeleteUser', component:DeleteConfirmationDialogUser},
   
    //Apiaries Crud Routes
    {path: '/admin/apiaries', exact:true, name:'Apiaires', component:Apiaries},
    {path: '/admin/apiary/create', exact:true, name:'CreateApiary', component:CreateApiary},
    {path: '/admin/apiary/edit/:_id', exact:true, name:'EditApiary', component:EditApiary},
    {path: '/admin/apiary/delete/:_id', exact:true, name:'DeleteApiary', component:DeleteConfirmationDialogApiary},
   
    //Hives Crud Routes
    {path: '/admin/hives', exact:true, name:'Hives', component:Hives},
    {path: '/admin/hive/create', exact:true, name:'CreateHive', component:CreateHive},
    {path: '/admin/hive/edit/:_id', exact:true, name:'EditHive', component:EditHive},
    {path: '/admin/hive/delete/:_id', exact:true, name:'DeleteHive', component:DeleteConfirmationDialogHive},
   


]

export default routes;