import React from "react";

import './funcInputs.css';

class FuncInputs extends React.Component {
    constructor(props) {
        super(props);
        const { func, run, delFunction, index } = props;
        this.index = index;
        this.func = func;
        this.run = run;
        this.delFunction = delFunction;
    }

    setFunction(e) {
        try {
            let f;
            eval(`f = function(x){return ${e.target.value};}`);
            this.func.f = f;
            this.func.value = e.target.value;
            this.run();
        } catch (e) {
            //console.log(e);
        }
    }

    setColor(e) {
        this.func.color = e.target.value;
        this.run();
    }

    render() {
        return (
            <div>
                <input
                    className="graph2D-input"
                    placeholder="y=f(x)"
                    onKeyUp={(e) => this.setFunction(e)}
                    defaultValue={this.func.value}
                ></input>
                <input
                    className="graph2D-input"
                    placeholder="color"
                    onKeyUp={(e) => this.setColor(e)}
                    defaultValue={this.func.color}
                ></input>
                <button
                    className="graph2D-button"
                    onClick={() => this.delFunction(this.index)}
                >Удалить</button>
            </div>
        );
    }
}

export default FuncInputs;