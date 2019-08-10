// 入口文件
import Vue from 'vue'

// 1.1导入路由的包
import VueRouter from 'vue-router'
// 1.2安装路由
Vue.use(VueRouter)

// 注册Vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 每次刚进入网站，肯定会调用main。js，在刚调用的时候，先从本地存储中，把购物车的数据读出来，放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
  state:{  //this.$store.state.***
    car: car  //将购物车中的商品数据，用一个数组存储起来，在car数组中，存储一些商品的对象，我们可以暂时将商品对象设计成这样
      //{id：商品的id，count：要购买的数量，price：商品的单价，selected：false是否为选中}
  },
  mutations:{  //this.$store.commit('方法名称'，'按需传递唯一的参数')
    addToCar(state, goodsinfo) {
      // 点击加入购物车，将商品信息保存到store中的car上
      // 分析：
      // 1.如果购物车中，之前就已经有这个对应的商品了，那么只需要更新数量
      // 2.如果没有，则直接把商品数据push到car中即可

      // 假设没有找到对应的商品
      var flag = false
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })
      // 如果最终循环完毕，得到的flag还是false，则把商品数据直接push到购物车中
      if(!flag) {
        state.car.push(goodsinfo)
      }
      // 当更新car之后，把car数组存储到本地的localStorage中
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsInfo(state,goodsinfo) {
      // 修改购物车中商品的数量值
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
       // 当修改完商品最新数量之后，把car数组存储到本地的localStorage中
       localStorage.setItem('car',JSON.stringify(state.car))
    },
    removeFromCar(state,id){
      // 根据id从store中的购物车中删除对应的那条商品数据
      state.car.some((item,i) => {
        if(item.id == id){
          state.car.splice(i,1)
          return true
        }
      })
      // 当删除完商品最新数量之后，把car数组存储到本地的localStorage中
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsSelected(state,info){
      state.car.some(item => {
        if(item.id == info.id){
          item.selected = info.selected
          // return true
        }
      })
      // 把最新的购物车的状态保存到store中去，并存储到本地的localStorage中
      localStorage.setItem('car',JSON.stringify(state.car))
    }
  },
  getters:{  //this.$store.getters.***
    // 相当于计算属性，也相当于filters过滤器
    getAllCount(state){
      var c = 0
      state.car.forEach(item=>{
        c += item.count
      })
      return c
    },
    getGoodsCount(state){
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    getGoodsSelected(state){
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAndAmount(state){
      var o = {
        count:0,  //勾选的数量
        amount:0  //勾选的总价
      }
      state.car.forEach(item => {
        if(item.selected){
          o.count += item.count
          o.amount += item.price * item.count
        }
      })
      return o
    }
  }
})


// 导入格式化时间插件
import moment from 'moment'
// 定义全局过滤器
Vue.filter('dateFormat',function(dataStr,pattern = "YYYY-MM-DD hh:mm:ss"){
  return moment(dataStr).format(pattern)
})


// 2.1 导入vue-resource
import VueResource from 'vue-resource'
// 2.2 安装vue-resource
Vue.use(VueResource)
// 设置请求的根路径
// Vue.http.options.root = '../../../src/'
// Vue.http.options.root = "http://www.liulongbin.top:3005/"
// 全局设置post时候表单数据格式组织形式 application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

// 按需导入mint-ui中的组件
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
// Vue.component(Header.name,Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'


// 安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview, {
  mainClass: 'pswp--minimal--dark',
  barsSize: {top: 0, bottom: 0},
  captionEl: false,
  fullscreenEl: false,
  shareEl: false,
  bgOpacity: 0.85,
  tapToClose: true,
  tapToToggleControls: false
})

// 导入MUI的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 1.3导入自己的router.js路由模块
import router from './router.js'

// 导入App根组件
import app from './App.vue'

var vm = new Vue({
  el:'#app',
  render: c => c(app),
  router, //1.4挂载路由对象
  store  //挂载store状态管理对象
})