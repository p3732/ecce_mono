var timer = document.getElementById("timer");
var levelTimeout = 0;

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


 window.setInterval(levelTimer, 50);

 function levelTimer() {
     seconds = ((levelTimeout - Date.now()) / 1000)
     seconds = Math.max(seconds, 0)
     timer.innerHTML = seconds.toFixed(1)

     // redirect
     if (seconds==0) {
         window.location.replace("/html/client/vote.html");
     }
 }



function setCurrentLevel(level) {
    console.log("Setting level")
    level = JSON.parse(level)

    levelTimeout = level.timeout
    picture.src = level.image

    //canvas = overlayOnImage(level.image, level.overlay, level.x, level.y)
    //picture.src = canvas.toDataURL();

}

updateCurrentLevel()
