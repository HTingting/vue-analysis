// 核心就是Object.defineProperty
import {isObject, def } from "../utils/index";
import { arrayMethods} from "../array";
import Dep from './dep.js'

class Observer {
    constructor(value) {

        /*value.__ob__ = this;*/ // todo 这样会导致死循环,改用下面的方法
        def(value,'__ob__', this);

        // vue如果数据的层次过多，需要递归去解析对象中的属性，依次增加set和get方法
        if(Array.isArray(value)){
            // 如果是数组并不会对索引进行观测，因为会导致性能问题；前端开发很少去操作索引，push,shift,unshift
            value.__proto__ = arrayMethods
            // 如果数组里房的是对象我在监控
            this.observerArray(value);
        }else{
            this.walk(value)
        }
    }

    observerArray(value) {
        for(let i = 0; i< value.length; i++ ){
            observer(value[i]);
        }
    }

    walk(data) {
        let keys = Object.keys(data);  // [name,age,address]
        keys.forEach((key) => {
            defineReactive(data, key, data[key]); // 定义响应式数据
        })
    }
}

function defineReactive(data, key, value) {
    let dep = new Dep();
    //todo 注意 可能value还是i一个对象
    observer(value); // 所以这里使用递归
    Object.defineProperty(data, key, {
        get() {
            //每个属性都对应着自己的watcher
            if(Dep.target){   //如果当i前有watcher
                dep.depend();  //意味着我要将watcher存起来
            }
            return value;
        },
        set(newValue) {
            //todo list 注意这种写法
            if(newValue === value) return;
            observer(newValue); // todo 注意： 用户设置的值可能是一个对象，还需要继续劫持用户设置的值
            value = newValue;

            dep.notify();   //通知依赖的watcher来进行更新操作
        }
    })
}

export function observer (data) {
    // 万事先判断
    let isObj = isObject(data);
    if(!isObj) {
        return
    }
    return new Observer(data);  //用来观测数据
}
