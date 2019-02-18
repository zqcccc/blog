import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import rootReducers from '../reducer';
import rootSagas from '../saga';

const sagaMiddleware = createSagaMiddleware(rootSagas);
const loggerMiddleware = createLogger({
    collapsed: true,
    timestamp: false,
    level: 'info'
});

const configureStore = (initialState => {
    const store = createStore(
        rootReducers,
        initialState,
        compose(
            applyMiddleware(sagaMiddleware, loggerMiddleware),
            window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : fn => fn
        )
    );
    sagaMiddleware.run(rootSagas);
    return store;
})();
export { configureStore as store };
