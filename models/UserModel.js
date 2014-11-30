var mongoose = require('mongoose');

// define an User model with this mongoose instance
mongoose.model('User', new Schema({ 
	firstName: String,
	lastName: String,
	mobile: String,
	password: String,
	carNumber: String,
	address: String,
	slots: Number,
	rent: Number,
	fits: Number,
	on: {
		mon: Boolean,
		tue: Boolean,
		wed: Boolean,
		thr: Boolean,
		fri: Boolean,
		sat: Boolean,
		sun: Boolean
	}

}));

// create a new connection
var conn = mongoose.createConnection(..);

// retrieve the Actor model
var Actor = conn.model('Actor');