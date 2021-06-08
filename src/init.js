import {initState} from "./state";
import {compileToFunction} from './compiler/index'
import {mountComponent,callHook} from "./lifecycle";
import {mergeOptions} from "./utils/index";

// 用于再原型上添加一个init方法
export function initMixin(Vue){
    Vue.prototype._init = function (options) {
        // 数据的劫持
        const vm = this;  //vue 中使用this.$options指代的就是用户传递的属性
        //vm.$options = options;
        //注意这里construect，将用户传递和全局的合并
        vm.$options = mergeOptions(vm.constructor.options,options);

        //
        callHook(vm,'beforeCreate');

        // 初始化状态
        initState(vm);  //分割代码

        callHook(vm,'created');

        // 如果用户传入了el属性，需要把这个页面渲染出来
        // 如果用户传入了el,就要实现挂载流程
        if(vm.$options.el) {
            vm.$mount(vm.$options.el);
        }
        //
    }

    Vue.prototype.$mount = function (el) {
        const vm = this;
        const options = vm.$options;
        el = document.querySelector(el);

        // 默认会先查找有没有render方法，没有就采用template，template也没有就用el的内容
        if (!options.render) {
            // 对模板进行编译
            let template = options.template;  //取出模板
            if(!template && el) {
                template = el.outerHTML;
            }
            // 我们需要将template转换成render方法， vue2.0 虚拟dom
            const render = compileToFunction(template);
            options.render = render;
        }
        // options.render

        // 渲染当前的组件，挂载这个组件
        mountComponent(vm,el);
    }
}
