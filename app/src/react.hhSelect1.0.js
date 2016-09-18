/**
 * Created by 朱宏伟 on 2016/8/11.
 */
import React from 'react';
import ReactDOM from 'react-dom';


/**
 * 下拉框盒子
 * state说明：
 *         data:下拉框数据
 *         selected:选中框数据
 *         SelectListBox:控制点击列表的隐藏/显示
 */
var SelectBox = React.createClass({
    getInitialState:function () {     //初始化state
        return{
            data:[{name:"无数据",value:"",display:true}],
            selected:{name:"选择",value:""},
            SelectListBox:false
        }
    },
    componentDidMount:function (noFirst) {    //将props数据填充进state，默认执行一次。 第一次将会重置state.selected
        var dataArr = [];
        this.props.data.dataList.map(function (item) {
            item.display = true;
            dataArr.push(item);
        });
        if(noFirst){
            this.setState({data:dataArr});
        }else{
            this.setState({data:dataArr,selected:this.props.data.dataDefault});
        }
    },
    handleClick:function (e) {          //下拉框点击事件
        this.setState({SelectListBox: !this.state.SelectListBox});
        this.componentDidMount(true);
        if(e){
            if(this.state.SelectListBox){
                this.props.options.onClose();      //下拉框点击回调事件
            }else{
                this.props.options.onOpen();       //下拉框点击回调事件
            }
        }
    },
    handleClear:function () {                      //重置选中
        this.setState({selected:{name:"选择",value:""}});
    },
    handleListClick:function (data) {  //列表点击事件
        this.setState({selected:data});
        this.handleClick();
        this.props.options.onSelect();
    },
    handleSearch:function (searchData) {
        if (searchData.search != "") {
            var data = this.state.data;
            data.map(function (option, index) {
                if ((option.name.indexOf(searchData.search)) == -1) {   //字符匹配
                    data[index].display = false;
                } else {
                    data[index].display = true;
                }
            });
            this.setState({data: data});
        } else {
            this.componentDidMount();         //初始化State
        }
    },
    defaultProps1:function () {                         //默认的props设置     不正常的写法，理论props是不应该被赋值
        var data = this.props.options;
        var options = {                                     //默认的props.options
            menuHeight: "auto",
            search: true,
            menuReverse: false
        };
        for (var index in options) {
            if (!(data[index])) {
                data[index] = options[index];
            }
        }
        return data;
        // this.props.options = data;
    },
    render: function () {
        var optionData = this.defaultProps1();
        if(this.state.SelectListBox){         //判断是否点击下拉框，点击时弹出下拉列表
            return (
                <div className="select-box" style={{width:this.props.options.width}}>
                    <SelectShow data={this.state.selected} handleClear={this.handleClear} handleClick={this.handleClick} style={{border:"1px solid #50c5a8"}}>
                    </SelectShow>
                    <SelectListBox data={this.state.data} handleClick={this.handleListClick} handleSearch={this.handleSearch} options={optionData}>
                    </SelectListBox>
                </div>
            )
        }else{
            return (
                <div className="select-box" style={{width:this.props.options.width}}>
                    <SelectShow data={this.state.selected} handleClear={this.handleClear} handleClick={this.handleClick}>
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
        var SelectListNodes = this.props.data.map(function (option) {  //遍历data数据，渲染下拉列表
            if(option.display){
                return (
                    <SelectList selectList={option} handleClick={click.handleClick}>
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
    getInitialState:function () {     //初始化state
        return{
            search:""
        }
    },
    searchOnChange:function (e) {      //搜索框内容改变事件
        this.props.SearchData({search:e.target.value});
        this.setState({search:e.target.value});
    },
    render:function () {
        return(
            <input className="select-SearchBox" type="text" placeholder="Search..." value={this.state.search} onChange={this.searchOnChange}/>
        )
    }
});

//设置的下拉项
var data ={
    dataDefault:{name:"美团外卖",value:"2"},//默认选中的值
    dataList:[
        {name:"美图秀秀",value:"0"},
        {name:"美团外卖",value:"1"},
        {name:"网易云音乐",value:"2"},
        {name:"有道云笔记",value:"2"},
        {name:"超级厉害的哔哩哔哩",value:"2"},
        {name:"一个超级长的名字",value:"2"},
        {name:"短的",value:"2"},
        {name:"不知道",value:"2"},
        {name:"360搜索",value:"3"}
    ]
};

//配置项
var options = {
    // menuHeight:"auto",           //下拉框列表高度
    // search:false,              //开启模糊搜索
    width: "200px",              //下拉框宽度
    // menuReverse:true ,        //下拉框反向弹出
    onOpen:function () {         //下拉框点击弹出事件回调
        console.log("onOpen");
    },
    onClose:function () {        //下拉框点击收回事件回调
        console.log("onClose");
    },
    onSelect:function () {       //下拉框内容点击事件回调
        console.log("onSelect");
    }
};

//开始1
ReactDOM.render(
    <SelectBox data={data} options={options}/>,
    document.getElementById('example')
);