
var lissajous = document.getElementById("lissajous");



function initScreen() {

    let lissajous = document.getElementById("lissajous");


    // lissajous.setAttribute("d", draw(0.0));
    // updateWithTransform(0.0 + 0.01);

    updateScreen(0.0);

}

function updateScreen(phase) {

    drawCmd = draw(phase);

    lissajous.setAttribute("d", drawCmd);

    requestAnimationFrame(function () {
        updateScreen(phase + 0.01);
    });
}


// transform matrix
function updateWithTransform(phase) {

    let d = 1 / Math.sin(phase);

    let matrix = "matrix(0 " + d + " 0 0 " + d + " 0)";

    lissajous.setAttribute("transform", matrix);


    requestAnimationFrame(function () {
        updateWithTransform(phase + 0.01);
    });

}


function draw(phase) {

    const size = 90;
    const freq = 4;
    // const phase = Math.PI / 2;
    const delta = 0.01;

    let drawCmd = "";

    let t = 0.0;
    for (t = 0.0; t <= Math.PI * 4; t += delta) {

        let x = Math.sin(t);
        let y = Math.sin(t * freq + phase);

        // real position
        let rx = size + (size * x + 0.5);
        let ry = size + (size * y + 0.5);

        if (t - 0.0 < 0.000000001) {
            // init 
            drawCmd = "M " + rx + ' ' + ry;
        } else {
            drawCmd += ' ' + 'L ' + rx + ' ' + ry;
        }

    }

    // drawCmd += ' Z';
    return drawCmd;
}


initScreen();