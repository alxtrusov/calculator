import Matrix from './types/Matrix';

class MatrixCalculator {
    addBase(a, b) { return a + b; }

    subBase(a, b) { return a - b; }

    multBase(a, b) { return a * b; }

    zeroBase() { return 0; }

    oneBase() { return 1; }

    add(a, b) {
        return new Matrix(a.values.map((arr, i) =>
            arr.map((elem, j) => this.addBase(elem, b.values[i][j])))
        );
    }

    sub(a, b) {
        return new Matrix(a.values.map((arr, i) =>
            arr.map((elem, j) => this.subBase(elem, b.values[i][j])))
        );
    }

    mult(a, b) {
        const c = this.zero(a.values.length, a.values[0][0]);
        for (let i = 0; i < c.values.length; i++) {
            for (let j = 0; j < c.values[i].length; j++) {
                let S = this.zeroBase(a.values.length);
                for (let k = 0; k < a.values.length; k++) {
                    S = this.addBase(
                        S,
                        this.multBase(
                            a.values[i][k],
                            b.values[k][j])
                    );
                }
                c.values[i][j] = S;
            }
        }
        return c;
    }

    prod(a, p) {
        return new Matrix(a.values.map((arr) =>
            arr.map(elem => this.multBase(elem, p)))
        );
    }

    zero(length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = 0;
            }
        }
        return new Matrix(values);
    }

    one(length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = ((i === j) ? 1 : 0);
            }
        }
        return new Matrix(values);
    }

    pow(a, n) {
        let c = this.one(a.values.length);
        for (let i = 0; i < n; i++) {
            c = this.mult(a, c);
        }
        return c;
    }

    div() {
        return null;
    }
}

export default MatrixCalculator;