<template>
	<view class="content">
		<qz-head-portrait-card class="head" :name="userName"></qz-head-portrait-card>
		<gljyLineMenu class="menu" :menu="menu" @menuOnClick="menuOnClick"></gljyLineMenu>
	</view>
</template>

<script>
	import auth from '../../common/js/auth.js';
	import config from '../../common/js/config.js';
	import carousel from '@/components/vear-carousel/vear-carousel'
	import gljyLineMenu from '@/components/gljy-line-menu/gljy-line-menu.vue';
	export default {
		components: {
			carousel,gljyLineMenu
		},
		data() {
			return {
				userName:'',
				menu:[ 
						{
							"id":1, 
							"title":"最近考试",
							"iconPath":"/static/image/icon/certificate.png",
							"arrows":"",
						},
						{
							"id":2, 
							"title":"最近学习",
							"iconPath":"/static/image/icon/my-study.png",
							"arrows":"",
						},
						{
							"id":3, 
							"title":"联系我们",
							"iconPath":"/static/image/icon/us.png",
							"arrows":"",
						},
						{
							"id":4, 
							"title":"退出",
							"iconPath":"/static/image/icon/logout.png",
						},
						// {
						// 	"id":"3", 
						// 	"title":"我的学分",
						// 	"iconPath":"/static/image/icon/scoreboard.png",
						// 	"arrows":"/static/image/icon/right-arrow.png",
						// }
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
				]
			}
		},
		onLoad() {
			this.userName = uni.getStorageSync(config.storageCode.UserId)
			console.log(this.userName);
		},
		methods: {
			menuOnClick(res){ 
				switch(res.id) {
				     case 1:
						uni.navigateTo({
							url:'../exam/recentList'
						})
				        break;
				     case 2:
						uni.navigateTo({
							url:'../course/learn'
						})
				        break;
				     case 3:
						uni.navigateTo({
							url:'./us'
						})
				        break;
				     case 4:
						auth.Logout();
				        break;
				     default:
						uni.navigateTo({
							url:'../course/learn'
						})
				} 
			},
			gridClicked(e){
				console.log(e)
			},
			goTo(e){
				uni.navigateTo({
					url:e
				})
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

	.hr{
		margin-top: 20px;
	}
	.menu{
		width: 100%;
	}
	.head{
		width: 100%;
	}
</style>

