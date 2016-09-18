/**
 * Created by Airma on 2016/8/23.
 */
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import todoApp from './reducers'

let store = createStore(todoApp)

let rootElement = document.getElementById('example')
render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
)