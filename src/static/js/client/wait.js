function poll(img) {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      if (this.responseText) {
        window.location.reload();
      }
    }
  };

  request.open("GET", server + "api/client/current", false);
  request.send();
}

window.setInterval(poll, 500);

