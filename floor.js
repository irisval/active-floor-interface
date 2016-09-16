var canvas, context2D;
var firstTime = true;

function initCanvas(arr) {
    'use strict';

    if (firstTime) {
        setObjects();
        welcomeScreen();

        firstTime = false;
    }
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

    context2D.font = '12px sans-serif';
    context2D.strokeStyle = 'blue';
    context2D.fillText('Start', menBtn.x, menBtn.y);
    context2D.strokeRect(menuBtn.bx, menuBtn.by, menuBtn.bw, menuBtn.bh);


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