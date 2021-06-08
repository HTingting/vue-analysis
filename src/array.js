// 重写数组的方法,导致数组本身发生变化
// push,shift,unshift,pop,reverse,sort,splice
let oldArrayMethods = Array.prototype;
// value.__proto__ = arrayMethods
// arrayMethods.__proto__ = oldArrayMethods
export const arrayMethods = Object.create(oldArrayMethods);  // 方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__


const methods = [
    "push",
    "shift",
    "unshift",
    "pop",
    "sort",
    "splice",
    "reverse",
];

methods.forEach(method => {
    arrayMethods[method] = function (...args) {
        console.log('用户调用了' + method);
        //调用原生的数组的方法
        const result = oldArrayMethods[method].apply(this,args)
        // push unshift 如果添加的元素可能还是i一个对象
        let inserted //当前用户插入的元素
        let ob = this.__ob__;
        switch (method) {
            case "push":
            case "unshift":
                inserted = args;
                break;
            case "splice": //3个参数，新增的属性 splice 有删除，新增的功能；arr.splice(0,1,{name:1});
                inserted = args.slice(2)
            default:
                break;
        }
        // 新增的数据再继续观测
        if(inserted) ob.observerArray(inserted);
        return result;
    }
})
