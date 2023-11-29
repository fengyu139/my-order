let testObj={}
const validator={
  get:function(obj,prop,value){
  if(prop=='age'){
    if(value < 18){
      throw new Error('age must be > 18')
    }
  }
  obj[prop]=value
  return true
  }
}
const p=new Proxy(testObj,validator)
p.age=17
const wm1 = new WeakMap();
const key1={}
const Symbol1=Symbol(key1)
wm1.set(key1,'key1')
// console.log(wm1);
const obj2={
  name:'why',
  age:18,
  Symbol1:'key1'
}
console.log(Object.keys(obj2));