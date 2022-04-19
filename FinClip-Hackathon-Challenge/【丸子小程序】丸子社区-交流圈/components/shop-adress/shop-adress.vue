<template>
	<transition name="fade">
		<view class="choose-adress" v-if="adressShow">
			<view class="c-a-title">
				<view class="title-item" @click="cancelDialog">取消</view>
				<view class="title-item" @click="confirmDialog"><label>确定</label></view>
			</view>
			<view class="adress-list">
				<view class="item-content" @click="methdsActive(index)" :class="{ active: index == ins }" v-for="(item, index) in adressList" :key="index">
					<view class="item">姓名：{{ item.real_name }}</view>
					<view class="item">手机：{{item.phone}}</view>
					<view class="item">地区：{{item.address.province}}-{{item.address.city}}-{{item.address.district}}</view>
					<view class="item">地址：{{ item.detail }}</view>
					<view class="delete" @click="deleteitem(index)">
						<image src="/static/images/icon_delete_buoy.png" mode="widthFix"></image>
						
					</view>
				</view>
				<view class="item-content"><button type="primary" @click="addAddress">添加收货地址</button></view>
			</view>
		</view>
	</transition>
</template>

<script>
export default {
	name: 'shop-adress',
	props: {
		//开关
		adressShow: {
			type: Boolean,
			default: false
		},
		//地址列表
		adressList: {
			type: Array,
			default: null
		}
	},
	data() {
		return {
			ins: 0
			//adressShow:false
		};
	},
	methods: {
		//地址切换
		methdsActive(num) {
			this.ins = num;
		},
		
		deleteitem:function(index){
			this.$emit('deleteItems',index);
		},
		//取消按钮
		cancelDialog() {
			this.$emit('cancelDialogs');
		},
		//地址弹出窗选择确定
		confirmDialog() {
			var demons = this.adressList[this.ins];
			this.$emit('confirmDialog', demons);
		},
		addAddress(){
			this.$emit('addAddress')
		}
	}
};
</script>

<style lang="scss">
.choose-adress {
	position: fixed;
	background-color: #ededed;
	height: 800rpx;
	width: 100%;
	bottom: 0;
	z-index: 9999;
	border-top: 1px solid #f1f1f1;
	.c-a-title {
		display: flex;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #ffffff;
		border-bottom: 1px solid #f1f1f1;
		.title-item {
			flex: 1;
			text-indent: 20rpx;
			color: #2a2a2a;
			label {
				text-align: right;
				margin-right: 20rpx;
				display: block;
				color: #006598;
			}
		}
	}
	.adress-list {
		.item-content {
			position: relative;
			max-height: 700rpx;
			border-bottom: 1px solid #f1f1f1;
			width: 95%;
			margin: 20rpx auto;
			border-radius: 15rpx;
			.item {
				background-color: #ffffff;
				padding: 10rpx;
				text-indent: 20rpx;
			}
		}
		.active {
			border: 1px solid #0055ff;
		}
		.delete{
			position: absolute;
			top:-10rpx;
			right:-10rpx;
			image{
				width:40rpx;
				height:40rpx;
			}
		}
	}
}
</style>
