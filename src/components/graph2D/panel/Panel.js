import React from "react";

import FuncInputs from '../funcInputs/FuncInputs';

class Panel extends React.Component {
    constructor(props) {
        super(props);
        const { close, funcs, addFunction, run, delFunction } = props;
        this.funcs = funcs;
        this.addFunction = addFunction;
        this.delFunction = delFunction;
        this.close = close;
        this.run = run;
        this.state = { funcsLength: this.funcs.length };
    }

    delFunctionClick(index) {
        this.delFunction(index);
        this.setState({ funcsLength: this.funcs.length });
    }

    render() {
        return (
            <div key={this.state.funcsLength}>
                <div className="graph2D_panel">
                    <button 
                        className="add"
                        onClick={() => this.addFunction()}
                    >добавить</button>
                    <button 
                        className="close" 
                        onClick={() => this.close()}
                    >закрыть</button>
                    <div>
                        {this.funcs.map((func, index) => 
                            <FuncInputs 
                                index={index}
                                key={index}
                                func={func} 
                                run={() => this.run()}
                                delFunction={(index) => this.delFunctionClick(index)}
                            ></FuncInputs>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Panel;

/*
function UI(options) {
    var num = 0;
    document.getElementById('addFunction').addEventListener('click', addFunction);

    function clickCheckbox() {
        options.callbacks.setDerivative(
            this.checked,
            this.dataset.num
        );
    }

    function clickAInput() {
        options.callbacks.setA(this.value - 0, this.dataset.num);
    }

    function clickBInput() {
        options.callbacks.setB(this.value - 0, this.dataset.num);
    }

    function clickWidthInput() {
        options.callbacks.setWidth(this.value - 0, this.dataset.num);
    }
}*/
