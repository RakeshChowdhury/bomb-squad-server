var express = require('express');
var app = express();
var Bomb = require('./bomb.js');
var key = String(process.argv.slice(2));

app.use('/js', express.static(__dirname + '/node_modules/mdbootstrap/js/'));
app.use('/css', express.static(__dirname + '/node_modules/mdbootstrap/css/'));
app.use('/css', express.static(__dirname + '/public/stylesheets/'));

app.set('view engine', 'pug');
app.set('views','./views');

var inst = new Bomb(8,1238912,Bomb.EXPLODED);
console.log(inst.getStatus());

app.get('/', function(req, res){
   res.render('countDown');
});

app.get('/' + key + '/:rfid([0-9]{12})', function(req, res){
	console.log(req.params.rfid);
});

app.listen(8085);
