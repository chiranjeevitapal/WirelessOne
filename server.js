var express = require('express')
var expressStaticGzip = require("express-static-gzip");
var compression = require('compression');
var bodyParser = require('body-parser');
var app = express();
var crud = require('./routes/crud');
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectID;


app.get('/home', function(request, response, next) {
    //app.use(express.static(path.join(__dirname, 'client')))
    app.use("/", expressStaticGzip("dist"));
    request.url = '/#/home';
    next();
});

app.get('/form', function(request, response, next) {
    app.use("/", expressStaticGzip("dist"));
    request.url = '/#/form';
    next();
});

app.get('/form/:id', function(request, response, next) {
    var id = request.params.id;
    app.use("/", expressStaticGzip("dist"));
    request.url = '/#/form/'+id;
    next();
});

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin',
        '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
    res.setHeader('Access-Control-Allow-Headers',
        'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(compression());
app.use("/", expressStaticGzip("dist"));

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

//apis
app.use('/api/', crud);

app.listen(5000, function() {
    console.log('WirelessOne app listening on port 5000!') 
})
