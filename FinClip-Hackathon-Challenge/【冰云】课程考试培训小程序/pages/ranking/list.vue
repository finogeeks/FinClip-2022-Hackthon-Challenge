<template>
	<view>
		<view class="title-wrap">
			<view class="title-block">
				<view class="title">月度排行榜</view>
				<view class="title-time">2022年3月</view>
			</view>
			<view class="title-img-wrap">
				<image class="title-img" src="../../static/image/icon/trophy.png" mode=""></image>
			</view>
		</view>
		<uni-row class="demo-uni-row">
			<uni-col :span="12">
				<view :class="['demo-uni-col',{light:isLight}]" @click="clickRanking(true)">
					<span>学分排行</span>
				</view>
			</uni-col>
			<uni-col :span="12">
				<view :class="['demo-uni-col',{light:!isLight}]"  @click="clickRanking(false)">
					<span>学时排行</span>
				</view>
			</uni-col>
		</uni-row>
		
		<uni-list>
			<uni-list-item title="林小子" note="20分" thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
			 thumb-size="lg" rightText="第一名"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				isLight:true,
				list:[
				],
			}
		},
		onLoad() {

		},
		methods: {
			clickRanking(e){
				this.isLight = e;
			}
		}
	}
</script>

<style>
	.title-wrap{
		display: flex;
		text-align: center;
		justify-content: center;
		align-items: center;
		background: linear-gradient(-15deg, #4096d8, #2889e8);
		padding: 26upx 0;
	}
	.title-block{
		display: inline-block;
	}
	.title{
		font-size: 40upx; 
		font-weight: bolder;
		color: white;
		padding-bottom: 10upx;
	}
	.title-time{
		font-size: 24upx;
		color: #efefef;
	}
	.title-img-wrap{	
		display: inline-block;
		width: 30%
	}
	.title-img{
		width: 100upx;
		height: 100upx;
		padding-left: 100upx;
	}
	
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
