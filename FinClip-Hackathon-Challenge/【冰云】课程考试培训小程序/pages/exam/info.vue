<template>
	<view>
		<view class="exam-result" @click="clickResult()" v-if="detail.answer_count">
			<uni-col class="exam-result-left" :span="12" >
				<view>上回答题情况</view>
			</uni-col>
			<uni-col :span="12">
				<view class="exam-result-right">成绩详情></view>
			</uni-col>
		</view>
		<view class="title-div">
			<text class="title">{{detail.name}}</text>
			<button class="begin-btn" @click="beginExam()">{{detail.is_pass?'已通过':'开始答题'}}</button>
		</view>
		<view class="attr-div">
			<uni-row class="demo-uni-row">
				<uni-col :span="12" >
					<view style="font-size: 28upx;color: gray;border-right: 1px solid #d0d0d0;">试卷总分</view>
					<view style="padding-bottom: 20upx;border-bottom: 1px solid #d0d0d0;border-right: 1px solid #d0d0d0;">{{detail.total_score}}分</view>
				</uni-col>
				<uni-col :span="12">
					<view style="font-size: 28upx;color: gray;">及格分</view>
					<view style="padding-bottom: 20upx;border-bottom: 1px solid #d0d0d0;">{{detail.pass_score}}分</view>
				</uni-col>
			</uni-row>
			
			<uni-row class="demo-uni-row">
				<uni-col :span="12">
					<view style="font-size: 28upx;color: gray;padding-top: 20upx;border-right: 1px solid #d0d0d0;">总题数</view>
					<view style="border-right: 1px solid #d0d0d0;">{{detail.question_number}}题</view>
				</uni-col>
				<uni-col :span="12">
					<view style="font-size: 28upx;color: gray;padding-top: 20upx;">考题时长</view>
					<view class="attr-value">{{detail.duration}}分钟</view>
				</uni-col>
			</uni-row>
		</view>
		<view class="intro">
			<view class="exam-time">
				本场考试你已考<span class="red">{{detail.answer_count}}</span>次
				<span v-if="detail.is_pass===0">
				，还可以考<span class="red">{{detail.number?detail.number-detail.answer_count:'n'}}</span>次	
				</span>
			</view>
			<!-- <view class="intro-title">考试奖励</view>
			<view class="desc">本场考试共{{detail.credits}}学分</view> -->
			<view class="intro-title">考试时间</view>
			<view class="desc">{{detail.begin_time_str}} 至 {{detail.end_time_str}}</view>
			<view class="intro-title">考试说明</view>
			<rich-text class="content-intro" :nodes="detail.intro"></rich-text>
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
				detail:{
					duration:0,
					answer_count:0,
					number:0,
					begin_time_str:'',
					end_time_str:'',
					intro:'',
					question_number:'',
					pass_score:'',
					total_score:'',
				},
				id:0,
			}
		},
		onShow(){
			this.loadExamDetail();
		},
		onLoad(query) {
			this.id = query.id;
		},
		methods: {
			loadExamDetail()
			{
				var that = this;
				examServer.examDetail({
					id:this.id
				},function(res){
					that.detail = res;
					console.log(res)
				})
			},
			labelOnClick(e){
				console.log(e)
			},
			beginExam(e){
				if (this.detail.is_pass===1){
					return;
				}
				if (this.detail.number !== 0 && this.detail.number<=this.detail.answer_count){
					uni.showToast({
						icon:"error",
						title:"您的考试机会已用完"
					})
					return;
				}
				let curTime = Date.now() / 1000;
				let beginTime = this.detail.begin_time;
				let endTime = this.detail.end_time;
				if (curTime < beginTime || curTime > endTime){
					uni.showToast({
						icon:"error",
						title:"非考试时间"
					})
					return ;
				}
				uni.navigateTo({
					url:'../exam/exam?id=' + this.id
				})
				return ;
			},
			clickResult(){
				uni.navigateTo({
					url:'../exam/result?id=' + this.id
				})
				return ;
			}
		}
	}
</script>

<style>
	.title-div{
		height: 25vh;
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
	.begin-btn{
		background-color: #ffb701;
		color: white;
		width: 40%;
		border-radius: 40px;
	}
	.attr-div{
		text-align: center;
		margin: 3%;
		margin-bottom: 0;
		position: relative;
		top: -30px;
		background-color: white;
		padding: 10px;
		box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
		transition: 0.3s;
		border-radius: 5px;
	}
	.intro{
		position: relative;
		top: -40upx;
		margin: 3%;
	}
	.intro-title{
		margin: 20upx 0;
		border-left: 8upx solid #0076f3;
		padding-left: 10upx;
		font-weight: bold;
	}
	.exam-time{
		padding: 10rpx;
		background-color: #64c2ff33;
		color: #007fd2;
	}
	.desc{
		font-size: 30upx;
	}
	.red{
		color: red;
	}
	
	.exam-result{
		display: flex;
		padding: 10px;
		font-size: 14px;
		background-color: #e1f2ff;
	}
	.exam-result-left{
		color: #088fef;
	}
	.exam-result-right{
		text-align: right;
		color: gray;
	}
</style>
