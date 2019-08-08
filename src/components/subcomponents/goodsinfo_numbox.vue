<template>
	<!-- 问题：是不知道什么时候能拿到max，但总有一刻会得到一个真正的max -->
	<!-- 我们可以使用watch属性监听父组件传递过来的max值，不管watch会被触发几次，最后一次一定是合法的max数值 -->
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
			// 每当文本框的数据被修改的时候，立即把最新的数据通过事件调用传递给父组件
			// console.log(this.$refs.number.value)
			this.$emit('getcount',parseInt(this.$refs.number.value))
		}
	},
	props:["max"],
	watch:{
		'max': function(newVal, oldVal){
			mui(".mui-numbox").numbox().setOption('max',newVal)
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
