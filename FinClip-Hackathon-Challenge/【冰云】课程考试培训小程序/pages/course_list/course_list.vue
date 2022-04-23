<template>
	<!--
	 本页面模板教程：https://ext.dcloud.net.cn/plugin?id=2546
	 uni-list 文档：https://ext.dcloud.net.cn/plugin?id=24
	 uniCloud 文档：https://uniapp.dcloud.io/uniCloud/README
	 unicloud-db 组件文档：https://uniapp.dcloud.io/uniCloud/unicloud-db
	 DB Schema 规范：https://uniapp.dcloud.net.cn/uniCloud/schema
	 -->
	<view>

		<!-- 刷新页面后的顶部提示框 -->
		<!-- 当前弹出内容没有实际逻辑 ，可根据当前业务修改弹出提示 -->
		<view class="tips" :class="{ 'tips-ani': tipShow }">为您更新了10条最新新闻动态</view>
		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" :options="formData" :collection="collection"
		 :field="field" @load="load">
			<!-- 基于 uni-list 的页面布局 -->
			<uni-list>
				<!-- direction 属性决定列表的排版方向 -->
				<!-- to 属性携带参数跳转详情页面，当前只为参考 -->
				<uni-list-item direction="row" v-for="item in data" :key="item._id" :direction="(item.mode === 1 || item.mode === 2 || item.mode === 3 || item.mode === 6) ? 'column' : 'row'" :to="'/pages/detail/detail?id='+item._id+'&title='+item.title">
					<!-- 自定义 header 内容 -->
					<template v-slot:header>
						<!-- header 决定了列表是否显示左图/顶图，或者是否显示顶部 title -->
						<view v-if="item.mode === 4" class="uni-thumb">
							<image :src="item.avatar" mode="aspectFill"></image>
						</view>
						<view v-if="item.mode !== 4 && item.mode !== 5" class="uni-title">{{ item.title }}</view>
					</template>
					<!-- 自定义 body 内容 -->
					<template v-slot:body>
						<!-- body 决定了列表是否显示多图/大图，以及自定义列表内容 -->
						<view class="content" :class="{ 'uni-content': item.mode === 1, 'uni-list-box': item.mode === 2, 'uni-media-box': item.mode === 3 }">
							<!-- 显示大图 -->
							<view v-if="item.mode === 1 || item.mode === 2" class="uni-thumb" :class="{ 'uni-content': item.mode === 1, ' list-picture': item.mode === 1 }">
								<image class="thumb-image" :src="item.avatar" mode="aspectFill"></image>
							</view>
							<!-- 显示多图 -->
							<image v-if="item.mode === 3" v-for="(img,index) in item.avatar" :key="index" class="uni-thumb" :src="img" mode="aspectFill"></image>
							<!-- 显示自定义内容 -->
							<view class="uni-content">
								<view v-if="item.mode !== 1 && item.mode !== 3" class="uni-title-sub uni-ellipsis-2">{{ item.excerpt }}</view>
								<view v-if="item.mode !== 3" class="uni-note">{{ item.user_name }} {{ item.last_modify_date }}</view>
							</view>
						</view>
					</template>
					<!-- 自定义 footer 内容 -->
					<template v-slot:footer>
						<!-- footer 决定了列表底部的内容，通常会放一些按钮，比如点赞，评论 -->
						<view v-if="item.mode === 2" class="uni-footer">
							<view>
								<uni-icons type="chat" size="14" color="#999"></uni-icons>
								<text class="uni-footer-text">评论</text>
							</view>
							<view>
								<uni-icons type="hand-thumbsup" size="14" color="#999"></uni-icons>
								<text class="uni-footer-text">点赞</text>
							</view>
							<view>
								<uni-icons type="redo" size="14" color="#999"></uni-icons>
								<text class="uni-footer-text">分享</text>
							</view>
						</view>
						<view v-if="item.mode === 3" slot="footer" class="uni-note">{{ item.user_name }} {{ item.last_modify_date }}</view>
						<view v-if="item.mode === 5" slot="footer" class="uni-thumb" style="margin: 0;">
							<image :src="item.avatar" mode="aspectFill"></image>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
			<!-- 通过 loadMore 组件实现上拉加载效果，如需自定义显示内容，可参考：https://ext.dcloud.net.cn/plugin?id=29 -->
			<uni-load-more v-if="loading || options.status === 'noMore' " :status="options.status" />
		</unicloud-db>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				// 数据表名
				collection: 'opendb-news-articles',
				// 查询字段，多个字段用 , 分割
				field: '_id,mode,avatar,title,user_name,excerpt,last_modify_date',
				formData: {
					status: 'loading' // 加载状态
				},
				tipShow: false // 是否显示顶部提示框
			};
		},
		onLoad() {},
		methods: {
			
			load(data, ended) {
				if (ended) {
					this.formData.status = 'noMore'
				}
			}
		},
		/**
		 * 下拉刷新回调函数
		 */
		onPullDownRefresh() {
			this.formData.status = 'more'
			this.$refs.udb.loadData({
				clear: true
			}, () => {
				this.tipShow = true
				clearTimeout(this.timer)
				this.timer = setTimeout(()=>{
					this.tipShow  = false
				},1000)
				uni.stopPullDownRefresh()
			})
		},
		/**
		 * 上拉加载回调函数
		 */
		onReachBottom() {
			this.$refs.udb.loadMore()
		}
	};
</script>

<style lang="scss">
	@import '@/common/uni-ui.scss';

	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	.tips {
		color: #67c23a;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
		background-color: #f0f9eb;
		height: 0;
		opacity: 0;
		transform: translateY(-100%);
		transition: all 0.3s;
	}

	.tips-ani {
		transform: translateY(0);
		height: 40px;
		opacity: 1;
	}

	.content {
		width: 100%;
		display: flex;
	}

	.list-picture {
		width: 100%;
		height: 145px;
	}

	.thumb-image {
		width: 100%;
		height: 100%;
	}

	.ellipsis {
		display: flex;
		overflow: hidden;
	}

	.uni-ellipsis-1 {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.uni-ellipsis-2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
