import {observer} from './Observer/index'
import {proxy} from "./utils/index";

export function initState(vm) {
    // 拿到用户选项
    const opts = vm.$options;
    //console.log(opts);
    // vue 的【数据来源】 属性 方法 数据 计算属性 watch
    if(opts.props){
        initProps(vm);
    }
    if(opts.methods){
        initMethods(vm);
    }
    if(opts.data){
        initData(vm);
    }
    if(opts.computed){
        initComputed(vm);
    }
    if(opts.watch){
        initWatch(vm);
    }
}

function initProps(){}
function initMethods(){}

function initData(vm){
    // 数据初始化工作
    // 可能是个函数，可能是个对象，如果是函数，自执行，否则，就自身
    let data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data.call(vm) : data;
    // 对象劫持，用户改变了数据
    // MVVM,数据变化可以驱动视图变化

    // 为了用户更好使用data,
    for(let key in data){
        proxy(vm,'_data',key)
    }

    // Object.defineProperty() 给属性增加get和set方法
    observer(data);
}
function initComputed(){}
function initWatch(){}
