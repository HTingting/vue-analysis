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

# vue.mixin 混合功能



