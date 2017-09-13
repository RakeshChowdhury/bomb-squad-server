var socket = io.connect('http://localhost:5000/?key=ab&rfId='+ 99993092094,{"force new connection":true});
console.log(socket);

socket.on('updateHeader',function(data){
        console.log(data);
        // $('#bombNumber').innerHTML = bombNumber;
        // startCountdown();
});