
var time = 30;
var timeleft = time;
var status = 0;
var x = setInterval(function() {


    timeleft = timeleft - 1;
    status = ((time - timeleft)/time)*100;

    document.getElementById("countdown").innerHTML = timeleft + "s";
    document.getElementById("progressbar").style.width = status.toString() + "%";
    
    // If the count down is over, write some text 
    if (timeleft < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "EXPLODED";
    }
}, 1000);
