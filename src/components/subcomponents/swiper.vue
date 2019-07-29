<template>
  <div>
    <mt-swipe :auto="4000">
      <!-- 组件中使用for循环、一定要绑定key -->
      <!-- 将来谁使用此轮播图组件，谁为我们传递lunbotuList -->
      <!-- 此时，lunbotuList应该是父组件向子组件传值来设置 -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
        <img :src="item.img" alt="" :class="{'full' : isfull}">
      </mt-swipe-item>
    </mt-swipe>
  </div>
  <!-- 分析：为什么商品评论中的轮播图有点丑 -->
  <!-- 1.因为首页中的图片，使用100%的宽和高 -->
  <!-- 2.在商品详情页面中，轮播图的图片，如果也使用宽高为100%的话，页面不好看 -->
  <!-- 3.商品详情页面中的轮播图，期望高度是100%，宽度是自适应 -->
  <!-- 4.经过分析，得到原因：首页中的轮播图和详情中的轮播图分歧点是100%还是自适应 -->
  <!-- 5.解决方案：我们可以定义一个属性，让使用轮播图的调度者手动指定宽度 -->
</template>

<script>
export default {
  data(){
    return{}
  },
  props:["lunbotuList","isfull"]
}
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item{
    text-align: center;
    // &:nth-child(1) {
    //   background-color: red;
    // }
    // &:nth-child(2) {
    //   background-color: yellow;
    // }
    // &:nth-child(3) {
    //   background-color: blue;
    // }
    img {
      // width:100%;
      height:100%;
    }
  }
}
.full {
  width: 100%
}
</style>
