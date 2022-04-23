<template>
	<view>
		<view class="detail-wrap">
			<h3 class="title">{{info.name}}</h3>
			<rich-text class="content-intro" :nodes="content"></rich-text>
		</view>
	</view>
</template>

<script>
	import examServer from '../../common/js/exam.js';
	export default {
		components: {
		},
		data() {
			return {
				info:{
					name:"",
				},
				content:'',
				id:0,
			}
		},
		onLoad(query) {
			this.id = query.id;
			this.loadKonwledgeDetail();
		},
		methods: {
			loadKonwledgeDetail(){
				var that = this;
				examServer.courseCourseware({
					id:that.id,
				},function(res){
					console.log(res);
					that.content = that.formatHtml(res.content);
					that.info = res;
				})
			},
			formatHtml(html){
				let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
					match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
					match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
					match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
					return match;
				});
				newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
					match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
					return match;
				});
				newContent = newContent.replace(/<br[^>]*\/>/gi, '');
				newContent = newContent.replace(/\<img/gi,
					'<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
				console.log(newContent);
				return newContent;
			}
		}
	}
</script>

<style>
	.detail-wrap{
		margin: 10px;
		text-align: left;
	}
	.title{
		text-align: center;
		margin: 30rpx;
		padding-bottom: 30rpx;
		border-bottom: 1rpx solid #c1c1c1;
	}
	.content-intro img{
		width: 100%;
	}
</style>
