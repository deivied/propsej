const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    prenom : {
        type : String,
        required: true
    },
    nom : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true,
        unique : true
    },
    numero : {
        type : String,
        required: true,
        unique : true
    },
    profil : {
        type : String,
        required: true
    },
    secret : {
        type : String,
        required: true
    }
})

module.exports=mongoose.model('User',userSchema);

