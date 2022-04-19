<script>
	import API from '@/api/api.js'
	export default {
		globalData: {
			user: '',
			templates:'',
			bloginfo:'',
			
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			this.globalData.user = API.getUser();
			if (uni.getStorageSync('templates')) {
				this.globalData.templates = uni.getStorageSync('templates');
			}
			if (uni.getStorageSync('bloginfo')) {
				this.globalData.bloginfo = uni.getStorageSync('bloginfo');
			}
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* #ifdef MP-BAIDU */
	body{
		background: #fff;
	}
	/* #endif */
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	.skeleton-fade {
		width: 100%;
		height: 100%;
		background: rgb(194, 207, 214);
		animation-duration: 1.5s;
		animation-name: blink;
		animation-timing-function: ease-in-out;
		animation-iteration-count: infinite;
	}
	
	@keyframes blink {
		0% {
			opacity: 1;
		}
	
		50% {
			opacity: 0.4;
		}
	
		100% {
			opacity: 1;
		}
	}
	.cell_view_bottom{
		border-bottom: 10rpx solid #f9f9f9;
	}
</style>
