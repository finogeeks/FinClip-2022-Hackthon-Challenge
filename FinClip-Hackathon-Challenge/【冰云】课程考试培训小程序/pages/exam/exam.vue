<template>
	<view class="app">
		<RemainingTime v-if="!onAnswer" class="remaining-time" :seconds="remainingTime"></RemainingTime>
		<view class="exam-div">
			<view class="uni-title uni-common-mt uni-common-pl title">
				<span class="type">{{getQuestionType()}}</span>
				{{currentItem.title}}
			</view>
			<view class="uni-list">
				<label style="background-color:white" 
				:class="{
					'uni-list-cell uni-list-cell-pd':true,
					'li-select':isSelectCss(item.value),
					'li-answer':isAnswerIndex(item.value),
					'li-answer-error':isAnswerErrorCss(item.value)
					}" 
				v-for="(item, index) in currentItem.options" :key="item.value">
					<view>
						<button class="btn-no-select" @click="clickItem(item.value)">
							{{getIndex(item.value,1)?'✔':''}}
							{{getIndex(item.value,2)?'✘':''}}
							{{getIndex(item.value,3)? item.value :''}}
						</button>
						{{item.name}}
					</view>
				</label>
			</view>
			<view v-if="onAnswer">
				<view class="answer-option">你的答案：{{currentSelect.join(',')}}</view>
				<view class="answer-option">正确答案：{{currentItem.standard_answer.join(',')}}</view>
				<view class="answer-parse">
					<span>解析</span>{{currentItem.analysis}}
				</view>
			</view>
			<view class="btn-placeholder"></view>
			<view class="btn">
				<uni-row class="demo-uni-row">
					<uni-col :span="12">
						<button class="btn-2" @click="last">{{lastBtnMsg}}</button>
					</uni-col>
					<uni-col :span="12">
						<button class="btn-1" @click="next">{{nextBtnMsg}}</button>
					</uni-col>
				</uni-row>
				
				<!-- <button class="btn-1" @click="next" v-if="currentIndex === 0">下一题</button>
				<uni-row class="demo-uni-row" v-if="currentIndex === (dataLength-1)">
					<uni-col :span="onAnswer?24:12">
						<button class="btn-2" @click="last">上一题</button>
					</uni-col>
					<uni-col :span="12" v-if="!onAnswer">
						<button class="btn-1" @click="dialogToggle()">提交</button>
					</uni-col>
				</uni-row> -->
			</view>
			<view>
				<!-- 提示窗示例 -->
				<uni-popup ref="alertDialog" type="dialog">
					<uni-popup-dialog type="info" cancelText="取消" confirmText="确定" title="提示" content="确认提交试卷？" @confirm="submit()"
						@close="dialogClose"></uni-popup-dialog>
				</uni-popup>
			</view>
		</view>
	</view>
</template>

