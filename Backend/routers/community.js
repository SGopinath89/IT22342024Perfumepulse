const express=require("express");
const axios=require("axios");
const router=express.Router();

router.post("/authenticate",async(req,res)=>{
    const {username}=req.body;
    
    
    try {
        const response=await axios.put(
            "https://api.chatengine.io/users/",
            {
                username:username,
                secret:username,
                first_name:username
            },
            {
                headers:{"private-key":"a4e2b091-34a6-4c91-b078-48a74e046de8"}
            }
        );
        return res.status(response.status).json(response.data);

    } catch (error) {
        if(error.response){
            return res.status(error.message.status).json(error.response.data);
        }else if(error.request){
            console.error('No response received:',error.request);
            return res.status(500).json({message:"No response received from the server"});
        }else{
            console.error('Error setting up the request',error.message);
            return res.status(500).json({message:"Error setting up the request"});
        }
        
    }
});

module.exports=router;