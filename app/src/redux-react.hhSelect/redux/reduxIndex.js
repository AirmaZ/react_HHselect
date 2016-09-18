/**
 * Created by Airma on 2016/8/24.
 */
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import  SelectBox  from '../app/redux-react.hhSelect'
import {createStore,compose} from "redux"
import reducers from "./reducers";
import {defaultState} from "./actions"
import DevTools from '../tools/tools'


const enhancer = compose(
    DevTools.instrument()
);
/**
 * 暴露组件接口
 * @param stateData:obj
 * @param element:string
 */
export default function reactHhSelect(stateData,element) {
    let store = createStore(reducers,enhancer);
    let rootElement = document.getElementById(element);
    store.dispatch(defaultState(stateData));
    render(
        <Provider store={store}>
            <div>
                <SelectBox/>
                <DevTools />
            </div>
        </Provider>,
        rootElement
    );
}