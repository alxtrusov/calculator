// многочлен
class Polynomial {
    constructor(poly) {
        this.poly = poly || [];
        this.poly.sort((a, b) => b.power - a.power);
        this.calc = new ComplexCalculator();
    }

    // посчитать значение многочлена от переменной X
    getValue(x) {
        let S = this.calc.zero();
        this.poly.forEach(element => {
            S = this.calc.add(S, this.calc.mult(element.value, this.calc.pow(x, element.power)));
        });
        return S;
    }
}