const mongoose = require('mongoose');

var Schema = mongoose.Schema,
	ObjectID = Schema.ObjectID;
const  cschema = Schema({
	ID:{
		type: ObjectID,
		required: true
	},
	Name: {
		type: String,
		required: true
	},
	Rate: {
		type: Number,
		required: true
	},
	Remaining: {
		type: Number,
		required: true,
		default: 0
	},
	Sold: {
		type: Number,
		required: true,
		default: 0
	}
});

var Chocolate = module.exports = mongoose.model('Chocolates',cschema);

//Show all chocolates
module.exports.showChocolate = function(callback, limit) {
	Chocolate.find(callback).limit(limit);
}