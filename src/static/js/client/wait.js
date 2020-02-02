function poll(img) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            level = JSON.parse(this.responseText)
            if (level.timeout > Date.now()) {
                //window.location.reload();
                window.location.replace("/html/client/draw.html");

            }
        }
    };

    request.open("GET", "/api/client/current", false);
    request.send();
}

window.setInterval(poll, 500);
