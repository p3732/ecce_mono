var ipSpan = document.getElementById("ip");

function getIP() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            showIP(this.responseText)
        }
    };
    request.open("GET", "/api/ip", false);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send();
}

function showIP(text)
{
    console.log(text)
    ipSpan.innerText = text;
}


function start() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            window.location.replace('/html/host/draw.html');
            console.log("Starting")
        }
    };
    request.open("POST", "/api/host/start", false);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send();

}
