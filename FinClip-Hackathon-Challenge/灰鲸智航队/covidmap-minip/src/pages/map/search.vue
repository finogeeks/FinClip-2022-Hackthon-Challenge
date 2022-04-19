<template>
	<view class="search">
		<view class="header">
			<u-search
				v-model="keyword" 
				placeholder="输入地点名称快速定位"
				shape="square" 
				:show-action="false" 
				bgColor="#F7F8FA" 
				borderColor="#DDDFE5"
				@change="onChange"
			></u-search>
		</view>
		<view class="result" v-if="keyword && poiList.length">
			<view class="list" v-for="item in poiList" :key="item.id" @click="toPosition(item)">
				<view class="title flex row-between col-center">
					<view class="flex col-center">
						<img src="@/static/map/search.png">
						<view v-html="item.name"></view>
					</view>
					<img src="@/static/map/right.png">
				</view>
				<view class="address">{{item.address}}</view>
			</view>
		</view>
		<view class="none" v-if="keyword && !poiList.length">没找到搜索结果，请换个关键词试试~</view>
		<view id="container" class="map"></view>
	</view>
</template>

<script>
	import AMapLoader from '@amap/amap-jsapi-loader'
	export default {
		data() {
			return {
				keyword: '' ,// 搜索关键词
				AMap: null, // 地图
				poiList: [] // 搜索结果
			}
		},
		onLoad() {
			this.initMap()
		},
		onHide() {
			this.map && this.map.destroy()
		},
		methods: {
			initMap(){
				window._AMapSecurityConfig = {
				  securityJsCode: 'f3c5db58b1ed243b344704b8e3d3b221' // jscode 要与 key 一起使用
				}
			  AMapLoader.load({
			    key:"ca8e4bb0de71021022e1318464b67c49",
			    version:"2.0",
			  }).then((AMap)=>{
					this.AMap = AMap
			    new this.AMap.Map("container")
				}).catch(e=>{
					console.log(e)
				})
			},
			onChange() {
				const _this = this
				this.AMap.plugin('AMap.PlaceSearch', function () {
				  const placeSearch = new _this.AMap.PlaceSearch({
						city: '全国',
						pageSize: 15, // 单页显示结果条数
						pageIndex: 1, // 页码
					})
				  placeSearch.search(_this.keyword, function(status, result) {
						if(status === 'complete') {
							_this.poiList = result.poiList.pois
							for(let item of _this.poiList) {
								item.text = item.name
								if(item.name.indexOf(_this.keyword) !== -1) {
									item.name = item.name.replace(_this.keyword, `<text style="color: #2EC7C2">${_this.keyword}</text>`)
								}
							}
						}
				  }) 
				})
			},
			toPosition(item) {
				uni.navigateTo({
					url: '/pages/map/index?search=' + encodeURIComponent(JSON.stringify({
						name: item.text,
						lng: item.location.lng,
						lat: item.location.lat
					}))
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search {
		width: 100%;
		min-height: 100vh;
		height: 100%;
		padding: 28rpx;
		box-sizing: border-box;
		background-color: #F7FAFF;
		.none {
			color: #666;
			padding: 32rpx 0;
			font-size: 28rpx;
			text-align: center;
		}
		.result {
			.list {
				width: 100%;
				padding: 28rpx;
				margin-top: 28rpx;
				border-radius: 16rpx;
				box-sizing: border-box;
				background-color: #fff;
				.title {
					color: #3B4664;
					font-size: 28rpx;
					font-weight: 600;
					img {
						width: 40rpx;
						height: 40rpx;
					}
				}
				.address {
					color: #999;
					font-size: 24rpx;
					padding-top: 12rpx;
					padding-left: 40rpx;
				}
			}
		}
		.map {
			opacity: 0;
			width: 1rpx;
			height: 1rpx;
		}
	}
</style>
