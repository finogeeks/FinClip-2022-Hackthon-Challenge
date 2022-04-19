<template>
	<view class="map">
		<view class="header flex col-center">
			<view class="location flex col-center" @click="cityShow = true">
				<img src="@/static/map/position.png">
				<text>{{city}}</text>
			</view>
			<u-search
				disabled
				v-model="keyword" 
				placeholder="输入地点名称快速定位"
				shape="square" 
				:show-action="false" 
				bgColor="#F7F8FA" 
				borderColor="#DDDFE5"
				@click="toSearch"
			></u-search>
		</view>
		<view class="main">
			<view id="container" class="map"></view>
			<view v-if="isShowCollect" class="collect flex col-center row-center">
				<view>
					当前{{mapZoom > 9 ? '城市': '全国'}}中风险<text>{{collect.mcount}}</text>个，高风险地区有<text>{{collect.hcount}}</text>个
				</view>
				<img src="@/static/map/close.png" @click="isShowCollect = false">
			</view>
			<img src="@/static/map/explain.png" class="explain">
			<view class="cut-off">数据截止{{collect.endUpdateTime}}</view>
		</view>
		<u-picker
		  :show="cityShow"
		  ref="cPicker"
		  keyName="label"
			:columns="cityColumns"
			confirmColor="#2EC7C2"
		  @confirm="onConfirmCity"
		  @change="onChangeCity"
		  @cancel="cityShow = false"
		></u-picker>
	</view>
</template>

