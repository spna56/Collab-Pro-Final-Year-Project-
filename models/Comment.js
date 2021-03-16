const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const commentSchema=new Schema({

    text:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,  //reference to the user model id
            ref:"user"
        },
        username:String  
    }



})

module.exports=mongoose.model('Comment',commentSchema);

