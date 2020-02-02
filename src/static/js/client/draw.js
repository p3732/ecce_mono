
//var painting = document.getElementById("painting");
//var overlay = document.getElementById("overlay");
var overlayImage = new Image;


var mouseIsDown = false;
var prevMouseDownCoords = null;
var canvas = document.getElementById("canvas");
var submissionCanvas = document.getElementById("submissionCanvas");


var context = canvas.getContext('2d');
var submissionContext = submissionCanvas.getContext('2d');


var timer = document.getElementById("timer");
var levelTimeout = 0;

brush = new Image();

var xOffset, yOffset;


brushButtonsDiv = document.getElementById("brushButtons");

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


 timerIntervallCall = window.setInterval(levelTimer, 250);

 function levelTimer() {
     seconds = ((levelTimeout - Date.now()) / 1000)
     seconds = Math.max(seconds, 0)
     timer.innerHTML = seconds.toFixed(1)

     if (seconds==0) {
         clearInterval(timerIntervallCall)
         hideImage()
         // redirect
         // distribute load over time
         setTimeout(function() {
             submitImage();
             window.location.replace("/html/client/vote.html");
         }, Math.random()*5000)
     }
 }


 function hideImage() {
     console.log("Hiding Canvas")
     canvas.style.display = "none";
 }

function setCurrentLevel(level) {
    console.log("Setting level")
    level = JSON.parse(level)

    levelTimeout = level.timeout
    setOverlayImage(level.overlay)
    setBrushButtons([
        level.brush_1,
        level.brush_2,
        level.brush_3,
        level.brush_4,
        level.brush_5
    ]);

}

updateCurrentLevel()


function setBrush(brushName) {
    //brush = document.getElementById(brushName);
    brush.src = brushName
}

function onBrushButtonClick(id) {
    console.log(id)
    console.log(brush)
    brush.src = "/img/brush/" + id
    //brush = document.getElementById(id);
}


function clearBrushes() {
    while (brushButtonsDiv.firstChild) {
        brushButtonsDiv.removeChild(brushButtonsDiv.firstChild);
    }
}

function setBrushButtons(brushNames) {
    //buttons = brushButtonsDiv.childNodes;
    clearBrushes()
    for (i=0; i<brushNames.length; i++) {
        brushName = brushNames[i];
        if (brushName == null) {
            continue
        }
        console.log(brushName)

        var brushUrl = "/img/brush/"+brushName+".png";

        var button = document.createElement("BUTTON");
        button.id = "brush_"+brushName;
        button.name = brushUrl;
        button.class = "brushButton";
        //onBrushButtonClick("brush_"+brushName);
        button.value = brushUrl
        button.innerHTML = '<img src="/img/brush/'+brushName+'.png" name="'+brushUrl+'"/>';
        brush.src = brushUrl
        button.onclick = function(e){console.log(e.target);
                                console.log(e.target.name);
                            brush.src = e.target.name;};
        brushButtonsDiv.appendChild(button);

    }
}


function getMouseCoords(canvas, event) {
    bounds = canvas.getBoundingClientRect()
    //console.log(event.touches[0])

    if (event.touches) {
        isTouch = true;
    } else {
        isTouch = false;
    }

    if (isTouch) {
        x = event.touches[0].pageX - bounds.left
        y = event.touches[0].pageY - bounds.top
    } else {
        x = event.clientX - bounds.left
        y = event.clientY - bounds.top
    }
    return {x, y}
}


function setOverlayImage(url) {
    overlayImage.onload = function(){
        canvas.width  =  canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        submissionCanvas.width = overlayImage.width;
        submissionCanvas.height = overlayImage.height;

        ratioWidth = canvas.width / overlayImage.width;
        ratioHeight = canvas.height / overlayImage.height;
        ratio = Math.min(ratioWidth, ratioHeight);

        //canvas.width = overlayImage.width*ratio;
        //canvas.height = overlayImage.height*ratio;
        //canvas.style.width = overlayImage.width*ratio + "px";
        //canvas.style.height = overlayImage.width*ratio + "px";

        xOffset = (canvas.width - overlayImage.width*ratio) / 2;
        yOffset = (canvas.height - overlayImage.height*ratio) / 2;

        context.drawImage(overlayImage,
                            xOffset,
                            yOffset,
                            overlayImage.width*ratio,
                            overlayImage.height*ratio);
    };

    overlayImage.src = url;
}



function submitImage() {
    //var image = new Image();

    // transform drawing canvas to expeted overlay size
    submissionContext.drawImage(canvas, xOffset, yOffset,
                                    canvas.width - 2*xOffset,
                                    canvas.height - 2*yOffset,
                                    0,
                                    0,
                                    submissionCanvas.width,
                                    submissionCanvas.height);


    subm = submissionCanvas.toDataURL("image/png");

    var submRequest = new XMLHttpRequest();
    submRequest.open("POST", "/api/client/current", false);
    submRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    subm = subm.replace(/\+/g, '_')
    console.log(subm)

    // encoding
    // base64 encoding in url see: https://stackoverflow.com/questions/1374753
    partA = subm.slice(0, 21)
    partB = subm.slice(21, -1)
    partB = partB.replace(/\//g, '.')
    subm = partA + partB
    subm = subm.replace(/=/g, '-')

    submRequest.send("imgData=" + subm);

    //body = document.getElementById("body");
    //img = document.createElement("img");
    //subm =  subm.replace(/_/g, '\+')
    //subm =  subm.replace(/\./g, '\/')
    //subm =  subm.replace(/-/g, '=')
    //console.log(subm)
    //img.setAttribute('src',subm);
    //document.body.append(img);
}



function draw(event) {
    var mouseCoords = getMouseCoords(canvas, event);
    if (prevMouseDownCoords == null) {
        prevMouseDownCoords = mouseCoords;
    }

    if (mouseIsDown) {
        var dx = mouseCoords.x - prevMouseDownCoords.x;
        var dy = mouseCoords.y - prevMouseDownCoords.y;

        var distance = Math.sqrt((dx*dx) + (dy*dy));
        var resolution = distance / 3;

        var baseX = prevMouseDownCoords.x;
        var baseY = prevMouseDownCoords.y;

        for (i=0; i < 1; i+=1/resolution) {
            context.drawImage(brush,
                baseX + (i*dx) - brush.naturalWidth/2,
                baseY + (i*dy) - brush.naturalHeight/2);
        }
    }

    prevMouseDownCoords = mouseCoords;
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchmove', draw);


canvas.addEventListener('mousedown', function(event) {
    mouseIsDown = true
    draw(event)
});

canvas.addEventListener('touchstart', function(event) {
    //console.log("touchstart")
    prevMouseDownCoords = getMouseCoords(canvas, event);
    mouseIsDown = true
    draw(event)
});

canvas.addEventListener('mouseup', function(event) {
    mouseIsDown = false
});

canvas.addEventListener('touchend', function(event) {
    //console.log("touchend")
    mouseIsDown = false
});
