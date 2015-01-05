var _ = require('lodash'),
	fs = require('fs'),
	Converter=require("csvtojson").core.Converter,
	crypto = require('crypto');

var rootRoute = '/data/uploads';
var dataPath = __dirname + '/../dataDrop/JPMC.CSV';

module.exports = UploadHandler;
function UploadHandler (app) {
	this.app = app;
	this.registerRoutes(app);
}
_.extend(UploadHandler.prototype, {
	registerRoutes: function (app) {
		var self = this;
		app.post(rootRoute, function (req, resp, next) {
			if(!req.files || !req.files.dataFile || !req.files.dataFile.name)
				return resp.status(500).json({ error: 'missing file' });

			fs.readFile(req.files.dataFile, function (err, contents) {
				if (err) return resp.status(500).json({error: 'error reading file: ' + err });
				var fileName = __dirname + "/../dataDrop/" + crypto.randomBytes(10).toString('hex') + '.csv';
				fs.writeFile(fileName, contents, function (err) {
					if (err) return resp.status(500).json({ error: 'error writing file: ' + err });
					resp.status(200).json({ status: 'ok' });
				});
			});
		});
	}
});