<template>
	<view class="main">
		<view class="menu">
			<view class="menu-item" v-for="(item, index) in menu" :key="index" @click="menuOnClick(index, item.id)">
				<image class="menu-icon" :src="item.iconPath"></image>
				<view class="menu-title">{{item.title}}</view>
				<image class="menu-arrows" :src="item.arrows"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"line-menu",
		data() {
			return {
			};
		},
		props:{
			menu:{
				type:Array
			}
		},
		methods:{
			menuOnClick(index, id){
				var result = {id, index};
				this.$emit("menuOnClick", result);
			}
		}
	}
</script>

<style lang="scss">
page{
	width: 100%;
	margin: 0;
	padding: 0;
}
.main {
	width: 100%;
}
.menu {
	width: 100%;
	.menu-item {
		position: relative;
		display: flex;
		width: 100%;
		margin: 0 auto;
		height: 50rpx;
		line-height: 50rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		border-bottom: 1px solid $uni-border-color;
		.menu-icon {
			height: 40rpx;
			width: 40rpx;
			padding-right: 10rpx;
			padding-left: 10rpx;
			padding-top: 5rpx;
		}
		.menu-arrows {
			position: absolute;
			height: 30rpx;
			width: 30rpx;
			right: 30rpx;
			top: 50%;
			margin-top: -15rpx;
		}
	}
}
</style>

