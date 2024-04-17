import Dashboard from "../components/Dashboard";
import Apiaries from "../components/Apiaries";
import Users from "../components/Users";

const routes =  [
    {path : '/admin', exact: true, name: 'Admin'},
    {path: '/admin/dashboard', exact:true, name:'Dashboard', component:Dashboard},
    {path: '/admin/apiaries', exact:true, name:'Apiaires', component:Apiaries},
    {path: '/admin/users', exact:true, name:'Users', component:Users}


]

export default routes;