export function createElement (tag,data = {},...children) {
   console.log(tag,data,children);
   let key = data.key;
   if(key) {
       delete data.key;  // ???
   }
   return vnode(tag,data,key,children,undefined);
}

export function createTextNode(text) {
    console.log(text);
    return vnode(undefined,undefined,undefined,undefined,text);
}
// 虚拟节点，就是通过_v,_c 实现对对象来描述dom的操作 （对象）
// 1) 将template转换沉ast语法树 -> 生成render方法 -> 生成虚拟dom -> 真实的dom
// 2) -> 重新生成虚拟dom -> 更新dom
// 3)
function vnode(tag,data,key,children,text){
    return {
        tag,
        data,
        key,
        children,
        text
    }
}
/*
{
    tag:'div',
    key：unfined,
    data: {},
    children:[],
    text:undefined
}
 */
