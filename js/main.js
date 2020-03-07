window.onload = function () {
    console.log('I`m load!');

    const c = new Calculator();
    const calc = new PolynomialCalculator();
    const a = new Polynomial([
        { value: c.vector([c.complex(3, 1), c.complex(1, 3), c.complex(1, 0)]), power: 3 }, 
        { value: c.vector([c.complex(1, 3), c.complex(5, 7), c.complex(9, 1)]), power: 1 }, 
        { value: c.vector([c.complex(2, 4), c.complex(6, 8), c.complex(0, 2)]), power: 0 }
    ]);
    const b = new Polynomial([
        { value: c.vector([c.complex(9, 3), c.complex(0, 3), c.complex(1, 0)]), power: 1 }, 
        { value: c.vector([c.complex(8, 4), c.complex(9, 0), c.complex(2, 0)]), power: 2 }, 
        { value: c.vector([c.complex(7, 5), c.complex(1, 3), c.complex(1, 0)]), power: 0 }
    ]);

    console.log(calc.sub(a, b));
};