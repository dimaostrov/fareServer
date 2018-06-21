var count = 0;
var videoInput = document.getElementById('inputVideo');
var interval = setInterval(positionLoop, 1000);
var ctracker = new clm.tracker();
var face_count = 0;
ctracker.init();
ctracker.start(videoInput);
function positionLoop() {
    var positions = ctracker.getCurrentPosition() + ctracker.getScore().toFixed(4) + ctracker.getCurrentParameters() + ctracker.getConvergence();
    face_score = parseFloat(ctracker.getScore().toFixed(4))
    if (face_score > 0.5 && ctracker.getCurrentPosition()) {
        this.face_count += 1;
        console.log(positions);
        var newScreenshot = {
            descriptions: positions,
            url: "test",
            VideoStreamId: 1
        };

        $.post("/screenshots/new", newScreenshot, function () {
        });
        count++;
        if (count > 30) { 
            clearInterval(interval); 
            console.log(face_count);
        }
        // positions = [[x_0, y_0], [x_1,y_1], ... ]
        // do something with the positions ...
    }
}
