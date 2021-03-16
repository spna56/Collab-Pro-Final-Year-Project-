const express = require('express');
const router = express();
const Project = require('../models/Project')
const Comment = require('../models/Comment')


//show all projects
router.get('/project', async (req, res) => {
    if (req.query.search) {
        const regex=new RegExp(escapeRegex(req.query.search),'gi')
        const data = await Project.find({description:regex})
            .populate('user')
            .populate('comment')

        res.render('project/project', { data: data })
    }
    else {
        const data = await Project.find({})
            .populate('user')
            .populate('comment')

        res.render('project/project', { data: data })
    }

})

//show add
router.get('/project/new', async (req, res) => {
    res.render('project/new')
})


//add 
router.post('/project', async (req, res) => {
    const project = new Project({
        title: req.body.title,
        description: req.body.description,
        githublink: req.body.githublink,
        image:req.body.image,
        user: req.user._id

    })

    await project.save()

    res.redirect('/project')

})



//show

router.get('/project/:id', async (req, res) => {
    const project = await Project.findById(req.params.id)
        .populate('user')
        .populate('comment')
    res.render('project/show', { project: project })
})


//create comment
router.post('/project/:id/comments', (req, res) => {
    Project.findById(req.params.id, (err, project) => {
        if (err) {
            console.log(err)
        } else {


            var text = req.body.text;

            Comment.create({ text: text }, function (err, comment) {
                if (err) {
                    // req.flash("error","Something went wrong");
                    console.log(err)
                } else {
                    //add username  and id to the comment
                    comment.author.id = req.user._id
                    comment.author.username = req.user.username
                    //   comment.text=req.body.text
                    //saving the comment
                    comment.save();
                    project.comment.push(comment);
                    project.save();
                    console.log(comment);
                    res.redirect('/project/' + project._id)
                }
            });
        }
    })
})



//like
router.put('/project/:id/like',async (req,res)=>{

   
   
    const project = await Project.findById(req.params.id)

    if (project.likes.some(like => like.user.toString() === req.user._id)) {
           project.likes.shift({user:req.user._id})
           await project.save()
    }
    else {
        project.likes.unshift({ user: req.user._id })
        const data = await project.save()

    }
    res.redirect("/project")




})



//regex
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router