<script>
	import examServer from '../../common/js/exam.js';
	import RemainingTime from '../../components/remaining-time.vue';
	export default {
		components: {
			RemainingTime
		},
		data() {
			return {
				lastBtnMsg:'无',
				nextBtnMsg:'下一题',
				// 剩余时间
				remainingTime:0,
				// 开启答案
				onAnswer: false,
				answer:[],
				currentAnswer:[],
				
				selectIndexs: [],// 已作答题
				currentSelect:[],//当前选择
				currentIndex: 0,// 当前题目下标
				// 当前题目信息
				currentItem:{
					type:1,
					standard_answer:[],
				},
				data: [],
				dataLength:0,
				
				current: 0,
				formData:{
					name: "小子",
					hobby: [{"value": 0,"text": "篮球"	},{"value": 1,"text": "足球"},{"value": 2,"text": "游泳"}],
				},
				labelList:[
					{
						id:1,
						name:"待考",
					},
					{
						id:2,
						name:"必考",
					}
				],
				id:0,
				isShowAnswer:'',
				
			}
		},
		onLoad(query) {
			this.id = query.id;
			this.isShowAnswer = query.isShowAnswer;
			
			if (this.isShowAnswer) {
				this.currentIndex = query.index?query.index:0;
			}
			this.loadQuestion();
			// 初始化答案
			if (this.isShowAnswer) {
				this.initAnswer();
			}
		},
		methods: {
			loadQuestion(){
				var that = this;
				examServer.examQuestions({
					id:this.id
				},function(res){
					that.remainingTime = res.remaining_time;
					
					let data = [];
					let answer = [];
					res.question.forEach((item,index,array)=>{
					    data.push(item.question);
						answer.push(item.question.standard_answer);
					})
					that.data = data
					that.dataLength = data.length;
					that.answer = answer
					
					// 初始化答案
					if (that.isShowAnswer) {
						that.initAnswer();
					} else {
						// 初始化当前选项
						that.initItem(that.currentIndex);
					}
				})
			},
			getQuestionType(){
				let name;
				switch(this.currentItem.type){
					case 1:
						name = '单选';
						break;
					case 2:
						name = '多选';
						break;
					case 3:
						name = '判断';
						break;
				}
				return name;
			},
			// 初始化答案
			initAnswer(){
				this.onAnswer = true;
				var that = this;
				examServer.examResult({
					id:this.id
				},function(res){
					res.question.forEach((item,index,array)=>{
					    that.selectIndexs.push(item.answer);
					})
					// 初始化当前选项
					that.initItem(that.currentIndex);
				})
			},
			// 初始化选项
			initItem(index){
				this.currentIndex = index;
				this.currentItem = this.data[index]
				console.log(this.currentItem);
				if (!this.selectIndexs[index]) {
					this.selectIndexs[index] = [];
					this.currentSelect = [];
				} else {
					this.currentSelect = this.selectIndexs[index];
				}
				
				// 初始化当前题答案
				if (!this.answer[index]) {
					this.answer[index] = [];
					this.currentAnswer = [];
				} else {
					this.currentAnswer = this.answer[index];
				}
				console.log(this.currentIndex,this.data.length);
				// 初始化按钮
				this.loadBtnMsg();
				
			},
			// 初始化按钮
			loadBtnMsg(){
				if (this.currentIndex == 0 ){
					this.lastBtnMsg = '无';
					this.nextBtnMsg = '下一题';
				} else if (this.currentIndex == (this.data.length -1)) {
					this.lastBtnMsg = '上一题';
					this.nextBtnMsg =  this.onAnswer ? '无':'提交';
				} else {
					this.lastBtnMsg = '上一题';
					this.nextBtnMsg = '下一题';
				}
			},
			labelOnClick(e){
				console.log(e)
			},
			clickItem(index){
				if (this.onAnswer) {
					// 公布答案无法答题
					return false;
				}
				switch (this.currentItem.type) {
					case 1:// 单选
					case 3:// 判断
						// 去掉之前的选择
						this.currentSelect = [];
						this.selectIndexs[this.currentIndex] = [];
						// 加上当前的选择
						this.selectIndexs[this.currentIndex].push(index); 
						this.currentSelect.push(index);
						break;
					case 2:// 多选
						// 判断当前选择是否已选，已选则去掉，未选则选上
						if (this.currentSelect.indexOf(index) == -1){
							this.selectIndexs[this.currentIndex].push(index); 
							this.currentSelect.push(index);
						} else {
							this.selectIndexs[this.currentIndex].splice(this.selectIndexs[this.currentIndex].findIndex(item => item === index),1);
							this.currentSelect.splice(this.currentSelect.findIndex(item => item === index),1);
						}
						break;
				}
			},
			
			// 题目选择
			next(){
				if (this.currentIndex === (this.data.length -1)) {
					if (this.onAnswer) {
						return ;
					} else {
						return this.dialogToggle();
					}
				}
				this.currentIndex++;
				this.initItem(this.currentIndex);
				
			},
			last(){
				if (this.currentIndex == 0) {
					return;
				}
				this.currentIndex--;
				this.initItem(this.currentIndex);
			},
			submit(){
				var that = this;
				var question_answers = [];
				var qData = this.data;
				this.selectIndexs.forEach((item,index)=>{
					let tmp = {
						question_id:qData[index].id,
						answer:item,
					};
					question_answers.push(tmp);
				})
				examServer.examSubmit({
					exam_id:this.id,
					question_answers:JSON.stringify(question_answers),
				},function(res){
					uni.redirectTo({
						url:'../exam/result?id='+that.id
					})
				})
			},
			
			
			
			// 是选择选项的样式
			isSelectCss(index){
				if (this.onAnswer) {
					return false;
				}
				return this.isSelectIndex(index);
			},
			// 是选择的选项
			isSelectIndex(index){
				return this.currentSelect.indexOf(index)!=-1
			},
			// 是答案的选项
			isAnswerIndex(index){
				return this.onAnswer && this.currentAnswer.indexOf(index) != -1;
			},
			// 是答案的选项
			isAnswerErrorCss(index){
				return this.onAnswer && !this.isAnswerIndex(index) && this.isSelectIndex(index);
			},
			
			// 获取选项表示
			getIndex(index,type){
				let isAnswer = this.isAnswerIndex(index);
				let isSelect = this.isSelectIndex(index);
				switch(type){
					case 1: // 选对的选项
						if (this.onAnswer && isAnswer && isSelect){
							return true;
						}
						return false;
						break;
					case 2: // 选错的选项
						if (this.onAnswer && !isAnswer && isSelect){
							return true;
						}
						return false;
					case 3: // 正常选项
						return ! (this.getIndex(index,1) || this.getIndex(index,2));
					
				}
			},
			dialogToggle() {
				this.$refs.alertDialog.open()
			},
			dialogClose(){
				return;
			}
		}
	}
