<template>
  <div>
    <!-- <h3>图片列表</h3> -->
    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<a :class="['mui-control-item', item.id == 0 ?'mui-active' : '']" v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.id)">
						{{ item.title }}
					</a>
				</div>
			</div>
		</div>

    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <div class="info-title">{{ item.title }}</div>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
// 导入mui的js文件
import mui from '../../lib/mui/js/mui.min.js'
import {Toast} from 'mint-ui'

export default {
  data(){
    return{
      cates:[],  //所有分类的列表数组
      list:[]  //获取图片列表的数组
    }
  },
  created() {
    this.getAllCategory();
    // 默认进入页面就主动请求所有图片列表的数据
    this.getPhotoListByCateId(0);
  },
  mounted() {   //当组件中的DOM结构被渲染好并放到页面中后，会执行这个钩子函数

    // 需要在组件的 mounted 事件钩子中，注册 mui 的 scroll 滚动事件 
    // 初始化滑动控件
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods:{
    getAllCategory(){
      // 获取所有的图片分类
      this.$http.get("http://www.liulongbin.top:3005/api/getimgcategory").then(result =>{
        if(result.body.status === 0){
          // 拼接出一个最完整的列表
          result.body.message.unshift({title:"全部",id:0})
          this.cates = result.body.message
          // console.log(result);
        }else{
          Toast('获取图片分类失败！')
        }
      })
    },
    getPhotoListByCateId(cateId){
      // 获取所有的图片分类
      this.$http.get("http://www.liulongbin.top:3005/api/getimages/" + cateId).then(result =>{
        if(result.body.status === 0){
          // 根据分类Id，获取图片列表
          this.list = result.body.message
          // console.log(result);
        }else{
          Toast('获取图片详情失败！')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
* { 
  touch-action: pan-y; 
}
.photo-list{
  list-style:none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li{
    background-color: #ccc;
    text-align:center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img{
      width:100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info{
      color:white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0,0,0,0.4);
      max-height: 84px;
      .info-title{
        font-size: 14px;
      }
      .info-body{
        font-size: 13px;
      }
    }
  }
}

</style>
