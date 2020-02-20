import Toast from './Toast'

const obj = {}

obj.install = function (Vue) {
  // console.log("执行了toast的安装");
  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)

  // 2.用new的方式根据组件构造器，创建出一个组件对象
  const toast = new toastConstructor()

  // 3.将组件对象手动挂载到某个元素上
  toast.$mount(document.createElement('div'))

  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast

}

export default obj

