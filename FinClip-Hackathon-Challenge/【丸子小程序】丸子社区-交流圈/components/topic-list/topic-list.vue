<template>
	<view class="content">
		<view class="article_item">
			<view class="article_head">
				<!-- 新版头像框 -->
				<view @tap="gotoUser(datas.author.id)">
					<image class="article_photo vip_head_frame_margin" :src="datas.author.avatar" :style="'z-index:1'">
					</image>
				</view>
				<view class="article_user_info" @tap="gotoUser(datas.author.id)">
					<view class="article_user_nick_box">
						<text class="article_user_nick">{{datas.author.name}}</text>
						<image class="vip_img" :src="datas.author.honour.icon"></image>
					</view>
					<view class="article_user_des"><text
							class="article_user_school">{{datas.author.honour.title}}</text> <text
							class="article_lasttime">{{datas.time}}</text></view>
				</view>
				<view class="article_btns" @tap="followUser(datas.author.id,datas.author.status)">
					<text class="article_btn_follow "
						:class="datas.author.status=='follow'?'article_btn_active':'article_btn_none'">{{datas.author.status=='follow'?'+ 关注':'已关注'}}</text>
				</view>
			</view>
			<text class="article_huati" v-for="(tag,index) in datas.topic" :key='index'>#{{tag.name}}#</text>
			<text class="article_content" @tap="gotoDetail(datas.id)">{{datas.excerpt.rendered}}</text>
			<view class="article_imgs" v-if="datas.format!='video'">
				<view :class="'image'+datas.gallery.length">
					<view class="imageItem" v-for="(images,index) in datas.gallery" :key="index">
						<image class="image" mode="aspectFill" :src="images"></image>
					</view>
				</view>
			</view>
			<view class="video_images" v-if="datas.format=='video'">
				<image v-if="isNoPlay" class="video_image" mode="aspectFill" :src="datas.meta.thumbnail"
					@tap="videoplay(datas.media.video)"></image>
				<image v-if="isNoPlay" @tap="videoplay(datas.media.video)" class="video_icon"
					src="@/static/images/edit_page_play_record.png" mode="widthFix"></image>
				<video class="video_image" :src="playUrl" v-if="!isNoPlay" :autoplay="true" controls></video>
			</view>
			<view class="article_category_box" v-if="datas.circle.length>0" @tap="gotoCircle(datas.circle[0].id)">
				<view class="article_category_left flex-row">
					<image class="article_category_icon" src="/static/images/ic_pound_radius_bluebg.png">
					</image>
					<text class="articel_category_text">{{datas.circle[0].name}}</text>
					<image class="article_category_more" src="/static/images/icon_feed_ad_into_hl_night.png">
					</image>
				</view>
			</view>

			<view class="quotemodel" @tap="gotoDetail(datas.id)" v-if="datas.format=='quote'">
				<image class="quote-image" :src="datas.meta.thumbnail"></image>
				<view class="quote-text-container">
					<text class="quote-text1">{{datas.title.rendered}}</text>
					<text class="quote-text2">{{datas.excerpt.rendered}}</text>
				</view>
			</view>
			<view class="article_footer" @tap="gotoDetail(datas.id)">
				<view class="article_footer_item">
					<image class="article_footer_opt_img view_image" src="/static/images/view.png"></image><text
						class="article_footer_opt_txt">{{datas.meta.views}}</text>
				</view>
				<view class="article_footer_item">
					<image class="article_footer_opt_img" src="/static/images/article_msg.png"></image><text
						class="article_footer_opt_txt">{{datas.comments}}</text>
				</view>
				<view class="article_footer_item">
					<image class="article_footer_opt_img" src="/static/images/article_zan.png"></image><text
						class="article_footer_opt_txt">{{datas.likes}}</text>
				</view>
			</view>
		</view>
		<!-- <ad-custom :unit-id="unitid" v-if="index%7==0"></ad-custom> -->
	</view>
</template>

