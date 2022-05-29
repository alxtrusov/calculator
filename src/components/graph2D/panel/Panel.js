import { useState, useEffect } from 'react';
import FuncInputs from '../funcInputs/FuncInputs';

function Panel({ close, store }) {
    const [funcsLength, setFuncsLength] = useState(store.getState()?.length);

    function delFunctionClick(index) {
        store.dispatch({ type: 'delFunction', index });
        setFuncsLength(store.getState()?.length);
    }

    useEffect(() => {
        store.subscribe(() => setFuncsLength(store.getState()?.length));
    });

    return (
        <div key={funcsLength}>
            <div className="graph2D_panel">
                <button
                    className="add"
                    onClick={() => store.dispatch({ type: 'addFunction' })}
                >добавить</button>
                <button
                    className="close"
                    onClick={() => close()}
                >закрыть</button>
                <div>
                    {store.getState().map((func, index) =>
                        <FuncInputs
                            index={index}
                            key={index}
                            func={func}
                            delFunction={(index) => delFunctionClick(index)}
                        ></FuncInputs>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Panel;