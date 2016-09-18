/**
 * Created by Airma on 2016/8/25.
 */
import reactHhSelect from "./redux/reduxIndex"

var data = {
    data:[
        {name:"美图秀秀",value:"0",display:true},
        {name:"美团外卖",value:"1",display:true},
        {name:"网易云音乐",value:"2",display:true},
        {name:"有道云笔记",value:"2",display:true},
        {name:"超级厉害的哔哩哔哩",value:"2",display:true},
        {name:"短的",value:"2",display:true},
        {name:"不知道",value:"2",display:true},
        {name:"360搜索",value:"3",display:true},
        {name:"维基百科",value:"3",display:true}
    ],
    dataDefault:{name:"有道云笔记",value:"2"},//默认选中的值
    options: {
        menuHeight: "auto",           //下拉框列表高度
        // search: true,              //开启模糊搜索
        width: "300px",              //下拉框宽度
        // menuReverse: true,        //下拉框反向弹出
        // onOpen: function () {         //下拉框点击弹出事件回调
        //     console.log("onOpen");
        // },
        // onClose: function () {        //下拉框点击收回事件回调
        //     console.log("onClose");
        // },
        // onSelect: function () {       //下拉框内容点击事件回调
        //     console.log("onSelect");
        // }
    }
};

reactHhSelect(data,"example");          //调用方法