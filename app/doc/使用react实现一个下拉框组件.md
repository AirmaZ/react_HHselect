# 使用react实现一个下拉框组件思路概要 #
朱宏伟
- - -
本文介绍了使用react编写下拉框组件的开发思路，从中窥探react开发模式与传统的开发模式的不同之处。
- - -
## 一、需求概要 ##
+ __基本功能：__
  - 使用div模拟select标签功能
  - 支持清除选中
+ __下拉框可配置：__
  -  下拉框宽度
  - 弹出列表高度
  - 可控弹出方向
+ __支持内容过滤：__
  -  可配置是否开启此项功能
  - 可模糊检索下拉框选项

## 二、项目构建 ##
+ css
  - react.hhSelect.css
+ doc
  - README.md
+ lib
  - react.min.js
  - react-dom.min.js
  - browser.min.js
+ src
  - react.hhSelect.jsx
+ index.html

__由于没有使用自动化的构建工具，所以项目目录十分明朗，大家一看就知道各个文件的功能。__

__src/react.hhSelect.jsx是我们进行组件开发的主要js，事实上在实际的项目中使用编译好的js最好，这样省去了客户端浪费资源去编译了，在本文中，为了省事采用了babel的browser.min.js这个转化库。__

## 三、需求开发 ##
__谈react开发，首先就不能离开虚拟dom的构建，在此直接给出我对下拉框组件的结构：__

><pre><code>
SelectBox                                //组件的顶层容器
      |-SelectShow                       //组件选中框
      |-SelectListBox                    //组件列表框
              |-SelectList*data.length   //列表框中的每一项
              |-SearchBox                //搜索框
</code></pre>

__在尝试使用react时，发现对于一个功能偏复杂的组件，应该优先开发组件的最底层，在每个小组件开发完毕时进行调试，这样能够避免开发中因为来回改动组件带来bug。如果从顶层开始开发，个人觉得开发思路会受到影响。所以我们第一步先编写SelectList这个组件：__

><pre><code>
var SelectList = React.createClass({
    handleClick:function () {
      this.props.handleClick(this.props.selectList) //测试时请注释掉，不然会报错，因为props.handleClick不存在
      console.log(“click”);  //测试
    },
    render: function () {
        return (
            &lt;div className=&quot;select-list&quot; onClick={this.handleClick} title={this.props.selectList.name} value={this.props.selectList.value}&gt;{this.props.selectList.name}&lt;/div&gt;
        )
    }
});
</code></pre>

+ __在编写本段代码时脑海中应有的思路：__
  - 下拉框的列表项一般都有value和name两个值，value用来选定，name用来呈现。而在react中这些值肯定是由最顶层的state向下进行传递的。所以有了value={this.props.selectList.value}
  - 下拉框用户鼠标是可以悬停查看过长的文本的，所有需要设定title属性，值和name值是一样的。
  - 列表项是肯定可以点击的，所以需要设置一个onclick事件将value和name向上传递，至于具体事件执行的逻辑，在react中是通过调用父组件的方法来执行的。我们先设定一个props.handleClick这样一个方法然后不去理会。

__此时便可以调用ReactDOM.render方法进行组件的测试了，先提供一个写死的props看SelectList这个组件是否渲染成功。接下来，可以开发SelectListBox模块了，先不理会搜索模块，因为搜索是附加功能，应该在主体框架完成后再来完成它__

><pre><code>
var SelectListBox = React.createClass({
    handleClick:function (data) {
        this.props.handleClick(data);
    },
    render: function () {
        var SelectListNodes = this.props.data.map(function (option) {  //遍历data数据，渲染下拉列表
                return (
                    &lt;SelectList selectList={option} handleClick={click.handleClick}&gt;
                    &lt;/SelectList&gt;
                );
        });
                return (
                    &lt;div className={className} style={{height:this.props.options.menuHeight}}&gt;
                        {SelectListNodes}
                    &lt;/div&gt;
                )
    }
});
</code></pre>

