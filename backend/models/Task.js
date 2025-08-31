const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    name: {
        type:String,
        required:true,
        trim:true,
        maxlength:100
    },
    date: {
        type:Date,
        default:() => new Date().toLocaleDateString('fr-CA'),
        trim:true,
        maxlength:20
    }
})


module.exports = mongoose.model('Task', taskSchema)