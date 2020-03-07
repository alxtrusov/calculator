class ComplexCalculator {

    add(a, b) {
        return new Complex(a.re + b.re, a.im + b.im);
    }

    sub(a, b) {
        return new Complex(a.re - b.re, a.im - b.im);
    }

    mult(a, b) {
        return new Complex(
            a.re * b.re - a.im * b.im, 
            a.re * b.im + a.im * b.re
        );
    }

    pow(x, n) {
        if (n === 0) {
            return this.one();
        }
        if (n === 1) {
            return x;
        }
        let S = this.one();
        for (let i = 0; i < n; i++) {
            S = this.mult(S, x);
        }
        return S;
    }

    // умножить на вещественное число
    multP(a, p) {
        return new Complex(a.re * p, a.im * p);
    }

    equal(a, b) {
        return a.re === b.re && a.im === b.im;
    }

    zero() {
        return new Complex();
    }

    one() {
        return new Complex(1);
    }
}