<style>
	.cover-wrap{
		height: 300rpx;
		text-align: center;
	}
	.cover{
		height: 100%;
	}
	.course-content{
		margin: 20rpx;
	}
	.content-title{
		font-size: 40rpx;
		font-weight: bold;
		padding: 30rpx 20rpx;
		display: block;
	}
	.content-intro img{
		width: 100%;
	}
	.content-intro-title{
		border-left: 8rpx solid #0076f3;
		padding-left: 10rpx;
		margin-bottom: 20rpx;
	}
</style>

<template>
	<view>
		<view class="cover-wrap">
			<image class="cover" :src="cover" mode="aspectFit"></image>
			<text class="cover-text"></text>
		</view>
		<view class="content-wrap">
			<qz-label-list :labelList="labelList" @labelOnClick="labelOnClick"></qz-label-list>
			<view class="course-content" v-if="currentLablId == 1">
				<text class="content-title">{{title}}</text>
				<view class="content-intro-title">课程介绍</view>
				<rich-text class="content-intro" :nodes="intro"></rich-text>
			</view>
			<view  v-if="currentLablId == 2">
				<uni-collapse>
					<uni-collapse-item v-for="(dir,index) in courseDir" :title="dir.name">
						<view>
							<uni-list v-for="(item,i) in dir.courseware">
							 	<uni-list-item :title="item.name" :note="item.state" :thumb="typeIcon[item.type]"
							 	 thumb-size="sm" clickable @click="dirOnClick(item)"></uni-list-item>
							</uni-list>
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</view>
			<view v-if="currentLablId == 3">
				<hb-comment ref="hbComment" @add="addCommont" @del="delCommont" @like="likeCommont" @focusOn="focusOnCommont" :deleteTip="'确认删除？'"
				    :cmData="commentData" v-if="commentData"></hb-comment>
			</view>
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
				typeIcon: {
					1:"../../static/image/icon/picture.png",
					2:"../../static/image/icon/file.png",
					3:"../../static/image/icon/video.png",
				},
				labelList:[
					{
						id:1,
						name:"简介",
					},
					{
						id:2,
						name:"目录",
					},
					// {
					// 	id:3,
					// 	name:"评论",
					// }
				],
				courseDir: [
					{
						id:1,
						name:'第一章',
						courseware:[
							{
								id:1,
								name: '关于垃圾分类那些事儿',
								icon:'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
								state:"已完成",
							},
							{
								id:2,
								title: '北京市生活垃圾分类投放指南',
								icon:'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
								state:"已完成",
							}
						]
					},
					{
						id:2,
						name:'第二章',
						list:[
							{
								id:3,
								title: '关于垃圾分类那些事儿',
								icon:'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
								state:"已完成",
							},
							{
								id:4,
								title: '北京市生活垃圾分类投放指南',
								icon:'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
								state:"已完成",
							}
						]
					}
				],
				currentLablId:1,
				cover: "",
				title: "",
				intro: '',
				commentData:{},
				readNumer:193,
				commentList:[
					{
						id: 1, // 唯一主键
						owner: false, // 是否是拥有者，为true则可以删除，管理员全部为true
						hasLike: false, // 是否点赞
						likeNum: 2, // 点赞数量
						avatarUrl: "https://inews.gtimg.com/newsapp_ls/0/13797755537/0", // 评论者头像地址
						"nickName": "超长昵称超长...", // 评论者昵称，昵称过长请在后端截断
						"content": "啦啦啦啦", // 评论内容
						"parentId": null, // 所属评论的唯一主键
						"createTime": "2021-07-02 16:32:07" // 创建时间
					},
					{
						"id": 2,
						"owner": false,
						"hasLike": false,
						"likeNum": 2,
						"avatarUrl": "https://inews.gtimg.com/newsapp_ls/0/13797761970/0",
						"nickName": "寂寞无敌",
						"content": "我是评论的评论",
						"parentId": 1,
						"createTime": "2021-07-02 17:05:50"
					},
					{
						"id": 3,
						"owner": true,
						"hasLike": true,
						"likeNum": 1,
						"avatarUrl": "https://inews.gtimg.com/newsapp_ls/0/13797763270/0",
						"nickName": "name111",
						"content": "评论啦啦啦啦啦啦啦啦啦啦",
						"parentId": null,
						"createTime": "2021-07-13 09:37:50"
					},
					{
						"id": 4,
						"owner": false,
						"hasLike": false,
						"likeNum": 0,
						"avatarUrl": "https://inews.gtimg.com/newsapp_ls/0/13797755537/0",
						nickName: "超长昵称超长...",
						content: "22222",
						"parentId": null,
						"createTime": "2021-07-13 16:04:35"
					},
					{
						"id": 5,
						"owner": false,
						"hasLike": false,
						"likeNum": 0,
						"avatarUrl": "https://inews.gtimg.com/newsapp_ls/0/13797755537/0",
						"nickName": "超长昵称超长...",
						"content": "@寂寞无敌 你怕不是个大聪明",
						"parentId": 1,
						"createTime": "2021-07-14 11:01:23"
					}
				],
				id:0,
			}
		},
		onLoad(query) {
			this.id = query.id;
			this.initInfo();
		},
		methods: {
			initInfo () {
				var that =this
				examServer.courseDetail({
					id:this.id
				},function(res){
					that.cover = res.cover;
					that.title = res.title;
					that.intro = that.formatHtml(res.intro);
					that.courseDir = res.dir;
					that.commentList = res.comment;
					that.initCommentData();
				})
			},
			initCommentData(){
				this.commentData = {
					readNumer: this.readNumer,
					commentSize: this.commentList.length,
					comment: this.getTree(this.commentList)
				}
			},
			labelOnClick(e){
				this.currentLablId = e.id;
			},
			dirOnClick(e){
				
				switch(e.type){
					case 1:
					console.log(e.id);
						uni.navigateTo({
							url:'./courseware?id='+e.id
						})
						break;
					case 2:
					    uni.saveFile({
					      tempFilePath: e.file_url,
					      success: function (res) {
							  console.log(res)
					      }
					    });
						break;
					case 3:
						uni.navigateTo({
							url:'../tool/video?url='+e.file_url
						})
						break;
				}
				console.log(e);
			},
			getTree(data) {
			    let result = [];
			    let map = {};
			    data.forEach(item => {
					item.children = [];
			        map[item.id] = item;
			    });
				
			    data.forEach(item => {
			        let parent = map[item.parentId];
					console.log(parent);
			        if (parent) {
			            (parent.children || (parent.children = [])).push(item);
			        } else {
			            result.push(item);
			        }
			    });
			    return result;
			},
			addCommont(e){
				this.readNumer ++;
				this.commentList.push({
					"id": this.readNumer,
					"owner": true,
					"hasLike": false,
					"likeNum": 0,
					"avatarUrl": "https://inews.gtimg.com/newsapp_ls/0/13797755537/0",
					"nickName": "超长昵称超长...",
					"content": e.content,
					"parentId": e.pId,
					"createTime": "2021-07-14 11:01:23"
				})
				this.initCommentData();
			},
			delCommont(e){
				console.log(e)
			},
			likeCommont(e){
				console.log(e)
			},
			focusOnCommont(e){
				console.log('focusOn')
				console.log(e)
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
				return newContent;
			}
		}
	}
</script>