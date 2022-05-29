import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Calculator from './components/calculator/Calculator';
import Graph2D from './components/graph2D/Graph2D';
import Graph3D from './components/graph3D/Graph3D';

import store from './store/store';

import './App.css';

import ROUTES from './components/Routes';

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

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header ROUTES={ROUTES} />
                <Routes>
                    <Route exact path={ROUTES.MAIN.path} element={<Calculator />} />
                    <Route exact path={ROUTES.CALCULATOR.path} element={<Calculator />} />
                    <Route exact path={ROUTES.GRAPH_2D.path} element={<Graph2D store={store} />} />
                    <Route exact path={ROUTES.GRAPH_3D.path} element={<Graph3D />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
