const mongoose = require('mongoose');
const placeSchema = new mongoose.Schema({
    owner : {type : mongoose.Schema.Types.ObjectId,ref : 'User'},
    title : String,
    address : String,
    photos : [String],
    description : String,
    perks : [String],
    extraInfo : String,
    checkIn : Number,
    checkOut : Number,
    maxGuests : Number,


});
//Place is the name of collection in mongodb
//20 line of code establish link bw PlaceModel and Place
//PlaceModel can perform CRUD operation on 'Place' collection in mongodb
//like PlaceModel.create()
//     PlaceModel.find()
const PlaceModel = mongoose.model('Place',placeSchema);
module.exports = PlaceModel;