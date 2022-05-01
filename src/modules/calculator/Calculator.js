import ComplexCalculator from './ComplexCalculator';
import MatrixCalculator from './MatrixCalculator';
import VectorCalculator from './VectorCalculator';
import PolynomialCalculator from '../polynomial/PolynomialCalculator';

import Complex from './types/Complex';
import Matrix from './types/Matrix';
import Vector from './types/Vector';
import Polynomial from '../polynomial/types/Polynomial';

class Calculator {
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

export default Calculator;