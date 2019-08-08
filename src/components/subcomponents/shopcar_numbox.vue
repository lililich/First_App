<template>
	<!--我们可以使用watch属性监听父组件传递过来的max值，不管watch会被触发几次，最后一次一定是合法的max数值 -->
  <div class="mui-numbox" data-numbox-min='1'>
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged()" ref="number" />
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js"
export default {
	mounted(){
		// 初始化数字选择框
		mui(".mui-numbox").numbox()
	},
	methods:{
		countChanged(){
      // 数量改变了
  	}
	}
}
</script>

<style lang="scss" scoped>

</style>
