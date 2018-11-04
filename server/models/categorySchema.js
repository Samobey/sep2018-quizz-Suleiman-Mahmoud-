const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
  _id: String
}); 

module.exports=mongoose.model('category',CategorySchema)

