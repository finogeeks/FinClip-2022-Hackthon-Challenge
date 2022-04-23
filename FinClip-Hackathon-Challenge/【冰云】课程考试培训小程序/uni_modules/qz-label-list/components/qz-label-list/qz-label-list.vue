<template>
	<view>
		<uni-row class="demo-uni-row">
			<uni-col :span="24/labelList.length" v-for="item in labelList">
				<view :class="['demo-uni-col',{'light':item.id == currentLabelId}]" @click="labelOnClick(item)">
					<span>{{item.name}}</span>
				</view>
			</uni-col>
		</uni-row>
	</view>
</template>
<script>
	export default {
		props: {
			labelList: {
				type: Array,
				default:[
					{
						id:0,
						name:'全部',
					}
				]
			}
		},
		data(){
			return {
				currentLabelId:null,
			}
		},
		mounted() {
			this.currentLabelId = this.labelList[0].id;
			console.log(this.cardList);
		},
		methods: {
			labelOnClick(e) {
				this.currentLabelId = e.id;
				this.$emit('labelOnClick', e);
			}
		}
	}
</script>
<style>
	.demo-uni-col{
		text-align: center;
		padding: 10px;
		color: #333333;
	}
	.light{
		color: #1261d0;
		border-bottom: 2px solid #1261d0;
	}
</style>