<script>
	export default {
		name: "topic-list",
		props: {
			datas: {
				type: Object,
				default () {
					return {}
				}
			},
			pages: {
				type: Number,
				default: 1,
			},
			unitid: {
				type: String | Number,
				default: ''
			},
			index: {
				type: Number,
				default: 0,
			}
		},
		data() {
			return {
				isNoPlay: true,
				playUrl: ''
			};
		},
		methods: {
			topaly: function(index) {
				this.$emit("clickPlay", index);
			},
			gotoUser: function(id) {
				uni.navigateTo({
					url: '/pages/user/user?id=' + id,
				})
			},
			gotoDetail: function(id) {
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + id + '&type=forums',
				})
			},
			gotoCircle: function(id) {
				uni.navigateTo({
					url: '/pages/circle/list/list?id=' + id,
				})
			},
			followUser: function(id, status) {
				let data = {
					index: this.index,
					id: id,
					status: status
				}
				this.$emit('followUserByid', data)
			},
			videoplay: function(url) {
				console.log(1)
				let that = this;
				uni.request({
					url: 'https://mall.guqule.com/mp/video.php',
					data: {
						url: url,
					},
					method: 'get',
					success: function(res) {
						console.log(res);
						if (res.data.status == 200) {
							that.playUrl = res.data.url,
								that.isNoPlay = false
						}
					}
				})

			},
			handlePreview: function(gallary, index) {
				uni.previewImage({
					urls: gallary,
					current: index
				})
			},
		}
	}
</script>

