var imagesDiv = document.getElementById("images");

var voteCounters = []
var entries = []


//var image = new Image();
//var request = new XMLHttpRequest();
//request.onreadystatechange = function() {
//    if (this.readyState == 4 && this.status == 200) {
//        level = JSON.parse(this.responseText)
//        image.src = level.image
//    }
//};
//request.open("GET", "/api/client/current", false);
//request.send();


var VOTE_SECONDS = 20;


var timer = document.getElementById("timer");
var voteTimeout = 0;

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
            if (votes.length > 0) {
                entries[argmax].classList.add('pulse');
            }
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

    voteTimeout = Date.now() + VOTE_SECONDS * 1000
    window.setInterval(updateVotes, 300);
    window.setInterval(voteTimer, 50);
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
        //console.log(image.width)
        //context = img.getContext('2d');
        //img.width = image.width;
        //img.height = image.height;
        //context.drawImage(image, 0, 0)

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

function voteTimer() {
    seconds = ((voteTimeout - Date.now()) / 1000)
    seconds = Math.max(seconds, 0)
    timer.innerHTML = seconds.toFixed(1)

    // redirect
    //if (seconds==0) {
    //    window.location.replace("/html/host/draw.html");
    //}
}



function clearImages() {
    while (images.firstChild) {
        images.removeChild(images.firstChild);
    }
}

setTimeout(updateGallery(), 3000);
