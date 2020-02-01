
//var painting = document.getElementById("painting");
//var overlay = document.getElementById("overlay");

var overlayImage = new Image;


var mouseIsDown = false;
var prevMouseDownCoords = null;
var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');

brush = new Image();


brushButtonsDiv = document.getElementById("brushButtons");



var server = "http://localhost:3300/"


function updateCurrentLevel() {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        console.log(this.status)
        if (this.readyState == 4 && this.status == 200) {
            setCurrentLevel(this.responseText)
        }
    };
    request.open("GET", server + "api/client/current", false);
    request.send();
}

function setCurrentLevel(level) {
    level = JSON.parse(level)
    setOverlayImage(server + level.overlay)

    setBrushButtons([
        level.brush_1,
        level.brush_2,
        level.brush_3,
        level.brush_4,
        level.brush_5
    ]);
}

updateCurrentLevel()

function setCanvasPos(x, y, width, height) {
    canvas.style.left = x.toString() + "px";
    canvas.style.top = y.toString() + "px";
    canvas.style.width = width;
    canvas.style.height = height;
}

function setBrush(brushName) {
    brush = document.getElementById(brushName);
}

function onBrushButtonClick(button) {
    brush = document.getElementById(button.value);
}


function clearBrushes() {
    while (brushButtonsDiv.firstChild) {
        brushButtonsDiv.removeChild(brushButtonsDiv.firstChild);
    }
}

function setBrushButtons(brushNames) {
    buttons = brushButtonsDiv.childNodes;
    clearBrushes()
    for (i=0; i<brushNames.length; i++) {
        brushName = brushNames[i];
        if (brushName == null) {
            continue
        }

        var brushUrl = server+"img/brush/"+brushName+".png";

        var button = document.createElement("BUTTON");
        button.id = "brush_"+brushName;
        button.name = brushName;
        button.onclick = "onBrushButtonClick(this)";
        button.value = brushUrl
        brushButtonsDiv.appendChild(button);
        button.innerHTML = '<img src="'+server+'img/brush/'+brushName+'.png" />';
        brush.src = brushUrl
    }
}


function getMouseCoords(canvas, event) {
    bounds = canvas.getBoundingClientRect()
    x = event.clientX - bounds.left
    y = event.clientY - bounds.top
    return {x, y}
}


function setOverlayImage(url) {
    overlayImage.onload = function(){
        canvas.width  =  canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        ratioWidth = canvas.width / overlayImage.width;
        ratioHeight = canvas.height / overlayImage.height;
        ratio = Math.min(ratioWidth, ratioHeight);

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
    var image = new Image();
	image.src = canvas.toDataURL("image/png");
    var request = new XMLHttpRequest();
    request.open("POST", server+"api/client/current", true);
    request.send(image);
}



canvas.addEventListener('mousemove', function(event) {
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
});

canvas.addEventListener('mousedown', function(event) {
  mouseIsDown = true
});

canvas.addEventListener('mouseup', function(event) {
  mouseIsDown = false
});