var mongoose = require("mongoose");

var data = mongoose.Schema({
	temp: {
		type: String,
		required: true
	},
	pulse: {
		type: String,
		default: ""
	},
	bp: {
		type: String,
		default: ""
	},
	spo2: {
		type: String,
		default: ""
	},
	respRate: {
		type: String,
		default: ""
	},
	abnorm: {
		type: String,
		default: ""
	},
	reportScene: {
		type: String,
		default: ""
	},
	pos: {
		type: String,
		default: ""
	},
	injuries: {
		type: String,
		default: ""
	},
	recording: {
		type: String,
		default: ""
	},
	updatedOn: {
		type: String,
		default: Date().substring(4, 25)
	}
}, { _id: false });

var medicalRecordSchema = mongoose.Schema({
	medicalID: {
		type: String,
		required: true,
		unique: true
	},
	data: {
		type: [data],
		default: {temp: "nil"}
	}
});

module.exports = mongoose.model("medical", medicalRecordSchema);
