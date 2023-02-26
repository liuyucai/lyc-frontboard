import frontboard from './webpage-frame/src/index.vue'

const components = [
    frontboard
]; //将来如果有其他组件，都可以写到这个数组里

// 批量组件注册
const install = function(Vue){

    if (install.installed) return
    // coms.forEach((com)=>{
    //     Vue.component(com.name, com)
    // })
    components.map(component => Vue.component(component.name, component))
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    ...components
};//这个方法以后在使用的时候可以被use调用