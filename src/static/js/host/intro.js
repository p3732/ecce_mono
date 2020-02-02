function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function start() {
  await sleep(2000);
  document.body.style.backgroundImage = "url('/img/intro/frame2.png')";
  await sleep(2000);
  document.body.style.backgroundImage = "url('/img/intro/frame3.png')";
  await sleep(5000);
  loadNextPage()
}


function loadNextPage() {
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

window.addEventListener('load', start)
