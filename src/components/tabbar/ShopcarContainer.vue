<template>
  <div class="shopcar-container">
    <!-- <h3>ShopcarContainer</h3> -->
    <div class="goods-list">
      <!-- 商品列表项 -->
      <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch></mt-switch>
						<img style="width:100px" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565094538385&di=e30d4cfb0133b208cd16b3617ac13e07&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F02%2F58%2F54%2F59fb996770bac_610.jpg" alt="">
						<div class="info">
							<h1>小米16G双网通版</h1>
							<p>
								<span class="price">￥2199</span>
								<a href="#">删除</a>
							</p>
						</div>
					</div>
				</div>
			</div>
      <!-- 商品结算区域 -->
      <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等
					</div>
				</div>
			</div>
    </div>
  </div>
</template>


<script>
import numbox from '../subcomponents/shopcar_numbox.vue'
export default {
}
</script>

<style lang="scss" scoped>
.shopcar-container{
  background-color: #eee;
	overflow: hidden;
}
</style>
