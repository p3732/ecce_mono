var images = []
var imgDiv = document.getElementById("image");

var like = document.getElementById("like");
var next = document.getElementById("next");

like.disabled = true;
next.disabled = true;

var index = 0;

function updateGallery() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            setImages(this.responseText)
        }
    };
    request.open("GET", "/api/host/gallery", false);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send();
}


// base64 encoding in url see: https://stackoverflow.com/questions/1374753
function decode(img) {
    img =  img.replace(/_/g, '\+')
    partA = img.slice(0, 21)
    partB = img.slice(21, -1)
    partB = partB.replace(/\./g, '\/')
    img = partA + partB
    img =  img.replace(/-/g, '=')
    return img;
}

function setImages(ims) {
    images = JSON.parse(ims)
    console.log("Images: " + images.length)
    index = -1;
    nextImage()
}

function likeImage() {
    var request = new XMLHttpRequest();
    request.open("POST", "/api/client/vote/"+index, false);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send();
    nextImage()
}

function nextImage() {
    index += 1
    console.log("index: " + index)
    if (index < images.length) {
        imgDiv.src = decode(images[index])
        like.disabled = false;
        next.disabled = false;
    } else {
         imgDiv.src = ""
         like.disabled = true;
         next.disabled = true;
         window.location.replace("/html/client/wait.html");
    }
}

setTimeout(updateGallery, 2000 + Math.random()*3000);
