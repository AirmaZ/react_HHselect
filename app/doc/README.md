## react.hhselect.js
react.hhselect.js是基于react库可配置的下拉框组件。

####options配置参数：
|参数名称 |参数类型|默认值|描述|
| -------------|:-------------: |:-------------:|:----- |
|width  |string      |100%|组件盒子的宽度，按照css嵌入写法|
|width  |string      |100%|组件盒子的宽度，按照css嵌入写法|
|menuHeight |string  |auto|盒子下拉列表高度，按照css嵌入写法|
|search |burl  |true|为true时，开启模糊搜索| 
|menuReverse |burl  |false|为true时，将下拉框反向弹出| 
|onOpen |function  |null|下拉框点击弹出事件回调|
|onClose |function  |null|下拉框点击收回事件回调| 
|onSelect |function  |null|下拉框内容点击事件回调| 

####data配置参数：
|参数名称 |参数类型|默认值|描述|
| -------------|:-------------: |:-------------:|:----- |
|dataDefault  |obj      |null|下拉框默认选中的值，键值：name  value|
|dataList  |array      |null|下拉框渲染项，传入对象数组，键值：name value|

####使用方法：
>1引入依赖项：react.js/react-dom.js/
>2将jsx格式文件转化为js，具体方案自定。demo中采用browser.js这个转化库
>3创建容器
>```<div id="example"></div>```
>4在react-hhSelect1.js中设置参数：（或者你可以采用像require.js这样的工具来管理依赖）
><pre><code>
//设置的下拉项
var data ={
    dataDefault:{name:"超级厉害的哔哩哔哩",value:"2"},  //默认选中的值
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
    menuHeight:"auto",           //下拉框列表高度
    search:true,              //开启模糊搜索
    width: "200px",              //下拉框宽度
    menuReverse:true ,        //下拉框反向弹出
    onOpen:function () {         //下拉框点击弹出事件回调
        console.log("onOpen");
    },
    onClose:function () {        //下拉框点击收回事件回调
        console.log("onClose");
    },
    onSelect:function () {       //下拉框内容点击事件回调
        console.log("onSelect");
    }
};</code></pre>
>5创建组件
>```ReactDOM.render(```
>```<SelectBox data={data} options={options}/>,```
>```document.getElementById('example')```
>```)```

####可调用函数：（暂无）
|函数名|参数|参数类型|返回值类型|描述|
| -------------|:-------------:|:-------------:|:-------------:|:-----|

####需要环境
-react版本0.4以上;
-es6语法编译环境
-依赖管理工具
-ie 8及以上版本，和主流现代浏览器（chrome、firefox等）