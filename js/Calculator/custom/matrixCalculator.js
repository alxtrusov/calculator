function MatrixCalculator() {

    BaseCalculator.call(this);

    this.add = function (a, b) {
        var calc = new Calculator();
        var c = new Matrix();
        for (var i = 0; i < a.arr.length; i++) {
            c.arr.push([]);
            for (var j = 0; j < a.arr[i].length; j++) {
                c.arr[i][j] = calc.add(a.arr[i][j], b.arr[i][j]);
            }
        }
        return c;
    };
    this.sub = function (a, b) {
        var calc = new Calculator();
        var c = new Matrix();
        for (var i = 0; i < a.arr.length; i++) {
            c.arr.push([]);
            for (var j = 0; j < a.arr[i].length; j++) {
                c.arr[i][j] = calc.sub(a.arr[i][j], b.arr[i][j]);
            }
        }
        return c;
    };
    this.mult = function (a, b) {
        var c = new Matrix();
        var calc = new Calculator();
        for (var i = 0; i < a.arr.length; i++) {
            c.arr.push([]);
            for (var j = 0; j < a.arr[i].length; j++) {
                var s = calc.zero(a.arr[i][j]);
                for (var k = 0; k < a.arr[i].length; k++) {
                    s = calc.add(s, calc.mult(a.arr[k][i], b.arr[j][k]));
                }
                c.arr[i][j] = s;
            }
        }
        return c;
    };
    this.scal = function (a, scal) {
        var c = new Matrix();
        for (var i = 0; i < a.arr.length; i++) {
            c.arr.push([]);
            for (var j = 0; j < a.arr[i].length; j++) {
                c.arr[i][j] = a.arr[i][j] * scal;
            }
        }
        return c;
    };
    this.zero = function (a) {
        var calc = new Calculator();
        var c = new Matrix();
        c.size = a.size;
        for (var i = 0; i < a.size; i++) {
            for (var j = 0; j < a.size; j++) {
                c.arr[i][j] = calc.zero(a.arr[i][j]);
            }
        }
        return c;
    };
    this.one = function (a) {
        var calc = new Calculator();
        var c = this.zero(a);
        for (var i = 0; i < c.size; i++) {
                c.arr[i][i] = calc.one(a);
        }
        return c;
    };
}
