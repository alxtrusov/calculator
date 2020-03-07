class PolynomialCalculator {
    constructor() {
        this.calc = new ComplexCalculator();
    }

    add(a, b) {
        const members = [];
        a.poly.forEach(element => {
            const member = b.poly.find(elem => elem.power === element.power);
            if (member) {
                members.push(new Member(this.calc.add(element.value, member.value), element.power));
            } else {
                members.push(new Member(element.value, element.power));
            }
        });
        b.poly.forEach(element => {
            if (!members.find(elem => elem.power === element.power)) {
                members.push(new Member(element.value, element.power));
            }
        });
        return new Polynomial(members);
    }

    sub(a, b) {
        const members = [];
        a.poly.forEach(element => {
            const member = b.poly.find(elem => elem.power === element.power);
            if (member) {
                members.push(new Member(this.calc.sub(element.value, member.value), element.power));
            } else {
                members.push(new Member(element.value, element.power));
            }
        });
        b.poly.forEach(element => {
            if (!members.find(elem => elem.power === element.power)) {
                members.push(new Member(this.calc.multP(element.value, -1), element.power));
            }
        });
        return new Polynomial(members);
    }

    mult(a, b) {
        let polynomial = new Polynomial();
        a.poly.forEach(elemA => {
            const members = [];
            b.poly.forEach(elemB => {
                members.push(new Member(this.calc.mult(elemA.value, elemB.value), elemA.power + elemB.power));
            });
            polynomial = this.add(polynomial, new Polynomial(members));
        });
        return polynomial;
    }

    equal(a, b) {
        let result = true;
        a.poly.forEach(element => {
            const member = b.poly.find(elem => elem.power === element.power);
            if (member) {
                if (!this.calc.equal(element.value, member.value)) {
                    result = false;
                }
            } else {
                result = false;
            }
        });
        b.poly.forEach(element => {
            const member = a.poly.find(elem => elem.power === element.power);
            if (member) {
                if (!this.calc.equal(element.value, member.value)) {
                    result = false;
                }
            } else {
                result = false;
            }
        });
        return result;
    }
}