class MatrixCalculator extends RealCalculator {
    add(a, b) {
        const calc = this.get(a.values[0][0]);
        return new Matrix(a.values.map((arr, i) => arr.map((elem, j) => calc.add(elem, b.values[i][j]))));
    }

    sub(a, b) {
        const calc = this.get(a.values[0][0]);
        return new Matrix(a.values.map((arr, i) => arr.map((elem, j) => calc.sub(elem, b.values[i][j]))));
    }

    mult(a, b) {
        const calc = this.get(a.values[0][0]);
        const values = [];
        for (let i = 0; i < a.values.length; i++) {
            values.push([]);
            for (let j = 0; j < a.values[i].length; j++) {
                let s = calc.zero(null, a.values[0][0]);
                for (let k = 0; k < a.values[i].length; k++) {
                    s = calc.add(s, calc.mult(a.values[k][i], b.values[j][k]));
                }
                values[i][j] = s;
            }
        }
        return new Matrix(values);
    }

    prod(p, a) {
        const calc = this.get(a.values[0][0]);
        return new Matrix(a.values.map(arr => arr.map(elem => calc.prod(elem, p))));
    }

    pow(a, n) {
        let c = new Matrix(a.values);
        for (let i = 1; i < n; i++) {
            c = this.mult(a, c);
        }
        return c;
    }

    one(length, elem) {
        const calc = this.get(elem);
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = i === j ? this.type(calc, elem, 'one') : this.type(calc, elem, 'zero');
            }
        }
        return new Matrix(values);
    }

    zero(length, elem) {
        const calc = this.get(elem);
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = this.type(calc, elem, 'zero');
            }
        }
        return new Matrix(values);
    }

    /* unused methods */
    module() { return null; }
    div() { return null; }
}