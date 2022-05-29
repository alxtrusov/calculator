import React from 'react';
import Panel from '../panel/Panel';

import './ui.css';

class UI extends React.Component {
    constructor(props) {
        super(props);
        const { store } = props;
        this.store = store;
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
                        store={this.store} 
                        close={() => this.togglePanel()}
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