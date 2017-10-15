const SerialPort = require('serialport');
const baud_rate = 9600;
const port = new SerialPort('/dev/ttyACM0', {
    baudRate: baud_rate
});

// const parser = new Readline();
// const Readline = SerialPort.parsers.Readline;
// port.pipe(parser);
// parser.on('data', console.log);
// while(true) {
// setTimeout(function() {
port.write("03213", 'utf8');
console.log("String sent!");
// }, 200);
// }
