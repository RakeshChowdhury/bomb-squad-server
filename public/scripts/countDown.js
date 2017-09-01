
var time = 30;
var timeleft = time;
var status = 0;


var x = setInterval(function(){ progress() }, 1000);


function progress() {
    timeleft = timeleft - 1;
    status = ((time - timeleft)/time)*100;

    document.getElementById("countdown").innerHTML = timeleft + "s";
    document.getElementById("progressbar").style.width = status.toString() + "%";

    if (timeleft < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "EXPLODED";
    }
}

function explode(){
	clearInterval(x);
	timeleft = -1;
	document.getElementById("countdown").innerHTML = "EXPLODED";
	document.getElementById("progressbar").style.width = "100%";
}

function defuse(){
	clearInterval(x);
	document.getElementById("countdown").innerHTML = "DEFUSED";
}