let id = 0;
class Dep {
    constructor() {
        this.id = id++;
        this.subs = [];
    }
    addSub(watcher) {
        this.subs.push(watcher);
    }
    depend(){
        //this.subs.push(Dep.target)
        // 需要解救watcher重复问题，让这个watcher记住我当前的dop
        Dep.target.addDep(this);  //当前的dep属性
    }
    notify(){
        this.subs.forEach(watcher => {
            watcher.update();
        })
    }
}

let stack = [];
// 目前可以做到将watcher保留起来和移除的功能
export function pushTarget(watcher) {
    Dep.target = watcher;
    stack.push(watcher);
}

export function popTarget(){
    stack.pop();
    Dep.target = stack[stack.length - 1];
}

export default Dep;
