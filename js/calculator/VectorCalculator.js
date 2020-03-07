class VectorCalculator extends RealCalculator {
    add(a, b) {
        return new Vector(a.values.map((elem, i) => elem + b.values[i]));
    }

    sub(a, b) {
        return new Vector(a.values.map((elem, i) => elem - b.values[i]));
    }

    // векторное произведение
    mult(a, b) {
        return new Vector([
            a.values[1] * b.values[2] - a.values[2] * b.values[1],
            a.values[2] * b.values[0] - a.values[0] * b.values[2],
            a.values[0] * b.values[1] - a.values[1] * b.values[0]
        ]);
    }

    prod(p, a) {
        return new Vector(a.values.map(elem => elem * p));
    }

    pow(a, n) {
        let c = this.one(a.values.length);
        for (let i = 0; i < n; i++) {
            c = this.mult(a, c);
        }
        return c;        
    }

    one(length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push(1);
        }
        return new Vector(values);
    }

    zero(length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push(0);
        }
        return new Vector(values);
    }

    /* unused methods */
    module(a) {
        return Math.sqrt(a.values.reduce((S, elem) => S + Math.pow(elem, 2), 0));
    }
    div() { return null; }
}