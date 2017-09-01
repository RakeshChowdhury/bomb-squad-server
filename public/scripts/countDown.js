
var time = 30;
var timeleft = time;
var x = setInterval(function() {


    timeleft = timeleft - 1;

    document.getElementById("countdown").innerHTML = timeleft + "s"
    
    // If the count down is over, write some text 
    if (timeleft < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "EXPLODED";
    }
}, 1000);