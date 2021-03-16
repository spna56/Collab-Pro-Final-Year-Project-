const express = require('express');
const router = express();
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const config = require('../config/mailer');
const transporter = nodemailer.createTransport(config.mailer);

//Home
router.get('/home',(req,res)=>{
    res.render('homepage')
})


//Landing
router.get('/', (req, res) => {
       res.render('landing');
})


//About
router.get('/about', (req, res) => {
       res.render('About');
})

//contact

router.get('/contact', (req, res) => {
       res.render('Contact')
})



//contact post
router.post('/contact',
       [body('name', 'Empty name').notEmpty(),
       body('email', 'Invalid email').isEmail(),
       body('message', 'Empty message').notEmpty()
       ], (req, res) => {
              const errors = validationResult(req);




              if (!errors.isEmpty()) {
                     res.render('Contact', {
                            name: req.body.name,
                            email: req.body.email,
                            message: req.body.message,
                            errors: errors.array()
                     }
                     );
              }

              else {
                     var content = `name: ${req.body.name} \n email: ${req.body.email} \n message: ${req.body.message} `
                     var mailOptions = {
                            from: 'Collabpro <no-reply@collabpro.com>',
                            to: 'sapanarathod017@gmail.com',
                            subject: 'You got a new message from visitor name ' + req.body.name,
                            text: content
                     };
                     transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                   return console.log(error)
                            }
                            else {
                                   res.send("Thank you")
                            }

                     })


              }
       }
)



module.exports = router;