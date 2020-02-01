var images = []
var imgDiv = document.getElementById("image");

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


function decode(img) {
    img =  img.replace(/_/g, '\+')
    partA = img.slice(0, 21)
    partB = img.slice(21, -1)
    partB = partB.replace(/\./g, '\/')
    img = partA + partB
    //imgString = imgString.replace(/\//g, '.')
    img =  img.replace(/-/g, '=')
    return img;
}

function setImages(ims) {
    images = JSON.parse(ims)
    index = 0;
    imgDiv.src = decode(images[index])
}

function likeImage() {
    // TODO Like
    nextImage()
}

function nextImage() {
    index += 1
    imgDiv.src = decode(images[index])
}

updateGallery()
