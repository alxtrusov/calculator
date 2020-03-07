function BaseCalculator() {

//Public methods
    this.add = function (a, b) {return a + b;};
    this.sub = function (a, b) {return a - b;};
    this.mult = function (a, b) {return a * b;};
    this.div = function (a, b) { return b ? a / b : this.zero(); };
    this.module = function (a) { return Math.sqrt(this.mult(a, a)); };
    this.scal = function (a, scal) { return this.mult(a, scal); };

    this.zero = function () { return 0; };
    this.one = function () { return 1; };
};