<script>
	import AMapLoader from '@amap/amap-jsapi-loader'
	import http from '@/api/api'
	import city from '@/common/js/uview-city.js'
	
	export default {
		data() {
			return {
				city: '北京市', // 定位城市，没有默认北京
				cityShow: false, // 显示选择城市
				cityColumns: [], // 城市列表
				keyword: '', // 搜索关键词
				isShowCollect: true, // 是否显示数量汇总
				collect: { // 是否显示数量汇总
					endUpdateTime: '',
					hcount: 0,
					mcount: 0
				},
				map: null, //地图
				mapZoom: 0, // 地图改变的层级
				event: '', // 地图事件
				selectCity: '', // 选择的城市
				circle: null, // 疫情点区域
				allRiskAreaList: [], // 全国疫情数据
				countyRiskAreaList: [], // 城市疫情数据
				search : null,
				lowMarker: null, // 低风险marker
				circleList: [
					{
						radius: 1000, //半径
						fillOpacity: 0.1,
						zIndex: 99
					},
					{
						radius: 700, //半径
						fillOpacity: 0.2,
						zIndex: 999
					},
					{
						radius: 400, //半径
						fillOpacity: 0.3,
						zIndex: 9999
					}
				]
			}
		},
		onShow() {
			this.initMap()
		},
		onLoad(option) {
			this.cityColumns = city.columns
			if(option.search) {
				this.search = JSON.parse(decodeURIComponent(option.search))
			}
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
					plugins: ['AMap.ToolBar', 'AMap.Geolocation', 'AMap.PlaceSearch']
			  }).then((AMap)=>{
			    this.map = new AMap.Map("container",{
			      viewMode: "3D",
			      zoom: 8.99,
						rotateEnable: false,
			      center: [116.397428, 39.90923]
					})
					// 添加 工具条
					this.map.addControl(
					  new AMap.ToolBar({
					    position: { right: '14px', bottom: '84px' }
					  })
					)
					
					// 添加 浏览器个人定位
					this.ongeolocation()
					
					// 搜索位置
					if(this.search) {
						this.onSearch()
					}
					
					// 地图缩放停止, 触摸结束时触发事件
					this.map.on(['zoomend', 'touchend'], () => {
						this.event = 'touch' // touch 时 不设置地图中心点
					})
					
					// 地图层级变化
					this.map.on(['zoomchange', 'touchend'], async () => {
						await this.onZoomchange(this.map.getZoom())
					})
					
					this.map.on('complete', async () => {
						if(this.search) {
							this.map.getCity((result) => {
								this.city = result.city || result.province
							})
						}
						await this.onZoomchange(this.map.getZoom())
					})
					
				}).catch(e=>{
					console.log(e)
				})
			},
			/**
			 * 个人定位
			 */
			ongeolocation() {
				const geolocation = new AMap.Geolocation({
				  enableHighAccuracy: true, // 是否使用高精度定位
				  timeout: 10000, // 超过3秒后停止定位
				  position: { right: '14px', bottom: '34px' }, // 定位按钮的停靠位置
				  borderRadius: '10px', // 圆角
				  offset: [0, 0], // 定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
				  zoomToAccuracy: this.search ? false : true // 定位成功后是否自动调整地图视野到定位点
				})
				this.map.addControl(geolocation)
				// 获取个人定位
				const _this = this
				if(!_this.search) {
					geolocation.getCurrentPosition(async function (status, result) {
						if (status === 'error' && !_this.search) {
							_this.map.setZoom(9)
							uni.$u.toast('暂无法获取定位,稍后再试')
					  }
						if(status === 'complete') {
							_this.event = 'touch'
							if(!_this.search) {
								_this.mapZoom = 15
								_this.map.setZoomAndCenter(_this.mapZoom, result.position)
								await _this.onZoomchange(_this.mapZoom)
							}
						}
					})
				}
			},
			/**
			 * 地图层级变化
			 * @param {Object} zoom 地图层级
			 */
			async onZoomchange(zoom) {
				this.mapZoom = zoom
				if(zoom <= 9 && !this.allRiskAreaList.length) {
					// 选择城市初始，根据选择的城市请求接口，避免重复请求
					this.selectCity = ''
					// 清除疫情点的区域，圆
					this.circle && this.map.remove(this.circle)
					// 清除疫情点
					this.countyRiskAreaList.length && this.map.remove(this.countyRiskAreaList)
					this.countyRiskAreaList = []
					await this.allRiskArea()
				} 
				if(zoom > 9 ){
					// 清除市级疫情聚合点
					this.allRiskAreaList.length && this.map.remove(this.allRiskAreaList)
					this.allRiskAreaList = []
					if(this.event === 'touch') {
						this.map.getCity(async (result) => {
							this.city = result.city || result.province
							// 当地图变化，当前城市与之前城市不一样时，请求接口
							if(this.selectCity !== (result.city || result.province)) {
								this.selectCity = result.city || result.province
								await this.countyRiskArea(result.province, result.city || result.province)
							}
						})
					}
				}
			},
			/**
			 * 当地图层级小于等于9时
			 * 显示全国疫情聚合效果
			 */
			async allRiskArea() {
				const _this = this
				_this.allRiskAreaList = []
				await http.AllRiskAreaListInquiry().then(res => {
					if(this.mapZoom <= 9) {
						_this.collect = {
							endUpdateTime: res.body.endUpdateTime,
							hcount: res.body.hcount,
							mcount: res.body.mcount
						}
						for(let item of res.body.dataList) {
							const text = new AMap.Text({
								text: `<div>${item.city}</div><div>${item.count}个</div>`,
								anchor: 'center',
								offset: [0, 10],
								angle: 0,
								position: item.center,
								style:{
									'border': 0,
									'zIndex': 9999,
									'width': '64px',
									'height': '64px',
									'color': '#fff',
									'font-size': '14px',
									'font-weight': 500,
									'padding': '12px 0',
									'text-align': 'center',
									'border-radius': '100%',
									'box-sizing': 'border-box',
									'background': 'linear-gradient(135deg, #F9900E 0%, #F75D03 100%)',
									'box-shadow': '0px 8px 40px 0px rgba(249, 124, 10, 0.3)'
								},
								extData: {
									province: item.province,
									city: item.city
								}
							})
							text.setMap(_this.map)
							_this.allRiskAreaList.push(text)
							
							text.on('click', () => {
								_this.mapZoom = 10
								_this.event = 'click' // click 时 设置地图中心点
								_this.city = text.getExtData().city
								_this.selectCity = text.getExtData().city
								_this.countyRiskArea(text.getExtData().province, text.getExtData().city)
							})
						}
					}
				})
			},
			/**
			 * 地图层级大于9级时
			 * 显示具体地理位置的ICON
			 * @param {Object} province 省
			 * @param {Object} city 市
			 */
			async countyRiskArea(province, city) {
				const _this = this
				_this.map.remove(_this.countyRiskAreaList)
				_this.countyRiskAreaList = []
				await http.CountyRiskAreaListInquiry({
					province: province,
					city: city
				}).then(res => {
					if(this.mapZoom > 9) {
						_this.collect = {
							endUpdateTime: res.body.endUpdateTime,
							hcount: res.body.hcount,
							mcount: res.body.mcount
						}
						for(let item of res.body.dataList) {
							const marker = new AMap.Marker({
								position: new AMap.LngLat(item.lng, item.lat),
								offset: new AMap.Pixel(-22, -45),
								topWhenClick: true ,// 鼠标点击时marker是否置顶
								icon: new AMap.Icon({
									zIndex: 999,
									size: new AMap.Size(45, 45),
									imageSize: new AMap.Size(45, 45),
									image: item.riskLevel === 2 ? 'https://cdgwin-dev.cn-bj.ufileos.com/gwin-covidmap/high.png' : 'https://cdgwin-dev.cn-bj.ufileos.com/gwin-covidmap/middle.png'
								}),
								extData: {
									community: item.community,
									lng: item.lng,
									lat: item.lat,
									riskLevel: item.riskLevel,
									image: item.riskLevel === 2 ? 'https://cdgwin-dev.cn-bj.ufileos.com/gwin-covidmap/high.png' : 'https://cdgwin-dev.cn-bj.ufileos.com/gwin-covidmap/middle.png'
								}
							})
							marker.setMap(_this.map)
							_this.countyRiskAreaList.push(marker)
							
							marker.on('click', () => {
								_this.onClickMarker(marker)
							})
						}
						
						_this.isShowCollect = true
						
						// click 时 设置地图中心点
						if(_this.event === 'click') {
							_this.map.setZoomAndCenter(_this.mapZoom, res.body.center)
						}
						
						if(_this.search) {
							_this.isPointInRing()
						}
					}
				})
			},
			/**
			 * 点击当前 marker，图标变大并显示地区名称
			 * 其他 marker 变小，隐藏名称
			 */
			onClickMarker(marker) {
				// 清除点击前的区域，圆
				this.circle && this.map.remove(this.circle)
				
				// 其他 marker 变小
				for(let item of this.countyRiskAreaList) {
					item.setIcon(new AMap.Icon({
						zIndex: 999,
						size: new AMap.Size(45, 45),
						imageSize: new AMap.Size(45, 45),
						image: item.getExtData().image
					}))
					item.setLabel({
						content: ''
					})
				}
				
				// 当前 marker 图标变大
				marker.setOffset(new AMap.Pixel(-30, -60))
				marker.setIcon(new AMap.Icon({
					zIndex: 999,
					size: new AMap.Size(60, 60),
					imageSize: new AMap.Size(60, 60),
					image: marker.getExtData().image
				}))
				marker.setLabel({
					offset: new AMap.Pixel(0, 0), 
					content: marker.getExtData().community,
					direction: 'bottom'
				})
				
				// 设置地图层级
				this.mapZoom = 15
				this.event = ''
				const center = [marker.getExtData().lng, marker.getExtData().lat]
				this.map.setZoomAndCenter(this.mapZoom, center)
				
				const circle = new AMap.Circle({
					center: center,
					radius: 120, //半径
					zIndex: 99,
					strokeWeight: 0,
					fillColor: marker.getExtData().riskLevel === 2 ? '#EB8480': '#FEDF70',
					fillOpacity: 0.3
				})
				circle.setMap(this.map)
				this.circle = circle
			},
			/**
			 * 城市选择
			 * @param {Object} e
			 */
			onChangeCity(e) {
			  const {
			    columnIndex,
			    index,
			    picker = this.$refs.cPicker // 微信小程序无法将picker实例传出来，只能通过ref操作
			  } = e
				
			  // 当第一列值发生变化时，变化第二列(后一列)对应的选项
			  if (columnIndex === 0) {
					
			    // picker为选择器this实例，变化第二列对应的选项
			    picker.setColumnValues(1, city.columnData[index])
			  }
			},
			/**
			 * 切换城市
			 * @param {Object} e
			 */
			onConfirmCity(e) {
				this.city = e.value[1].label
				this.cityShow = false
				this.isShowCollect = true
				this.mapZoom = 10
				this.event = 'click'  // click 时 设置地图中心点
				this.selectCity = e.value[1].label
				this.countyRiskArea(e.value[0].label, e.value[1].label)
			},
			toSearch() {
				uni.navigateTo({
					url: '/pages/map/search'
				})
			},
			/**
			 * 搜索位置添加标记
			 */
			onSearch() {
				this.keyword = this.search.name
				const point = [this.search.lng, this.search.lat]
				for(let item of this.circleList) {
					// 圆 区域
					const circle = new AMap.Circle({
						center: point,
						radius: item.radius, //半径
						zIndex: item.zIndex,
						strokeWeight: 0,
						fillColor: '#2EC7C2',
						fillOpacity: item.fillOpacity
					})
					circle.setMap(this.map)
				}
				
				// 搜索地点
				const text = new AMap.Text({
					text: this.search.name,
					anchor: 'center',
					offset: [0, 10],
					angle: -1,
					position: point,
					style:{
						'color': '#3B4664',
						'font-size': '12px',
						'font-weight': 600,
						'zIndex': 1111,
						'border': 0,
						'background': 0
					},
				})
				text.setMap(this.map)
				
				// 低风险 marker
				const marker = new AMap.Marker({
					position: point,
					offset: new AMap.Pixel(-22, -45),
					icon: '../../static/map/low.png'
				})
				marker.setMap(this.map)
				this.lowMarker = marker
				
				// 地图设置中心点
				this.event = 'touch'
				this.mapZoom = 13
				this.map.setZoomAndCenter(this.mapZoom, point)
			},
			/**
			 * 判断圆区域内 是否有marker
			 */
			isPointInRing() {
				// 判断圆区域内 是否有marker
				const ring = this.map.getAllOverlays('circle')[0]
				for(let item of this.countyRiskAreaList) {
					// 判断指定点坐标是否在圆内
					const lngLat = [item.getExtData().lng, item.getExtData().lat]
					if(ring.contains(lngLat)) {
						this.lowMarker && this.map.remove(this.lowMarker)
						return false
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.map {
		.header {
			padding: 28rpx;
			background-color: #F7FAFF;
			.location {
				margin-right: 28rpx;
				img {
					width: 40rpx;
					height: 40rpx;
				}
				text {
					color: #2EC7C2;
					font-size: 28rpx;
					font-weight: 500;
				}
			}
		}
		.main {
			width: 100%;
			height: calc(100vh - 62px);
			position: relative;
			.map {
				width: 100%;
				height: 100%;
			}
			.collect {
				color: #fff;
				width: 694rpx;
				height: 80rpx;
				font-size: 28rpx;
				font-weight: 600;
				border-radius: 40rpx;
				background: linear-gradient(135deg, #F75D03 0%, #F9900E 100%);
				box-shadow: 0 8rpx 40rpx 0 rgba(249, 124, 10, 0.3);
				position: absolute;
				top: 28rpx;
				left: 50%;
				margin-left: -347rpx;
				text {
					padding: 0 8rpx;
					font-size: 36rpx;
				}
				img {
					width: 40rpx;
					height: 40rpx;
					margin-left: 26rpx;
				}
			}
			.explain {
				z-index: 999;
				width: 200rpx;
				height: 184rpx;
				box-shadow: 0px 4px 20px 0px rgba(17, 17, 17, 0.1);
				position: absolute;
				left: 0;
				bottom: 128rpx;
			}
			.cut-off {
				z-index: 999;
				color: #1A2234;
				padding: 20rpx;
				font-size: 28rpx;
				background: linear-gradient(90deg, #fff 0%, rgba(255, 255, 255, 0) 100%);
				position: absolute;
				left: 0;
				bottom: 28rpx;
			}
		}
	}
	::v-deep .amap-marker-label {
		border: 0;
		padding: 0;
		color: #3B4664;
		font-weight: 600;
		background-color: transparent;
	}
	::v-deep .amap-icon img {
		width: 90rpx;
		height: 90rpx;
	}
</style>
