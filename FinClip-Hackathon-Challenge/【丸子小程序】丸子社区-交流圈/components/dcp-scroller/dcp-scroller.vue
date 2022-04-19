<template>
	<view class="scroller-content">
		<view :class="['loading-box flex-center', { loading: status > 1 }]" :style="{
				height: `${move}rpx`,
				opacity: `${Math.abs(move*10 / maxPull)}`
			}">
			<view class="downwarp-content">
				<view v-if="status === 2" class="downwarp-progress"></view>
				<view v-else class="downwarp-arrow" :style="status === 1 ? 'transform:rotate(-180deg)' : 'transform:rotate(0deg)'">
				</view>
				<view class="downwarp-tip">{{ downText }}</view>
			</view>
		</view>
		<view class="scrollerbox" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			isLoading: {
				type: Boolean,
				required: true
			}
		},
		data() {
			return {
				winHeight: 2000,

				// 滑动距离
				move: 0,

				// 加载区域高度 触发点
				offset: 10,

				// 最大可下拉距离
				maxPull: 40,

				// 是否操作中
				action: false,

				// 0.初始  1.松开可刷新  2.刷新中  3.刷新成功
				status: 0,
				downText: '下拉刷新'
			};
		},
		mounted() {
			const systemInfo = uni.getSystemInfoSync();
			if (systemInfo && systemInfo.screenHeight) {
				this.winHeight = systemInfo.screenHeight;
			}
		},
		watch: {
			isLoading(newVal) {
				// 父级传递刷新
				if (newVal) {
					this.status = 2;
					this.downText = '刷新中';
					this.move = this.offset;
				} else {
					// 不刷新回弹动画
					this.status = 3;
					this.downText = '刷新成功';
					// 加载成功，露出350ms
					setTimeout(() => {
						this.close();
					}, 350);
				}
			}
		},
		methods: {
			touchstart(ev) {
				if (this.action) return;
				this.startY = ev.changedTouches[0].clientY;
			},
			touchmove(ev) {
				const {
					startY,
					winHeight,
					offset,
					maxPull
				} = this;

				const diffY = ev.changedTouches[0].clientY - startY;

				if (diffY < 0) return;

				// 阻尼算法 正弦函数0-90°段 0-1之间
				const rate = Math.sin(Math.PI * 0.5 * (diffY / winHeight));
				const move = maxPull * rate;

				this.move = move;
				this.status = move < offset ? 0 : 1;
				this.downText = move < offset ? '下拉刷新' : '释放更新';
			},
			touchend() {
				uni.createSelectorQuery().selectViewport().scrollOffset(res => {
					console.log(res);
					console.log("竖直滚动位置" + res.scrollTop);
					if (res.scrollTop > 500) {
						this.close();
						return;
					};

					if (this.move > this.offset) {
						this.$emit('refresh');
						this.move = this.offset;
						setTimeout(() => {
							this.close();
						}, 1000);
					} else {
						this.close();
					}
				}).exec();
			},
			close() {
				this.action = false;
				this.status = 2;
				this.downText = '刷新中';
				// 动画完成以后重置
				setTimeout(() => {
					this.status = 0;
				}, 1000);
			},
			// 手动触发下拉刷新
			refresh() {
				this.status = 2;
				this.downText = '刷新中';
				this.move = 50;

				setTimeout(() => {
					this.status = 3;
					this.downText = '刷新完成';
					// 加载成功，露出350ms
					setTimeout(() => {
						this.close();
					}, 350);
				}, 300);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.flex-center {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.loading-box {
		&.loading {
			transition: height .3s;
		}

		image {
			width: 32rpx;
			height: 32rpx;
			animation: rightSpin 2s linear infinite both;
		}

		text {
			margin-left: 4px;
			font-size: 30rpx;
			color: #909090;
			text-shadow: 1rpx 1rpx 4rpx #fff;
		}
	}

	@keyframes rightSpin {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	.scroller-content::-webkit-scrollbar {
		display: none !important;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
	
	.downwarp-content{
		display: flex;
	}
	
	.downwarp-tip{
		font-size: 30rpx;
		line-height: 32rpx;
		color:#bababa;
	}

	/*下拉刷新--上下箭头*/
	.downwarp-arrow {
		display: inline-block;
		width: 32rpx;
		height: 32rpx;
		margin: 0rpx 10rpx;
		background-image: url(https://www.mescroll.com/img/xinlang/mescroll-arrow.png);
		background-size: contain;
		vertical-align: bottom;
		transition: all 300ms;
	}

	/*下拉刷新--旋转进度条*/
	.downwarp-progress {
		width: 36px;
		height: 36px;
		border: none;
		margin: auto;
		background-size: contain;
		animation: progressRotate 0.6s steps(6, start) infinite;
	}

	@keyframes progressRotate {
		0% {
			background-image: url(https://www.mescroll.com/img/xinlang/mescroll-progress1.png);
		}

		16% {
			background-image: url(https://www.mescroll.com/img/xinlang/mescroll-progress2.png);
		}

		32% {
			background-image: url(https://www.mescroll.com/img/xinlang/mescroll-progress3.png);
		}

		48% {
			background-image: url(https://www.mescroll.com/img/xinlang/mescroll-progress4.png);
		}

		64% {
			background-image: url(https://www.mescroll.com/img/xinlang/mescroll-progress5.png);
		}

		80% {
			background-image: url(https://www.mescroll.com/img/xinlang/mescroll-progress6.png);
		}

		100% {
			background-image: url(https://www.mescroll.com/img/xinlang/mescroll-progress1.png);
		}
	}
</style>
