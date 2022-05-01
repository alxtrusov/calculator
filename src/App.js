import { useState } from 'react';
import Header from './components/header/Header';
import Calculator from './components/calculator/Calculator';
import Graph2D from './components/graph2D/Graph2D';
import Graph3D from './components/graph3D/Graph3D';

import './App.css';

import window from './modules/functions/functions';
window.requestAnimFrame = (() => {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function Real() {
    this.one = function () {
        return 1;
    }
}

function Complex() {
    const parent = new Real;
    this.one = function () {
        return { re: parent.one(), im: 0 };
    }
}

function Vector(Parent = Real) {
    const parent = new Parent;
    this.one = function () {
        return [parent.one(), parent.one(), parent.one()];
    }
}

function Matrix(Parent = Real) {
    const parent = new Parent;
    this.one = function () {
        return [[parent.one(), 0], [0, parent.one()]];
    }
}

const calc = new Matrix(Vector(Complex));
console.log(calc.one());


function App() {

    const [activeButton, setActiveButton] = useState('graph2D');

    return (
        <div className="App">
            <Header
                key={activeButton}
                activeButton={activeButton}
                setActiveButton={(name) => setActiveButton(name)}
            ></Header>
            {activeButton === 'calculator' ? <Calculator></Calculator> :
                activeButton === 'graph2D' ? <Graph2D></Graph2D> :
                    activeButton === 'graph3D' ? <Graph3D></Graph3D> :
                        ''}
        </div>
    );
}

export default App;
