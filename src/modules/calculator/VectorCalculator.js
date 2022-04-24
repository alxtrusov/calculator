import Vector from './types/Vector';

class VectorCalculator {
    addBase(a, b) { return a + b; }

    subBase(a, b) { return a - b; }

    multBase(a, b) { return a * b; }

    add(a, b) {
        return new Vector(a.values.map((elem, i) => this.addBase(elem, b.values[i])));
    }

    sub(a, b) {
        return new Vector(a.values.map((elem, i) => this.subBase(elem, b.values[i])));
    }
    
    mult(a, b) {
        return new Vector([
            this.subBase(
                this.multBase(a.values[1], b.values[2]), 
                this.multBase(a.values[2], b.values[1])
            ),
            this.subBase(
                this.multBase(a.values[2], b.values[0]), 
                this.multBase(a.values[0], b.values[2])
            ),
            this.subBase(
                this.multBase(a.values[0], b.values[1]), 
                this.multBase(a.values[1], b.values[0])
            )
        ]);
    }

    prod(a, p) {
        return new Vector(a.values.map(elem => this.multBase(elem, p)));
    }

    zero(length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push(0);
        }
        return new Vector(values);
    }

    one(length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push(1);
        }
        return new Vector(values);
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

export default VectorCalculator;