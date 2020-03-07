class RealCalculator {
    add(a, b) {
        return a + b;
    }

    sub(a, b) {
        return a - b;
    }

    mult(a, b) {
        return a * b;
    }

    div(a, b) {
        return a / b;
    }

    prod(p, a) {
        return p * a;
    }

    pow(a, n) {
        return Math.pow(a, n);
    }

    one() {
        return 1;
    }

    zero() {
        return 0;
    }

    /* unused methods */
    module(a) {
        return Math.abs(a);
    }
}