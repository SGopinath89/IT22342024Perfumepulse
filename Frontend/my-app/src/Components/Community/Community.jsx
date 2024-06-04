import React, {useEffect,useState} from React;
import './Community.css';
//import ChatsPage from '../Chatspage/ChatsPage'
//import AuthPage from '../AuthPage/AuthPage';

function Community(){
    const [user,setUser]=useState(undefined);

    if(!user){
        return <AuthPage onAuth={(user)=>setUser(user)}/>
    }else{
        return <ChatsPage user={user}/>
    }

}


export default Community;