import {pushTarget,popTarget} from './dep.js'
let id = 0;
class Watcher{
    constructor(vm,exprOrFn,callback,options){
        this.vm = vm;
        this.callback = callback;
        this.options = options;
        this.id = id++
        this.getter = exprOrFn; // 将内部传过来的回调函数 放到getter属性上
        this.depsId = new Set();  // 不能放重复项
        this.deps = [];
        this.get();
    }
    addDep(dep){  //watcher 里不能放重复的dep，dep不能放重复的watcher
        let id = dep.id;
        if(!this.depsId.has(id)){
            this.depsId.add(id);
            this.deps.push(dep);
            dep.addSub(this);   //往自己的sub上面添加
        }
    }
    get(){
        //执行前，把当前的watcher存起来,Dep.target
        pushTarget(this);
        this.getter();
        // 调取之后，移除watcher
        popTarget();
    }
    update(){
        this.get();
    }
}

export default Watcher
