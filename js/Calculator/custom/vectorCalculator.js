function VectorCalculator() {
    
    BaseCalculator.call(this);

    this.add = function (a, b) {
        var calc = new Calculator();
        var c = new Vector();
        for (var i = 0; i < a.arr.length; i++) {
            c.arr[i] = calc.add(a.arr[i], b.arr[i]);
        }
        return c;
    };

    this.sub = function (a, b) {
        var calc = new Calculator();
        var c = new Vector();
        for (var i = 0; i < a.arr.length; i++) {
            c.arr[i] = calc.sub(a.arr[i], b.arr[i]);
        }
        return c;
    };

     this.scal = function (a, scal) {
        var calc = new Calculator();
        var c = new Vector();
         for (var i = 0; i < a.arr.length; i++) {
            c.arr[i] = calc.mult(scal, a.arr[i]); 
        }
        return c;
    };

    this.mult = function (a, b) {
        if (a.arr.length == 3) {
            var calc = new Calculator();
            var c = new Vector();
            c.arr[0] = calc.sub(
                calc.mult(a.arr[1], b.arr[2]),
                calc.mult(a.arr[2], b.arr[1])
            );

            c.arr[1] = calc.sub(
                calc.mult(a.arr[2], b.arr[0]),
                calc.mult(a.arr[0], b.arr[2])
            );

            c.arr[2] = calc.sub(
                calc.mult(a.arr[0], b.arr[1]),
                calc.mult(a.arr[1], b.arr[0])
            );
            return c;
        }
        return null;
    };

    this.module = function (a) { };
}