var express = require('express');
var app = express();
var server = require('http').createServer(app);
var keyT = String(process.argv[2]);
var keyCT = String(process.argv[3]);

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
        bombArray.push(new Bomb(i++, entry, Bomb.DEFUSED));
    });
    console.log(bombArray);
});

app.get('/' + keyCT + '/:rfid', function(req, res){
    var rfid = req.params.rfid;
    var bomb = getBombNumber(rfid,1);
    var data = {bombnumber: bomb, rfid: rfid, team: 1};
        if(bomb != -1){
            console.log(data);
            io.emit('updateHeader',data);
        }
});

app.get('/' + keyT + '/:rfid', function(req, res){
    var rfid = req.params.rfid;
    var bomb = getBombNumber(rfid,0);
    var data = {bombnumber: bomb, rfid: rfid, team: 0};
        if(bomb != -1){
            console.log(data);
            io.emit('updateHeader',data);
        }
});


app.get('/Aegis2', function(req, res){
    res.render('knockoutUI');
});

app.get('/changeState', function(req, res){
    for (var i = 0; i < bombArray.length; i++) {
        if (bombArray[i].number == req.query.bomb) {
            bombArray[i].setStatus(parseInt(req.query.state));
        }
    }
    triggerArduino();
    console.log(bombArray);
});

app.get('/removeDisarmed', function(req, res){
    for (var i = 0; i < bombArray.length; i++) {
        if (bombArray[i].getStatus() === Bomb.DISARMED) {
            bombArray[i].setStatus(Bomb.DEFUSED);
        }
    }
    triggerArduino();
    console.log(bombArray);
});

function triggerArduino() {
    var statusString = "";
    for (var i = 0; i < bombArray.length; i++) {
        statusString += bombArray[i].getStatus();
    }
    // console.log(bombArray);
    writeArduino(statusString);
    console.log("Status String" + statusString);
}

function getBombNumber(rfid,team){
    var bombNumber;
    if (team === 1) {
        for (var i = 0; i < bombArray.length; i++) {
            if (bombArray[i].rfid == rfid) {
                if(bombArray[i].getStatus() == Bomb.EXPLODED || bombArray[i].getStatus() == Bomb.DEFUSED){
                    return -1;
                }
                else if (bombArray[i].getStatus() == Bomb.DISARMED) {
                    bombArray[i].setStatus(Bomb.DEFUSED);
                    triggerArduino();
                    return -1;
                }
                bombNumber = bombArray[i].number;
                bombArray[i].setStatus(Bomb.DISARMED);
                triggerArduino();
                return bombNumber;
            }
        }
        return -1;
    }
    else if (team === 0) {
       for (var i = 0; i < bombArray.length; i++) {
            if(bombArray[i].getStatus() == Bomb.DISARMED){
                    bombArray[i].setStatus(Bomb.DEFUSED);
                    triggerArduino();
                }
            if (bombArray[i].rfid == rfid) {
                if(bombArray[i].getStatus() == Bomb.ARMED){
                    return -1;
                }
                bombNumber = bombArray[i].number;
                bombArray[i].setStatus(Bomb.DISARMED);
                triggerArduino();
                return bombNumber;
            }
        }
        return -1;
    }
}

///// socket.io //////

server.listen(5000, function(){
    console.log("Listening on port 5000");
});

