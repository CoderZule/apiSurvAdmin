import Dashboard from "../components/Dashboard";
import Apiaries from "../components/Apiaries";

const routes =  [
    {path : '/admin', exact: true, name: 'Admin'},
    {path: '/admin/dashboard', exact:true, name:'Dashboard', component:Dashboard},
    {path: '/admin/apiaries', exact:true, name:'Apiaires', component:Apiaries}

]

export default routes;