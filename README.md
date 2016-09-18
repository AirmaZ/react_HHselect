## react.hhselect.js
react.hhselect.js是基于react库可配置的下拉框组件。

####data配置参数：
|参数名称 |参数类型|默认值|描述|
| -------------|:-------------: |:-------------:|:----- |
|dataDefault  |obj      |null|下拉框默认选中的值，键值：name  value|
|data  |array      |null|下拉框渲染项，传入对象数组，键值：name value|
|options  |obj      |null|下拉框的配置项|

####options配置参数：
|参数名称 |参数类型|默认值|描述|
| -------------|:-------------: |:-------------:|:----- |
|width  |string      |100%|组件盒子的宽度，按照css嵌入写法|
|width  |string      |100%|组件盒子的宽度，按照css嵌入写法|
|menuHeight |string  |auto|盒子下拉列表高度，按照css嵌入写法|
|search |burl  |true|为true时，开启模糊搜索| 
|menuReverse |burl  |false|为true时，将下拉框反向弹出| 

####使用方法：
1. 拉下项目
2. npm init
3. npm run hot
4. 浏览器打开http://localhost:8080/webpack-dev-server/index.html

####可调用函数：（暂无）
|函数名|参数|参数类型|返回值类型|描述|
| -------------|:-------------:|:-------------:|:-------------:|:-----|

####需要环境
-react版本0.4以上;
-es6语法编译环境
-依赖管理工具
-ie 8及以上版本，和主流现代浏览器（chrome、firefox等）