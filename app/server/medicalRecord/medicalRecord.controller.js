var fs = require("fs");
var medicalRecord = require("./medicalRecord.model"); // Medical record database storage

// Add new medical record
module.exports.addMedicalRecord = function (req, res) {
	var newmedicalRecord = new medicalRecord(req.body);
	console.log('Attempting to add medical record: ', req.body);
	newmedicalRecord.save(function (err) {
		if (err) return res.json({
			"code": 40,
			"result": "Failed to add medical record. Please try again."});
		res.json({
			"code": 0,
			"result": "Successfully added medical record"
		});
	});
};

// Update medical record
module.exports.updateMedicalRecord = function (req, res) {
	console.log('Attempting to update medical record:', req.body);
	var medicalID = req.body.medicalID;
	var temp = req.body.temp;
	var pulse = req.body.pulse;
	var bp = req.body.bp;
	var spo2 = req.body.spo2;
	var respRate = req.body.respRate;
	var abnorm = req.body.abnorm;
	var reportScene = req.body.reportScene;
	var pos = req.body.pos;
	var injuries = req.body.injuries;
	var recording = req.body.recording;

	var query = medicalRecord.findOne({ medicalID: medicalID });

	query.exec(function(err, currMedicalRecord) {
		if(err) return handleError(err);

		medicalRecord.findOneAndUpdate(
			{ medicalID: medicalID },
			{ $push: { data: {
				temp: temp,
				pulse: pulse,
				bp: bp,
				spo2: spo2,
				respRate: respRate,
				abnorm: abnorm,
				reportScene: reportScene,
				pos: pos,
				injuries: injuries,
				recording: recording } }
			}, { new: true },
			function (err) {
				if (err) return res.json(err);
				res.json({
					"code": 0,
					"result": "Successfully updated medical record"
				});
			}
		);
	})
};

// Retrieve latest medical record when there is a HTTP request
module.exports.getMedicalRecord = function (req, res) {
	console.log('Attempting to get all medical records');
	medicalRecord.find({}, { data: { $slice: -1 } }, function (err, medicalRecords) {
		if (err) return res.json(err);
		var mappedmedicalRecords = medicalRecords.map(function (medicalRecord) {
			return {
				medicalID: medicalRecord.medicalID,
				temp: medicalRecord.data[0] && medicalRecord.data[0].temp ? medicalRecord.data[0].temp : "",
				pulse: medicalRecord.data[0] && medicalRecord.data[0].pulse ? medicalRecord.data[0].pulse: "",
				bp: medicalRecord.data[0] && medicalRecord.data[0].bp ?medicalRecord.data[0].bp : "",
				spo2: medicalRecord.data[0] && medicalRecord.data[0].spo2 ? medicalRecord.data[0].spo2 : "",
				respRate: medicalRecord.data[0] && medicalRecord.data[0].respRate ?medicalRecord.data[0].respRate : "",
				abnorm: medicalRecord.data[0] && medicalRecord.data[0].abnorm ? medicalRecord.data[0].abnorm: "",
				reportScene: medicalRecord.data[0] && medicalRecord.data[0].reportScene ? medicalRecord.data[0].reportScene : "",
				pos: medicalRecord.data[0] && medicalRecord.data[0].pos ? medicalRecord.data[0].pos : "",
				injuries: medicalRecord.data[0] && medicalRecord.data[0].injuries ? medicalRecord.data[0].injuries : "",
				recording: medicalRecord.data[0] && medicalRecord.data[0].recording ? medicalRecord.data[0].recording : "",
				updatedOn: medicalRecord.data[0].updatedOn
			};
		});

		res.jsonp({
			"code": 0,
			"result": mappedmedicalRecords
		});
	});
};
