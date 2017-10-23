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

var bombArray = [];

const SerialPort = require('serialport');
const baud_rate = 9600;
const port = new SerialPort('/dev/ttyACM1', {
    baudRate: baud_rate
});

function writeArduino(statusString) {
    port.write(statusString, 'utf8');
    console.log("String sent!");
}

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
    var i = 0;

    array.forEach(function(entry) {
        rfidNums.push(entry)
    });

    rfidNums = shuffle(rfidNums);

    i = 0;
    rfidNums.forEach(function(entry) {
        bombArray.push(new Bomb(i++, entry, Bomb.ARMED));
    });
    console.log(bombArray);
});

server.listen(5000, function(){
    console.log("Listening on port 3000");
});