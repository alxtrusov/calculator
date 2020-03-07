function ComplexCalculator() {
    //наследование
    BaseCalculator.call(this);

    this.add = function (a, b) {
        var re = a.re + b.re;
        var im = a.im + b.im;
        return new Complex(re, im);
    };

    this.sub = function (a, b) {
        var re = a.re - b.re;
        var im = a.im - b.im;
        return new Complex(re, im);
    };

    this.mult = function (a, b) {
        a = (a instanceof Complex) ? a : new Complex(a, 0); 
        b = (b instanceof Complex) ? b : new Complex(b, 0);
        var re = a.re * b.re - a.im * b.im;
        var im = a.re * b.im + a.im * b.re;
        return new Complex(re, im);
    };

    this.div = function (a, b) {
        if (b.re || b.im) {
            var re = (a.re * b.re + a.im * b.im) / (b.re * b.re + b.im * b.im);
            var im = (b.re * a.im - a.re * b.im) / (b.re * b.re + b.im * b.im);
            return new Complex(re, im);
        } else {
            console.log('ERROR!!!!!!!!!!!');
            return new Complex();
        }
    };

    this.module = function (a) {
        return Math.sqrt(a.re * a.re + a.im * a.im);
    };

    this.zero = function () { return new Complex() };
    this.one = function () { return new Complex(1) };
};

