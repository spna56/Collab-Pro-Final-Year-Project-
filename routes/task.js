const express=require('express');
const router=express();

const Task=require('../models/Task');

//create task
router.get('/createTask', async (req,res)=>{
    const newTask=new Task();

    await newTask.save((err,data)=>{
       if(err){
           console.log(err)
       }
       else{
           res.redirect('/task/'+data._id)
       }
    })
})


//task
router.get('/task/:id',(req,res)=>{
    Task.findById(req.params.id,(err,data)=>{
        if(err){
            console.log(err)
        }
        if(data){
            console.log(data)
            res.render('task/task',{content:data.content,roomId:data._id})
        }
        else{
            console.log(err);
        }
    })


})

module.exports=router;