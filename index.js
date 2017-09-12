var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views','./views');

app.get('/', function(req, res){
   res.render('countDown');
});


var key = String(process.argv.slice(2));
app.get('/' + key + '/:rfid([0-9]{12})', function(req, res){
	console.log(req.params.rfid);
});


app.use('/js', express.static(__dirname + '/node_modules/mdbootstrap/js/'));
app.use('/css', express.static(__dirname + '/node_modules/mdbootstrap/css/'));
app.use('/css', express.static(__dirname + '/public/stylesheets/'));


app.listen(3000);