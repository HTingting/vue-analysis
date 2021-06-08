/**
 * 判断当前数据是不是对象
 * @param data
 * @returns {boolean}
 */
export function isObject(data) {
    return typeof data === 'object' && data !== null
}

export function def(data, key, value) {
    //
    Object.defineProperty(data, key, {
        enumerable:false,
        configurable:false,
        value:value
    })
}

export function proxy(vm,source,key){
    Object.defineProperty(vm,key,{
        get(){
            return vm[source][key]
        },
        set(newValue){
            vm[source][key] = newValue
        }
    })
}

const LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestory',
    'destoryed'
];

let strats = {};  //策略
LIFECYCLE_HOOKS.forEach(hook => {
    strats[hook] = mergeHook
});

// 声明周期方法合并，如果都有就改成一个数组存储
function mergeHook (parentVal,childVal) {
    if(childVal) {
        if(parentVal) {
            return parentVal.concat(childVal);
        }else {
            return [childVal]
        }
    }else{
        parentVal
    }

}



export function mergeOptions (parent, child) {
    const options = {};

    for(let key in parent) {
        mergeField(key);
    }

    // 如果已经合并过了就不需要要再次合并
    for(let key in child) {
        if(!parent.hasOwnProperty(key)){
            mergeField(key);
        }
    }
    // 默认的合并策略， 但是有些属性，需要有特殊的合并方式，比如声明周期的合并
    function mergeField(key) {
        if(strats[key]) {
            return options[key] = strats[key](parent[key],child[key]);
        }
        if(typeof parent[key] === 'object' && typeof child[key] === 'object'){
            options[key] = {
                ...parent[key],
                ...child[key]
            }
        }else if (child[key] == null) {
            options[key] = parent[key];
        }else {
            options[key] = child[key];
        }
        return options;
    }

}
