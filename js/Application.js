function Application() {
    var root;
    var control;
    var info;
    var calculator;

    var calc = new Calculator();

    var TYPE = {
        FLOAT: 'Float',
        COMPLEX: 'Complex',
        VECTOR: 'Vector',
        MATRIX: 'Matrix'
    };

    var elemStruct = [{ type: TYPE.FLOAT }];

    function addComplex() {
        if (elemStruct[elemStruct.length - 1].type === TYPE.FLOAT) {
            elemStruct[elemStruct.length - 1].type = TYPE.COMPLEX;
        }
        fillInfo(); // перерисовать инфопанель
        // сгенерировать калькулятор
        fillCalculator();
    }

    function addMatrix() {
        elemStruct[elemStruct.length - 1].type = TYPE.MATRIX;
        elemStruct[elemStruct.length - 1].size = 2;
        elemStruct.push({ type: TYPE.FLOAT });
        fillInfo(); // перерисовать инфопанель
        // сгенерировать калькулятор
        fillCalculator();
    }

    function addVector() {
        elemStruct[elemStruct.length - 1].type = TYPE.VECTOR;
        elemStruct[elemStruct.length - 1].size = 2;
        elemStruct.push({ type: TYPE.FLOAT });
        fillInfo(); // перерисовать инфопанель
        // сгенерировать калькулятор
        fillCalculator();
    }

    function changeSize(val, type) {
        if (elemStruct.length >= 2) {
            var size = 1;
            for (var i = elemStruct.length - 2; i >= 0; i--) {
                if (elemStruct[i].type === type) {
                    size = elemStruct[i].size;
                    size += val;
                    size = (size < 1) ? 1 : size;
                    elemStruct[i].size = size;
                    break;
                }
            }
            // сгенерировать калькулятор
            fillCalculator();
        }
    }

    function checkTypes(type) {
        for (var i = 0; i < elemStruct.length; i++) {
            if (elemStruct[i].type === type) {
                return true;
            }
        }
        return false;
    }

    function checkForMultVectors() {
        for (var i = 0; i < elemStruct.length; i++) {
            if (elemStruct[i].type === TYPE.VECTOR) {
                if (elemStruct[i].size !== 3) {
                    return false;
                }
            }
        }
        return true;
    }


    function setHeightCss() {   //изменение размера скобок у матриц и векторов
        var braces = null;
        var matrix = document.getElementsByClassName('Matrix');
        var vector = document.getElementsByClassName('Vector');
        var height = 0;
        for (var i = 0; i < matrix.length; i++) {
            height = matrix[i].getElementsByClassName('Matrix_inner')[0].offsetHeight;//InnerStyle.height;
            braces = matrix[i].getElementsByClassName('Brace');
            height += height*0.1;//увеличить на 10%
            for (var j = 0; j < braces.length; j++) {
                braces[j].setAttribute('style', 'font-size:' + height + 'px;');
            }
        }
        for (var i = 0; i < vector.length; i++) {
            height = vector[i].getElementsByClassName('Vector_inner')[0].offsetHeight;//InnerStyle.height;
            braces = vector[i].getElementsByClassName('Brace');
            for (var j = 0; j < braces.length; j++) {
                braces[j].setAttribute('style', 'font-size:' + height + 'px;');
            }
        }
        document.getElementsByClassName('Equal')[0].setAttribute('style', 'font-size:' + height + 'px;');
    };
    
    function addSizeMatr() { changeSize( 1, TYPE.MATRIX); }
    function subSizeMatr() { changeSize(-1, TYPE.MATRIX); }
    function addSizeVect() { changeSize( 1, TYPE.VECTOR); }
    function subSizeVect() { changeSize(-1, TYPE.VECTOR); }

    function createBr() {
        return document.createElement('br');
    }

    function createDiv(cls) {
        var div = document.createElement('div');
        if (cls) {
            div.setAttribute('class', cls);
        }
        return div;
    }

    function createSpan(text, cls) {
        var span = document.createElement('span');
            span.setAttribute('class', cls);
            span.innerHTML = text;
        return span;
    }

    function createButton(text, cb, cls) {
        var button = document.createElement('input');
            button.setAttribute('type', 'button');
            button.setAttribute('value', text);
            if (cls) {
                button.setAttribute('class', cls);
            }
            button.onclick = cb;
        return button;
    }

    function createInput(text, cls, id) {
        var input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('value', text);
        if (cls) input.setAttribute('class', cls);
        if (id) input.setAttribute('id', id);
        return input;
    }

    function getString (node) {
        var DIV = document.createElement("div");
        if ('outerHTML' in DIV) {
            return node.outerHTML;
        }
        var div = DIV.cloneNode();
        div.appendChild(node.cloneNode(true));
        return div.innerHTML;
    }

    function genElem(num, elemStruct, elem, idPrefix) {
        if (num < 0) {
            return elem;
        }
        switch (elemStruct[num].type) {
            case TYPE.FLOAT:
                var div = createDiv('Float');
                    div.appendChild(createInput(calc.zero(), idPrefix));
                return genElem(--num, elemStruct, getString(div));
            break;
            case TYPE.COMPLEX:
                var div = createDiv('Complex');
                div.appendChild(createInput(calc.zero(), idPrefix));
                div.appendChild(createSpan('+i*'));
                div.appendChild(createInput(calc.zero(), idPrefix));
                return genElem(--num, elemStruct, getString(div));
            case TYPE.MATRIX:
                var div = createDiv('Matrix');
                var div_left = createDiv('Brace_left Brace');
                var div_right = createDiv('Brace_right Brace');
                var div_matrix = createDiv('Matrix_inner');
                div_left.appendChild(createSpan('('));
                div.appendChild(div_left);
                var matrix = elemStruct[num];
                for (var i = 0; i < matrix.size; i++) {
                    for (var j = 0; j < matrix.size; j++) {
                        div_matrix.innerHTML += elem;
                        if (j !== matrix.size - 1) {
                            div_matrix.appendChild(createSpan(',', 'Float-left'));
                        }
                    }
                    if (i !== matrix.size - 1) { //не ставить br в конце матрицы
                        div_matrix.appendChild(createBr());
                    }
                }
                div.appendChild(div_matrix);
                div_right.appendChild(createSpan(')'));
                div.appendChild(div_right);
                return genElem(--num, elemStruct, getString(div));
            case TYPE.VECTOR:
                var div = createDiv('Vector');
                var div_left = createDiv('Brace_left Brace');
                var div_right = createDiv('Brace_right Brace');
                var div_vector = createDiv('Vector_inner');
                div_left.appendChild(createSpan('('));
                div.appendChild(div_left);
                var vector = elemStruct[num];
                for (var i = 0; i < vector.size; i++) {
                    div_vector.innerHTML += elem;
                    if (i !== vector.size - 1) {
                        div_vector.appendChild(createSpan(',', 'Float-left'));
                    }
                }
                div.appendChild(div_vector);
                div_right.appendChild(createSpan(')'));
                div.appendChild(div_right);
                return genElem(--num, elemStruct, getString(div));
        }
    }

    function getElem(num) {
        var elem = null;
        if (window[elemStruct[num].type] instanceof Function) {
            elem = new window[elemStruct[num].type]();
            switch (elemStruct[num].type) {
                case TYPE.COMPLEX:
                    return elem;
                case TYPE.MATRIX:
                    var nextNum = num + 1;
                    elem.size = elemStruct[num].size;
                    for (var i = 0; i < elemStruct[num].size; i++) {
                        elem.arr.push([]);
                        for (var j = 0; j < elemStruct[num].size; j++) {
                            elem.arr[elem.arr.length - 1].push(getElem(nextNum));
                        }
                    }
                    return elem;
                case TYPE.VECTOR:
                    var nextNum = num + 1;
                    elem.size = elemStruct[num].size;
                    for (var i = 0; i < elemStruct[num].size; i++) {
                        elem.arr.push(getElem(nextNum));
                    }
                    return elem;
            }
        } else {
            return calc.zero();
        }
    }

    function isFloat(elem) {
        return !(elem instanceof Complex ||
                 elem instanceof Vector  ||
                 elem instanceof Matrix);
    }

    var curPos = 0;
    function fillElem(elem, DOMElems) {
        if (elem instanceof Complex) {
            elem.re = DOMElems[curPos].value - 0;
            curPos += 1;
            elem.im = DOMElems[curPos].value - 0;
            curPos += 1;
        } else if (elem instanceof Vector) {
            for (var i = 0; i < elem.arr.length; i++) {
                if (isFloat(elem.arr[i])) {
                    elem.arr[i] = DOMElems[curPos].value - 0;
                    curPos++;
                } else {
                    fillElem(elem.arr[i], DOMElems);
                }
            }
        } else if (elem instanceof Matrix) {
            for (var i = 0; i < elem.arr.length; i++) {
                for (var j = 0; j < elem.arr[i].length; j++) {
                    if (isFloat(elem.arr[i][j])) {
                        elem.arr[i][j] = DOMElems[curPos].value - 0;
                        curPos++;
                    } else {
                        fillElem(elem.arr[i][j], DOMElems);
                    }
                }
            }
        }
    }

    function printElem(elem, DOMElems) {
        if (elem instanceof Complex) {
            DOMElems[curPos].value = elem.re;
            curPos += 1;
            DOMElems[curPos].value = elem.im;
            curPos += 1;
        } else if (elem instanceof Vector) {
            for (var i = 0; i < elem.arr.length; i++) {
                printElem(elem.arr[i], DOMElems);
            }
        } else if (elem instanceof Matrix) {
            for (var i = 0; i < elem.arr.length; i++) {
                for (var j = 0; j < elem.arr[i].length; j++) {
                    printElem(elem.arr[i][j], DOMElems);
                }
            }
        } else {
            DOMElems[curPos].value = elem;
            curPos++;
        }
    }

    function fillControl() {
        // добавить элементом матрицу
        control.appendChild(createButton('+ Матрица', addMatrix, 'button'));
        control.appendChild(createButton('-', subSizeMatr));
        control.appendChild(createButton('+', addSizeMatr));
        control.appendChild(createBr()); // перенос строки
        // добавить элементом вектор
        control.appendChild(createButton('+ Вектор', addVector, 'button'));
        control.appendChild(createButton('-', subSizeVect));
        control.appendChild(createButton('+', addSizeVect));
        control.appendChild(createBr()); // перенос строки
        // добавить элементом комплексное число
        control.appendChild(createButton('+ Комплексное число', addComplex, 'button'));
    }

    function fillInfo() {
        info.innerHTML = '';
        elemStruct.forEach(function(elem, key) {
            var div = createDiv('elements');
            switch (elem.type) {
                case TYPE.FLOAT  : div.appendChild(createSpan('Вещественное число')); break;
                case TYPE.COMPLEX: div.appendChild(createSpan('Комплексное число')); break;
                case TYPE.MATRIX: 
                    div.appendChild(createSpan('Матрица'));
                    div.appendChild(createBr());
                    div.appendChild(createButton('Удалить', function() {
                        elemStruct.splice(key, elemStruct.length);
                        elemStruct.push({ type: TYPE.FLOAT });
                        fillInfo();
                        fillCalculator();
                    }));
                break;
                case TYPE.VECTOR: 
                    div.appendChild(createSpan('Вектор'));
                    div.appendChild(createBr());
                    div.appendChild(createButton('Удалить', function() {
                        elemStruct.splice(key, elemStruct.length);
                        elemStruct.push({ type: TYPE.FLOAT });
                        fillInfo();
                        fillCalculator();
                    }));
                break;
            }
            info.appendChild(div);
        });
    }

    function sub() {
        var a = getElem(0);
        curPos = 0;
        if (isFloat(a)) {
            a = document.getElementsByClassName('a')[curPos].value - 0;
        } else {
            fillElem(a, document.getElementsByClassName('a'));
        }
        curPos = 0;
        var b = getElem(0);
        if (isFloat(b)) {
            b = document.getElementsByClassName('b')[curPos].value - 0;
        } else {
            fillElem(b, document.getElementsByClassName('b'));
        }
        var c = calc.sub(a, b);
        curPos = 0;
        printElem(c, document.getElementsByClassName('c'))
    }

    function add() {
        var a = getElem(0);
        curPos = 0;
        if (isFloat(a)) {
            a = document.getElementsByClassName('a')[curPos].value - 0;
        } else {
            fillElem(a, document.getElementsByClassName('a'));
        }
        curPos = 0;
        var b = getElem(0);
        if (isFloat(b)) {
            b = document.getElementsByClassName('b')[curPos].value - 0;
        } else {
            fillElem(b, document.getElementsByClassName('b'));
        }
        var c = calc.add(a, b);
        curPos = 0;
        printElem(c, document.getElementsByClassName('c'))
    }

    function mult() {
        var a = getElem(0);
        curPos = 0;
        if (isFloat(a)) {
            a = document.getElementsByClassName('a')[curPos].value - 0;
        } else {
            fillElem(a, document.getElementsByClassName('a'));
        }
        curPos = 0;
        var b = getElem(0);
        if (isFloat(b)) {
            b = document.getElementsByClassName('b')[curPos].value - 0;
        } else {
            fillElem(b, document.getElementsByClassName('b'));
        }
        var c = calc.mult(a, b);
        curPos = 0;
        printElem(c, document.getElementsByClassName('c'))
    }

    function division() {
        var a = getElem(0);
        curPos = 0;
        if (isFloat(a)) {
            a = document.getElementsByClassName('a')[curPos].value - 0;
        } else {
            fillElem(a, document.getElementsByClassName('a'));
        }
        curPos = 0;
        var b = getElem(0);
        if (isFloat(b)) {
            b = document.getElementsByClassName('b')[curPos].value - 0;
        } else {
            fillElem(b, document.getElementsByClassName('b'));
        }
        var c = calc.div(a, b);
        curPos = 0;
        printElem(c, document.getElementsByClassName('c'))
    }

    function fillButtonsInCalculator() {
        var div = createDiv('buttons');
            div.appendChild(createButton('Сложить', add, 'button'));
            div.appendChild(createBr());
            div.appendChild(createButton('Вычесть', sub, 'button'));
            div.appendChild(createBr());
            if (checkForMultVectors()) {
                div.appendChild(createButton('Умножить', mult, 'button'));
                div.appendChild(createBr());
            }
            if (!checkTypes(TYPE.MATRIX) && !checkTypes(TYPE.VECTOR)) {
                div.appendChild(createButton('Поделить', division, 'button'));
                div.appendChild(createBr());
            }
            calculator.appendChild(div);
    }

    function fillCalculator() {
        var a = genElem(elemStruct.length - 1, elemStruct, null, 'a');
            b = genElem(elemStruct.length - 1, elemStruct, null, 'b');
            c = genElem(elemStruct.length - 1, elemStruct, null, 'c');
        calculator.innerHTML = '';
        calculator.innerHTML += a;
        calculator.innerHTML += b;
        calculator.appendChild(createSpan(' = ', 'Equal Brace'));
        calculator.innerHTML += c;
        fillButtonsInCalculator();
        calculator.appendChild(createInput('0','','pow'));
        setHeightCss();
    }

    function init() {
        root = document.getElementById('application');
        control = createDiv('control');
        info = createDiv('info');
        calculator = createDiv('calculator');
        root.appendChild(info);
        root.appendChild(control);
        root.appendChild(calculator);
        fillInfo();
        fillControl();
        fillCalculator();
    }
    init();
}