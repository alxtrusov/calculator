import React from 'react';
// import UniversalCalculator from '../../modules/calculator/UniversalCalculator';

import './calculator.css';

class Calculator extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <div>
                        <textarea className="numbers" id="a" placeholder="0"></textarea>
                        <textarea className="numbers" id="b" placeholder="0"></textarea>
                    </div>
                    <div>
                        <textarea className="result" id="result" placeholder="result" disabled></textarea>
                    </div>
                </div>
                <div>
                    <button className="operands btn operation" data-operand="add"> Add </button>
                    <button className="operands btn operation" data-operand="sub"> Sub </button>
                    <button className="operands btn operation" data-operand="mult"> Mult </button>
                </div>
                <div>
                    <button className="operands btn operation" data-operand="div"> Div </button>
                    <button className="operands btn operation" data-operand="prod"> Prod </button>
                    <button className="operands btn operation" data-operand="pow"> Pow </button>
                    </div>
                <div>
                    <button className="operands btn operation" data-operand="one"> One </button>
                    <button className="operands btn operation" data-operand="zero"> Zero </button>
                </div>
                <div>
                    <h3>формат ввода:</h3>
                    <p className='rules'>
                        обычные числа ( 1 )<br></br>
                        комплексные числа ( 1+/-i*2 )<br></br>
                        вектора ( (1 2 3) )<br></br>
                        матрицы ( 1, 2 /n 3, 4 )<br></br>
                        полиномиалы ( 1*x^2+/-2*x^3 )
                    </p>
                </div>
            </div>
        );
    }
}

export default Calculator;