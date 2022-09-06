const mongoose=require('mongoose');

const ChatSchema=new mongoose.Schema({
    //list of hashes of each message sent, message=encrypt(msg+sender+timestamp)
    msgs:[
        String
    ]
    
});

module.exports=mongoose.model('chats',ChatSchema);