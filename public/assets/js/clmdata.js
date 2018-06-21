
var videoInput = document.getElementById('inputVideo');

var ctracker = new clm.tracker();
ctracker.init();
ctracker.start(videoInput);

function positionLoop() {
    var positions = ctracker.getScore().toFixed(4)+ctracker.getCurrentPosition()+ctracker.getCurrentParameters()+ctracker.getConvergence();
    console.log(positions);
}
setInterval(positionLoop,1000);