+ __这段代码的关注点有两个：__
  - 通过遍历props.data来动态生成SelectList
  - 编写SelectList的点击事件：handleClick。在本事件中，SelectList传出来的值继续向上层传递

__接下来可以开始着手编写SelectShow模块了：__

><pre><code>
var SelectShow = React.createClass({
    render: function () {
        return (
            &lt;div className=&quot;select-show&quot; style={this.props.style}&gt;
                &lt;div className=&quot;select-show-btn&quot; onClick={this.props.handleClick} value={this.props.data.value}&gt;{this.props.data.name}&lt;/div&gt;
                &lt;span onClick={this.props.handleClear}&gt;&amp;times;&lt;/span&gt;
            &lt;/div&gt;
        )
    }
});
 </code></pre>

+ __SelectShow模块相对简单点，因为他只有一个展示用的框体和一个清除选定的按钮__
  - 这里千万不能把select-show-btn这个按钮包裹住span标签，这样会造成onclick事件的冲突！
  - 这段代码核心为两个onclick事件：一个是select-show-btn这个按钮控制下拉框弹出列表，一个是span小图标控制清除选定
  - 在这里注意react.js中style内嵌的赋值写法：一种是采用style={style}通过变量来赋值，如果直接写的话需要传入一个对象style={{border:"1px solid #50c5a8"}}，是双层花括号

__到这里我们已经完成了基本的底层组件了，现在可以创建一个SelectBox把他们组装起来:__

><pre><code>
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
     render: function () {
            if(this.state.SelectListBox){         //判断是否点击下拉框，点击时弹出下拉列表
                return (
                    &lt;div className=&quot;select-box&quot; style={{width:this.props.options.width}}&gt;
                        &lt;SelectShow data={this.state.selected} handleClear={this.handleClear} handleClick={this.handleClick} style={{border:&quot;1px solid #50c5a8&quot;}}&gt;
                        &lt;/SelectShow&gt;
                        &lt;SelectListBox data={this.state.data} handleClick={this.handleListClick} handleSearch={this.handleSearch} options={this.props.options}&gt;
                        &lt;/SelectListBox&gt;
                    &lt;/div&gt;
                )
            }else{
                return (
                    &lt;div className=&quot;select-box&quot; style={{width:this.props.options.width}}&gt;
                        &lt;SelectShow data={this.state.selected} handleClear={this.handleClear} handleClick={this.handleClick}&gt;
                        &lt;/SelectShow&gt;
                    &lt;/div&gt;
                )
            }
        }
});
 </code></pre>

+ __这段代码可能过长了，但是通过注释你不难发现其中的思路却是非常清晰，交互的重点在于state值得变化：__
  - selected:控制SelectShow选中的是谁，通过SelectList的点击事件将数据传递到这层来改变state，由于react能够监测所有用到state的虚拟dom，来批量更新它们
  - SelectListBox：控制下拉框的弹出和收回，通过SelectShow的点击事件将此值取反，同样，由于state改变了，react将会重新绘制一遍ReactDOM.render中相关的相关DOM

__好吧，你问没有样式是什么鬼？请移步文章的最后下载完整代码__

+ __接下来扩展功能的开发就十分简单了:__
  - 新增模块，在SelectBox中组装
  - 传入新的props和state，在SelectBox中判断，完成功能配置
  - 如果SelectBox中无法完成的逻辑，传递props到下一层完成

- - -
+ __至此react开发中的思路十分明确了：__
  1. 确认组件dom结构
  2. 基于主体dom结构从底层开始创建组件
  3. 创建完组件在顶层完成组装
- - -

## 四、完整代码下载地址： ##
__下载地址：[react-hhSelect1.0.zip](/uploads/5e8f5088b907053bdec61678fffcb05d/react-hhSelect1.0.zip)__
