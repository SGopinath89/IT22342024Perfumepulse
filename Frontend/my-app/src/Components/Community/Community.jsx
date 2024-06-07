import React, {useEffect,useState} from 'react';
import './Community.css';
import ChatsPage from '../ChatsPage/ChatsPage'
import AuthPage from '../AuthPage/AuthPage';

function Community(){
    const [user,setUser]=useState(undefined);

    if(!user){
        return <AuthPage onAuth={(user)=>setUser(user)}/> 
    }else{
        return <ChatsPage user={user}/>
    }

}


export default Community;