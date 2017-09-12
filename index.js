var express = require('express');
var app = express();
var Bomb = require('./bomb.js');
var fs = require('fs');

var key = String(process.argv.slice(2));

app.use('/js', express.static(__dirname + '/node_modules/mdbootstrap/js/'));
app.use('/css', express.static(__dirname + '/node_modules/mdbootstrap/css/'));
app.use('/css', express.static(__dirname + '/public/stylesheets/'));

app.set('view engine', 'pug');
app.set('views','./views');

var inst = new Bomb(8,1238912,Bomb.EXPLODED);
var bombArray = [];

function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

fs.readFile('rfid', 'utf8', function(err, contents) {
    var array = contents.toString().split('\n');
    array.pop(); //to remove null value
    var rfidNums = [];
    var shuffledNums = [];
    var i = 0;

    array.forEach(function(entry) {
        rfidNums.push(parseInt(entry))
    });

    for (i = 0; i < rfidNums.length; i++) {
        shuffledNums.push(i);
    }
    shuffledNums = shuffle(shuffledNums);

    i = 0;
    rfidNums.forEach(function(entry) {
        bombArray.push(new Bomb(shuffledNums[i++], entry, Bomb.ARMED));
    });
    console.log(bombArray);
});

app.get('/', function(req, res){
   res.render('countDown',{
   	bomb: bomb.number 
   });
});

app.get('/' + key + '/:rfid([0-9]{12})', function(req, res){
	console.log(req.params.rfid);
});

app.listen(8085);
