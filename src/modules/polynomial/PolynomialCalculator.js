import Member from '../polynomial/types/Member';
import Polynomial from '../polynomial/types/Polynomial';

class PolynomialCalculator {
    polynomial(members = []) {
        return new Polynomial(members);
    }
    addBase(a, b) {
        return a + b;
    }

    subBase(a, b) {
        return a - b;
    }

    multBase(a, b) {
        return a * b;
    }

    prodBase(a, p) {
        if (typeof p == 'number') {
            return a * p;
        }
        return null;
    }

    add(a, b) {
        const members = [];
        a.poly.forEach(elemA => {
            const member = b.poly.find(elemB => elemB.power == elemA.power);

            if (member) {
                members.push(new Member(this.addBase(elemA.value, member.value), elemA.power));
            } else {
                members.push(new Member(elemA.value, elemA.power));
            }
        });
        b.poly.forEach(elemB => {
            if (!members.find(el => el.power == elemB.power)) {
                members.push(new Member(elemB.value, elemB.power));
            }
        });
        for (let i = members.length - 1; i >= 0; i--) {
            if (members[i].value === 0) {
                return members.slice(0, i);
            }
        }
        return new Polynomial(members);
    }

    sub(a, b) {
        const members = [];
        a.poly.forEach(elemA => {
            const member = b.poly.find(elemB => elemB.power == elemA.power);

            if (member) {
                members.push(new Member(this.subBase(elemA.value, member.value), elemA.power));
            } else {
                members.push(new Member(elemA.value, elemA.power));
            }
        });

        b.poly.forEach(elemB => {
            if (!members.find(el => el.power == elemB.power)) {
                members.push(new Member(this.prodBase(elemB.value, -1), elemB.power));
            }
        });
        for (let i = members.length - 1; i >= 0; i--) {
            if (members[i].value === 0) {
                return members.slice(0, i);
            }
        }
        return new Polynomial(members);
    }

    mult(a, b) {
        let polynomial = new Polynomial;
        a.poly.forEach(elemA => {
            const members = [];
            b.poly.forEach(elemB => {
                members.push(new Member(
                    this.multBase(elemA.value, elemB.value),
                    this.addBase(elemA.power, elemB.power)
                ));
            });
            for (let i = members.length - 1; i >= 0; i--) {
                if (members[i].value === 0) {
                    return members.slice(0, i);
                }
            }
            polynomial = this.add(polynomial, new Polynomial(members));
        });
        return polynomial;
    }

    prod(a, p) {
        const members = [];
        a.poly.forEach(elemA => {
            members.push(new Member(this.prodBase(elemA.value, p), elemA.power));
        });
        for (let i = members.length - 1; i >= 0; i--) {
            if (members[i].value === 0) {
                return members.slice(0, i);
            }
        }
        return new Polynomial(members);
    }
}

export default PolynomialCalculator;