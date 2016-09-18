/**
 * Created by Airma on 2016/8/24.
 */

export const TOGGLE_DROP_DOWN = "TOGGLE_DROP_DOWN";
export const CLEAR_SELECTED = "CLEAR_SELECTED";
export const SELECTED_LIST = "SELECTED_LIST";
export const SEARCH_DATA = "SEARCH_DATA";
export const DEFAULT_STATE = "DEFAULT_STATE";


export function toggleDropDown() {     //列表点击
    return {type:TOGGLE_DROP_DOWN}
}
export function clearSelected() {      //清除选定
    return {type:CLEAR_SELECTED}
}
export function selectedList(data) {   //选择列表项
    return {type:SELECTED_LIST,data:data}
}
export function SearchData(data) {     //搜索
    return {type:SEARCH_DATA,data:data}
}
export function defaultState(data) {   //默认state传值
    return {type:DEFAULT_STATE,data:data}
}
