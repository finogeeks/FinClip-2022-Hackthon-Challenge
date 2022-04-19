<template>
	<view class="section" :style="'padding:0rpx '+padding+'rpx'">
		<view class="section-top">
			<view class="title" :style="'color:'+titleColor+';background:url('+imageUrl+');'"><text>{{title}}</text></view>
			<view class="more" @tap="clickRight" :style="'color:'+titleColor" v-if="rightText">
				<text>{{rightText}}</text>
				<image src="@/static/images/more.png"></image>
			</view>
			<view class="screen" @tap="clickScreen" :style="'color:'+titleColor" v-if="ispostlist">
				<image src="@/static/images/saixuan.png"></image>
				<text>筛选</text>
			</view>
		</view>
		<view class="intro" :style="'color:'+introColor" v-if="intro">
			<text>{{intro}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "section-title",
		props: {
			title: {
				type: String,
				default: ""
			},
			ispostlist:{
				type:Boolean,
				default:false,
			},

			rightText: {
				type: String,
				default: ""
			},
			imageUrl:{
				type:String,
				default:""
			},

			intro: {
				type: String,
				default: ""
			},
			titleColor: {
				type: String,
				default: "#fff"
			},
			padding: {
				type: String,
				default: "0"
			},
			introColor: {
				type: String,
				default: "#fff"
			}
		},
		data() {
			return {

			};
		},
		methods: {
			clickRight: function() {
				this.$emit("clickRight")

			},
			clickScreen:function(){
				this.$emit("clickScreens")
			}
		}
	}
</script>

<style>
	.section-top {
		font-family: PingFangSC-Regular;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.title {
		font-size: 34rpx;
		font-weight: bold;
		color: #000;
		padding-left: 44rpx;
		line-height: 80rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		background-repeat: no-repeat!important;
		background-size: 228rpx 38rpx!important;
		background-position: 0 22rpx!important;
	}

	.more {
		font-size: 28upx;
	}

	.intro {
		margin-top: 10upx;
		font-size: 28upx;
	}
	.screen image{
		width: 48rpx;
		height: 48rpx;
		vertical-align: middle;
		}

	.more image {
		width: 28rpx;
		height: 28rpx;
		vertical-align: middle;
	}
	.listText{
		font-size:24rpx;
		padding-left: 20rpx;
	}
</style>
