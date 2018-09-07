#   实现todolist
### 本案例主要在todolist交互,主要交互有提交问题、删除提问、清除提问、修改问题、选择问题、选择问题不可见、非选择问题不可见等.而每个交互事件又有许多细节需要处理, 例如左上角箭头颜色改变、下拉菜单消失等。主要监听Enter事件、单双击事件。  
[效果展示](https://htmlpreview.github.io/?https://github.com/L-WJ1995/todolist/blob/master/todolist.html)  
[原页面](http://todomvc.com/examples/vue/)  
  
1. 添加问题：document事件代理监听Enter事件,重复克隆`document.cloneNode`已确定好的DOM结构,同时增加问题数量,克隆来的节点额外添加clone_类名。此处有个细节,如果当前选项为"Completed",那么新添加的元素应都是不可见的。如果是第一次添加问题,那么应该出现下拉菜单。     
  
2. 选择问题：依然是事件代理监听(.tick)的单机事件,如果.tick元素还没被选择,则添加一个类名tick_on,css会覆盖,如果单机元素已包含tick_on类名(即反向选择),则删除类名。此操作依然有其他联动项,如当前选项为"Completed"时,反向选择的元素应该隐藏,同时问题数加一如果为"Active"则选择的元素隐藏,同时问题数减一。  
  
3. 删除问题：document事件代理监听删除按钮的单机事件,同时此处自定义了一个监听问题数量变动的事件(`new Event()`/`document.dispatchEvent()`),一旦删除某个问题后问题数量为0且不存在选择的问题,则下单菜单消失,此事件还监听问题数量为0时,提问框小箭头的颜色的改变与否。  
  
4. 清除问题：document事件代理监听Clear completed按钮的单机事件,清除问题列表中打了勾的项目(打勾项添加了自定义类名tick_on,主要根据这个来甄别),同时此处依然监听自定义事件。  
  
5. 修改问题：document事件代理监听问题元素(.clone_.lastChild)的双击事件,触发事件后 隐藏该项父元素内所有的子元素,同时添加一个input元素,值为原span的innerHTML,此处又有一个document事件代理的单击事件和Enter事件,如果单击事件触发且来源元素不是input元素或者Enter事件来源与input元素,则原来隐藏的元素恢复显示,同时原span的innerHTML设置为input的value,最后隐藏input元素。  
  
6. 选择问题不可见/非选择问题不可见：同样是监听单机事件,而后根据当前选项的"All"/"Active"/"Completed"状态决定隐藏还是显示问题元素。  
  
7. 其实单个项实现并不难,主要在于每个交互产生的一系列的联动比较多,需要考虑周全。

### 修改：    
增加localStorage:    
* 通过localStorage实现本地缓存,页面加载开始读取localStorage的local_notes属性并进行解析,根据解析对象生成相应的DOM对象,中间涉及渲染闪烁的问题、生成DOM对象的逻辑.同时页面内.todos主体内的DOM元素有所变动时(即开头所提的交互事件),实时更新localStorage的local_notes属性,实际生产中实时更新可以最大限度避免页面崩溃、浏览器卡死等引起的localStorage数据缺失。
  




