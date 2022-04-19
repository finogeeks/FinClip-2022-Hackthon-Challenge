<template>
	<view class="content">
		<message-person :posts="posts"></message-person>
	</view>
</template>

<script>
	import config from '@/api/config.js';
	import API from '@/api/api.js';
	var app = getApp();
	export default {
		data() {
			return {
				posts: [],
				type: '',
				page:1,
			}
		},
		onLoad(options) {
			this.type = options.type;
			if (options.type == "comment") {
				this.getUserPosts();
				uni.setNavigationBarTitle({
					title:'回复我的'
				})
			}
			if (options.type == "fav") {
				this.getUserPosts({
					type: 'fav',
				});
				uni.setNavigationBarTitle({
					title:'收藏我的'
				})
			}
			if (options.type == "like") {
				this.getUserPosts({
					type: 'like',
				});
				uni.setNavigationBarTitle({
					title:'喜欢我的'
				})
			}


		},
		onReachBottom() {
				
			if(!this.isLastPage){
				if (this.type == "comment") {
					this.getUserPosts({
						page:this.page,
					});
				}
				if (this.type == "fav") {
					this.getUserPosts({
						type: 'fav',
						page:this.page,
					});
				}
				if (this.type == "like") {
					this.getUserPosts({
						type: 'like',
						page:this.page,
					});
				}
			}
		},
		methods: {

			getUserPosts: function(args) {
				let that = this;
				API.getMessageslist(args).then(res => {
						if (res.length < 10) {
							this.isLastPage = true
							this.status = "nomore"
						}
						this.posts = this.posts.concat(res)
						this.page = this.page + 1
						this.isLoading = false

					})
					.catch(err => {
						if (err.message = "授权信息有误") {
							uni.navigateTo({
								url: '/pages/login/login'
							})
						}
					})
			}
		}
	}
</script>

<style>

</style>
