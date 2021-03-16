const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = Schema({

    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: {
        type: String
    },
    githublink: {
        type: String
    },
    user: {


        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'



    },

    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],

    likes: [
        {
            user: {
                type: Schema.Types.ObjectId
            }

        }

    ],

    date: {
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model('Project', projectSchema);