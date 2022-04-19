<template>
	<view class="content">
		<view class="search-form-inner">
			<view class="search-box">
				<view class="search-icon"></view>
				<input :focus="true" @confirm="onSearchConfirm" @input="onSearchInput" class="input"
					confirmType="search" maxlength="maxLen" name="keyword" :placeholder="preKeyword||'搜素你感兴趣的'"
					placeholderClass="placeholder" type="text" :value="keyword"></input>
				<view @click="clean" class="delete-icon" v-if="keyword.length>0"></view>
			</view>
			<button class="search-btn" @tap="onSearchConfirm" v-if="keyword">搜索</button>
			<button @tap="onCancelBtnClick" class="search-btn" v-else>取消</button>
		</view>
		<view class="hit_search" v-if="searchViewVisible">
			<u-section font-size="36" :show-line="false" title="热门搜索" :right="false"></u-section>
			<view class="hit_words">
				<view @tap="searchStat(item.name)" class="relative" v-for="(item,index) in tags" :key="index">
					<view class="keywords">{{item.name}}</view>
				</view>
			</view>
		</view>
		<view class="resulut" v-if="!searchViewVisible">
			<view class="tab-bar">
				<u-tabs item-width="100" :list="navbar" :is-scroll="false" :current="current" @change="change"
					:active-item-style="activeStyle" :bar-style="barStyle" inactive-color="#8f8f8f"></u-tabs>
			</view>
			<view class="content" v-if="nulls==true">
				<empty-list text="暂无内容"></empty-list>
			</view>
			<view class="content" v-else>
				<view class="topicList" v-if="current==0">
					<view class="wfw">
						<view class="wf_left">
							<helang-waterfall v-for="(item,index) in leftList" :key="index" :params="item" tag="left"
								:index="index" @height="onHeight" @click="onClick"></helang-waterfall>
						</view>
						<view class="wf_right">
							<helang-waterfall v-for="(item,index) in rightList" :key="index" :params="item"
								@height="onHeight" @click="onClick" tag="right" :index="index"></helang-waterfall>
						</view>
					</view>
					<u-loadmore :margin-top="40" :status="status" />
				</view>
				<view class="articleList" v-if="current==1">
					<article-list :posts="posts" type="posts"></article-list>
					<u-loadmore :margin-top="40" :status="status" />
				</view>
				<view class="categoryList" v-if="current==2">
					<circle-list :cates="cates"></circle-list>
					<u-loadmore :margin-top="40" :status="status" />
				</view>
				<view class="categoryList" v-if="current==3">
					<user-list :user="user"></user-list>
					<u-loadmore :margin-top="40" :status="status" />
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	import API from '@/api/api.js'
	export default {
		data() {
			return {
				keyword: '',
				tags: [],
				posts: [],
				leftHeight: 0,
				rightHeight: 0,
				leftList: [],
				rightList: [],
				cates: [],
				user: [],
				current: 0,
				page: 1,
				nulls: false,
				isLastPage: false,
				preKeyword: '搜索你感兴趣的内容',
				searchViewVisible: true,
				navbar: [{
						name: '动态'
					},
					{
						name: '资讯'
					},
					{
						name: '圈子'
					},
					{
						name: '用户'
					}
				],
				barStyle: {
					'background': '#6c8ff1',
				},
				activeStyle: {
					'font-size': '36rpx',
					'color': '#434343',
					'font-weight': '700',
					'background-image': "url('https://s3.bmp.ovh/imgs/2021/09/6872cdb5f2c28f97.png')",
					'position': 'relative',
					'background-size': '34rpx',
					'background-position': '50%',
					'background-repeat': 'no-repeat',
				},
			}
		},
		onLoad() {
			this.getTags();
		},
		onReachBottom() {
			if (!this.isLastPage && this.current == 0) {
				this.getTopicList({
					search: this.keyword,
					page: this.page
				});
			} else if (!this.isLastPage && this.current == 1) {
				this.getPostsList({
					search: this.keyword,
					page: this.page
				});
			} else if (!this.isLastPage && this.current == 2) {
				this.getCircleList({
					search: this.keyword,
					page: this.page
				});
			} else if (!this.isLastPage && this.current == 3) {
				this.getUserBySearch({
					keyword: this.keyword,
					page: this.page
				});
			}
		},
		methods: {
			change: function(e) {
				this.page = 1;
				this.topicload = true;
				this.leftHeight = 0;
				this.rightHeight = 0;
				this.leftList = [];
				this.rightList = [];
				this.posts=[];
				this.cates= [];
				this.user= [];
				this.current = e;
				this.isLastPage = false;
				this.status = "loading";
				this.nulls = false;
				switch (e) {
					case 0:
						this.getTopicList({
							search: this.keyword,
							page: this.page
						});
						break;
					case 1:
						this.getPostsList({
							search: this.keyword,
							page: this.page
						});
						break;
					case 2:
						this.getCircleList({
							search: this.keyword,
							page: this.page
						});
						break;
					case 3:
						this.getUserBySearch({
							keyword: this.keyword,
							page: this.page
						});
						break;
				}

			},
			getTags: function(args) {
				API.getTags(args).then(res => {
						this.tags = this.tags.concat(res)
					})
					.catch(err => {})
			},
			onSearchInput: function(e) {
				this.keyword = e.detail.value
			},
			searchStat: function(keyword) {
				this.keyword = keyword;
				this.onSearchConfirm();
			},
			onSearchConfirm: function() {
				this.posts = [];
				this.page = 1;
				this.isLastPage = false;
				this.status = "loading";
				this.searchViewVisible = false;
				this.getTopicList({
					search: this.keyword,
					page: this.page
				})
			},
			getPostsList: function(args) {
				API.getPostsList(args).then(res => {
					if (res.length == 0) {
						this.nulls = true

					}
					if (res.length < 10) {
						this.isLastPage = true
						this.status = "nomore"
					}
					this.posts = this.posts.concat(res)
					this.page = this.page + 1
					this.isLoading = false
				}).catch(err => {
					console.log(err)
				})
			},
			getCircleList: function(args) {
				API.getCircleList(args).then(res => {
					if (res.length == 0) {
						this.nulls = true

					}
					if (res.length < 10) {
						this.isLastPage = true
						this.status = "nomore"
					}
					this.cates = this.cates.concat(res)
					this.page = this.page + 1
					this.isLoading = false
				}).catch(err => {
					console.log(err)
				})
			},
			getUserBySearch: function(args) {
				API.getUserSearch(args).then(res => {
					if (res.length == 0) {
						this.nulls = true

					}
					if (res.length < 10) {
						this.isLastPage = true
						this.status = "nomore"
					}
					this.user = this.user.concat(res)
					this.page = this.page + 1
					this.isLoading = false
				}).catch(err => {
					console.log(err)
				})
			},
			clean: function() {
				this.keyword = '';
				this.posts = [];
				this.page = 1;
				this.isLastPage = false;
				this.status = "loading";
				this.searchViewVisible = true;
			},
			onCancelBtnClick: function() {
				uni.navigateBack({
					delta: 1
				})
			},
			onHeight(height, tag) {
				if (tag == 'left') {
					this.leftHeight += height;
				} else {
					this.rightHeight += height;
				}
			},
			getTopicList: function(args) {
				API.getTopicList(args).then(res => {
						if (res.length == 0) {
							this.nulls = true
						}
						if (res.length < 10) {
							this.isLastPage = true
							this.status = "nomore"
						}
						this.addList(res);
					})
					.catch(err => {})
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
			}

		},
	}
