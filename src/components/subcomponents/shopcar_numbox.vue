<template>
	<!--我们可以使用watch属性监听父组件传递过来的max值，不管watch会被触发几次，最后一次一定是合法的max数值 -->
  <div class="mui-numbox" data-numbox-min='1' style="height:25px;">
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged()" ref="numbox" />
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
			// console.log(this.$refs.numbox.value)
			// 每当数量值改变，即立即把最新的数量同步到购物车的store中，覆盖之前的数量值
			this.$store.commit("updateGoodsInfo",{
				id: this.goodsid,
				count: this.$refs.numbox.value
			})
  	}
	},
	props:['initcount','goodsid']
}
</script>

<style lang="scss" scoped>

</style>
