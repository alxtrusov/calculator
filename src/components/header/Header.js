import React from 'react';
import Button from './button/Button';
import './header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
        const { activeButton, setActiveButton } = props;
        this.state = { activeButton: activeButton };
        this.setActiveButton = setActiveButton;
    }

    onClick(name) {
        this.setState({ activeButton: name });
        this.setActiveButton(name);
    }

    render() {
        return (
            <div>
                <div className='button'>
                    <Button
                        onClick={(name) => this.onClick(name)}
                        isActive={this.state.activeButton}
                        name='calculator'
                        title='Калькулятор'
                    ></Button>
                    <Button
                        onClick={(name) => this.onClick(name)}
                        isActive={this.state.activeButton}
                        name='graph2D'
                        title='Графика 2D'
                    ></Button>
                    <Button
                        onClick={(name) => this.onClick(name)}
                        isActive={this.state.activeButton}
                        name='graph3D'
                        title='Графика 3D'
                    ></Button>
                </div>
            </div>
        );
    }
}

export default Header;