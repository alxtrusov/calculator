/*function setHeightCss() {
    var element = document.getElementsByClassName('matrix-css')[0];
    var elemStyle = window.getComputedStyle(element);
    console.log(elemStyle.height);
    var length = document.getElementsByClassName('brace-css').length;
    for (var i = 0; i < length; i++) {
        document.getElementsByClassName('brace-css')[i].setAttribute('style', 'font-size:' + elemStyle.height);
    };
};
function printMatrix(matrix, parentId) {
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            document.getElementById(parentId + i + j).value = matrix[i][j];
        }    
    }
};

function genElem(parentId, i, j) {
    var elem = document.createElement('input');
    elem.setAttribute('id', parentId + i + j);
    elem.setAttribute('type', 'text');
    elem.setAttribute('style', 'width:25px;');
    elem.setAttribute('class', 'cell');
    elem.setAttribute('value', '0');
    return elem;
};

function getMatrix(size,parentId) {
    var result = [];
    for (var i = 0; i < size; i++) {
        result.push([]);
        for (var j = 0; j < size; j++) {
            result[i][j] = document.getElementById(parentId + i + j).value - 0;
        }
    }
    return result;
} 

function genMatrix(size, parentId) {
    var parent = document.getElementById(parentId);
    parent.innerHTML = '';
    for (var i = 0; i < size; i ++) {
        for (var j = 0; j < size; j ++) {
            parent.appendChild(genElem(parentId, i, j));
            parent.innerHTML += (j == (size - 1)) ? '' : ', ';
        }
        parent.appendChild(document.createElement('br'));
    }
};

function genAllMatrix(size) {
    genMatrix(size, 'matrix-a');
    genMatrix(size, 'matrix-b');
    genMatrix(size, 'matrix-c');
};*/

window.onload = function () {

    new Application();

    /*var SIZE = 1;
    var mcalc = new MatrixCalculator();

    document.getElementById('size-plus').onclick = function () {
        SIZE++;
        genAllMatrix(SIZE);
        setHeightCss();
    };
    document.getElementById('size-minus').onclick = function () {
        SIZE = (SIZE >= 2) ? SIZE - 1 : 1;
        genAllMatrix(SIZE);
        setHeightCss();
    };
    var buttons = document.getElementsByClassName('operand');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            var operand = this.getAttribute('data-value');
            if (operand === 'scal') {
                var scal = document.getElementById('scal').value - 0;
                var a = getMatrix(SIZE, 'matrix-a');
                printMatrix(mcalc[operand](a,scal), 'matrix-c');
            } else {
                var a = getMatrix(SIZE, 'matrix-a');
                var b = getMatrix(SIZE, 'matrix-b');
                printMatrix(mcalc[operand](a, b), 'matrix-c');
            }
        };
    }

    genAllMatrix(SIZE);*/
};