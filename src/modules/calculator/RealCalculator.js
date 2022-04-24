import ComplexCalculator from './ComplexCalculator';
import MatrixCalculator from './MatrixCalculator';
import VectorCalculator from './VectorCalculator';
import PolynomialCalculator from '../polynomial/PolynomialCalculator';

import Complex from './types/Complex';
import Matrix from './types/Matrix';
import Vector from './types/Vector';
import Polynomial from '../polynomial/types/Polynomial';

class RealCalculator {
    add(a, b) { return a + b; }
    sub(a, b) { return a - b; }
    mult(a, b) { return a * b; }
    div(a, b) { return a / b; }
    prod(a, p) { return a * p; }
    pow(a, n) { return Math.pow(a, n); }

    zero() { return 0; }
    one() { return 1; }

    get(a) {
        return (a instanceof Matrix) ? new MatrixCalculator :
            (a instanceof Vector) ? new VectorCalculator :
                (a instanceof Complex) ? new ComplexCalculator :
                    (a instanceof Polynomial) ? new PolynomialCalculator :
                        new RealCalculator;
    }

    type(calc, elem, method) {
        if (elem instanceof Matrix) {
            return calc[method](elem.values.length, elem.values[0][0]);
        } else if (elem instanceof Vector) {
            return calc[method](elem.values.length, elem.values[0]);
        }
        return calc[method]();
    }
}

export default RealCalculator;