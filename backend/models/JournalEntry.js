const mongoose = require('mongoose')
const {Schema} = mongoose;

const JournalEntrySchema = new Schema ({
    content: {
        type:String,
        required:true,
        trim:true,
        maxlength:500
    },
    date: {
        type:Date,
        default:() => Date.now()
    }
})

module.exports = mongoose.model('Journal', JournalEntrySchema)