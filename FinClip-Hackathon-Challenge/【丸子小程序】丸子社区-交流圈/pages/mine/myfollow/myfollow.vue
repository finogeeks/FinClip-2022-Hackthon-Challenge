<template>
	<view class="content">
		<mine-list :user="user"></mine-list>
	</view>
</template>

<script>
	import API from '@/api/api.js';
	var app = getApp();
	export default {
		data() {
			return {
				user:[],
				page:1,
			}
		},
		onLoad(options) {
			this.id= options.id;
		    this.getUserFollows(this.id, this.page);
		},
		onReachBottom() {
		
			if (!this.isLastPage) {
				this.getUserFollows(this.id, this.page);
			}
		},
		methods: {
			getUserFollows: function(id, page) {
				API.getFollow(id,page).then(res => {
					if (res.length == 0) {
						this.nulls = true
			
					}
					if (res.length < 10) {
						this.isLastPage = true
						this.status = "nomore"
					}
					this.user = this.user.concat(res)
					this.page = this.page + 1
					this.isLoading = false
				}).catch(err => {
					console.log(err)
				})
			},
		}
	}
</script>

<style>

</style>
