var componentToHex = function (val) {
    var a = Number(val).toString(16);
    return a.length === 1 ? "0" + a : a;
};
var rgbtohex = function (rgb) {
    return '#' + rgb
        .match(/\d+/g)
        .map(componentToHex)
        .join('');
};
var page = document.createElement('table');
page.style.width = '100%';
var tr = document.createElement('tr');
var piccol = document.createElement('td');
var restcol = document.createElement('td');
piccol.style.width = '810px';
piccol.style.height = '810px';
var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('width', '800');
svg.setAttribute('height', '800');
svg.style.border = '1px solid black';
svg.id = 'svg';
piccol.appendChild(svg);
var label = document.createElement('label');
label.textContent = 'Color: ';
label.htmlFor = 'colorinput';
restcol.appendChild(label);
var colorinput = document.createElement('input');
colorinput.setAttribute('type', 'color');
colorinput.id = 'colorinput';
colorinput.value = '#000000';
restcol.appendChild(colorinput);
restcol.appendChild(document.createElement('br'));
var inputs = [];
for (var i = 0; i < 4; i++) {
    var curid = void 0;
    if (i % 2 == 0) {
        curid = 'x' + (i / 2 + 1);
    }
    else {
        curid = 'y' + ((i - 1) / 2 + 1);
    }
    var label_1 = document.createElement('label');
    label_1.textContent = curid + ': ';
    label_1.htmlFor = curid;
    var xinput = document.createElement('input');
    xinput.setAttribute('type', 'number');
    xinput.setAttribute('min', '0');
    xinput.setAttribute('max', '800');
    xinput.setAttribute('id', curid);
    inputs.push(xinput);
    restcol.appendChild(label_1);
    restcol.appendChild(xinput);
    restcol.appendChild(document.createElement('br'));
}
var addbutton = document.createElement('button');
addbutton.textContent = 'Add';
restcol.appendChild(addbutton);
restcol.appendChild(document.createElement('br'));
restcol.appendChild(document.createElement('br'));
label = document.createElement('label');
label.textContent = 'Color: ';
label.htmlFor = 'colordel';
restcol.appendChild(label);
var colordel = document.createElement('input');
colordel.setAttribute('type', 'color');
colordel.id = 'colordel';
colordel.disabled = true;
colordel.value = '#ffffff';
restcol.appendChild(colordel);
restcol.appendChild(document.createElement('br'));
var delparams = [];
for (var i = 0; i < 4; i++) {
    var curid = void 0;
    if (i % 2 == 0) {
        curid = 'x' + (i / 2 + 1);
    }
    else {
        curid = 'y' + ((i - 1) / 2 + 1);
    }
    var label_2 = document.createElement('label');
    label_2.textContent = curid + ': ';
    label_2.htmlFor = curid;
    var xinput = document.createElement('input');
    xinput.setAttribute('type', 'number');
    xinput.setAttribute('min', '0');
    xinput.setAttribute('max', '800');
    xinput.setAttribute('id', curid);
    xinput.disabled = true;
    delparams.push(xinput);
    restcol.appendChild(label_2);
    restcol.appendChild(xinput);
    restcol.appendChild(document.createElement('br'));
}
var delbutton = document.createElement('button');
delbutton.textContent = 'Delete';
restcol.appendChild(delbutton);
addbutton.onclick = addrect;
delbutton.onclick = function () {
    if (todel != null) {
        svg.removeChild(todel);
        todel = null;
        for (var i = 0; i < 4; i++) {
            delparams[i].value = '';
        }
        colordel.value = '#ffffff';
    }
};
var todel = null;
function rectclick(clicked) {
    delparams[0].value = clicked.getAttribute('x') || '';
    delparams[1].value = clicked.getAttribute('y') || '';
    delparams[2].value = (parseInt(clicked.getAttribute('x') || '') + parseInt(clicked.getAttribute('width') || '')).toString();
    delparams[3].value = (parseInt(clicked.getAttribute('y') || '') + parseInt(clicked.getAttribute('height') || '')).toString();
    colordel.value = rgbtohex(clicked.style.fill);
    todel = clicked;
}
function addrect() {
    if (!(inputs[0].value === '' || inputs[1].value === '' || inputs[2].value === '' || inputs[3].value === '')) {
        var x1_1 = parseInt(inputs[0].value);
        var y1_1 = parseInt(inputs[1].value);
        var x2_1 = parseInt(inputs[2].value);
        var y2_1 = parseInt(inputs[3].value);
        var rect_1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect_1.setAttribute('x', x1_1.toString());
        rect_1.setAttribute('y', y1_1.toString());
        rect_1.setAttribute('width', (x2_1 - x1_1).toString());
        rect_1.setAttribute('height', (y2_1 - y1_1).toString());
        rect_1.style.fill = colorinput.value;
        rect_1.onclick = function () { return rectclick(rect_1); };
        svg.appendChild(rect_1);
        for (var i = 0; i < 4; i++) {
            inputs[i].value = '';
        }
    }
}
var x1 = -1, y1 = -1, x2 = -1, y2 = -1;
function handleMouseDown(e) {
    x1 = e.clientX;
    y1 = e.clientY;
}
var temprect = null;
function handleMouseUp(e) {
    x2 = e.clientX;
    y2 = e.clientY;
    if (x1 == -1 || y1 == -1 || x2 == -1 || y2 == -1) {
        return;
    }
    var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', Math.min(x1, x2).toString());
    rect.setAttribute('y', Math.min(y1, y2).toString());
    rect.setAttribute('width', Math.abs(x2 - x1).toString());
    rect.setAttribute('height', Math.abs(y2 - y1).toString());
    rect.style.fill = '#ffffff';
    rect.style.strokeWidth = '1';
    rect.style.stroke = 'black';
    svg.appendChild(rect);
    temprect = rect;
    if (x1 > x2) {
        var temp = x1;
        x1 = x2;
        x2 = temp;
    }
    if (y1 > y2) {
        var temp = y1;
        y1 = y2;
        y2 = temp;
    }
    inputs[0].value = x1.toString();
    inputs[1].value = y1.toString();
    inputs[2].value = x2.toString();
    inputs[3].value = y2.toString();
    x1 = x2 = y1 = y2 = -1;
}
function deltemprect() {
    if (temprect != null) {
        svg.removeChild(temprect);
    }
    temprect = null;
}
;
document.addEventListener('mousedown', function () { x1 = x2 = y1 = y2 = -1; }, true);
svg.addEventListener('mousedown', handleMouseDown, true);
svg.addEventListener('mousedown', deltemprect, true);
svg.addEventListener('mouseup', handleMouseUp);
addbutton.addEventListener('click', deltemprect);
tr.appendChild(piccol);
tr.appendChild(restcol);
page.appendChild(tr);
document.body.appendChild(page);
