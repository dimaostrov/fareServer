var count = 0;
//var videoInput = document.getElementById('inputVideo');

var vid = document.getElementById('inputVideo');
var vid_width = vid.width;
var vid_height = vid.height;
var overlay = document.getElementById('overlay');
var overlayCC = overlay.getContext('2d');
/*********** Setup of video/webcam and checking for webGL support *********/
function enablestart() {
    var startbutton = document.getElementById('startbutton');
    startbutton.value = "start";
    startbutton.disabled = null;
}
var insertAltVideo = function (video) {
    // insert alternate video if getUserMedia not available
    if (supports_video()) {
        if (supports_webm_video()) {
            video.src = "./media/cap12_edit.webm";
        } else if (supports_h264_baseline_video()) {
            video.src = "./media/cap12_edit.mp4";
        } else {
            return false;
        }
        return true;
    } else return false;
}
function adjustVideoProportions() {
    // resize overlay and video if proportions of video are not 4:3
    // keep same height, just change width
    var proportion = vid.videoWidth / vid.videoHeight;
    vid_width = Math.round(vid_height * proportion);
    vid.width = vid_width;
    overlay.width = vid_width;
}
function gumSuccess(stream) {
    // add camera stream if getUserMedia succeeded
    if ("srcObject" in vid) {
        vid.srcObject = stream;
    } else {
        vid.src = (window.URL && window.URL.createObjectURL(stream));
    }
    vid.onloadedmetadata = function () {
        adjustVideoProportions();
        vid.play();
    }
    vid.onresize = function () {
        adjustVideoProportions();
        if (trackingStarted) {
            ctrack.stop();
            ctrack.reset();
            ctrack.start(vid);
        }
    }
}
function gumFail() {
    // fall back to video if getUserMedia failed
    insertAltVideo(vid);
    document.getElementById('gum').className = "hide";
    document.getElementById('nogum').className = "nohide";
    alert("There was some problem trying to fetch video from your webcam, using a fallback video instead.");
}
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;
// set up video
if (navigator.mediaDevices) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(gumSuccess).catch(gumFail);
} else if (navigator.getUserMedia) {
    navigator.getUserMedia({ video: true }, gumSuccess, gumFail);
} else {
    insertAltVideo(vid);
    document.getElementById('gum').className = "hide";
    document.getElementById('nogum').className = "nohide";
    alert("Your browser does not seem to support getUserMedia, using a fallback video instead.");
}
vid.addEventListener('canplay', enablestart, false);
/*********** Code for face tracking *********/
var ctrack = new clm.tracker();
ctrack.init();
var trackingStarted = false;
function startVideo() {
    // start video
    vid.play();
    // start tracking
    ctrack.start(vid);
    trackingStarted = true;
    // start loop to draw face
    drawLoop();
}
function drawLoop() {
    requestAnimationFrame(drawLoop);
    overlayCC.clearRect(0, 0, vid_width, vid_height);
    //psrElement.innerHTML = "score :" + ctrack.getScore().toFixed(4);
    if (ctrack.getCurrentPosition()) {
        ctrack.draw(overlay);
    }
}
/*********** Code for stats **********/
stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
document.getElementById('container').appendChild(stats.domElement);
// update stats on every iteration
document.addEventListener('clmtrackrIteration', function (event) {
    stats.update();
}, false);
/*
var ctracker = new clm.tracker();
ctracker.init();
ctracker.start(videoInput);
function positionLoop() {
    var positions = ctracker.getCurrentPosition() + ctracker.getScore().toFixed(4) + ctracker.getCurrentParameters() + ctracker.getConvergence();
    console.log(positions);
    var newScreenshot = {
        descriptions: positions,
        url: "test",
        VideoStreamId: 1
    };

    $.post("/screenshots/new", newScreenshot, function () {
    });

    // positions = [[x_0, y_0], [x_1,y_1], ... ]
    // do something with the positions ...
}
setInterval(positionLoop, 1000);
*/