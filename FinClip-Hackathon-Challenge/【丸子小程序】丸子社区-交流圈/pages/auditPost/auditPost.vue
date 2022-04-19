<template>
	<view class="content">
		<audit-list :posts="posts" @comfirmed='comfirm' v-if="posts"></audit-list>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import API from '@/api/api.js';
	export default {
		data() {
			return {
				posts: [],
				isLastPage: false,
				page: 1,

			}
		},
		onLoad() {
			this.getReviewLists();
		},
		onReachBottom() {
			console.log(1);
			if (!this.isLastPage) {
				this.getReviewLists({
					page: this.page
				})
			}
		},
		methods: {
			getReviewLists: function(args) {
				let that=this;
				API.getReview(args).then(res => {
					if (res.length < 10) {
						this.isLastPage = true
						this.status = "nomore"
					}
					this.posts = this.posts.concat(res)
					this.page = this.page + 1
					this.isLoading = false
				}).catch(err => {
					if (err.message == '未授权登录用户不能查看审核') {
						uni.showModal({
							title: '温馨提示',
							content: '检测出授权已过期, 是否前往登陆?',
							success: function(res) {
								if (res.cancel) {
									that.$refs.uToast.show({
										title: '取消登录',
										type: 'success',
									})
									that.status = "nomore"
								} else {
									uni.navigateTo({
										url: '/pages/login/login'
									})
								}
							},
							fail: function(err) {
								console.log(err)
							}
						})
					}
				})
			},
			comfirm: function(e) {
				let id = e.id;
				let index = e.index;
				let status = e.data[0].value;
				let that = this;
				if (status === '1') {
					let args = {
						post_id: id,
						post_status: 'publish',
						id: id,
						status: 'publish'
					}
					API.reViewPostByAdmin(args).then(res => {
						if (res.status == 200) {
							that.$refs.uToast.show({
								title: '审核通过',
								type: 'success',
							})
							that.posts.splice(index, 1);
						}
					}).catch(err => {
						if (err.message == "未授权登录用户,不能删除文章") {
							uni.navigateTo({
								url: '/pages/login/login'
							})
						}
					})
				} else {
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
								API.deletePostByAdmin(id).then(res => {
									if (res.status == 200) {
										that.posts.splice(index, 1);
										that.$refs.uToast.show({
											title: '删除成功',
											type: 'success',
										})
									}
								})
							}
						},
						fail: function(err) {
							console.log(err)
						}
					})
				}
			},

		}
	}
</script>

<style>

</style>
