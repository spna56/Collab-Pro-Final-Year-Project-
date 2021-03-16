const express = require('express')
const router = express();
const Profile=require('../models/Profile')
const multer=require('multer')
const checkObjectId=require('../config/checkObjectId')

const storage=multer.diskStorage({
      destination:function(req,file,cb){
            cb(null,'./uploads/');
      },
      filename:function(req,file,cb){
            cb(null,Date.now() + file.originalname)
      }
})


const fileFilter=(req,file,cb)=>{
      if(file.mimetype==='image/jpeg' || file.mimetype==='image/png' ||file.mimetype==='image/gif'){
            cb(null,true)
      }else{
            cb(null,false)
      }
}
const upload=multer({storage:storage,fileFilter:fileFilter}
      )


//show dashboard
router.get('/profile/dashboard',async(req,res)=>{
      const profile= await Profile.findOne({user:req.user._id})
      .populate('user')
      
    res.render('profile/dashboard',{profile:profile})
})


//add profile
router.post('/profile', upload.single('Image'), async (req, res) => {
    console.log(req.file)
      const newProfile = {
            user: req.user._id,
            Name: req.body.Name,
            Headline: req.body.Headline,
            Country: req.body.Country,
            githubusername: req.body.githubusername,
            AboutMe:req.body.AboutMe,
            linkedin: req.body.linkedin,
            facebook: req.body.facebook,
            skills: req.body.skills,
            // Image:req.file.path


      }
      if (req.file) {
            const Image = req.file.path;
            newProfile.Image = Image

      }



      const data = await Profile.findOneAndUpdate({ user: req.user._id }, { $set: newProfile }, { new: true, upsert: true })
       res.redirect('/profile/dashboard');
})

//show profile modal
router.get('/profile/add', (req, res) => {
      res.render('profile/new')
})


//edit
router.get('/profile/edit',async(req,res)=>{
      const profile=await Profile.findOne({user:req.user._id})
      res.render('profile/edit',{profile:profile})
})



//actual profile page
router.get('/index', (req, res) => {
      res.render('profile/index')
})


//show profile page
router.get('/user/:user_id',checkObjectId('user_id'),async ({params:{user_id}},res)=>{
   const profile=await Profile.findOne({
         user:user_id
   }).populate('user')
   if(!profile){
    return   res.status(400).json({msg:"Profile Not FOund"})
   }
   else{
         res.render('profile/dashboard',{profile:profile})
   }
})




module.exports = router;