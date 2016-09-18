/**
 * Created by Airma on 2016/8/24.
 */
import {TOGGLE_DROP_DOWN,CLEAR_SELECTED,SELECTED_LIST,SEARCH_DATA,DEFAULT_STATE} from "./actions"

/**
 * 默认state设置，由Object.assign进行拷贝
 * @param data
 * @returns {{data: Array, selected: {name: string, value: string}, SelectListBox: boolean, searchData: string, dataDefault: null}}
 */
function defaultState(data) {
    var defaultData = {
        data: [],
        selected: {name: "选择", value: ""},
        SelectListBox: false,
        searchData: "",
        dataDefault: null,//默认选中的值
    };
    var defaultOptions = {
        menuHeight: "auto",           //下拉框列表高度
        search: true,              //开启模糊搜索
        width: "100%",              //下拉框宽度
        menuReverse: false,        //下拉框反向弹出
    };
    defaultData = Object.assign(defaultData,data);
    defaultOptions = Object.assign(defaultOptions,data.options);
    defaultData.options = defaultOptions;
    return defaultData;
}

/**
 * reducer
 * @param state
 * @param action
 * @returns {*}
 */
const reducers = function(state = defaultState(""),action) {
    switch(action.type){
        case TOGGLE_DROP_DOWN:
            return Object.assign({},state,{
                SelectListBox: !state.SelectListBox,
                searchData:""
                }
            );
        case CLEAR_SELECTED:
            return Object.assign({},state,{
                selected:{name:"选择",value:""},
                dataDefault:null
                }
            );
        case SELECTED_LIST:
            return Object.assign({},state,{
                SelectListBox: !state.SelectListBox,
                selected:action.data,
                dataDefault:null
                }
            );
        case SEARCH_DATA:
            return Object.assign({},state,{
                searchData:action.data.search
                }
            );
        case DEFAULT_STATE:
            return Object.assign({},state,
                defaultState(action.data)
            );
        default:
            return state;
    }
};


export default reducers;