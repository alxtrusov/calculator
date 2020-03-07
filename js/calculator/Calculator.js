function Calculator() {
    BaseCalculator.call(this);

    function getCalculator(a) {
        if (a instanceof Vector) {
            return new VectorCalculator();
        } else if (a instanceof Matrix) {
            return new MatrixCalculator();
        } else if (a instanceof Complex) {
            return new ComplexCalculator();
        }
        return new BaseCalculator();
    };

    this.add = function (a, b) {
        return getCalculator(a).add(a, b);
    };
    this.sub = function (a, b) {
        return getCalculator(a).sub(a, b);
    };
    this.mult = function (a, b) {
        return getCalculator(a).mult(a, b);
    };
    this.div = function (a, b) {
        return getCalculator(a).div(a, b);
    };
    this.scal = function (a, scal) {
        return getCalculator(a).scal(a, scal);
    };
    this.module = function (a) {
        return getCalculator(a).module(a);
    }

    this.zero = function (a) { return getCalculator(a).zero(); };
    this.one  = function (a) { return getCalculator(a).one();  };
};

 