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
    //console.log(images[0][32])
    var image = new Image();
    console.log(images)
    image.onload = function(){

    }
    document.getElementById("imageTest").src = JSON.parse(images)[0]
    //image.src = submissionCanvas.toDataURL("image/png");


}


updateGallery()
