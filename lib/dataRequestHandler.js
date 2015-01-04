var _ = require('lodash'),
    fs = require('fs'),
    Converter=require("csvtojson").core.Converter;

var rootRoute = '/data.json';
var dataPath = __dirname + '/../dataDrop/JPMC.CSV';

module.exports = DataRequestHandler;
function DataRequestHandler (app) {
    this.app = app;
    this.registerRoutes(app);
}
_.extend(DataRequestHandler.prototype, {
    getData: function (complete) {
        var fileStream = fs.createReadStream(dataPath);
        var csvConverter = new Converter({constructResult:true});
        var data = [];
        csvConverter.on("end_parsed",function(jsonObj){

            _.each(jsonObj, function (row) {
                var rowArray = [];
                _.each(row, function (v) {
                    rowArray.push(v);
                });
                rowArray.push('other');
                data.push(rowArray);
            });
            complete(null, data);
        });
        fileStream.pipe(csvConverter);
    },
    registerRoutes: function (app) {
        var self = this;
        app.get(rootRoute, function (req, res, next) {
            self.getData(function (err, data) {
                if (err) return res.status(500).json({ error: err });
                res.status(200).json({
                    data: data
                });
            });

        });
    }
});