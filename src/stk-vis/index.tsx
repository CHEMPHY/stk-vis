import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { StkVis } from './components/stk-vis';
import { updateFields } from 'StkVis.Reducers';
import { initialState } from 'StkVis';
import { Provider } from 'react-redux';
import {
    configureStore,
    getDefaultMiddleware,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';


console.log(initialState);

const store = configureStore({
    reducer: (state, action) => {
        if (state === undefined)
        {
            return initialState;
        }
        updateFields(state)(action)
    },
    middleware: [
        ...getDefaultMiddleware(),
        logger,
    ],
});


ReactDOM.render(
    <Provider store={ store }>
        <StkVis />
    </Provider>,
    document.getElementById('root'),
);
