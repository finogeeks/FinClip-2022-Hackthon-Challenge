<template>
	<view class="content">
		<scroll-view scrollWithAnimation scrollX>
			<view class="scroll_follow_wrap">
				<view class="follow_item" v-for="(item,index) in userList" :key="index">
					<view @tap="jumpPerson(item.id)">
						<view class="follow_head_icon">
							<image class="user_head" mode="aspectFill" :src="item.avatar"></image>
							<image class="user_tag"
								:src="item.gender==1?require('@/static/images/male.png'):require('@/static/images/female.png')">
							</image>
						</view>
						<view class="user_name">{{item.name}}</view>
						<view class="user_tip">{{item.fans}}粉丝 · {{item.posts}}动态</view>
					</view>
					<button @tap="actionFollow(item.id,item.status,index)"  class="follow_btn" @
						:class="item.status==1?'followed_btn':'follow_no_btn'">{{item.status=='disfollow'?'已关注':'关注'}}</button>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "home-user",
		props: {
			userList: {
				type: Array,
				default: function() {
					return [];
				}
			},


		},
		data() {
			return {

			};
		},
		methods:{
			actionFollow:function(id,status,index){
				let data ={
					id:id,
					status,status,
					index,index
				}
				this.$emit('actionFollows',data)
			},
			jumpPerson:function(id){
				uni.navigateTo({
					url:'/pages/user/user?id='+id,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scroll_follow_wrap {
		display: inline-flex;
		margin-top:20rpx;
		padding: 0 30rpx;

		.follow_item {
			width: 245rpx;
			height: 335rpx;
			background: #f4f6f9;
			border-radius: 10rpx;
			padding: 20rpx;
			box-sizing: border-box;
			margin-right: 20rpx;
			position: relative;

			&:last-of-type {
				margin-right: 0;
			}

			.follow_head_icon {
				width: 100rpx;
				height: 100rpx;
				position: relative;
				margin: auto;

				.user_head {
					width: 100%;
					height: 100%;
					display: block;
					border-radius: 100%;
				}

				.user_tag {
					background: #fefefe;
					border-radius: 50%;
					padding:10rpx;
					width: 25rpx;
					height: 25rpx;
					display: block;
					position: absolute;
					bottom: 0;
					right: 0;
				}
			}

			.user_name {
				width: 160rx;
				font-size: 26rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #0f0f0f;
				line-height: 36rpx;
				padding-top: 15rpx;
			}

			.user_tip {
				font-size: 22rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #343434;
				line-height: 30rpx;
				padding-top: 20rpx;
			}

			.user_name,
			.user_tip {
				text-align: center;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.follow_btn {
				width: 160rpx;
				height: 54rpx;
				position: absolute;
				left: 0;
				right: 0;
				bottom: 20rpx;
				background: #6c8ff1;
				border-radius: 10rpx;
				font-size: 24rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 15rpx auto 0;
				color: #fff;
			}


		}
	}
</style>
