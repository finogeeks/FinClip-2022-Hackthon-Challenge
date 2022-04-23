<template>
	<view>
		<uni-search-bar :radius="100" @confirm="search"></uni-search-bar>
		<uni-list>
			<uni-list-item v-for="(item,index) in list" :title="item.name" :note="item.end_time + ' 截止'"   clickable  @click="clickExam(item)"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import examServer from '../../common/js/exam.js';
	export default {
		components: {
		},
		data() {
			return {
				labelList:[
					{
						id:1,
						name:"待考",
					},
					{
						id:2,
						name:"已考",
					}
				],
				currentLabelId:2,
				list:[],
				keyword:'',
			}
		},
		onLoad() {
			this.loadExamList();
		},
		methods: {
			loadExamList(){
				var that = this;
				examServer.examList({
					type:that.currentLabelId,
					keyword:that.keyword,
				},function(res){
					that.list = res;
				})
			},
			labelOnClick(e){
				this.currentLabelId = e.id;
				this.loadExamList();
			},
			clickExam(e){
				uni.navigateTo({
					url:'../exam/info?id='+e.id
				})
				return ;
			},
			search(e){
				this.keyword = e.value;
				this.loadExamList();
			}
		}
	}
</script>

<style>
	
</style>
