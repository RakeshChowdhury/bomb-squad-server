var express = require('express');
var app = express();
var Bomb = require('./bomb.js');
var key = String(process.argv.slice(2));

app.use('/js', express.static(__dirname + '/node_modules/mdbootstrap/js/'));
app.use('/css', express.static(__dirname + '/node_modules/mdbootstrap/css/'));
app.use('/css', express.static(__dirname + '/public/stylesheets/'));

app.set('view engine', 'pug');
app.set('views','./views');

var states = {
    ARMED: 0,
    DISARMED: 1,
    DEFUSED: 2,
    EXPLODED: 3
};

var inst = new Bomb(8,1238912,states.EXPLODED);
console.log(inst.status);

app.get('/', function(req, res){
   res.render('countDown',{
   	bomb: bomb.number 
   });
});

app.get('/' + key + '/:rfid([0-9]{12})', function(req, res){
	console.log(req.params.rfid);
});

app.listen(8085);
