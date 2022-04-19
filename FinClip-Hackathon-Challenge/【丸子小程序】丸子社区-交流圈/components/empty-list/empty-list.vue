<template>
	<view class="content">
		<view class="empty-view">
			<view class="images">
				<image  class="image" src="@/static/images/empty_status_no_letter.png"></image>
			</view>
			<view class="texts">
				<text class="text">{{text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"empty-list",
		props: {
			emptyT: {
				type: Boolean,
				default: false,
			},
			text:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.empty-view{
		padding-top:200rpx;
		text-align: center;
		
	}
	.text{
		align-items: center;
	}
	.image{
		width:350rpx!important;
		height: 350rpx!important;
	}

</style>
