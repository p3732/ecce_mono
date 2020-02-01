var imagesDiv = document.getElementById("images");

var voteCounters = []
var entries = []

function updateVotes() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            argmax = 0;
            votes = JSON.parse(this.responseText)
            for (i=0; i<votes.length; i++) {
                v = votes[i]
                voteCounters[i].innerHTML = v;
                if (v>votes[argmax]) {
                    argmax = i;
                }
            }
            for (i=0; i<entries.length; i++) {
                entries[i].classList.remove("pulse");
            }
            entries[argmax].classList.add('pulse');
        }
    };
    request.open("GET", "/api/host/votes", false);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send();
}



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
    console.log(images.length)
    voteCounters = []

    for (i=0; i<images.length; i++) {
        imgString = images[i]

        // decoding
        // base64 encoding in url see: https://stackoverflow.com/questions/1374753
        imgString =  imgString.replace(/_/g, '\+')
        partA = imgString.slice(0, 21)
        partB = imgString.slice(21, -1)
        partB = partB.replace(/\./g, '\/')
        imgString = partA + partB
        imgString =  imgString.replace(/-/g, '=')


        container = document.createElement("figure");
        container.setAttribute("class", "entry");
        entries.push(container);
        imagesDiv.append(container);


        img = document.createElement("img");
        img.setAttribute('class', "image");
        img.setAttribute('src', imgString);
        container.append(img)

        votes = document.createElement("div");
        votes.setAttribute('class', "votes");
        votesIcon = document.createElement("div");
        votesIcon.innerHTML = '#'
        votesCounter = document.createElement("div");
        voteCounters.push(votesCounter);
        votes.append(votesIcon);
        votes.append(votesCounter);
        votesCounter.innerHTML = 0;
        container.append(votes)
    }

    //image.src = submissionCanvas.toDataURL("image/png");


}

function clearImages() {
    while (images.firstChild) {
        images.removeChild(images.firstChild);
    }
}

updateGallery()

window.setInterval(updateVotes, 300);
