const express=require('express');
const router=express.Router();

//express validator
const { body, validationResult } = require('express-validator');

const Chats = require('../models/Chat');

//fetch all chats: GET: /api/chat/fetchallmsgs
router.get('/fetchallmsgs/:mongo_id',async (req,res)=>{
    try {
        let msgs=await Chats.findById(req.params.mongo_id); 
        console.log(msgs.msgs)
        return res.send(msgs.msgs)
    } catch (error) {
        return res.status(500).send("Some error occured.");
    }
});

//sending a new msg: POST: /api/chat/sendmsg 
router.post('/sendmsg/:mongo_id', async (req,res)=>{
    try{
        let old_msgs=await Chats.findById(req.params.mongo_id); 
        let new_msgs = old_msgs.msgs
        new_msgs.push(req.body.msg);
        let a=await Chats.findByIdAndUpdate(req.params.mongo_id,{msgs:new_msgs})
        return res.send(a)
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Some error occured.");
    }
});

//creating a new chat: POST: /api/chat/create 
router.post('/create',
    async (req,res)=>{

    try{
        msgs=await Chats.create({
            msgs:[]
        });
        return res.json(msgs)
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Some error occured.");
    }
});

module.exports=router;