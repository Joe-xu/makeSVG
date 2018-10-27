
const width = 500;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;

const xyRange = 30.0;
const xyScale = width / 2 / xyRange;    // pixels per x/y unit
const zScale = height * 0.4;    // pixels per z unit
const cellNum = 100;


const angle = Math.PI / 6;
const sinA = Math.sin(angle);
const cosA = Math.cos(angle);

var customFn = '';

var plot = document.getElementById('plot');
var submitBtn = document.getElementById('submitBtn');
var fnInput = document.getElementById('fn');

function initScreen() {

    render();

    submitBtn.onclick = function () {
        customFn = eval(`(
            function(x,y){
                `+
            fnInput.value
            + `
            }
        )`);

        render();
    }

}

function pointStr(x, y) {
    return x + ',' + y + ' ';
}


function render() {

    // clean and reset
    plot.remove();
    plot = document.createElementNS("http://www.w3.org/2000/svg", 'g');
    plot.setAttribute('id', 'plot');
    document.getElementsByTagName('svg')[0].appendChild(plot);

    for (let i = 0; i < cellNum; i++) {
        for (let j = 0; j < cellNum; j++) {

            let [ax, ay] = cellCorner(i + 1, j);
            let [bx, by] = cellCorner(i, j);
            let [cx, cy] = cellCorner(i, j + 1);
            let [dx, dy] = cellCorner(i + 1, j + 1);

            let polygonEle = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
            polygonEle.setAttribute('points',
                pointStr(ax, ay) +
                pointStr(bx, by) +
                pointStr(cx, cy) +
                pointStr(dx, dy)
            )

            plot.appendChild(polygonEle);
        }
    }

}


function cellCorner(i, j) {

    // cell(i,j) corner
    let x = xyRange * (i / cellNum - 0.5);
    let y = xyRange * (j / cellNum - 0.5);

    let z = customFn == '' ? f(x, y) : customFn(x, y);

    // project
    let rx = centerX + (x - y) * cosA * xyScale;
    let ry = centerY + (x + y) * sinA * xyScale - z * zScale;

    // let rx = width / 2 + x * sinA * xyScale;
    // let ry = height / 2 + y * sinA * xyScale - z * zScale;


    if (isNaN(ry)) {
        debugger;
    }

    return [rx, ry];
}

function f(x, y) {
    let r = Math.hypot(x, y);
    if (r == 0) {
        return 1;
    }

    return Math.sin(r) / r;
}


initScreen();