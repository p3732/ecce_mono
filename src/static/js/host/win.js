// let original = document.getElementById("original");
// let overlay = document.getElementById("overlay");
let original = new Image();
let overlay = new Image();
let level = {};
let best_value = 0;

function getBestVote() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            console.log("aeiae")
            votes = JSON.parse(this.responseText)
            max_value=0
            best_value=0
            for (i=0; i<votes.length; i++) {
                v = votes[i]
                if (v > max_value) {
                  best_value = i;
                }
            }
            loadBothImages();
        }
    };
    request.open("GET", "/api/host/votes", false);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send();
}

function loadOriginal() {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      level = JSON.parse(this.responseText)
      original.src = level.image
    }
  };
  request.open("GET", "/api/client/current");
  request.send();
}

function loadOverlay() {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var gallery = JSON.parse(this.responseText)
      var selected_image = gallery[best_value]
      selected_image = decode(selected_image)

      overlay.src = selected_image
    }
  };
  request.open("GET", "/api/host/gallery");
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.send();
}

function decode(string) {
  var imgString = string.replace(/_/g, '\+')
  partA = imgString.slice(0, 21)
  partB = imgString.slice(21, -1)
  partB = partB.replace(/\./g, '\/')
  imgString = partA + partB
  imgString =  imgString.replace(/-/g, '=')
  return imgString;
};


async function overlayImages() {
  console.log("aeitaofiaeiaesssssa")
  let canvas = document.createElement("CANVAS");
  canvas.height = original.naturalHeight
  canvas.width = original.naturalWidth
  let ctx = canvas.getContext("2d");
  ctx.drawImage(original,0,0);
  await ctx.drawImage(overlay,level.x,level.y,level.width, level.height);
  document.body.append(canvas)
}

function loadBothImages() {
  console.log("aeitaofa")
  let original_loaded = false;
  let overlay_loaded = false;

  original.onload = function() {
    original_loaded = true;
    if (overlay_loaded) {
      overlayImages();
    }
  }

  overlay.onload = function() {
    overlay_loaded = true;
    if (original_loaded) {
      overlayImages();
    }
  }

  loadOriginal();
  loadOverlay();
}

getBestVote();

function nextLevel() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            window.location.replace('/html/host/draw.html');
        }
        console.log(this.status)
    };
    request.open("POST", "/api/host/start", false);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send();
}
