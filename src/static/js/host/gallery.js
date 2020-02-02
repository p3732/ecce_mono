// let original = document.getElementById("original");
// let overlay = document.getElementById("overlay");
let original = new Image();
let overlay = new Image();
let level = {};

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
      var selected_image = gallery[0]
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
  let canvas = document.createElement("CANVAS");
  canvas.height = original.naturalHeight
  canvas.width = original.naturalWidth
  let ctx = canvas.getContext("2d");
  ctx.drawImage(original,0,0);
  await ctx.drawImage(overlay,level.x,level.y,level.width, level.height);
  ctx.canvas.height = 0.7 * window.innerHeight;
  document.body.append(canvas)
}

function loadBothImages() {
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

loadBothImages();

// var imagesDiv = document.getElementById("images");

// var voteCounters = []
// var entries = []

// var VOTE_SECONDS = 20;


// var timer = document.getElementById("timer");
// var voteTimeout = 0;

// function updateVotes() {
//     var request = new XMLHttpRequest();
//     request.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {

//             argmax = 0;
//             votes = JSON.parse(this.responseText)
//             for (i=0; i<votes.length; i++) {
//                 v = votes[i]
//                 voteCounters[i].innerHTML = v;
//                 if (v>votes[argmax]) {
//                     argmax = i;
//                 }
//             }
//             for (i=0; i<entries.length; i++) {
//                 entries[i].classList.remove("pulse");
//             }
//             if (votes.length > 0) {
//                 entries[argmax].classList.add('pulse');
//             }
//         }
//     };
//     request.open("GET", "/api/host/votes", false);
//     request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//     request.send();
// }



// function updateGallery() {
//     var request = new XMLHttpRequest();
//     request.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             setImages(this.responseText)
//         }
//     };
//     request.open("GET", "/api/host/gallery", false);
//     request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//     request.send();

//     voteTimeout = Date.now() + VOTE_SECONDS * 1000
// }


// function setImages(images) {
//     images = JSON.parse(images)

//     clearImages()
//     console.log(images.length)
//     voteCounters = []

//     for (i=0; i<images.length; i++) {
//         imgString = images[i]

        // decoding
        // base64 encoding in url see: https://stackoverflow.com/questions/1374753
//         imgString =  imgString.replace(/_/g, '\+')
//         partA = imgString.slice(0, 21)
//         partB = imgString.slice(21, -1)
//         partB = partB.replace(/\./g, '\/')
//         imgString = partA + partB
//         imgString =  imgString.replace(/-/g, '=')


//         container = document.createElement("figure");
//         container.setAttribute("class", "entry");
//         entries.push(container);
//         imagesDiv.append(container);


//         img = document.createElement("img");
        //console.log(image.width)
        //context = img.getContext('2d');
        //img.width = image.width;
        //img.height = image.height;
        //context.drawImage(image, 0, 0)

//         img.setAttribute('class', "image");
//         img.setAttribute('src', imgString);
//         container.append(img)

//         votes = document.createElement("div");
//         votes.setAttribute('class', "votes");
//         votesIcon = document.createElement("div");
//         votesIcon.innerHTML = '#'
//         votesCounter = document.createElement("div");
//         voteCounters.push(votesCounter);
//         votes.append(votesIcon);
//         votes.append(votesCounter);
//         votesCounter.innerHTML = 0;
//         container.append(votes)
//     }

    //image.src = submissionCanvas.toDataURL("image/png");


// }


// function voteTimer() {
//     seconds = ((voteTimeout - Date.now()) / 1000)
//     seconds = Math.max(seconds, 0)
//     timer.innerHTML = seconds.toFixed(1)

    // redirect
//     if (seconds==0) {
        //window.location.replace("/html/host/draw.html");
//     }
// }



// function clearImages() {
//     while (images.firstChild) {
//         images.removeChild(images.firstChild);
//     }
// }

// setTimeout(updateGallery(), 3000);

// updateGallery()

// window.setInterval(updateVotes, 300);
// window.setInterval(voteTimer, 50);

