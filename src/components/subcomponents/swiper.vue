<template>
  <div>
    <mt-swipe :auto="4000">
      <!-- 组件中使用for循环、一定要绑定key -->
      <!-- 将来谁使用此轮播图组件，谁为我们传递lunbotuList -->
      <!-- 此时，lunbotuList应该是父组件向子组件传值来设置 -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
        <img :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  data(){
    return{}
  },
  props:["lunbotuList"]
}
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item{
    &:nth-child(1) {
      background-color: red;
    }
    &:nth-child(2) {
      background-color: yellow;
    }
    &:nth-child(3) {
      background-color: blue;
    }
    img {
      width:100%;
      height:100%;
    }
  }
}
</style>
