import React from 'react';
import Panel from '../panel/Panel';

import './ui.css';

class UI extends React.Component {
    constructor(props) {
        super(props);
        const { funcs, addFunction, run, delFunction } = props;
        this.funcs = funcs;
        this.addFunction = addFunction;
        this.delFunction = delFunction;
        this.run = run;
        this.state = { showPanel: false };
    }

    togglePanel() {
        this.setState({ showPanel: !this.state.showPanel });
    }

    render() {
        return (
            <div>
                {this.state.showPanel ? 
                    <Panel 
                        funcs={this.funcs} 
                        close={() => this.togglePanel()}
                        addFunction={() => this.addFunction()}
                        delFunction={(index) => this.delFunction(index)}
                        run={() => this.run()}
                    ></Panel> : ''}
                <button 
                    className="draw" 
                    onClick={() => this.togglePanel()}
                >нарисовать график</button>
            </div>
        );
    }
}

export default UI;