</script>

<style lang="scss" scoped>
	.search-form-inner {
		position: fixed;
		left: 0;
		padding: 30rpx;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		background-color: #fff;
		z-index: 11;

		.search-box {
			flex: 1;
			width: 550rpx;
			height: 60rpx;
			padding: 0 14rpx 0 30rpx;
			border-radius: 30rpx;
			display: flex;
			align-items: center;
			background-color: #f4f3f7;

			.search-icon {
				width: 28rpx;
				height: 28rpx;
				background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcBAMAAACAI8KnAAAAMFBMVEVHcEzPzNrPzNrOzdvPzNrPzNnOzNrNzf/PzdnPzNnPzNrPzNnW1tbPzNrT09PPzNmGgbnPAAAAD3RSTlMAbfce1uUoAqd3uUUGWws8T62yAAAAvklEQVQY02NgwASWS5W8JsN5Fv9BoBnKq9YHcz9dgHDl/0PARzCP9///L2JnEv3//wdLG/3/JA6kCvX/K4O4/f+1wao2/f8BJJn//xcAcxn//zdgYOD8/6UAzGX3/z+BgYELaiLIhgUMDKz/v0G5+f8DGBiY/v+Bcs//V0Dmvgdx0RSjGYVmEZoz0ByJ7gWwB8+BPPgRxftQQ7ihgQOVZocGnTw0PEABGzUZZFMAPHTZQYY4IIc+b8gGZC5QAQDBUYA46nAy4gAAAABJRU5ErkJggg==') no-repeat 0 0;
				background-size: contain;
				margin-right: 18rpx;
			}

			.delete-icon {
				width: 38rpx;
				height: 38rpx;
				background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD6klEQVRYR8WXTWwbVRDH578fxLFoUSsoAloqhJDaQqE9UKLgrHnPiloKHOCQiiMCIY5UlRAFri2IAwKJEx9nEIdyoFSgyPvWm40VoQChtAeEeoj4DKAiNyjBsXcHvcqJvJtde50G9d28npn/b+fNm50Hus4L11mfNgQwOztrLy4u3kpEO4mobRjGwsLCwq8TExPhoC+UG0AptRPA01EUPU5EJQBGtxgza/FpwzDOMvNHQoif88D0BZiZmdm6vLx8koheJKJCnqBE9C8RvW3b9ulSqbTYy6cnQLVavRtAFcDunMIxM2b+xbKspxzH+SrLPxPAdd2HiOgcgO0bEe/yaRPRC0KID9PipALUarVdURR9R0TbrlH8qnunPg5LKavJeOsAlFIFZv4awL7NEF+NwcwNy7L2Oo7zW3fcNICXiej1hPgXzPwBEb0E4FAvMGbW+/0mgOeI6EjipLwvpXw+E2Bqampbu92eJ6ItCcdjUspPlFI3MvM0gPvTIDqZe0QI8Y9S6hgRfZyIExHRPinlD6vPYxnwPO84M7+VDM7M3xSLRTEyMnKlXq9vbzabARHtTQQ/H4ahMz4+3ugcXY+IDqaAnhJCvJYK4LpuDYCTkeK54eHhsobwff+WMAynieieju2Ppmk+7DjOnx3xGhEdyMjSRSnlfesAgiDY0mq1GkQ923M3xG1hGNZ1INM0R3VxdbbQzRJfFTVNc4eG1b/XtqBWq+2Pouh8jsqfsyxLjo2N/V2tVndblhWVy+WftHir1ZoCcG+OGAeFEHMxANd1jwL4PIezPtcXbdse0xDaXil1MzN7OcW1/2NSynMxAM/zHmXmqw/7LQ0AQFf7XxsEOCKl/DIGoJTSRfNtHvHVtw+C4M5ms4lKpTI/4BbsF0JciAF0KvuPPgBr++/7/kaLkIloq+4VMQD9w3VdndqsFtzzGA4NDY2Mjo5eznEMfSllObUPKKV0C9atOLZ0hysWi3KQRrS0tOQDeCAl1gkp5Vqzi3VCpdSeToHFph0iekIIcXZycvIm0zR14L6t2PO8J5n5TDcAM18pFAp36UylZqBT0fqj82yC/NMoit4FcBqAnhN6rZkoil4FcALA0YThSSHEG93P1n0NgyC4fWVl5ftNGESSkLrqHxRC6HFtbaUOJEqpUqexmP2OZZ7/mfmyaZoHdMdM2meOZJ7nPcPM7xGRlUcky0aLAzgshJhNs+k5lPq+f6jdbp8BcMdGIJh5npkrlUrlUpZ/3rH8FWY+DuCGnCB6n9+xbfvUNY3l3WJ5LiYA6gA+29SLSdob66tZo9HYYRjGLgAhgN//96tZztQPbNa3BgaOOKDDf+ESDj90wCYAAAAAAElFTkSuQmCC') no-repeat 0 0;
				background-size: contain;
				margin-right: 18rpx;
				z-index: 999;
			}


			.input {
				flex: 1;
				font-size: 28rpx;
				color: #252628;
			}

			.placeholder {
				font-size: 28rpx;
				color: #b7b5c2;
			}
		}

		.search-btn,
		.cancel-btn {
			width: 120rpx;
			height: 60rpx;
			margin-left: 30rpx;
			line-height: 60rpx;
			padding: 0;
			border: none;
			font-size: 28rpx;
			background: #fff;
			color: #434343;
		}

	}

	.hit_search {
		padding: 133rpx 32rpx 0;

		.hit_words,
		.relative {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
		}

		.keywords {
			color: #6b6a72;
			display: inline-block;
			background: #f4f3f7;
			border-radius: 100rpx;
			padding: 14rpx 33rpx;
			margin: 20rpx 20rpx 0 0;
			max-width: 260rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: 22rpx;
		}
	}

	.resulut {
		padding: 100rpx 0rpx;
	}

	.tab-bar {
		position: fixed;
		z-index: 99;
		width: 100%;
	}

	.wfw {
		margin: 20rpx;

		.wf_left,
		.wf_right {
			display: inline-block;
			vertical-align: top;
			width: 50%;
		}
	}

	.topicList {
		padding-top: 80rpx;
	}

	.articleList {
		padding-top: 40rpx;
	}

	.categoryList {
		padding-top: 80rpx;
	}

	.taglist {
		padding: 80rpx 30rpx;
	}
</style>
