<template>
	<view>
		<uni-search-bar :radius="100" @confirm="search"></uni-search-bar>
		<uni-drawer ref="showRight" mode="right" :mask-click="true">
			<scroll-view style="height: 100%;" scroll-y="true">
				<view v-for="item in tap" 
					@click="tapOnClick(item)"
					:class="['tap',{'top-hover':item.id == currentTap}]" 
					:key="item.id">
					{{ item.name }}
				</view>
			</scroll-view>
		</uni-drawer>
		<uni-list>
			<view v-for="(value,learnTime) in list">
				<uni-list-item>
					<template v-slot:header >
						<view class="learn-time">{{learnTime}}</view>
					</template>
				</uni-list-item>
			<!-- 水平排列，左图右文 -->
				<uni-list-item  v-for="(item,i) in value" :title="item.course.title" clickable   :to="'../course/info?id='+item.course_id">
					<template v-slot:header >
						<view class="uni-thumb"><image :src="item.course.cover" mode="aspectFill"></image></view>
					</template>
				</uni-list-item>
			</view>
		</uni-list>
	</view>
</template>
<script>
	import examServer from '../../common/js/exam.js';
	export default {
		data(){
			return {
				tap:[
					{
						id:0,
						name:'全部',
					},
					{ 
						id:1,
						name:'选修课',
					},
					{
						id:2,
						name:'必修课',
					}
				],
				currentTap:0,
				list:[],
				keyword:'',
			}
		},
		onLoad(){
			this.loadCourseLearn();
		},
		methods: {
			loadCourseLearn() {
				var that = this;
				examServer.courseLearn({
					keyword:that.keyword,
					date:1,
				},function(res){
					that.list = res;
					console.log(that.list);
				})
			},
			showDrawer() {
				this.$refs.showRight.open();
			},
			closeDrawer() {
				this.$refs.showRight.close();
			},
			search(e){
				this.keyword = e.value;
				this.loadCourseLearn();
			},
			tapOnClick(e){
				this.currentTap = e.id;
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.tap{
		padding: 20upx;
		border-bottom: 2px solid #98cdff;
		text-align: center;
	}
	.top-hover{
		background-color: #007AFF;
		color: #F7F7F7;
	}
	#tap-list{
		padding: 20upx;
		display: flex;
	}
	.learn-time{
		color: gray;
		font-size: $uni-font-size-sm;
	}
</style>
