const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const profileSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    Name: {
        type: String
    },
    Headline: {
        type: String
    },

    Country: {
        type: String
    },
    Image: {
        type: String
    },
    skills: {

        type: String

    },
    AboutMe:{
        type:String
    },
    githubusername: {
        type: String
    },
    linkedin: {
        type: String
    },
    facebook: {
        type: String
    }

})


module.exports=mongoose.model('Profile',profileSchema);
