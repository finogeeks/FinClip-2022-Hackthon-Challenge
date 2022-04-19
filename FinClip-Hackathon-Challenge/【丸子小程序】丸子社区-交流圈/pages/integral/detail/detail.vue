<template>
	<view class="content">
		<view class="goodindex" v-if="detail!==''">
			<view class="goodmedia">
				<view class="goodbanner">
					<swiper @change="change" class="swiper" style="height:100%;">
						<swiper-item v-for="(item,index) in detail.product.picture" :key="index">
							<image mode="aspectFill" class="image _img" :src="item"></image>
						</swiper-item>
					</swiper>
					<view class="custombtn custom-indicator" slot="indicator">
						{{current+1+'/'+detail.product.picture.length}}
					</view>
				</view>
			</view>
			<view class="gooddetailbox">
				<view class="gooddetail">
					<view class="goodinfo box-shadow-main">
						<view class="detailcon">
							<view class="goodinfo">
								<view class="goodname">
									<view class="name">
										<label class="goodtag _span"
											v-if="detail.cats.length>0">{{''+detail.cats[0].name+''}}</label>
										{{''+detail.title.rendered+''}}
									</view>
								</view>
								<view class="goodremark">{{''+detail.excerpt.rendered+''}}</view>
								<view class="goodtab goodprice">
									<view class="goodleft">
										{{'已售:'+detail.product.sales+'\n  \n 仅剩:'+detail.product.stock+''}}
									</view>
									<view class="goodright">
										<view class="pricesale font-weight">积分：{{detail.product.credit}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>

					<view class="detailscon box-shadow-main">
						<view class="goodparam">
							<view class="goodcell">商品详情</view>
							<view class="cellbottom"></view>
							<view class="cellhr"></view>
						</view>
						<view class="gooddesc">
							<view class="_div">
								<u-parse :show-with-animation="true" :html="productContent" ref="article"
									:tag-style="tagStyle"></u-parse>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="goodbuy">
				<view class="buybox">
					<view class="iconbtn">
						<view @tap="backIndex" class="iconitem">
							<view class="iconfont iconhome1">
								<image class="iconimage" src="/static/images/home.png"></image>
							</view>
							<view class="iconname">首页</view>
						</view>
					</view>
					<view class="buybtn" v-if="detail.product.stock>0">
						<view @tap="buy" class="buybtn">立即兑换</view>
					</view>
					<view class="buybtn buybtn--dis" v-else>已售磬</view>
				</view>
			</view>

		</view>

		<view class="mask" :class="exchangeModalHidden?'hide':''" v-if="detail!==''">
			<view class="modal-container" :class="exchangeModalActive?'active':''">
				<view class="modal-detail">

					<view class="flex-between mb-60">
						<image class="mt-100" mode="aspectFill" :src="detail.product.picture[0]"></image>
						<view class="modal-title line-2">{{detail.title.rendered}}</view>
					</view>

					<view class='productWinList'>
						<view class='item' v-for="(item,index) in detail.product.model" :key="index">
							<view class='title'>{{item.name}}</view>
							<view class='listn acea-row row-middle'>
								<view @tap='tapAttr(index,index1)' class="itemn" :class="item.checked==itemn ?'on':''"
									v-for="(itemn,index1) in item.option" :key="index1">
									{{itemn}}
								</view>
							</view>
						</view>
					</view>

					<view class="flex-between flex-row-end mb-30">
						<text class="flex-label">支付金额：</text>
						<text class="price">
							<text>{{detail.product.credit}}</text> 积分</text>
					</view>

					<view class="modal-remarks flex-row">
						<text class="flex-label">留言备注：</text>
						<input @input="bindMessage" maxlength="20" placeholder="最多20字" :value="message"></input>
					</view>

					<view class="modal-addr mb-30">
						<button @click="getWxAddress">
							<view class="line-1" v-if="addressList.detail">
								地址：{{addressList.address.province }}{{addressList.address.city }}{{addressList.address.district }}
								{{addressList.detail}}
							</view>
							<view v-else>
								<text>选择地址</text>
							</view>
						</button>
					</view>
				</view>
				<view class="modal-foot flex-center">
					<button @tap="hideExchangeModal" class="btn-secondary">再考虑下</button>
					<button @tap="creditPay" class="btn-primary">确认兑换</button>
				</view>
			</view>
		</view>

		<shop-adress :adressShow="adressShow" :adressList="adressList" @cancelDialogs="cancelDialog"
			@confirmDialog="confirmDialog" @deleteItems="addressListDelete" @addAddress='addAddress'></shop-adress>
		<u-popup v-model="addAddressShow" mode="bottom">
			<u-form :model="form" ref="uForm" class="form-address">
				<u-form-item label="姓名:">
					<u-input v-model="form.username" />
				</u-form-item>
				<u-form-item label="电话:">
					<u-input v-model="form.mobile" />
				</u-form-item>
				<u-form-item label="地区:">
					<u-input :border="border" type="select" :select-open="pickerShow" v-model="region"
						placeholder="请选择地区" @click="pickerShow = true"></u-input>
				</u-form-item>

				<u-form-item label="地址:">
					<u-input v-model="form.address" />
				</u-form-item>
				<u-button @click="submit">添加</u-button>
			</u-form>
			<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm"></u-picker>

		</u-popup>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import API from '@/api/api.js';
	var app = getApp();
	export default {
		data() {
			return {
				addAddressShow: false,
				current: 0,
				border: false,
				form: {
					username: '',
					mobile: '',
					address: ''
				},
				pickerShow: false,
				user: [],
				detail: '',
				region: '',
				message: '',
				adressShow: false,
				productContent: '',
				exchangeModalHidden: true,
				exchangeModalActive: false,
				exchangeModalVisible: false,
				adressList: [],
				addressList: [],
				model: [],
				content: '',
				province: '',
				city: '',
				ares: '',
				tagStyle: {
					img: 'width:100%;display:block;',
					table: 'width:100%',
					video: 'width:100%',
					p: 'padding-top:20rpx',
					button: 'border-width: 2rpx;border-color: #5b96fe;border-style: solid;border-radius: calc((50rpx - 4rpx) / 2);font-size: 26rpx;background-color: #5b96fe;display: flex;color: #fff;align-items: center;justify-content:center;padding:20rpx 40rpx;margin:20rpx auto;'
				}
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getproductDetail(options.id);
			let addressD = uni.getStorageSync('addressD');
			if (addressD) {
				this.adressList = addressD;
			}

		},
		onShow() {
			let user = app.globalData.user
			if (!user) {
				user = '';
				uni.navigateTo({
					url: '/pages/login/login',
				})
			}
			this.user = user;
		},
		methods: {
			buy: function() {
				this.exchangeModalHidden = false;
				this.exchangeModalActive = true;
				this.exchangeModalVisible = true;
			},
			hideExchangeModal: function() {
				this.exchangeModalHidden = true;
				this.exchangeModalActive = false;
				this.exchangeModalVisible = false;
			},
			change: function(e) {
				this.current = e.detail.value;
			},
			getproductDetail: function(id) {
				API.getProductByID(id).then(res => {
					this.detail = res;
					this.productContent = res.content.rendered;
					console.log(this.detail);
				})
			},
			getWxAddress: function() {
				this.adressShow = true;
			},
			cancelDialog: function() {
				this.adressShow = false;
			},
			addAddress: function() {
				this.addAddressShow = true;
			},
			addressListDelete: function(e) {
				console.log(e);
				let index = e;
				this.adressList.splice(index, 1)
				uni.setStorageSync('addressD', this.adressList)
			},

			backIndex: function() {
				uni.reLaunch({
					url: '/pages/home/home'
				})
			},

			creditPay: function() {
				let that = this;
				if (!this.user) {
					uni.navigateTo({
						url: '/pages/login/login',
					})
					return;
				}
				let address = that.addressList;
				if (address.real_name == "") {
					that.$refs.uToast.show({
						title: "请输入联系人姓名",
						type: 'error',
					})
					return
				}
				if (address.phone == "") {
					that.$refs.uToast.show({
						title: "请输入联系人手机号码",
						type: 'error',
					})
					return
				}
				let args = {
					id: that.detail.id,
					type: 'credit',
					count: that.cart_num,
					model: that.model.join(","),
					message: that.message,
					address: '地址：' + address.address.province + address.address.city + address.address.district +
						address.detail + '--' + '联系人：' + address.real_name + "--" + "电话号码：" + address.phone,
				}
				API.credit(args).then(res => {
					console.log(res);
					if (res.status == 200) {
						uni.redirectTo({
							url: '/pages/shop/exchanges',
						})
						that.$refs.uToast.show({
							title: "兑换成功",
							type: 'success',
						})
					}

				}).catch(err => {
					uni.showModal({
						title: '兑换失败',
						content: err.message,
						cancelText: '取消',
						confirmText: '确定',
						success(res) {
							if (res.cancel) {

							} else if (res.confirm) {
								that.$refs.uToast.show({
									title: "请稍后重试",
									type: 'error',
								})

							}
						}
					})
				})

			},


			submit: function() {
				this.addAddressShow = false;
				var addressP = {};
				addressP.province = this.province;
				addressP.city = this.city;
				addressP.district = this.area;

				this.adressList.push({
					address: addressP,
					is_default: 1,
					real_name: this.form.username,
					phone: this.form.mobile,
					detail: this.form.address,
					id: 0
				});
				let addressD = uni.getStorageSync('addressD');
				if (addressD) {
					addressD.push({
						address: addressP,
						is_default: 1,
						real_name: this.form.username,
						phone: this.form.mobile,
						detail: this.form.address,
						id: 0
					})
					uni.setStorageSync('addressD', addressD)
				} else {
					let addressNew = [{
						address: addressP,
						is_default: 1,
						real_name: this.form.username,
						phone: this.form.mobile,
						detail: this.form.address,
						id: 0
					}];
					uni.setStorageSync('addressD', addressNew);
				}
				this.form = {
					username: '',
					mobile: '',
					address: ''
				}
			},

			tapAttr: function(indexw, indexn) {

				//每次点击获得的属性
				var attr = this.data.detail.product.model[indexw].option[indexn];
				console.log(attr);
				//设置当前点击属性
				this.detail.product.model[indexw].checked = attr;
				this.model[indexw] = this.detail.product.model[indexw].name + ":" + attr;
			},
			bindMessage: function(e) {
				if (e.detail.value.length > 0) {
					this.message = e.detail.value;
				}
			},
			regionConfirm(e) {
				this.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
				this.province = e.province.label;
				this.city = e.city.label;
				this.area = e.ares.label;
			},
			confirmDialog: function(e) {
				let that = this;
				console.log(e);
				if (!e) {
					that.$refs.uToast.show({
						title: "请输入地址信息",
						type: 'error',
					})

				} else {
					this.adressShow = false;
					this.addressList = e;
				}

			}
		}
	}
</script>

<style>
	.diverter-border {
		width: calc(100% - 60rpx);
		height: 1rpx;
		background: rgba(147, 177, 177, .16);
		margin: 0 auto;
	}

	.diverter-element {
		width: 100%;
		height: 20rpx;
		background: rgba(147, 177, 177, .16);
	}

	.box-shadow-main {
		box-shadow: 0 2px 16px 0 rgba(0, 0, 0, .12);
	}

	.viewheader {
		width: 100%;
		height: 20rpx;
	}

	.slide-fade-enter-active {
		transition: all .3s ease;
	}

	.slide-fade-leave-active {
		transition: all .1s ease-out;
	}

	.slide-fade-enter.data-v-20c10b2c,
	.slide-fade-leave-to {
		transform: translateY(200px);
	}

	.goodindex {
		padding-bottom: 120rpx;
		background: rgba(147, 177, 177, .03);
		font-size: 28rpx;
		height: calc(100vh - 120rpx);
	}

	.goodindex .goodmedia {
		position: relative;
	}

	.goodindex .goodmedia .currenttype {
		position: absolute;
		bottom: 45px;
		width: 100%;
		display: flex;
		-webkit-box-pack: center;
		justify-content: center;
	}

	.goodindex .goodmedia .currenttype--video {
		bottom: 117px;
	}

	.goodindex .goodmedia .currenttype .typeitem {
		color: #93b1b1;
		background: #fff;
		width: 80rpx;
		border-radius: 18rpx;
		text-align: center;
		font-size: 20rpx;
		line-height: 20rpx;
		padding: 8rpx 0;
	}

	.goodindex .goodmedia .currenttype .typeitem+.typeitem {
		margin-left: 20rpx;
	}

	.goodindex .goodmedia .currenttype .typeitem--active {
		color: #fff;
		background: #93b1b1;
	}

	.goodindex .goodvideo {
		top: 0;
		left: 0;
		width: 100vw;
		height: 1000rpx;
		overflow: hidden;
		position: relative;
		background: #000;
	}

	.goodindex .goodvideo .videoPlayer {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: #000;
	}

	.goodindex .goodvideo .videoPlayer>video {
		object-fit: cover !important;
	}

	.goodindex .goodvideo .videoimg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		background-size: 100%;
	}

	.goodindex .goodvideo .videoimg ._img {
		width: 100%;
		height: 100%;
	}

	.goodindex .goodvideo .videopause {
		position: absolute;
		top: calc(50% - 20px);
		left: calc(50% - 15px);
		z-index: 2;
		color: hsla(0, 0%, 100%, .5);
		width: 30px;
		height: 40px;
	}

	.goodindex .goodvideo .videopause .iconfont {
		font-size: 100rpx;
	}

	.goodindex .goodbanner {
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vw;
		overflow: hidden;
		position: relative;
	}

	.goodindex .goodbanner ._img {
		width: 100%;
		height: 100vw;
	}

	.goodindex .goodbanner .custombtn {
		width: 80rpx;
		border-radius: 18rpx;
		text-align: center;
		font-size: 20rpx;
		line-height: 20rpx;
		padding: 8rpx 0;
		background: rgba(0, 0, 0, .4);
		color: #fff;
		position: absolute;
		right: 20rpx;
	}

	.goodindex .goodbanner .custom-indicator {
		bottom: 100rpx;
	}

	.goodindex .goodbanner .bannerCDR {
		width: 120rpx;
		top: 30rpx;
	}

	.goodindex .gooddetailbox {
		padding: 0 30rpx 35rpx;
	}

	.goodindex .gooddetailbox .gooddetail {
		width: 100%;
		position: relative;
		top: -35px;
		left: 0;
	}

	.goodindex .gooddetailbox .gooddetail--video {
		z-index: 3;
		top: -107px;
	}

	.goodindex .gooddetailbox .gooddetail .goodinfo {
		border-radius: 20rpx;
		overflow: hidden;
		background: #fff;
		margin-bottom: 28rpx;
	}

	.goodindex .gooddetailbox .addresscon.data-v-20c10b2c,
	.goodindex .gooddetailbox .detailscon {
		margin-top: 30rpx;
		border-radius: 20rpx;
		overflow: hidden;
		background: #fff;
	}

	.goodindex .gooddetailbox .goodparam {
		padding: 0 30rpx;
	}

	.goodindex .gooddetailbox .goodparam .goodcell {
		font-size: 32rpx;
		padding: 28rpx 0;
		font-weight: 700;
	}

	.goodindex .gooddetailbox .goodparam .commentcell {
		width: 100%;
		display: flex;
		-webkit-box-pack: justify;
		justify-content: space-between;
	}

	.goodindex .gooddetailbox .goodparam .commentcell .commentscale {
		font-size: 24rpx;
		font-weight: 400;
		color: #666;
	}

	.goodindex .gooddetailbox .goodparam .commentcell .commentscale .iconfont {
		display: inline-block;
		font-size: 24rpx;
		margin-left: 8rpx;
	}

	.goodindex .gooddetailbox .goodparam .cellbottom {
		width: 34rpx;
		height: 4rpx;
		background: #222;
	}

	.goodindex .gooddetailbox .goodparam .cellhr {
		height: 30rpx;
	}

	.goodindex .gooddetailbox .goodparam .van-cell {
		padding: 0;
	}

	.goodindex .gooddetailbox .goodparam .van-cell+.van-cell {
		margin-top: 22rpx;
	}

	.goodindex .gooddetailbox .goodparam .labeltitle {
		color: #222;
		display: flex;
	}

	.goodindex .gooddetailbox .goodparam .labeltitle .paramtitle {
		display: inline-block;
		color: #999;
		width: 80px;
	}

	.goodindex .gooddetailbox .gooddesc {
		padding: 0 30rpx;
		overflow: hidden;
	}

	.goodindex .gooddetailbox .gooddesc>._div {
		width: 100%;
		margin-bottom: 200rpx;
	}

	.goodindex .gooddetailbox .goodaddress {
		font-size: 28rpx;
		padding: 30rpx;
	}

	.goodindex .goodbuy {
		position: fixed;
		bottom: 0;
		padding-bottom: env(safe-area-inset-bottom);
		left: 0;
		z-index: 4;
		width: 100%;
		background: #fff;
	}

	.goodindex .goodbuy .buybox {
		padding: 5px 30rpx;
		display: flex;
		-webkit-box-pack: justify;
		justify-content: space-between;
	}

	.goodindex .goodbuy .buybox .iconbtn {
		display: flex;
		align-self: center;
		flex-shrink: 0;
	}

	.goodindex .goodbuy .buybox .iconbtn .iconitem {
		width: 80rpx;
		text-align: center;
		margin-right: 20rpx;
		padding: 0;
		line-height: 1.3;
		position: relative;
	}

	.goodindex .goodbuy .buybox .iconbtn .iconitem--tag {
		width: auto;
		height: 16px;
		line-height: 16px;
		border-radius: 16px;
		min-width: 16px;
		padding: 0 2px;
		font-size: 12px;
		text-align: center;
		white-space: nowrap;
		position: absolute;
		right: 0;
		top: 0;
		background: #f43530;
		border-radius: 50%;
		transform: translateY(-20%);
		color: #fff;
		font-size: 20rpx;
		box-sizing: border-box;
	}

	.goodindex .goodbuy .buybox .iconbtn .iconitem .iconfont {
		font-size: 38rpx;
		color: #242525;
	}

	.goodindex .goodbuy .buybox .iconbtn .iconitem .iconfont .iconimage {
		width: 45rpx;
		height: 45rpx;
	}

	.goodindex .goodbuy .buybox .iconbtn .iconitem .iconname {
		color: #999;
		font-size: 20rpx;
	}

	.goodindex .goodbuy .buybox .btnbox {
		display: flex;
	}

	.goodindex .goodbuy .buybox .btnbox .buybtn {
		width: 190rpx;
		height: 75rpx;
		line-height: 75rpx;
		text-align: center;
		font-size: 26rpx;
		letter-spacing: 1px;
		color: #fff;
		background: #93b1b1;
		border-radius: 200rpx;
		border: 0;
	}

	.goodindex .goodbuy .buybox .btnbox .buybtn+.buybtn {
		margin-left: 20rpx;
	}

	.goodindex .goodbuy .buybox .buybtn {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		font-size: 26rpx;
		letter-spacing: 1px;
		color: #fff;
		background: #93b1b1;
		border-radius: 200rpx;
		border: 0;
		font-size: 28rpx;
	}

	.goodindex .goodbuy .buybox .buybtn--dis {
		background: rgba(147, 177, 177, .5);
	}

	.goodindex .actionbg {
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, .5);
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 5;
	}

	.goodindex .actiongood {
		overflow: visible;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 21;
		background: #fff;
		border-radius: 32rpx;
	}

	.goodindex .actionview {
		position: relative;
		width: 100%;
		min-height: 200px;
		padding-bottom: 110px;
	}

	.goodindex .actionview .actiontab {
		height: 100rpx;
		line-height: 100rpx;
		position: relative;
	}

	.goodindex .actionview .actiontab .tabtext {
		width: 100%;
		text-align: center;
		font-size: 32rpx;
		color: #222;
		font-family: PingFang SC;
	}

	.goodindex .actionview .actiontab .tabpic {
		position: absolute;
		top: -40rpx;
		left: 30rpx;
		display: flex;
	}

	.goodindex .actionview .actiontab .tabpic .img {
		background: #c4c4c4;
		display: inline-block;
		width: 200rpx;
		height: 200rpx;
		border-radius: 16px;
	}

	.goodindex .actionview .actiontab .tabpic .nextprice {
		margin-top: 12rpx;
		font-size: 36rpx;
		color: #93b1b1;
		position: relative;
	}

	.goodindex .actionview .actiontab .tabpic .nextprice .price {
		position: absolute;
		bottom: 0;
		left: 0;
		margin-left: 20rpx;
		font-size: 36rpx;
		font-weight: 500;
		color: #222;
		line-height: 36rpx;
		width: 160px;
	}

	.goodindex .actionview .actiontab .tabclose {
		position: absolute;
		right: 30rpx;
		top: 0;
	}

	.goodindex .actionview .actiontab .tabclose .iconfont {
		font-size: 40rpx;
		color: #93b1b1;
	}

	.goodindex .actionview .nextinfo {
		padding: 0 30rpx;
		margin-top: 96rpx;
	}

	.goodindex .actionview .nextinfo .nextname {
		color: #222;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		margin-top: 32rpx;
		font-size: 30rpx;
	}

	.goodindex .actionview .nextinfo .tablabel {
		height: 84rpx;
		line-height: 84rpx;
		color: #222;
		font-weight: 400;
		margin-top: 32rpx;
	}

	.goodindex .actionview .nextinfo .taglist {
		display: flex;
		color: #666;
	}

	.goodindex .actionview .nextinfo .taglist .uni-input {
		border: 1px solid rgba(147, 177, 177, .5);
		border-radius: 8rpx;
		padding: 5px;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		color: #666;
	}

	.goodindex .actionview .nextinfo .taglist .uni-input .iconfont {
		transform: translateY(-5px) rotate(90deg);
		color: #999;
	}

	.goodindex .actionview .nextinfo .taglist .tagitem {
		align-self: center;
		flex-shrink: 0;
		height: 60rpx;
		line-height: 60rpx;
		padding: 0 32rpx;
		border: 1rpx solid rgba(147, 177, 177, .5);
		color: #666;
		border-radius: 8rpx;
	}

	.goodindex .actionview .nextinfo .stepper {
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
	}

	.goodindex .actionview .nextinfo .stepper .stepperitem {
		width: 80rpx;
		box-sizing: border-box;
		height: 100%;
		border: 1rpx solid rgba(147, 177, 177, .5);
		color: #93b1b1;
		font-size: 40rpx;
		height: 60rpx;
		line-height: 50rpx;
	}

	.goodindex .actionview .nextinfo .stepper .stepperitem--dis {
		border: 1rpx solid #ddd;
		color: #ddd;
	}

	.goodindex .actionview .nextinfo .stepper .stepperminus {
		border-radius: 8rpx 0 0 8rpx;
	}

	.goodindex .actionview .nextinfo .stepper .stepperinput {
		box-sizing: border-box;
		border: 1rpx solid rgba(147, 177, 177, .5);
		border-width: 1rpx 0 1rpx 0;
		width: 120rpx;
		height: 100%;
		color: #666;
	}

	.goodindex .actionview .nextinfo .stepper .stepperplus {
		border-radius: 0 8rpx 8rpx 0;
	}

	.goodindex .actionview .nextbtn {
		padding-bottom: env(safe-area-inset-bottom);
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 2;
		width: 100%;
		background: #fff;
	}

	.goodindex .actionview .nextbtn .btnbox {
		padding: 5px 30rpx 10px;
	}

	.goodindex .actionview .nextbtn .addbtn {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		font-size: 26rpx;
		letter-spacing: 1px;
		color: #fff;
		background: #93b1b1;
		border-radius: 200rpx;
		border: 0;
		font-size: 32rpx;
	}

	.diverter-border {
		width: calc(100% - 60rpx);
		height: 1rpx;
		background: rgba(147, 177, 177, .16);
		margin: 0 auto;
	}

	.diverter-element {
		width: 100%;
		height: 20rpx;
		background: rgba(147, 177, 177, .16);
	}

	.box-shadow-main {
		box-shadow: 0 2px 16px 0 rgba(0, 0, 0, .12);
	}

	.viewheader {
		width: 100%;
		height: 20rpx;
	}

	.slide-fade-enter-active {
		transition: all .3s ease;
	}

	.slide-fade-leave-active {
		transition: all .1s ease-out;
	}

	.slide-fade-enter,
	.slide-fade-leave-to {
		transform: translateY(200px);
	}

	.gooddesc ._ul {
		list-style-type: disc;
		list-style-position: inside;
	}

	.gooddesc ._ol {
		list-style-type: decimal;
		list-style-position: inside;
	}

	.diverter-border {
		width: calc(100% - 60rpx);
		height: 1rpx;
		background: rgba(147, 177, 177, .16);
		margin: 0 auto;
	}

	.diverter-element {
		width: 100%;
		height: 20rpx;
		background: rgba(147, 177, 177, .16);
	}

	.box-shadow-main {
		box-shadow: 0 2px 16px 0 rgba(0, 0, 0, .12);
	}

	.viewheader {
		width: 100%;
		height: 20rpx;
	}

	.slide-fade-enter-active {
		transition: all .3s ease;
	}

	.slide-fade-leave-active {
		transition: all .1s ease-out;
	}

	.slide-fade-enter.data-v-4f3c1cad,
	.slide-fade-leave-to {
		transform: translateY(200px);
	}

	.detailcon {
		padding: 40rpx 30rpx;
		font-size: 26rpx;
	}

	.detailcon .goodinfo .goodtab {
		display: flex;
		-webkit-box-pack: justify;
		justify-content: space-between;
		color: #999;
		margin-top: 28rpx;
	}

	.detailcon .goodinfo .goodtab .goodleft {
		align-self: center;
		display: flex;
		color: #93b1b1;
	}

	.detailcon .goodinfo .goodtab .pricesale {
		align-self: center;
		color: #222;
		font-size: 32rpx;
		line-height: 52rpx;
		font-weight: 500;
	}

	.detailcon .goodinfo .goodtab .pricereal {
		align-self: center;
		text-decoration: line-through;
		margin-left: 12rpx;
	}

	.detailcon .goodinfo .goodtab .goodright {
		align-self: center;
	}

	.detailcon .goodinfo .goodprice {
		margin-top: 22rpx;
	}

	.detailcon .goodinfo .beansbox {
		display: flex;
		margin-top: 24rpx;
		-webkit-box-pack: justify;
		justify-content: space-between;
	}

	.detailcon .goodinfo .beansbox .beans {
		display: inline-block;
		background: rgba(147, 177, 177, .1);
		height: 54rpx;
		line-height: 54rpx;
		font-size: 26rpx;
		color: #93b1b1;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 500;
		border-radius: 4px;
		padding: 0 12rpx;
	}

	.detailcon .goodinfo .beansbox .getbeans {
		background: #fae8a4;
		color: #9c772f;
		font-weight: 700;
		font-size: 30rpx;
		border-top-left-radius: 50rpx;
		border-bottom-left-radius: 50rpx;
		padding: 8rpx 30rpx 8rpx 50rpx;
		margin-right: -30rpx;
		text-align: center;
	}

	.detailcon .goodinfo .beansbox .getbeans .getmoney {
		font-size: 20rpx;
		font-weight: 400;
	}

	.detailcon .goodinfo .goodname .name {
		width: 100%;
		font-size: 40rpx;
		color: #222;
		font-weight: 700;
		align-self: center;
	}

	.detailcon .goodinfo .goodremark {
		margin-top: 12rpx;
		color: #666;
	}

	.detailcon .goodinfo .goodicon {
		color: #93b1b1;
		display: flex;
	}

	.detailcon .goodinfo .goodicon .iconitem {
		display: flex;
		height: 32rpx;
		line-height: 32rpx;
	}

	.detailcon .goodinfo .goodicon .iconitem .tabicon {
		width: 32rpx;
		height: 32rpx;
		margin-right: 12rpx;
	}

	.detailcon .goodinfo .goodicon .iconitem .iconfont {
		font-size: 32rpx;
		margin-right: 4px;
	}

	.detailcon .goodinfo .goodicon .iconitem .iconfont .iconimage {
		width: 60rpx;
		height: 60rpx;
	}

	.detailcon .goodinfo .goodicon .iconitem+.iconitem {
		margin-left: 32rpx;
	}

	.detailcon .goodtag {
		color: #97793d;
		background: #f8e8ac;
		border-radius: 8rpx;
		padding: 6rpx 16rpx;
		margin-right: 8rpx;
		font-size: 24rpx;
		font-weight: 400;
		vertical-align: 22%;
		font-weight: 700;
	}

	button {
		background: transparent;
	}

	.diverter-border {
		width: calc(100% - 60rpx);
		height: 1rpx;
		background: rgba(147, 177, 177, .16);
		margin: 0 auto;
	}

	.diverter-element {
		width: 100%;
		height: 20rpx;
		background: rgba(147, 177, 177, .16);
	}

	.box-shadow-main {
		box-shadow: 0 2px 16px 0 rgba(0, 0, 0, .12);
	}

	.view_header {
		width: 100%;
		height: 20rpx;
	}

	.slide-fade-enter-active {
		transition: all .3s ease;
	}

	.slide-fade-leave-active {
		transition: all .1s ease-out;
	}

	.slide-fade-enter.data-v-3bfed186,
	.slide-fade-leave-to {
		transform: translateY(200px);
	}

	.comment_con {
		padding: 20rpx 0;
		font-size: 26rpx;
	}

	.comment_con .user_info {
		display: flex;
		-webkit-box-align: center;
		align-items: center;
	}

	.comment_con .user_info .info_avatar {
		width: 80rpx;
		height: 80rpx;
		overflow: hidden;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.comment_con .user_info .info_avatar .img {
		width: 100%;
		height: 100%;
	}

	.comment_con .user_info .info_name {
		margin: 0 20rpx;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.comment_con .user_info .info_star {
		display: flex;
	}

	.comment_con .comment_time {
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		color: #999;
		margin-top: 20rpx;
	}

	.comment_con .comment_content {
		margin-top: 20rpx;
		color: #222;
		line-height: 1.5;
	}

	.comment_con .comment_img {
		margin-top: 30rpx;
	}

	.comment_con .comment_img .image1 {
		width: 630rpx;
		height: 630rpx;
	}

	.comment_con .comment_img .image2 {
		display: flex;
		flex-wrap: wrap;
	}

	.comment_con .comment_img .image2 .image {
		flex-shrink: 0;
		width: 310rpx;
		height: 310rpx;
		margin-bottom: 10rpx;
	}

	.comment_con .comment_img .image2 .imageRight {
		margin-left: 10rpx;
	}

	.comment_con .comment_img .image3 {
		display: flex;
		flex-wrap: wrap;
	}

	.comment_con .comment_img .image3 .image {
		flex-shrink: 0;
		width: 203.33rpx;
		height: 203.33rpx;
		margin-bottom: 10rpx;
	}

	.comment_con .comment_img .image3 .imageCenter {
		margin: 0 10rpx;
	}

	.modal-container {
		font-size: 30rpx;
	}

	.mt--100 {
		margin-top: -100rpx;
	}

	.modal-addr {
		height: 100rpx;
		line-height: 100rpx;
		border: 1rpx solid #8a95a9;
		border-radius: 4px;
		color: #8a95a9;
	}

	.modal-addr .line-1 {
		padding-right: 40rpx;
		font-size: 28rpx;
	}

	.modal-addr button {
		background: none;
		font-size: 30rpx;
		height: 100rpx;
		line-height: 100rpx;
		padding-left: 10rpx;
	}

	.icon-arrow-gray {
		top: 35rpx;
		right: 40rpx;
	}

	.icon-address {
		margin-right: 10rpx;
		vertical-align: -3rpx;
	}

	.modal-detail {
		padding: 30rpx;
	}

	.modal-detail image {
		width: 180rpx;
		height: 180rpx;
		margin-right: 30rpx;
		border-radius: 8rpx;
		display: block;
		border: 10rpx solid #fff;
	}

	.modal-detail .price {
		color: #d2656d;
	}

	.modal-detail .price text {
		font-size: 48rpx;
	}

	.modal-title {
		width: 480rpx;
		height: 90rpx;
		font-size: 30rpx;
		line-height: 1.5;
		color: #000;
	}

	.modal-remarks {
		align-items: center;
		padding: 20rpx 20rpx 20rpx 0;
	}

	.flex-label {
		display: inline-block;
		width: 160rpx;
	}

	.modal-remarks input {
		flex: 1;
	}

	.mask {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 100;
		background: rgba(0, 0, 0, 0.5);
		transition: opacity 0.3s;
	}

	.mask-dark {
		background: #000;
	}

	.mask-container {
		width: 600rpx;
		padding: 30rpx;
		background: #fff;
		border-radius: 6px;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.mask-close {
		position: absolute;
		left: 50%;
		bottom: -115rpx;
		transform: translate(-50%, 0);
		padding: 0;
		background: none;
	}

	.modal-container {
		width: 100%;
		box-sizing: border-box;
		background: #fff;
		position: fixed;
		left: 0;
		bottom: -800rpx;
		transition: bottom 0.3s;
		z-index: 1000;
	}

	.modal-container.active {
		bottom: 0;
	}

	.mb-60 {
		margin-bottom: 60rpx;
	}

	.mb-30 {
		margin-bottom: 30rpx;
	}

	.flex-row-end {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
	}

	.flex-row {
		display: flex;
		flex-direction: row;
	}


	.flex-between {
		display: flex;
		justify-content: space-between;
	}


	.flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}


	.modal-foot {
		padding: 20rpx 40rpx;
		box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.1);
	}

	.modal-foot button {
		width: 270rpx;
		height: 80rpx;
		font-size: 30rpx;
		line-height: 80rpx;
		margin: 0 15rpx;
	}

	.btn-primary,
	.btn-secondary {
		width: 170rpx;
		height: 66rpx;
		padding: 0;
		margin: 0;
		line-height: 66rpx;
		font-size: 28rpx;
		text-align: center;
		border-radius: 8rpx;
		border: 2rpx solid #8a95a9;
	}

	.btn-primary.navigator-hover,
	.btn-primary {
		color: #fff;
		background: #8a95a9;
	}

	.productWinList {
		max-height: 395rpx;
		overflow: auto;
		margin-top: 36rpx;
	}

	.productWinList .item~.item {
		margin-top: 36rpx;
	}

	.productWinList .item .title {
		font-size: 30rpx;
		color: #999;
	}

	.productWinList .item .listn {
		padding: 20rpx 0;
	}

	.productWinList .item .listn .itemn {
		border: 1px solid #bbb;
		font-size: 26rpx;
		color: #282828;
		padding: 7rpx 33rpx;
		border-radius: 6rpx;
		margin: 14rpx 0 0 14rpx;
	}

	.productWinList .item .listn .itemn.on {
		color: #fff;
		background-color: #5b96fe;
		border-color: #5b96fe;
	}


	.acea-row {
		display: flex;
		flex-wrap: wrap;
	}

	.acea-row.row-top {
		align-items: flex-start;
	}

	.acea-row.row-middle {
		align-items: center;
	}

	.acea-row.row-bottom {
		align-items: flex-end;
	}

	.acea-row.row-left {
		justify-content: flex-start;
	}

	.acea-row.row-center {
		justify-content: center;
	}

	.acea-row.row-right {
		justify-content: flex-end;
	}

	.acea-row.row-between {
		justify-content: space-between;
	}

	.acea-row.row-around {
		justify-content: space-around;
	}

	.acea-row.row-column {
		flex-direction: column;
	}

	.acea-row.row-column-between {
		flex-direction: column;
		justify-content: space-between;
	}

	.acea-row.row-column-around {
		flex-direction: column;
		justify-content: space-around;
	}

	.acea-row.row-center-wrapper {
		align-items: center;
		justify-content: center;
	}

	.acea-row.row-between-wrapper {
		align-items: center;
		justify-content: space-between;
	}

	.hide {
		display: none !important;
	}

	.hidden {
		opacity: 0;
		visibility: hidden;
		height: 0;
	}

	.line-2 {
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.form-address {
		padding: 30rpx;
	}
</style>