</script>

<style lang="scss">
	.app{
		background-color: white;
		height: 90vh;
	}
	.remaining-time{
		padding: 10px;
		font-size: 12px;
		color: #099aef;
		background-color: aliceblue;
	}
	.exam-div{
		background-color: #fff;
	}
	.type{
		padding: 6upx 12upx;
		font-size: $uni-font-size-sm;
		color: #0a98d5;
		background-color: #0a98d521;
		font-weight: normal;
		margin-right: 10upx;
	}
	.title{
		font-weight: bold;
		font-size: $uni-font-size-lg;
	}
	.btn{
		position: fixed;
		bottom: 0;
		width: 100%;
	}
	.btn-1{
		background-color: #0A98D5;
		color: white;
	}
	.btn-2{
		color: #0A98D5;
	}
	.btn-no-select{
		border-radius: 100px;
		padding: 0;
		width: 70rpx;
		height: 70rpx;
		font-size: $uni-font-size-sm;
		display: inline-grid;
		margin-right: 10rpx;
	}
	.li-select{
		color: #0a98d5;
		background-color: #10b5fc21;
	}
	
	.li-select button{
		color: white;
		background-color: #0a98d5;
	}
	.li-answer{
		color: $uni-color-success;
	}
	.li-answer button{
		background-color: $uni-color-success;
		color: white;
	}
	.li-answer-error{
		color: $uni-color-error;
	}
	.li-answer-error button{
		background-color: $uni-color-error;
		color: white;
	}
	.answer-option{
		padding: 10px;
		background-color: #80808029;
		font-weight: bold;
		margin: 10px;
	}
	.answer-parse{
		margin: 10px;
	}
	.answer-parse span{
		padding: 2px 10px;
		background-color: #3cadde;
		color: white;
		margin-right: 10px;
	}
	.btn-placeholder{
		height: 92upx;
	}
	
</style>
