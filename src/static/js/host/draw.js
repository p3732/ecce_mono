var timer = document.getElementById("timer");
var levelTimeout = 0;
var ipSpan = document.getElementById("ip");

var picuture = document.getElementById("picuture");


function updateCurrentLevel() {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            setCurrentLevel(this.responseText)
        }
    };
    request.open("GET", "/api/client/current", false);
    request.send();
}



 function levelTimer() {
     seconds = ((levelTimeout - Date.now()) / 1000)
     seconds = Math.max(seconds, 0)
     timer.innerHTML = seconds.toFixed(0)

     // redirect
     if (seconds==0) {
         window.location.replace("/html/host/gallery.html");
     }
 }


function setCurrentLevel(level) {
    console.log("Setting level")
    level = JSON.parse(level)

    levelTimeout = level.timeout
    picture.src = level.image
    console.log(level.image)

    window.setInterval(levelTimer, 50);

    //canvas = overlayOnImage(level.image, level.overlay, level.x, level.y)
    //picture.src = canvas.toDataURL();

}

function getIP() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            showIP(this.responseText)
        }
    };
    request.open("GET", "/api/ip", false);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send();
}

function showIP(text)
{
    console.log(text)
    ipSpan.innerText = text;
}

updateCurrentLevel()
