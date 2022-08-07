import React, {useEffect, useState} from 'react';
import './App.css';
import {requestAddress} from "./Constants";
import {AppBar, IconButton, Drawer} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import logo from './logoNice.png';
import zIndex from "@mui/material/styles/zIndex";
type reqRoutes={
  edit:string,
  add:string,
  get:string,
}
const App:React.FunctionComponent=()=>{
  const [requestRoutes,setReqRoutes]=useState<reqRoutes[]>([]);
  const [menuOpened, setMenuOpened]=useState<boolean>(false);
  useEffect(()=>{
   if(requestRoutes.length===0){
     fetch(requestAddress+'/api/v1/database').then(response=>response.json())
         .then((data)=>{
           let routes=[];
           for(let key in data){
             let route:reqRoutes={
               edit:requestAddress+'/api/v1/'+key+'/edit',
               add:requestAddress+'/api/v1/'+key+'/add',
               get:requestAddress+'/api/v1/'+key+'/get',
             }
             routes.push(route);
           }
           setReqRoutes(routes);

         })
   }
  },[requestRoutes])
    console.log(requestRoutes);
  return (
      <div>
    <AppBar sx={{width:'100%',backgroundColor:'#242d3e',minHeight:'30px',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:'10px'}}>
        <IconButton onClick={()=>{setMenuOpened(!menuOpened)}}>
            <MenuIcon sx={{color:'#fff'}}/>
        </IconButton>
        <img src={logo} style={{maxHeight:'30px'}}/>
    </AppBar>
    <Drawer anchor={'left'} open={menuOpened}></Drawer>
      </div>
  );
}

export default App;
