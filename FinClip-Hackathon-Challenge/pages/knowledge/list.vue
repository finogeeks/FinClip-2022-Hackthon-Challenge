<template>
	<view>
		<uni-search-bar :radius="100" @confirm="search"></uni-search-bar>
		<qz-label-list :labelList="labelList" @labelOnClick="labelOnClick"></qz-label-list>
		<uni-list>
			<uni-list-item 
			v-for="(item,index) in list" 
			:title="item.title" 
			:note="item.create_time"
			clickable
			@click="clickItem(item)">
			</uni-list-item>
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
						id:0,
						name:"全部",
					},
					{
						id:1,
						name:"知识",
					},
					{
						id:2,
						name:"百科",
					}
				],
				list:[],
				keyword:"",
				classId:0,
			}
		},
		onLoad() {
			this.loadKonwledgeList();
		},
		methods: {
			loadKonwledgeList(){
				var that = this;
				examServer.knowledgeList({
					keyword:that.keyword,
					class_id:that.classId,
					length:20,
				},function(res){
					that.list = res;
				})
			},
			labelOnClick(e){
				this.classId = e.id;
				this.loadKonwledgeList();
			},
			search(e){
				this.keyword = e.value;
				this.loadKonwledgeList();
			},
			clickItem(e){
				console.log(e);
				uni.navigateTo({
					url:'../knowledge/info?id=' + e.id
				})
			}
		}
	}
</script>

<style>
</style>
