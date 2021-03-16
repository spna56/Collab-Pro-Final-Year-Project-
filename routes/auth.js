const express = require('express');
const router = express();
const passport = require('passport');

router.get("/google", passport.authenticate("google",
    { scope: ['profile', 'email'] })
);


router.get("/auth/google/callback", passport.authenticate("google",
    { failureRedirect: '/google' }),
    function (req, res) {
        res.redirect('/home')
    })


router.get("/auth/facebook", passport.authenticate("facebook",
    { scope: ['public_profile', 'email'] })
)

router.get('/auth/facebook/callback', passport.authenticate("facebook",
    {
        failureRedirect: '/auth/facebook'
    }),
    (req, res) => {
        res.redirect('/home')
    })


module.exports = router;
