<template>
	<view>
		<view class="content">
			<image class="head_portrait" src="https://img1.baidu.com/it/u=2716398045,2043787292&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800" mode=""></image>
			<view  class="name">{{name}}</view>
		</view>
		<!-- <view class="tap-wrap">
			<view class="tap-block">
				<view class="tap">
					<view class="tap-top">今日学习</view>
					<view class="tap-bottpm">0秒</view>
				</view>
				<view class="tap ">
					<view class="tap-top">累计学分</view>
					<view class="tap-bottpm">2分</view>
				</view>
			</view>
		</view> -->
	</view>
</template>
<script>
	export default {
		props: {
			name: {
				type: String,
				default:""
			}
		},
	}
</script>
<style>
	.content{
		background-color: gainsboro;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 80upx 0;
		background: linear-gradient(-125deg, #57bdbf, #2f9de2);
	}
	.name{
		padding-top: 10upx;
		font-weight: bolder;
		color: white;
	}
	.head_portrait{
		width: 150upx;
		height: 150upx;
		border-radius: 150upx;
	}
	.tap-wrap{
		background-color: #a3cce6b3;
		display:list-item;
		flex-direction:inherit;
		align-items: center;
		text-align: center;
		background: linear-gradient(-1115deg, #57bdbf, #2f9de2);
	}
	.tap-block{
		height: 100%;
		display: inline-block;
		background-color: white;
		border-radius: 20upx;
		padding: 0 25upx;
		top: -20upx;
		position: relative;
	}
	.tap{
		display: inline-block;
		padding: 18upx;
	}
	.tap-top{
		font-size:26upx;
		color: gray;
	}
	.tap-bottpm{
		font-size: 34upx;
		font-weight: bolder;
		color: #ff8100;
	}
</style>
