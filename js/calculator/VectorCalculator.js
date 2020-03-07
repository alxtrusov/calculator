class VectorCalculator extends RealCalculator {
    add(a, b) {
        const calc = this.get(a.values[0]);
        return new Vector(a.values.map((elem, i) => calc.add(elem, b.values[i])));
    }

    sub(a, b) {
        const calc = this.get(a.values[0]);
        return new Vector(a.values.map((elem, i) => calc.sub(elem, b.values[i])));
    }

    // векторное произведение
    mult(a, b) {
        const calc = this.get(a.values[0]);
        return new Vector([
            calc.sub(calc.mult(a.values[1], b.values[2]), calc.mult(a.values[2], b.values[1])),
            calc.sub(calc.mult(a.values[2], b.values[0]), calc.mult(a.values[0], b.values[2])),
            calc.sub(calc.mult(a.values[0], b.values[1]), calc.mult(a.values[1], b.values[0]))
        ]);
    }

    prod(p, a) {
        const calc = this.get(a.values[0]);
        return new Vector(a.values.map(elem => calc.prod(p, elem)));
    }

    pow(a, n) {
        let c = new Vector(a.values);
        for (let i = 1; i < n; i++) {
            c = this.mult(c, a);
        }
        return c;
    }

    one(length, elem) {
        const calc = this.get(elem);
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push(this.type(calc, elem, 'one'));
        }
        return new Vector(values);
    }

    zero(length, elem) {
        const calc = this.get(elem);
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push(this.type(calc, elem, 'zero'));
        }
        return new Vector(values);
    }

    /* unused methods */
    module(a) {
        return Math.sqrt(a.values.reduce((S, elem) => S + Math.pow(elem, 2), 0));
    }
    div() { return null; }
}