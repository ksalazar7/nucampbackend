const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const favoriteSchema = new Schema({
user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
},
campsites: [{
    type: Schema.Types.ObjectId,
    red: 'Campsite'
}]

}, {
    timestamps: true
});

const Partner = mongoose.model('Favorite', partnerSchema);
module.exports = Favorite;