<template>
	<view class="content">
		<view class="wfw">
			<view class="wf_left">
				<helang-waterfall v-for="(item,index) in leftList" :key="index" :params="item" tag="left" :index="index"
					@height="onHeight" @click="onClick"></helang-waterfall>
			</view>
			<view class="wf_right">
				<helang-waterfall v-for="(item,index) in rightList" :key="index" :params="item" @height="onHeight"
					@click="onClick" tag="right" :index="index"></helang-waterfall>
			</view>
		</view>
		<u-loadmore :margin-top="40" :status="status" />
	</view>
</template>

<script>
	import API from '@/api/api.js';
	var app = getApp();
	export default {
		data() {
			return {
				id: '',
				page: 1,
				leftHeight: 0,
				rightHeight: 0,
				leftList: [],
				rightList: [],
				isLastPage: false,
				status: "loading",
			}
		},
		onLoad(options) {
			this.getUserFavPosts();
		},
		onReachBottom() {
			if (!this.isLastPage) {
				this.getUserFavPosts({
					page: this.page
				})
			}
		},
		methods: {
			getUserFavPosts: function(args) {
				API.getFavPosts(args).then(res => {
						if (res.length == 0) {
							this.nulls = true
						}
						if (res.length < 10) {
							this.isLastPage = true;
							this.status = "nomore"

						}
						this.addList(res);
					})
					.catch(err => {})
			},
			onHeight(height, tag) {
				if (tag == 'left') {
					this.leftHeight += height;
				} else {
					this.rightHeight += height;
				}
			},
			addList(res) {
				// 获取到的数据，请注意数据结构
				console.log(res);

				if (!res || res.length < 1) {

					return;
				}

				// 左右列表高度的差
				let differ = this.leftHeight - this.rightHeight;
				// 计算差值，用于确定优先插入那一边
				let differVal = 0;

				// 初始化左右列表的数据
				let i = differ > 0 ? 1 : 0;

				let [left, right] = [
					[],
					[]
				];


				// 获取插入的方向
				let getDirection = (index) => {
					/* 左侧高度大于右侧超过 600px 时，则前3条数据都插入到右边 */
					if (differ >= 600 && index < 3) {
						differVal = 1;
						return 'right';
					}

					/* 右侧高度大于左侧超过 600px 时，则前3条数据都插入到左边 */
					if (differ <= -600 && index < 3) {
						differVal = -1;
						return 'left';
					}

					/* 左侧高度大于右侧超过 350px 时，则前2条数据都插入到右边 */
					if (differ >= 350 && index < 2) {
						return 'right';
					}
					/* 右侧高度大于左侧超过 350px 时，则前2条数据都插入到左边 */
					if (differ <= -350 && index < 2) {
						differVal = -1;
						return 'left';
					}

					/* 当前数据序号为偶数时，则插入到左边 */
					if ((i + differVal) % 2 == 0) {
						return 'left';
					} else {
						/* 当前数据序号为奇数时，则插入到右边 */
						return 'right';
					}
				}

				// 将数据源分为左右两个列表，容错差值请自行根据项目中的数据情况调节
				res.forEach((item, index) => {
					if (getDirection(index) == 'left') {
						//console.log(`差值：${differ},方向：left，序号${index}`)
						left.push(item);
					} else {
						//console.log(`差值：${differ},方向：right，序号${index}`)
						right.push(item);
					}
					i++;
				});

				// 将左右列表的数据插入，第一页时则覆盖
				if (this.page == 1) {
					this.leftList = left;
					this.rightList = right;
					uni.stopPullDownRefresh();
				} else {
					this.leftList = [...this.leftList, ...left];
					this.rightList = [...this.rightList, ...right];
				}

				this.page++;
				this.topicload = false;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.wfw {
		margin: 20rpx;

		.wf_left,
		.wf_right {
			display: inline-block;
			vertical-align: top;
			width: 50%;
		}
	}
</style>
