import Watcher from './Observer/watcher'
import {patch} from './vdom/patch'
export function lifecycleMixin(Vue) {
    Vue.prototype._update = function(vnode){
        //创建一个真实节点
        console.log('_update拿到虚拟节点',vnode);
        const vm = this;
        vm.$el = patch(vm.$el, vnode);
    }
}
export function mountComponent (vm,el) {
    const options = vm.$options;
    vm.$el = el; //代表真实的dom元素

    // watcher 就是用来渲染的
    // vm._render 通过解析render方法，渲染出虚拟dom
    // vm._update 就是通过虚拟dom生成真实dom
    callHook(vm,'beforeMount');

    // 渲染页面
    let updateComponent = () => {  //无论是渲染还是更新都会调用此方法
        // 返回的是虚拟dom，update可以生成真实dom
        vm._update(vm._render());
    }
    // 渲染watcher 每个组件都有一个watcher  vm.$watch(()=>{})
    new Watcher(vm, updateComponent, ()=>{}, true);  //true表示他是一个渲染watcher

    callHook(vm,'mounted');
}

export function callHook(vm,hook) {
    const handlers = vm.$options[hook];  // [fn,fn]
    if(handlers) {  //找到对应的钩子依次执行
        for(let i = 0; i<handlers.length; i++) {
            handlers[i].call(vm);
        }
    }
}
