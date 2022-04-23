<template>
	<view>
		<!-- <uni-row class="demo-uni-row">
			<uni-col :span="20">
				<uni-search-bar :radius="100" @confirm="search" cancelButton="none"></uni-search-bar>
			</uni-col>
			<uni-col :span="2">
				<uni-icons id="tap-list" type="list" size="30"  @click="showDrawer"></uni-icons>
			</uni-col>
		</uni-row> -->
		<!-- <uni-drawer ref="showRight" mode="right" :mask-click="true">
			<scroll-view style="height: 100%;" scroll-y="true">
				<view v-for="item in tap" 
					@click="tapOnClick(item)"
					:class="['tap',{'top-hover':item.id == currentTap}]" 
					:key="item.id">
					{{ item.name }}
				</view>
			</scroll-view>
		</uni-drawer> -->
		
		<uni-search-bar :radius="100" @confirm="search"></uni-search-bar>
		<qz-label-list :labelList="tap" @labelOnClick="labelOnClick"></qz-label-list>
		<uni-list class="course-list">
		    <!-- 水平排列，左图右文 -->
			<uni-list-item  v-for="(item,index) in courseList" :title="item.title" clickable   :to="'../course/info?id='+item.id">
				<template v-slot:header >
					<view class="uni-thumb"><image :src="item.img" mode="aspectFill"></image></view>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>
<script>
	import examServer from '../../common/js/exam.js';
	export default {
		data(){
			return {
				tap:[
					{
						id:0,
						name:'全部',
					},
					{
						id:2,
						name:'必修课',
					},
					{ 
						id:1,
						name:'选修课',
					}
				],
				classId:0,
				keyword:'',
				limit:0,
				courseList:[]
			}
		},
		onLoad() {
			this.loadCourseList();
		},
		methods: {
			loadCourseList(){
				var that = this;
				examServer.courseList({
					keyword:that.keyword,
					class_id:that.classId,
					limit:that.limit,
					length:20,
				},function(res){
					let list = [];
					res.forEach((item,index,array)=>{
					    list.push({id:item.id,img:item.cover,title:item.title,note:item.intro});
					})
					that.courseList = list;
				})
			},
			search(e){
				this.limit = 0;
				this.keyword = e.value;
				this.loadCourseList();
			},
			labelOnClick(e){
				console.log(e);
				this.limit = 0;
				this.classId = e.id;
				this.loadCourseList();
			},
			// showDrawer() {
			// 	this.$refs.showRight.open();
			// },
			// closeDrawer() {
			// 	this.$refs.showRight.close();
			// },
			// tapOnClick(e){
			// 	this.currentTap = e.id;
			// }
		}
	}
</script>

<style>
	.tap{
		padding: 20upx;
		border-bottom: 2px solid #98cdff;
		text-align: center;
	}
	.top-hover{
		background-color: #007AFF;
		color: #F7F7F7;
	}
	#tap-list{
		padding: 20upx;
		display: flex;
	}
	
	.course-list{
		width: 100%;
	}
</style>
