let componentToHex = (val : string) => {
    const a = Number(val).toString(16);
    return a.length === 1 ? "0" + a : a;
}
let rgbtohex = (rgb : string) => {
    return '#' + rgb
      .match(/\d+/g)
      .map(componentToHex)
      .join('');
}

let page = document.createElement('table');
page.style.width = '100%';

let tr = document.createElement('tr');
let piccol = document.createElement('td');
let restcol = document.createElement('td');
piccol.style.width = '810px';
piccol.style.height = '810px';

let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('width', '800');
svg.setAttribute('height', '800');
svg.style.border = '1px solid black';
svg.id = 'svg';
piccol.appendChild(svg);

let label = document.createElement('label');
label.textContent = 'Color: ';
label.htmlFor = 'colorinput';
restcol.appendChild(label);
let colorinput = document.createElement('input');
colorinput.setAttribute('type', 'color');
colorinput.id = 'colorinput';
colorinput.value = '#000000';
restcol.appendChild(colorinput);
restcol.appendChild(document.createElement('br'));

let inputs : HTMLInputElement[] = [];
for (let i = 0; i < 4; i++) {
    let curid : string;
    if (i % 2 == 0) {
        curid = 'x' + (i / 2 + 1);
    } else {
        curid = 'y' + ((i-1) / 2 + 1);
    }
    let label = document.createElement('label');
    label.textContent = curid + ': ';
    label.htmlFor = curid;
    let xinput = document.createElement('input');
    xinput.setAttribute('type', 'number');
    xinput.setAttribute('min', '0');
    xinput.setAttribute('max', '800');
    xinput.setAttribute('id', curid);
    inputs.push(xinput);

    restcol.appendChild(label);
    restcol.appendChild(xinput);
    restcol.appendChild(document.createElement('br'));
}
let addbutton = document.createElement('button');
addbutton.textContent = 'Add';
restcol.appendChild(addbutton);
restcol.appendChild(document.createElement('br'));
restcol.appendChild(document.createElement('br'));

label = document.createElement('label');
label.textContent = 'Color: ';
label.htmlFor = 'colordel';
restcol.appendChild(label);
let colordel = document.createElement('input');
colordel.setAttribute('type', 'color');
colordel.id = 'colordel';
colordel.disabled = true;
colordel.value = '#ffffff';
restcol.appendChild(colordel);
restcol.appendChild(document.createElement('br'));
let delparams : HTMLInputElement[] = [];
for (let i = 0; i < 4; i++) {
    let curid : string;
    if (i % 2 == 0) {
        curid = 'x' + (i / 2 + 1);
    } else {
        curid = 'y' + ((i-1) / 2 + 1);
    }
    let label = document.createElement('label');
    label.textContent = curid + ': ';
    label.htmlFor = curid;
    let xinput = document.createElement('input');
    xinput.setAttribute('type', 'number');
    xinput.setAttribute('min', '0');
    xinput.setAttribute('max', '800');
    xinput.setAttribute('id', curid);
    xinput.disabled = true;
    delparams.push(xinput);

    restcol.appendChild(label);
    restcol.appendChild(xinput);
    restcol.appendChild(document.createElement('br'));
}
let delbutton = document.createElement('button');
delbutton.textContent = 'Delete';
restcol.appendChild(delbutton);

addbutton.onclick = addrect;
delbutton.onclick = () => {
    if (todel != null) {
        svg.removeChild(todel);
        todel = null;
        for (let i = 0; i < 4; i++) {
            delparams[i].value = '';
        }
        colordel.value = '#ffffff';
    }
}

let todel : SVGElement | null = null;
function rectclick(clicked : SVGElement) : void {
    delparams[0].value = clicked.getAttribute('x') || '';
    delparams[1].value = clicked.getAttribute('y') || '';
    delparams[2].value = (parseInt(clicked.getAttribute('x') || '') + parseInt(clicked.getAttribute('width') || '')).toString();
    delparams[3].value = (parseInt(clicked.getAttribute('y') || '') + parseInt(clicked.getAttribute('height') || '')).toString();
    colordel.value = rgbtohex(clicked.style.fill);
    todel = clicked;
}

function addrect() {
    if (!(inputs[0].value === '' || inputs[1].value === '' || inputs[2].value === '' || inputs[3].value === '')) {
        let x1 = parseInt(inputs[0].value);
        let y1 = parseInt(inputs[1].value);
        let x2 = parseInt(inputs[2].value);
        let y2 = parseInt(inputs[3].value);
        let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x1.toString());
        rect.setAttribute('y', y1.toString());
        rect.setAttribute('width', (x2 - x1).toString());
        rect.setAttribute('height', (y2 - y1).toString());
        rect.style.fill = colorinput.value;
        rect.onclick = () => rectclick(rect);
        svg.appendChild(rect);
        for (let i = 0; i < 4; i++) {
            inputs[i].value = '';
        }
    }
}

let x1 = -1, y1 = -1, x2 = -1, y2 = -1;
function handleMouseDown(e : MouseEvent) {
    x1 = e.clientX;
    y1 = e.clientY;
}

let temprect : SVGElement | null = null;
function handleMouseUp(e : MouseEvent) {
    x2 = e.clientX;
    y2 = e.clientY;
    if (x1 == -1 || y1 == -1 || x2 == -1 || y2 == -1) {
        return;
    }
    let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
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
        let temp = x1;
        x1 = x2;
        x2 = temp;
    }
    if (y1 > y2) {
        let temp = y1;
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
};
document.addEventListener('mousedown', () => {x1 = x2 = y1 = y2 = -1;}, true);
svg.addEventListener('mousedown', handleMouseDown, true);
svg.addEventListener('mousedown', deltemprect, true);
svg.addEventListener('mouseup', handleMouseUp);
addbutton.addEventListener('click', deltemprect);

tr.appendChild(piccol);
tr.appendChild(restcol);
page.appendChild(tr);
document.body.appendChild(page);


