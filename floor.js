var canvas, context2D;
var firstTime = true;

function initCanvas(arr) {
    'use strict';

    if (firstTime) {
        welcomeScreen();


        firstTime = false;
    }
}

function welcomeScreen() {
    // 
    'use strict';
    canvas = document.getElementById('floorCanvas');
    canvas.width = ledsX;
    canvas.height = ledsY;
    context2D = canvas.getContext('2d');

    context2D.fillStyle = 'white';
    context2D.font = '24px sans-serif';

    context2d.fillText('WELCOME TO ATCS', ((canvas.width / 2) - (context2d.measureText('WELCOME TO ATCS').width / 2)), 50); 

    menu();
    //menu button 

    // context2D.rect(canvas.width / 2 - (context2D.measureText('Restart').width / 2), canvas.height / 4 + 50, context2D.measureText("Restart").width, 20);
    // context2D.stroke();
    // context2D.fillText("Restart", (canvas.width / 2 - (context2D.measureText('Restart').width / 2)), canvas.height / 4 + 63);

 }


function setObjects(){
    menuBtn = {
        x: (canvas.width / 3) - (context2D.measureText('Load Menu').width / 3),
        y: 160,
        w: context2D.measureText('Load Menu').width,
        h: 15,
        bx: (canvas.width / 3) - (context2D.measureText('Load Menu').width / 3) - 20,
        by: 160 - 15,
        bw: context2D.measureText('Load Menu').width + 40,
        bh: 15 + 5
    };
}


function menu() {
    context2D.font = '12px sans-serif';
    context2D.strokeStyle = 'blue';
    context2D.fillText('Start', startBtn.x, startBtn.y);
    context2D.strokeRect(startBtn.bx, startBtn.by, startBtn.bw, startBtn.bh);
}

function clear(){
    context2D.clearRect(0,0,canvas.width, canvas.height);
}

function refreshXML() {
    'use strict';
    // FIGURE OUT WHICH IP ADDRESS TO PLACE
    $.get('http://', function (data) {
        dataHolderArray = [];
                
        $(data).find('BLFloor').each(function () {
            $item = $(this);
            ledsX = $item.attr('ledsX');
            ledsY = $item.attr('ledsY');
            sensorsX = $item.attr('sensorsX');
            sensorsY = $item.attr('sensorsY');
            ledPerSensorX = (ledsX / sensorsX);
            ledPerSensorY = (ledsY / sensorsY);
            xCenter = ledPerSensorX / 2;
            yCenter = ledPerSensorY / 2;
        });
                
        $(data).find('Row').each(function () {
            var $row, rowNum, rowVal, n;
            $row = $(this);
            rowNum = $row.attr('rownum');
            rowVal = $row.attr('values');
            n = rowVal.split(charDivide).join('');
                
            dataHolderArray.push(n);
        });
    });
}

function startRefresh() {
    'use strict';
    myInterval = setInterval(function () {refreshXML(); }, refreshTime);
}