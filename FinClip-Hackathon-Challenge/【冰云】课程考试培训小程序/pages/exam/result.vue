<template>
	<view class="exam-result-content">
		<view class="title-div">
			<text class="title">垃圾分类知识竞赛</text>
		</view>
		<view :class="{'result':true,'result-pass':answer.state===1,'result-no-pass':answer.state===2}">
			<view class="medal-view">
				<view class="medal">
					<view class="medal-title">成绩</view>
					<view class="medal-value">{{answer.score}}</view>
				</view>
			</view>
			<view class="result-info-view-top">
				<view class="result-info-view" v-if="answer.state===1">
					<view class="result-info">恭喜你，通过考试</view>
				</view>
				<view class="result-info-view" v-if="answer.state===2">
					<view class="result-info">未通过，继续努力</view>
				</view>
				<view class="attr-div">
					<uni-row class="result-desc">
						<uni-col :span="12" style="border-right: 1px solid #d0d0d0;">
							<view style="font-size: 28upx;color: gray;padding-top: 20upx;">答题用时</view>
							<view class="result-desc-value" >{{answer.duration}}秒</view>
						</uni-col>
						<uni-col :span="12">
							<view style="font-size: 28upx;color: gray;padding-top: 20upx;">合格分/总分</view>
							<view class="result-desc-value">{{exam.pass_score}}/{{exam.total_score}}</view>
						</uni-col>
					</uni-row>
					<view class="result-select">
						<view v-for="(item,index) in question" 
						:class="{'error':item.state===2,'correct':item.state===1}"
						@click="clickSelect(index)">
							<uni-icons color="white" class="result-icon" :type="item.state==2?'closeempty':'checkmarkempty'"></uni-icons>
							{{index+1}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="look-answer">
			<button class="look-answer-btn" @click="clickLookAnswer()">查看答案</button>
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
				intro: '<div style="text-align:center;"><img src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png"/></div>',
				question:[],
				exam:{},
				answer:{},
				id:0,
			}
		},
		onLoad(query) {
			this.id = query.id
			this.loadResult();
		},
		methods: {
			loadResult(){
				var that = this;
				examServer.examResult({
					id:this.id
				},function(res){
					console.log(res)
					that.exam = res.exam
					that.answer = res.answer
					that.question = res.question
				})
			},
			labelOnClick(e){
				console.log(e)
			},
			clickLookAnswer(){
				uni.navigateTo({
					url:'../exam/exam?isShowAnswer=1&id='+ this.answer.exam_id
				})
			},
			clickSelect(index){
				uni.navigateTo({
					url:'../exam/exam?isShowAnswer=1&id='+ this.answer.exam_id + '&index='+ index
				})
			}
		}
	}
</script>

<style lang="scss">
	.exam-result-content{
		background-color: #fff;
	}
	.title-div{
		height: 20vh;
		text-align: center;
		align-items: center;
		display: grid;
		background-color: #0b83d2;
		color: white;
		border-bottom-right-radius: 30px;
		border-bottom-left-radius: 30px;
		padding-bottom: 30px;
	}
	.title{
		font-size: 40rpx;
		font-weight: bold
	}
	.result{
		position: relative;
		top: -130upx;
		margin: 3%;
	}
	.result-info-view-top{
		position: relative;
		top: -60upx;
	}
	.result-info-view {
		text-align: center;
		margin-bottom: 20upx;
	}
	.result-info{
		display: inline-block;
		padding: 10px 20px;
		color: white;
		width: 35%;
		border-radius: 10px 0 10px;
	}
	.result-pass .result-info{
		background-color: #ff5d5d;
	}
	.result-no-pass .result-info{
		background-color: #979797;
	}
	.begin-btn{
		background-color: #ffb701;
		color: white;
		width: 40%;
		border-radius: 40px;
	}
	
	.attr-div{
		text-align: center;
		margin-bottom: 0;
		background-color: white;
		padding: 10px;
		box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
		transition: 0.3s;
		border-radius: 5px;
	}
	
	.medal-view{
		text-align: center;
	}
	.medal{
		width: 300upx;
		display: inline-block;
		height: 300upx;
		border-radius: 300upx;
		color: white;
	}
	.result-pass .medal{
		background-color: #fabf00;
		border: 20upx solid #f6ed65;
	}
	.result-no-pass .medal{
		background-color: #bfbfbf;
		border: 10px solid #f3f3f3;
	}
	.medal-title{
		margin-top: 15%;
	}
	.medal-value{
	    font-size: 100upx;	
	}
	.result-desc{
		padding-bottom: 30upx;
		margin-bottom: 30upx;
		border-bottom:1px solid rgb(208, 208, 208);
	}
	.result-desc-value {
		margin: 10upx;
		font-weight: bold;
		font-size: 34rpx;
	}
	
	.result-select {
		text-align: left;
	}
	
	.error{
		display: inline-block;
		padding: 10px 16px;
		position: relative;
		border: 1px solid $uni-color-error;
		border-radius: 5px;
		color: $uni-color-error;
		margin: 10upx;
	}
	.correct{
		display: inline-block;
		padding: 10px 16px;
		position: relative;
		border: 1px solid $uni-color-success;
		border-radius: 5px;
		color: $uni-color-success;
		margin: 10upx;
	}
	.error .result-icon{
		background-color: $uni-color-error;
		position: absolute;
		right: 0;
		bottom: 0;
	}
	.correct .result-icon{
		background-color: $uni-color-success;
		position: absolute;
		right: 0;
		bottom: 0;
	}
	.look-answer-btn{
		background-color: $uni-color-theme;
		color: white;
	}
</style>
