var imagesDiv = document.getElementById("images");


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


function setImages(images) {
    images = JSON.parse(images)

    clearImages()
    console.log(images)


    for (i=0; i<images.length; i++) {
        imgString = images[i]
        imgString =  imgString.replace(/_/g, '\+')
        imgString =  imgString.replace(/\./g, '\/')
        imgString =  imgString.replace(/-/g, '=')
        container = document.createElement("div");
        imagesDiv.append(container);
        img = document.createElement("img");
        img.setAttribute('src', imgString);
        container.append(img)
        break;
    }

    //image.src = submissionCanvas.toDataURL("image/png");


}

function clearImages() {
    while (images.firstChild) {
        images.removeChild(images.firstChild);
    }
}

updateGallery()
