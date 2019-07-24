<template>
  <div class="photoinfo-container">
    <!-- <h3>图片详情</h3> -->
    <h3 class="title">{{photoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间:{{photoinfo.add_time | dateFormat}}</span>
      <span>点击次数:{{photoinfo.click}}次</span>
    </p>

    <hr>
    <!-- 缩略图区域 -->
    <div class="thumbs">
      <!-- <img class="preview-img" v-for="(item,index) in list" :key="item.src" :src="item.src" height="100" @click="$preview.open(index,list)">   -->
      <vue-preview :slides="list"></vue-preview>
    </div>
    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>
    <!-- 引入评论区子组件 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
// 1.导入评论子组件
import {Toast} from 'mint-ui'
import comment from '../subcomponents/comment.vue'
export default {
  data(){
    return{
      id:this.$route.params.id,  //从路由中获取的图片id
      photoinfo:[],  //图片详情
      list:[]  //缩略图的数组
    }
  },
  created(){
    this.getPhotoInfo();
    this.getTumbs();
  },
  methods:{
    getPhotoInfo(){
      // 获取图片详情
      this.$http.get('http://www.liulongbin.top:3005/api/getimageInfo/' + this.id).then(result =>{
        if(result.body.status === 0){
          this.photoinfo = result.body.message[0]
          // console.log(result);
        }else{
          Toast('获取图片详情失败！')
        }
      })
    },
    getTumbs(){
      // 获取图片详情
      this.$http.get('http://www.liulongbin.top:3005/api/getthumimages/' + this.id).then(result =>{
        if(result.body.status === 0){
          // 循环每个图片数据，补全图片的宽和高
          result.body.message.forEach(item=>{
            item.w = 600;
            item.h = 400;
            item.msrc = item.src
          })
          this.list = result.body.message
          // console.log(result);
        }else{
          Toast('获取图片详情失败！')
        }
      })
    }
  },
  components:{  //注册评论子组件
    'cmt-box':comment
  }
}
</script>

<style lang="scss" scoped>
.photoinfo-container{
  padding:3px;
  h3{
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle{
    display: flex;
    justify-content: space-between
  }
  .content{
    font-size: 13px;
    line-height: 30px;

  }
  .thumbs{
    img {
      height: 100px;
      width: 100px;
      margin:10px;
      box-shadow: 0 0 8px #999
    }
  }
}
</style>
