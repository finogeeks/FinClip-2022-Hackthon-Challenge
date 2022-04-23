<template>
	<view class="content">
		<carousel :img-list="imgList" url-key="url" @selected="selectedBanner"/>
	
        <o-grid  col="3">
            <o-grid-item text="在线学习" icon="/static/image/icon/study.png" @click="goTo('../course/list')" />
			<o-grid-item text="在线考试" icon="/static/image/icon/exam.png" @click="goTo('../exam/list')" />
			<o-grid-item text="知识百科" icon="/static/image/icon/knowledge.png" @click="goTo('../knowledge/list')" />
		</o-grid>
		<div class="hr"></div> 
		<gljyLineMenu class="menu" :menu="menu" @menuOnClick="menuOnClick"></gljyLineMenu>
		<uni-list class="course-list">
			<uni-list-item  v-for="(item,index) in courseList" :title="item.title"  clickable   :to="'../course/info?id='+item.id">
				<template v-slot:header >
					<view class="uni-thumb"><image :src="item.cover" mode="aspectFill"></image></view>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import authServer from '../../common/js/auth.js';
	import examServer from '../../common/js/exam.js';
	import carousel from '@/components/vear-carousel/vear-carousel'
	import gljyLineMenu from '@/components/gljy-line-menu/gljy-line-menu.vue';
	export default {
		components: {
			carousel,gljyLineMenu
		},
		data() {
			return {
				menu:[ 
						{
							"id":"1", 
							"title":"最近学习",
							"iconPath":"/static/image/icon/my-study.png",
							"arrows":"/static/image/icon/right-arrow.png",
						}
					],
				list:[
					{
						name:'1',
					},
					{ 
						name:'2',
					},
					{
						name:'3',
					}
				],
				imgList: [{
					cover: 'https://img1.baidu.com/it/u=463439701,1254524263&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800',
					id: 1
				},{
					cover: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F811%2F112414123216%2F141124123216-0-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650210723&t=e83ff59e01e03c1c6179bbf166ef67e0',
					id: 2
				},{
					cover: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ff7ee82e2354854624b89737fdb82365036eaf18a32bc3-rqjJB2_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650210723&t=2e853c6beba3469caf1d755996fdf910',
					id: 3
				},{
					cover: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2F711%2F022514111026%2F140225111026-15.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650210723&t=b6bb7de9009f271923b01b434ef510b4',
					id: 4
				}],
						
				courseList:[]
			}
		},
		onShow() {
			this.loadCourseList();
		},
		onLoad() {
			authServer.check();
			this.loadCallBoard();
		},
		methods: {
			loadCourseList(){
				var that = this;
				examServer.courseLearn({},function(res){
					let list = [];
					console.log(res)
					res.forEach((item,index,array)=>{
					    list.push(item.course);
					})
					console.log(list);
					that.courseList = list;
				})
			},
			loadCallBoard(){
				var that = this;
				examServer.callBoardList(function(res){
					let imgList = [];
					res.forEach((item,index,array)=>{
						item.url = item.cover;
					    imgList.push(item);
					})
					that.imgList = imgList;
				})
			},
			menuOnClick(res){ 
				if (res.id == 1) {
					uni.navigateTo({
						url:'../course/learn'
					})
					return;
				}
				console.log(res); 
			},
			gridClicked(e){
				console.log(e)
			},
			goTo(e){
				uni.navigateTo({
					url:e
				})
			},
			selectedBanner(e){
				switch(e.type) {
					case 1:
						console.log(e);
						break;
					case 2:
						uni.navigateTo({
							url:'../knowledge/info?id='+e.object_id
						})
						break;
					case 3:
						uni.navigateTo({
							url:'../course/info?id='+e.object_id
						})
						break;
				}
				console.log(e);
			}
		}
	}
</script>


<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: flex-start;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.course-list{
		width: 100%;
	}
</style>

