<template>
  <div class="goodsinfo-container">
    <!-- <h3>商品详情页面</h3> -->
    <!-- 商品轮播图区域 -->
    <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotu"></swiper>												
				</div>
			</div>
		</div>
    <!-- 商品购买区域 -->
    <div class="mui-card">
			<div class="mui-card-header">页眉</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）
				</div>
			</div>
		</div>
    <!-- 商品参数区域 -->
    <div class="mui-card">
			<div class="mui-card-header">页眉</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）
				</div>
			</div>
			<div class="mui-card-footer">页脚</div>
		</div>
  </div>
</template>


<script>
import swiper from '../subcomponents/swiper.vue'
export default {
  data(){
    return{
      id:this.$route.params.id,  //将路由参数对象中的id挂载到data上方便后期调用
      lunbotu: []
    }
  },
  created(){
    this.getLunBoTu()
  },
  methods:{
    getLunBoTu(){
      this.$http.get('http://www.liulongbin.top:3005/api/getthumimages/' + this.id).then(result =>{
        if(result.body.status === 0){
          // 拿到数组不要直接赋值，先循环轮播图的每一项，为每个item添加一个img属性
          // 因为轮播图组件中，只认识item.img，不认识item.src
          result.body.message.forEach(item=>{
            item.img = item.src
          })
          this.lunbotu = result.body.message
        } else {
          Toast('获取商品详情失败！')
        }
      })
    }
  },
  components:{
    swiper
  }
}
</script>


<style lang="scss" scoped>
.goodsinfo-container{
  background-color: #eee;
  overflow: hidden;
}
</style>
