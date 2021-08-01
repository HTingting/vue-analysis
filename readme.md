# 使用rollup搭建开发环境
## 什么是rollup？
+ js模块打包器，专注于js类库打包，可以将小块js打包成一个大的js
+ 安装
```cdm
npm install rollup @babel/core @babel/preset-env rollup-plugin-babel rollup-plugin-serve cross-env
```
+ npm install rollup(打包工具)
  @babel/core(用babel核心模块)
  @babel/preset-env(babel将高级语法转换成低级语法)
  rollup-plugin-babel ( @rollup/plugin-babel)
  rollup-plugin-serve(实现一个静态服务)
  cross-env -D （设置环境变量）

# 初始化vue的结构
## 拆分
# 对象劫持

# 数组劫持

# 模板编译
+ 可能是通过el
+ 可能是通过template
+ ast树，用对象来描述原生语法
```html
<div id="app">
<p>hello</p>
</div>
```
```js
let root = {
    tag: 'div',
    attrs:[{name:'id',value:'app'}],
    parent:null,
    type:1,
    children:[{
        tag:'p',
        attrs:[],
        parent:root,
        type:1,
        children:[
            {
                text:'hello',
                type:3
            }
        ]
    }]
}
```

+ 虚拟dom，是用对象来描述dom


+ with的用法
with(vm.data)
console.log(msg)

#index.js
+ vue的入口文件，当实例化Vue时会进行初始化操作，内部会调用各种Mixin方法给原型上添加方法
- initMixin增添初始化方法
- renderMixin 增添渲染方法，调用我们的render方法
- liftcycleMixin增添update方法，将虚拟dom渲染成真实dom

> 这里面最核心的两个方法vm._update(vm._render())

## 挂载，ast语法解析树的提出
+ 作用：将template变成render
+ 触发时机：调用$mount,或者有个生命周期，mounted
+ $mounted方法里面做了判断，1.先找render 2.再找template 3.找当前el指定的元素来进行渲染
+ 重点方法是compileToFunction
+ 这个方法做了啥，将html字符串 -> ast语法树 -> render函数
```javascript
  // 核心思路就是将模板转化成 下面这段字符串
  //  <div id="app"><p>hello {{name}}</p> hello</div>
  // 将ast树 再次转化成js的语法
  //  _c("div",{id:app},_c("p",undefined,_v('hello' + _s(name) )),_v('hello'))
```
+ ast语法树，可以描述js，html，css,dom（ast是用来描述代码）, 但是虚拟dom只能描述dom，可以放自定义属性。
`前端必须了解数据结构（树）`

+ 所有模板引擎实现，new Function 和 with  （/compiler/index.js  76行）

+ 接下来就是挂载组件 mountComponent
和新方法 vm._update(vm._render())  //_update  虚拟节点->真实节点
  
+ 接下来生成虚拟节点

## 虚拟节点
+ 为什么虚拟节点和ast树这么相像，还要再生成vnode
`虚拟节点可以自定义属性，componentsInstance，slot等等；另外可以避免操作真实dom`
  
+ _update,作用就是用虚拟节点去更新真实节点，要把虚拟节点替换成真正的节点，patch方法处理。

+ 再总结一次
vue的渲染流程 -> 先初始化数据 -> 将模板进行编译 -> render函数 -> 生成虚拟节点 -> 生成真实的dom -> 扔到页面上
  

## 数据劫持
+ 数据变化 自动调用 vm._update(vm._render());就可以了
+ vue更新策略是以组件为代为的，给每个组件都增加了一个watcher，属性变化后会更新调用这个watcher——【渲染watcher】
+ lifecycle.js -> mountComponent 

## watcher
+ id 唯一标识，因为每个组件都有很多的属性
+ 要解决——要把属性和watcher绑定在一起
+ 引出了dep了。多对多的关系，一个属性对应一个dep，，，，dep是用来收集watcher
+ dep可以存多个watcher
+ 一个watcher可以对应多个dep
`
  在数据劫持的时候，定义defineProperty的时候，已经给每个属性都增加了一个dep
  1.是想把这个渲染watcher 放到了 Dep.target属性上
  2.开始渲染，取值会调用get方法，需要让这个属性的dep 存储当前的watcher
  3.页面上所需要的属性都会将这个watcher存在自己的dep中
  4.等会儿属性更新了，就重新调用渲染逻辑，通知自己存储的watcher来更新
`
  
# 学习到任务14！！！！！！！！
# vue.mixin 混合功能



