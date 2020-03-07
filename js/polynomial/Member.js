// член многочлена
class Member {
    constructor(value, power) {
        this.value = value || new Complex(); // коэффициент
        this.power = power || 0; // степень переменной
    }
}