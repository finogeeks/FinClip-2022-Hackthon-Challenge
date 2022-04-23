<template>
	<view class="wrap">
		<view class="logo-view">
			<view class="logo-title">
				- 荣誉墙 -
			</view>
		</view>
		<scroll-view scroll-y="true" class="content-wrap">
			<view class="content">
				<image class="content-img" src="../../static/image/icon/certificate.png" mode="aspectFill"></image>
				<view class="content-text">荣誉证书地方的地方分隔符</view>
			</view>
			<view class="content">
				<image class="content-img" src="../../static/image/icon/certificate.png" mode="aspectFill"></image>
				<view class="content-text">荣誉证书</view>
			</view>
			<view class="content">
				<image class="content-img" src="../../static/image/icon/certificate.png" mode="aspectFill"></image>
				<view class="content-text">荣誉证书</view>
			</view>
			<view class="content">
				<image class="content-img" src="../../static/image/icon/certificate.png" mode="aspectFill"></image>
				<view class="content-text">荣誉证书</view>
			</view>
			<view class="content">
				<image class="content-img" src="../../static/image/icon/certificate.png" mode="aspectFill"></image>
				<view class="content-text">荣誉证书</view>
			</view>
			<view class="content">
				<image class="content-img" src="../../static/image/icon/certificate.png" mode="aspectFill"></image>
				<view class="content-text">荣誉证书</view>
			</view>
			<view class="content">
				<image class="content-img" src="../../static/image/icon/certificate.png" mode="aspectFill"></image>
				<view class="content-text">荣誉证书</view>
			</view>
			<view class="content">
				<image class="content-img" src="../../static/image/icon/certificate.png" mode="aspectFill"></image>
				<view class="content-text">荣誉证书</view>
			</view>
			<view class="content">
				<image class="content-img" src="../../static/image/icon/certificate.png" mode="aspectFill"></image>
				<view class="content-text">荣誉证书</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				labelList:[
					{
						id:1,
						name:"待考",
					},
					{
						id:2,
						name:"必考",
					}
				],
			}
		},
		onLoad() {

		},
		methods: {
			labelOnClick(e){
				console.log(e)
			}
		}
	}
</script>

<style>
	.wrap{
		height: 100%;
		position: flex;
		flex: 1;
		background: linear-gradient(-15deg, #4096d8, #0063c3);
	}
	.logo-view{
		text-align: center;
		height: 20%;
	}
	
	.logo{
		width: 200rpx;
		height: 200rpx;
	}
	.logo-title{
		padding: 50upx;
		font-weight: bold;
		color: white;
		font-size: 40upx;
	}
	.content{
		width: 46%;
		display: inline-block;
		text-align: center;
		background-color: #f1efe38c;
		margin: 2%;
		padding-bottom: 20upx;
		border-radius: 10upx;
	}
	.content-wrap{
		position: fixed;
		height: 80%;
		background-color: white;
		border-radius: 10rpx;
		width: 90%;
		margin: 0 5%;
		text-align: left;
	}
	.content-img{
		width: 100%;
		height: 300upx;
	}
	.content-text{
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
