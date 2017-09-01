var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views','./views');

// require('mdbootstrap');


app.get('/', function(req, res){
   res.render('countDown');
});

app.use('/scripts', express.static(__dirname + '/node_modules/mdbootstrap/js/'));
app.use('/stylesheets', express.static(__dirname + '/node_modules/mdbootstrap/css/'));

app.listen(3000);