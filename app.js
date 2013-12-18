var express = require('express');
var app = module.exports = express();

// config stuff
app.use(express.compress());
app.use(express.favicon());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(app.router); // prioritize routes over public folder
app.use(express.static(__dirname + '/cities'));

console.log('Listening at 3000')
app.listen(3000);