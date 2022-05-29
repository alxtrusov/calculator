import { createStore } from 'redux';

const funcsReducer = (state = [], action) => {
    switch (action.type) {
        case 'addFunction':
            state.push({
                f: () => null,
                color: 'red',
                width: 2,
                value: null
            });
            return state;
        case 'delFunction':
            state.splice(action.index, 1);
            return state;
        default: return state;
    }
};

const store = createStore(funcsReducer)

export default store;