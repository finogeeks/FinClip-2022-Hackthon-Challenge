<template>
	<view class="content">
		<view class="recomment-list">
			<u-select v-model="show" :list="list" @confirm="confirm"></u-select>
			<view class="recommend-topic" v-for="(topic,index) in auditCircle" :key="index">
				<view bindtap="tapCate" class="cate-item">
					<view class="cate_image">
						<image mode="aspectFill" class="cate_cover_imags" :src="topic.cover"></image>
					</view>
					<view class="cate-title">
						<text style="vertical-align:middle">{{topic.name}}</text>
					</view>
					<view @click="delect(topic.id,index)" class="delete-icon">
						<image src="@/static/images/icon_delete_buoy.png" mode="aspectFill"></image>
					</view>
					<view class="cate-status" @tap="verify(index,topic.id,topic.status)">
						<text style="color:#55557f;vertical-align:middle" v-if="topic.status=='hold'">待审</text>
						<text style="color:#55aa7f;vertical-align:middle" v-if="topic.status=='approve'">通过</text>
						<text style="color:#aa0000;vertical-align:middle" v-if="topic.status=='unapprove'">驳回</text>
					</view>
					<view class="cate-desc">
						<text style="vertical-align:middle">简介：{{topic.description}}</text>
					</view>
					<view class="cate-time">
						<text style="vertical-align:middle">申请时间：{{topic.date}}</text>
					</view>
					<view class="cate-user">
						<text style="vertical-align:middle">圈主：{{topic.user_id}}</text>
					</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>

</template>

<script>
	import API from '@/api/api.js';
	export default {
		data() {
			return {
				page: 1,
				auditCircle: [],
				isLastPage: false,
				show: false,
				list: [{
						value: '1',
						label: '通过'
					},
					{
						value: '2',
						label: '驳回'
					}
				],
			}
		},
		onLoad() {
			this.getCircleAuditList();
		},
		onReachBottom() {
			if (!this.isLastPage) {
				this.getCircleAuditList({
					page: this.page
				})
			}
		},
		methods: {
			confirm: function(e) {
				console.log(e)
				let status = e[0].value;
				let index = this.index;
				if (status == '1') {
					let args = {
						id: this.id,
						status: 'approve',
					}
					API.verifyAudits(args).then(res => {
						if (res.status == 200) {
							this.auditCircle[index].status = 'approve';
						}
					}).catch(err => {
						console.log(err);
					})
				} else if (status == '2') {
					let args = {
						id: this.id,
						status: 'unapprove',
					}
					API.verifyAudits(args).then(res => {
						if (res.status == 200) {
							this.auditCircle[index].status = 'unapprove';
						}
					}).catch(err => {
						console.log(err);
					})
				}

			},
			delect: function(id, index) {
				let that = this;
				uni.showModal({
					title: '温馨提示',
					content: '删除后将无法恢复，是否删除?',
					success: function(res) {
						if (res.cancel) {
							that.$refs.uToast.show({
								title: '取消删除',
								type: 'info',
							})
						} else {
							API.deleteAudits(id).then(res => {
								if (res.status == 200) {
									that.$refs.uToast.show({
										title: '删除成功',
										type: 'success',
									})
									that.auditCircle.splice(index, 1);
								}
							})
						}
					},
					fail: function(err) {
						console.log(err)
					}
				})
			},
			verify: function(index, id, status) {

				if (status == "hold") {
					this.show = true;
					this.id = id;
					this.index = index;
				}
			},
			getCircleAuditList: function(args) {
				API.getAuditCircleList(args).then(res => {
					if (res.length < 10) {
						this.isLastPage = true
						this.status = "nomore"
					}
					this.auditCircle = this.auditCircle.concat(res)
					this.page = this.page + 1
					this.isLoading = false

				}).catch(err => {
					console.log(err);
					if (err.message == "授权信息错误, 无法提交申请") {
						this.$refs.uToast.show({
							title: '登录过期',
							type: 'error',
						})
						uni.navigateTo({
							url: '/pages/login/login'
						})
					}
				})
			},
		}
	}
</script>

<style>
	.content {
		background: #f9f9f9;
	}

	.recomment-list {
		background: #fff;
	}

	.recommend-topic {
		width: 690rpx;
		margin: 30rpx auto;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		box-shadow: 0px 0rpx 10rpx 0px rgba(149, 149, 149, 0.2);
	}

	.cate-item {
		background: #fff;
		width: 710rpx;
		height: 468rpx;
		position: relative;
		border-radius: 20rpx;
		margin-bottom: 40rpx;
	}

	.cate-image {
		display: flex;
		flex-direction: row;
		position: absolute;
		top: 250rpx;
	}

	.cate-image image {
		border-radius: 20rpx;
		margin: 0 0 0 20rpx;
		width: 135rpx;
		height: 135rpx;
	}

	.cate-mask {
		position: absolute;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 2;
		left: 0;
		top: 0;
	}

	.right-arrow {
		position: absolute;
		font-weight: bold;
		right: 30rpx;
		top: 314rpx;
	}

	.cate-title {
		position: absolute;
		font-weight: bold;
		left: 30rpx;
		top: 314rpx;
		font-size: 38rpx;
		line-height: 40rpx;
		color: #000;
		width: 230rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.cate-status {
		position: absolute;
		font-weight: bold;
		right: 20rpx;
		top: 314rpx;
		font-size: 28rpx;
		line-height: 40rpx;
		color: #000;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.cate-status text {
		background: #F4F3F7;
		padding: 30rpx;
		width: 200rpx;
	}

	.cate-desc {
		position: absolute;
		left: 30rpx;
		right: 30rpx;
		top: 374rpx;
		font-size: 24rpx;
		line-height: 36rpx;
		color: #999;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		white-space: pre-wrap;
	}

	.cate-time {
		position: absolute;
		left: 30rpx;
		top: 414rpx;
		font-size: 24rpx;
		line-height: 36rpx;
		color: #999;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		white-space: pre-wrap;
	}

	.cate-user {
		position: absolute;
		right: 30rpx;
		top: 414rpx;
		font-size: 24rpx;
		line-height: 36rpx;
		color: #999;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		white-space: pre-wrap;
	}

	.delete-icon {
		position: absolute;
		right: -15rpx;
		top: -15rpx;
		width: 45rpx;
		height: 45rpx;
		z-index: 100;
		box-shadow: 0rpx 0rpx 20rpx rgba(98, 98, 98, 0.1);
	}

	.delete-icon image {
		width: 45rpx;
		height: 45rpx;
	}

	.recommend-topic {
		white-space: wrap;
	}

	.cate_image {
		height: 294rpx;
	}

	.cate_cover_imags {
		width: 100%;
		height: 100%;
	}

	.cate-desc {
		font-size: 24rpx;
		line-height: 36rpx;
		width: 560rpx;
		color: #999;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		white-space: pre-wrap;
	}
</style>
