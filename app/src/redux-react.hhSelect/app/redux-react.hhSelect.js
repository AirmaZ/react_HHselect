/**
 * Created by 朱宏伟 on 2016/8/11.
 */
import React from 'react';
import {toggleDropDown,clearSelected,selectedList,SearchData} from "../redux/actions";
import { connect } from 'react-redux';

/**
 * 下拉框盒子
 * state说明：
 *         data:下拉框数据
 *         selected:选中框数据
 *         SelectListBox:控制点击列表的隐藏/显示
 */
const SelectBox = React.createClass({
    render: function () {
        const { dispatch } = this.props;
        if(this.props.SelectListBox){         //判断是否点击下拉框，点击时弹出下拉列表
            return (
                <div className="select-box" style={{width:this.props.options.width}}>
                    <SelectShow data={this.props.selected} handleClear={()=>dispatch(clearSelected())} handleClick={()=>dispatch(toggleDropDown())} style={{border:"1px solid #50c5a8"}}>
                    </SelectShow>
                    <SelectListBox data={this.props.data} handleClick={data=>dispatch(selectedList(data))} handleSearch={data=>dispatch(SearchData(data))} options={this.props.options}>
                    </SelectListBox>
                </div>
            )
        }else{
            return (
                <div className="select-box" style={{width:this.props.options.width}}>
                    <SelectShow data={this.props.selected} handleClear={()=>dispatch(clearSelected())} handleClick={()=>dispatch(toggleDropDown())}>
                    </SelectShow>
                </div>
            )
        }
    }
});

/**
 * 下拉框显示框
 */
var SelectShow = React.createClass({
    render: function () {
        return (
            <div className="select-show" style={this.props.style}>
                <div className="select-show-btn" onClick={this.props.handleClick} value={this.props.data.value}>{this.props.data.name}</div>
                <span onClick={this.props.handleClear}>&times;</span>
            </div>
        )
    }
});

/**
 * 下拉框列表盒子
 */
var SelectListBox = React.createClass({
    handleClick:function (data) {
        this.props.handleClick(data);
    },
    handleSearch:function (searchData) {
      this.props.handleSearch(searchData);
    },
    render: function () {
        var click = this;
        var className ="select-list-box";
        var SelectListNodes = this.props.data.map(function (option,index) {  //遍历data数据，渲染下拉列表
            if(option.display){
                return (
                    <SelectList key={index} selectList={option} handleClick={click.handleClick}>
                    </SelectList>
                );
            }
        });
        if(this.props.options.menuReverse){          //判断是否反向弹出
            className ="select-list-box select-list-box-menuReverse"
        }
        if(this.props.options.search){              //判断过滤模块配置
            if(this.props.options.menuReverse){
                return (
                    <div className={className} style={{height:this.props.options.menuHeight}}>
                        {SelectListNodes}
                        <SearchBox SearchData={this.handleSearch}>
                        </SearchBox>
                    </div>
                )
            }else{
                return (
                    <div className={className} style={{height:this.props.options.menuHeight}}>
                        <SearchBox SearchData={this.handleSearch}>
                        </SearchBox>
                        {SelectListNodes}
                    </div>
                )
            }
        }else{
            return (
                <div className={className} style={{height:this.props.options.menuHeight}}>
                    {SelectListNodes}
                </div>
            )
        }
    }
});

/**
 * 下拉框模拟列表
 */
var SelectList = React.createClass({
    handleClick:function () {
      this.props.handleClick(this.props.selectList)
    },
    render: function () {
        return (
            <div className="select-list" onClick={this.handleClick} title={this.props.selectList.name} value={this.props.selectList.value}>{this.props.selectList.name}</div>
        )
    }
});

/**
 * 下拉框搜索框
 */
var SearchBox =React.createClass({
    searchOnChange:function (e) {      //搜索框内容改变事件
        this.props.SearchData({search:e.target.value});
    },
    render:function () {
        return(
            <input className="select-SearchBox" type="text" placeholder="Search..." onChange={this.searchOnChange}/>
        )
    }
});


/**
 * state.data的搜索处理
 * @param data
 * @param searchData
 * @returns {*}
 */
function stateDataUpData(data,searchData) {
    if (searchData!= "") {
            for(let i in data){
                if((data[i].name.indexOf(searchData)) == -1){
                    data[i].display = false;
                }else{
                    data[i].display = true;
                }
            }
            return data;
        }else{                                    //重置所有列表项显示
            for(let i in data){
                data[i].display = true;
            }
            return data;
        }
}
/**
 * 默认选中逻辑
 * @param selected
 * @param dataDefault
 * @returns {*}
 */
function defaultSelected(selected,dataDefault) {
    if(dataDefault){
        return dataDefault;
    }else{
        return selected;
    }
}
/**
 * state逻辑处理
 * @param state
 * @returns {*}
 */
function select(state) {
    return {
        data:stateDataUpData(state.data,state.searchData),
        selected:defaultSelected(state.selected,state.dataDefault),
        SelectListBox:state.SelectListBox,
        searchData:state.searchData,
        options:state.options
    }
}
/**
 * 接入redux
 */
export default connect(select)(SelectBox)