import Dashboard from "../components/Admin/Dashboard";
import Apiaries from "../components/Admin/Apiaries";
import Users from "../components/Admin/Users";
import CreateUser from "../components/Admin/CreateUser";

const routes =  [
    {path : '/admin', exact: true, name: 'Admin'},
    {path: '/admin/dashboard', exact:true, name:'Dashboard', component:Dashboard},
    {path: '/admin/apiaries', exact:true, name:'Apiaires', component:Apiaries},
    {path: '/admin/users', exact:true, name:'Users', component:Users},
    {path: '/admin/user/create', exact:true, name:'CreateUsers', component:CreateUser}



]

export default routes;