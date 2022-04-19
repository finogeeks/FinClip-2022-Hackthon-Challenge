<template>
	<view class="fc-main">
		<view class="fc-cards">
			<view @touchstart="playerTouchStart" @touchmove="playerTouchMove" @mousemove="playerTouchMove"
				@mouseup="playerTouchEnd" @touchend="playerTouchEnd" class="fc-card" v-for="(item,index) in cards"
				:key='index'
				:style="[{transform: `rotate(${cards[index].rotate+((disTagV-1)*5)}deg) translate3d(${cards[index].translateX}, ${cards[index].translateY}, 0px)`},{'z-index':`${cards[index].zIndex}`}, 
          { transition: `transform ${cards[index].transitionTime}s ease 0s` },{opacity:`${cards[index].opacity}`},{background:`${cards[index].color}`}]">

				<view class="fc-content">
					<view class="card" @tap='gotoDetail'>
						<view class="title">
							{{cardDatas[getIndex(index)].title.rendered}}
						</view>
						<view class="cover">
							<image :src="cardDatas[getIndex(index)].meta.thumbnail" mode="aspectFill"></image>
						</view>
						<view class="author">
							<text>by {{cardDatas[getIndex(index)].author.name}} </text>
							<text class="time">{{cardDatas[getIndex(index)].time}}</text>
						</view>
						<view class="summary">
							{{cardDatas[getIndex(index)].excerpt.rendered}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "HCard",
		props: {
			cardDatas: {
				type: Array,
				default: []
			},
			windowHeight: {
				type: Number,
				default: uni.getSystemInfoSync().windowHeight
			}
		},
		data() {
			return {
				isClick: true,
				move: {
					startX: 0,
					startY: 0, // 触摸位置
					endX: 0,
					endY: 0, // 结束位置
					moveX: 0,
					moveY: 0, // 滑动时的位置
					disX: 0,
					disY: 0, // 移动距离
				},
				dataIndex: 0,
				currentIndex: 0, // 当前第一个的 index
				disTagV: 1, //拖动的控制值0-1 1代表100%

				cards: this.initCard()
			}
		},
		methods: {
			initCard() {
				let cards = new Array();
				for (var x = 0; x < 4 && x < this.cardDatas.length; x++) {
					cards.push({
						translateX: 0,
						translateY: 0,
						opacity: 1,
						color: this.cardDatas[x].color == undefined ? '#FFFFFF' : this.cardDatas[x].color,
						transitionTime: 0.3 + (0.03 * x),
						zIndex: 4 - x,
						rotate: 1 * (x),
					})
				}
				return cards;
			},
			gotoDetail: function() {
				let index = 0;
				if (this.currentIndex + 1 == this.cardDatas.length) {
					index = 0;
				} else {
					index = this.currentIndex + 1;
				}
				let id = this.cardDatas[index].id;
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + id + '&type=posts'
				})
			},
			getIndex(index) {
				if (this.cards[index].zIndex != this.cards.length) {
					if (this.currentIndex + 1 == this.cardDatas.length) {
						return 0;
					} else {
						return this.currentIndex + 1;
					}
				} else {
					return this.currentIndex
				}
			},
			playerTouchStart(ev) {
				ev = ev || event
				this.isClick = true
				// tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
				if (ev.touches.length === 1) {
					// 记录开始位置
					this.move.startY = ev.touches[0].clientY
					this.move.startX = ev.touches[0].clientX;
				}
			},
			playerTouchMove(ev) {
				ev = ev || event
				this.isClick = false
				if (ev.touches.length === 1) {
					this.move.endY = ev.touches[0].clientY
					this.move.endX = ev.touches[0].clientX;
					let item_0 = this.cards[this.dataIndex];
					item_0.translateX = this.move.endX - this.move.startX;
					item_0.translateY = this.move.endY - this.move.startY;
					let td = item_0.translateX * item_0.translateX + item_0.translateY * item_0.translateY;
					td = Math.sqrt(td);
					item_0.opacity = 100 / td;
					this.disTagV = item_0.opacity <= 1 ? item_0.opacity : 1;
					item_0.translateX = item_0.translateX + 'px';
					item_0.translateY = item_0.translateY + 'px';
				}
			},
			playerTouchEnd(ev) {
				ev = ev || event
				this.isClick = false
				let item_0 = this.cards[this.dataIndex];
				if (item_0.opacity < 0.5) {
					if (this.currentIndex < this.cardDatas.length - 1) {
						this.currentIndex++;
					} else {
						this.currentIndex = 0;
					}
					if (this.dataIndex < this.cards.length - 1) {
						this.dataIndex++;
					} else {
						this.dataIndex = 0;
					}
					for (var x = 0; x < this.cards.length; x++) {
						var i = x,
							l = x;
						if (this.dataIndex + x < this.cards.length) {
							i = this.dataIndex + x;
						} else {
							i = this.dataIndex + x - this.cards.length;
						}

						if (this.currentIndex + x < this.cardDatas.length) {
							l = this.currentIndex + x;
						} else {
							l = this.currentIndex + x - this.cardDatas.length;
						}

						this.cards[i].translateX = 0;
						this.cards[i].translateY = 0;
						this.cards[i].color = this.cardDatas[l].color == undefined ? '#FFFFFF' : this.cardDatas[l].color;
						this.cards[i].opacity = 1;
						this.cards[i].transitionTime = 0.3 + (0.03 * x);
						this.cards[i].zIndex = 4 - x;
						this.cards[i].rotate = 1 * (x);
					}

					this.disTagV = 1;
					console.log(this.currentIndex)
				} else {
					item_0.translateX = 0;
					item_0.translateY = 0;
					item_0.opacity = 1;
					this.disTagV = 1;
				}

			},
		}
	}
</script>

<style lang="scss">
	.fc-main {
		padding-top: 120rpx;
		position: fixed;
		width: 100%;
		height: 100%;
		background: #FFFFFF;

		.fc-cards {
			margin-left: 30rpx;

			.fc-card {
				padding: 30rpx;
				position: absolute;
				width: 690rpx;
				height: 900rpx;
				background: #FFFFFF;
				border-radius: 40rpx;
				box-shadow: 0rpx 0rpx 20rpx rgba(98, 98, 98, 0.1);
				transform-origin: bottom right;

				.fc-content {
					.card {
						.title {
							margin: 20rpx 0rpx;
							font-size: 36rpx;
							font-weight: bold;
							color: #000;
							text-overflow: -o-ellipsis-lastline;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							line-clamp: 2;
							-webkit-box-orient: vertical;
						}

						.cover {
							display: block;
							width: 100%;
							height: 400rpx;

							image {
								width: 100%;
								height: 400rpx;
							}
						}

						.author {
							font-size: 24rpx;
							padding: 20rpx 0rpx;

							.time {
								padding-left: 20rpx;
							}
						}

						.summary {
							margin: 20rpx 0rpx;
							font-size: 28rpx;
							color: #434343;

						}
					}
				}
			}
		}
	}
</style>
