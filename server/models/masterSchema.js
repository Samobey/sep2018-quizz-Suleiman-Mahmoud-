const mongoose = require("mongoose");

const masterSchema = new mongoose.Schema({
    _id :String,
    code:String
});
module.exports=mongoose.model('master',masterSchema)
