var express = require('express');
var app = express();
var server = require('http').createServer(app);

var key = String(process.argv.slice(2));

var io = require('socket.io')(server);
var Bomb = require('./bomb.js');
var fs = require('fs');


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



app.get('/' + key + '/:rfid([0-9]{11})', function(req, res){
	var rfid = req.params.rfid;
	var bomb = getBombNumber(rfid);
	var data = {bombnumber: bomb,rfid: rfid};
		if(bomb != undefined){
			console.log(data);
			io.emit('updateHeader',data);
		}
});

app.get('/Aegis', function(req, res){
	res.render('countDown');
});

app.get('/changeState', function(req, res){
	for (var i = 0; i < bombArray.length; i++) {
		if (bombArray[i].number == req.query.bomb) {
			bombArray[i].setStatus(parseInt(req.query.state));
		}
	}
	console.log(bombArray);
});


function getBombNumber(rfid){
	var bombNumber;
	for (var i = 0; i < bombArray.length; i++) {
		if (bombArray[i].rfid == rfid) {
			bombNumber = bombArray[i].number;
			bombArray[i].setStatus(1);
		}
	}
	return bombNumber;
}

///// socket.io //////

server.listen(3000, function(){
	console.log("Listening on port 5000");
});

// socket client test
app.get('/', function(req, res){
	res.render('testClient');
});
// client test end