<style>
	.article_item {
		background-color: #FFFFFF;
		padding: 30rpx;
		padding-bottom: 20rpx;
		margin-bottom: 10rpx;
	}

	.article_head {
		flex: 1;
		display: flex;
		flex-direction: row;
	}

	.vip_head_frame {
		width: 80rpx;
		height: 80rpx;
		margin-right: 20rpx;
		position: absolute;
		left: -20rpx;
		top: -20rpx;
	}

	.article_photo {
		width: 80rpx;
		height: 80rpx;
		border-radius: 60rpx;
		margin-right: 20rpx;
	}


	.article_user_info {
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	.article_user_nick_box {
		display: flex;
		flex: 1;
		flex-direction: row;
		margin: 5rpx 0;
		align-items: center;
	}

	.article_user_des {
		flex: 1;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.article_btns {
		display: flex;
		margin-top: 5rpx;
		align-items: center;
		flex-direction: row;
	}

	.article_btn_follow {
		border-radius: 20rpx;
	}



	.article_btn_active {
		/* background-color: #007AFF; */
		color: #007AFF;
		font-size: 24rpx;
		font-weight: 500;
		padding: 10rpx 20rpx;
		border: 2rpx solid #007AFF;
	}

	.btn_none {
		background-color: #e7e7e7;
	}

	.article_btn_none {
		background-color: #e7e7e7;
		color: #b3b3b3;
		font-size: 24rpx;
		font-weight: 500;
		padding: 10rpx 20rpx;

	}

	.article_btn_follow_img {
		width: 20rpx;
		height: 20rpx;
		margin-right: 6rpx;
	}

	.article_btn_follow_txt {
		font-size: 26rpx;
	}

	.article_user_nick {
		font-size: 28rpx;
		color: #333333;
	}

	.article_user_school {
		font-size: 24rpx;
		color: #666666;
		margin-right: 20rpx;
	}

	.article_lasttime {
		font-size: 24rpx;
		color: #999999;
	}

	.article_huati {
		color: #007AFF;
		font-size: 28rpx;
		padding: 10rpx 0;
		padding-top: 20rpx;
	}

	.article_content {
		display: flex;
		font-size: 32rpx;
		color: #333333;
		margin: 20rpx 0;
		padding-top: 10rpx;
	}

	.article_imgs {
		display: flex;
		margin: 10rpx 0;
		
	}

	.article_category_box {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 10rpx;
		margin-bottom: 20rpx;
	}

	.article_category_left {
		background-color: #d8edff;
		padding: 10rpx 18rpx;
		border-radius: 20rpx;
		opacity: 0.8;
	}

	.article_category_icon {
		width: 40rpx;
		height: 40rpx;
		margin-right: 5rpx;
	}

	.articel_category_text {
		font-size: 24rpx;
		margin: 0 10rpx;
		font-weight: 500;
	}

	.article_category_more {
		width: 15rpx;
		height: 20rpx;
	}

	.article_one_img {
		display: flex;
		border-radius: 20rpx;
		height: 280rpx;
	}

	.article_more_img {
		border-radius: 10rpx;
		margin: 5rpx;
		width: 220rpx;
		height: 220rpx;
	}

	.video_images {
		flex: 1;
		display: flex;
		border-radius: 10rpx;
		position: relative;
		height: 420rpx;
	}

	.video_image {
		flex: 1;
		display: flex;
		border-radius: 10rpx;
		margin: 0 5rpx;
		width: 690rpx;
		height: 420rpx;

	}

	.video_icon {
		position: absolute;
		top: 180rpx;
		right: 295rpx;
		width: 80rpx;
		height: 80rpx;

	}

	.article_footer {
		flex: 1;
		display: flex;
		flex-direction: row;
		/* border-top-width: 1px;
		border-top-color: #f9f9f9; */
		padding-top: 20rpx;
		padding-bottom: 10rpx;
		justify-content: space-between;
	}

	.article_footer_item {
		display: flex;
		text-align: center;
		flex: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.article_footer_opt_img {
		width: 38rpx;
		height: 38rpx;
		margin-right: 10rpx;
		position: relative;
	}

	.article_footer_opt_txt {
		font-size: 28rpx;
		color: #43484D;
	}

	.vip_img {
		width: 18px;
		height: 16px;
		/* #ifndef APP-NVUE */
		margin: auto 2px;
		vertical-align: middle;
		/* #endif */
		align-items: center;
		margin-left: 2px;
		margin-right: 2px;
	}

	.flex-row {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.view_image {
		width: 42rpx;
		height: 32rpx;
	}

	.quotemodel {
		position: relative;
		height: 144rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		box-sizing: border-box;
		border-radius: 8rpx;
		background: #EFEFEF;
		padding: 24rpx 24rpx;
		margin-bottom: 20rpx;
	}

	.quote-image {
		width: 96rpx;
		height: 96rpx;
		border-radius: 8rpx;
	}

	.quote-text-container {
		width: 490rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		box-sizing: border-box;
		margin-left: 20rpx;
	}

	.quote-text1 {
		font-size: 28rpx;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	.quote-text2 {
		font-size: 20rpx;
		color: #999999;
		margin-top: 8rpx;
		text-overflow: ellipsis;
		display: -webkit-box;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.image {
		width:100%;
		height: 100%;
		border-radius: 12rpx;
	}

	.image1 .imageItem .image {
		width:690rpx;
		height: 420rpx;
	}

	.image1 .imageItem.imageItemHidden {
		border-radius: 12rpx;
		height: 600rpx;
		overflow: hidden;
		position: relative;
		width: 400rpx;
	}

	.image1 .imageFt {
		background-color: rgba(0, 0, 0, .3);
		border-radius: 3rpx;
		bottom: 10rpx;
		color: #fff;
		font-size: 20rpx;
		height: 34rpx;
		line-height: 34rpx;
		position: absolute;
		right: 10rpx;
		text-align: center;
		width: 52rpx;
	}

	.image2 {
		-webkit-box-align: center;
		-webkit-box-pack: justify;
		align-items: center;
		display: flex;
		justify-content: space-between;
	}

	.image2 .imageItem {
		height: 338rpx;
		width: 338rpx;
	}

	.image2:after {
		display: none;
	}
	
	.image2 .imageItem:first-child {
		margin-right: 20rpx;
	}

	.image3 .imageItem {
		float: right;
		height: 200rpx;
		width: 200rpx;
	}

	.image3 .imageItem:first-child {
		float: left;
		height: 410rpx;
		width: 480rpx;
	}

	.image3 .imageItem:nth-child(2) {
		margin-bottom: 10rpx;
	}

	.image4 .imageItem {
		float: left;
		height: calc(670rpx/3);
		width: calc(670rpx/3);
	}

	.image4 .imageItem:first-child {
		height: 416rpx;
		margin-bottom: 10rpx;
		width: 690rpx;
	}

	.image4 .imageItem:nth-child(2),
	.image4 .imageItem:nth-child(3) {
		margin-right: 10rpx;
	}

	.image5 .imageItem {
		float: left;
	}

	.image5 .imageItem:first-child,
	.image5 .imageItem:nth-child(2) {
		height: 335rpx;
		margin-bottom: 10rpx;
		width: 335rpx;
	}

	.image5 .imageItem:first-child {
		margin-right: 10rpx;
	}

	.image5 .imageItem:nth-child(3),
	.image5 .imageItem:nth-child(4),
	.image5 .imageItem:nth-child(5) {
		height: calc(670rpx/3);
		width: calc(670rpx/3);
	}

	.image5 .imageItem:nth-child(3),
	.image5 .imageItem:nth-child(4) {
		margin-right: 10rpx;
	}

	.image6 .imageItem {
		float: left;
		height: calc(670rpx/3);
		width: calc(670rpx/3);
	}

	.image6 .imageItem:first-child {
		float: left;
		height: 460rpx;
		margin-bottom: 10rpx;
		width: 460rpx;
	}

	.image6 .imageItem:nth-child(2),
	.image6 .imageItem:nth-child(3) {
		float: right;
		margin-bottom: 10rpx;
	}

	.image6 .imageItem:nth-child(4) {
		clear: left;
	}

	.image6 .imageItem:nth-child(4),
	.image6 .imageItem:nth-child(5) {
		margin-right: 10rpx;
	}

	.image6 .imageItem:last-child {
		float: right;
	}

	.image7 .imageItem {
		float: left;
		height: calc(670rpx/3);
		width: calc(670rpx/3);
	}

	.image7 .imageItem:nth-child(2),
	.image7 .imageItem:nth-child(3),
	.image7 .imageItem:nth-child(4) {
		margin-bottom: 10rpx;
	}

	.image7 .imageItem:nth-child(2),
	.image7 .imageItem:nth-child(3),
	.image7 .imageItem:nth-child(5),
	.image7 .imageItem:nth-child(6) {
		margin-right: 10rpx;
	}

	.image7 .imageItem:first-child {
		margin-bottom: 10rpx;
		width: 690rpx;
	}

	.image8 .imageItem {
		float: left;
		height: calc(670rpx/3);
		width: calc(670rpx/3);
	}

	.image8 .imageItem:nth-child(3),
	.image8 .imageItem:nth-child(4),
	.image8 .imageItem:nth-child(5) {
		margin-bottom: 10rpx;
	}

	.image8 .imageItem:first-child,
	.image8 .imageItem:nth-child(3),
	.image8 .imageItem:nth-child(4),
	.image8 .imageItem:nth-child(6),
	.image8 .imageItem:nth-child(7) {
		margin-right: 10rpx;
	}

	.image8 .imageItem:first-child,
	.image8 .imageItem:nth-child(2) {
		margin-bottom: 10rpx;
		width: 335rpx;
	}

	.image9 .imageItem {
		float: left;
		height: calc(670rpx/3);
		margin-right: 10rpx;
		width: calc(670rpx/3);
	}

	.image9 .imageItem:nth-child(3n) {
		margin-right: 0;
	}

	.image9 .imageItem:first-child,
	.image9 .imageItem:nth-child(2),
	.image9 .imageItem:nth-child(3),
	.image9 .imageItem:nth-child(4),
	.image9 .imageItem:nth-child(5),
	.image9 .imageItem:nth-child(6) {
		margin-bottom: 10rpx;
	}
</style>
