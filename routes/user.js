const express = require('express');
const router = express();
const passport = require('passport');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

//login 
router.get('/login', (req, res) => {
    res.render('login');
})


//register
router.get('/register', (req, res) => {
    res.render('register')
})


//post method
router.post('/register',

    (req, res) => {
        const errors = validationResult(req).array();
        const newuser = new User({
            username: req.body.username,

        })
        User.register(newuser, req.body.password, (err, user) => {
            if (err) {
                console.log(err);
                errors.push(err);
                res.render('register', { errors: errors })
            } else {
                passport.authenticate('local')(req, res, () => {
                    res.redirect('/login')
                })
                console.log(user)
            }
        })
    })

//post login
router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/home',
        failureRedirect: '/login'
    }
))

//logout
router.get("/logout",(req,res)=>{
    req.logout();
    
    res.redirect("/home");
    });
    
module.exports = router;