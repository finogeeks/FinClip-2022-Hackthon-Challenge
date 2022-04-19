<template>
	<view class="goods-list">
		<view class="list-left">
			<navigator hoverClass="none"
				:url="'plugin-private://wx34345ae5855f892d/pages/productDetail/productDetail?productId='+item.product_id"
				class="goods-item" v-if="index%2==0" v-for="(item,index) in posts" :key="index">
				<view class="card">
					<view class="image" :style="'background-image: url('+item.head_img[0]+')'">
					</view>
					<view class="description">
						<view class="product-title">{{item.title}}</view>
						<view class="summary">{{item.sub_title}}</view>
						<view class="price">
							<view class="min-price">￥{{item.min_price/100}}</view>
							<view class="product-price line-slash" v-if="item.product.price>item.product.discount">
								￥{{item.product.price}}
							</view>
						</view>
					</view>
				</view>

			</navigator>
		</view>
		<view class="list-right">
			<navigator hoverClass="none"
				:url="'plugin-private://wx34345ae5855f892d/pages/productDetail/productDetail?productId='+item.product_id"
				class="goods-item" v-if="index%2==1" v-for="(item,index) in posts" :key="index">
				<view class="card">
					<view class="image" :style="'background-image: url('+item.head_img[0]+')'">
					</view>
					<view class="description">
						<view class="product-title">{{item.title}}</view>
						<view class="summary">{{item.sub_title}}</view>
						<view class="price">
							<view class="min-price">￥{{item.min_price/100}}</view>
							<view class="product-price line-slash" v-if="item.product.price>item.product.discount">
								￥{{item.product.price}}
							</view>
						</view>
					</view>
				</view>
			
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		name: "forum-shop",
		props: {
			posts: {
				type: Array,
				default: function() {
					return [];
				}
			},
		},
		data() {
			return {

			};
		}
	}
</script>

<style>

	.card {
	  border-radius: 16rpx;
	}
	
	.card,
	.image {
	  background-color: #fff;
	  overflow: hidden;
	}
	
	.image {
	  position: relative;
	  background-size: cover;
	  background-position: 50%;
	  background-repeat: no-repeat;
	  width: 100%;
	  padding-bottom: 100%;
	}
	
	.image::after {
	  content: " ";
	  position: absolute;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  background-color: rgba(1, 1, 1, .02);
	}

	
	.goods-list {
	  display: flex;
	}
	
	.goods-list {
	  width: 750rpx;
	  padding-top:20rpx;
	  padding-bottom: 100rpx;
	}
	
	.goods-list .list-left,
	.list-right {
	  width: 342rpx;
	}
	

	
	.goods-list .list-right {
	  margin-left: 25rpx;
	}
	
	.goods-list .goods-item {
	  border-radius: 8rpx;
	  overflow: hidden;
	  width: 342rpx;
	  background-color: #fff;
	  box-shadow: .1rem .1rem .5rem #f1f1f1;
	  margin-bottom: 20rpx;
	}
	
	.description {
	  padding: 16rpx 24rpx;
	}
	
	.product-title {
	  font-size: 30rpx;
	  color: #303030;
	  line-height: 42rpx;
	  margin-bottom: 8rpx;
	}
	
	.summary,
	.product-title {
	  overflow: hidden;
	  text-overflow: ellipsis;
	  -webkit-box-orient: vertical;
	  -webkit-line-clamp: 2;
	  white-space: normal;
	  display: -webkit-box;
	}
	
	.summary {
	  font-size: 24rpx;
	  color: #959595;
	  line-height: 34rpx;
	  margin-bottom: 16rpx;
	}
	
	.mixin-label-container {
	  display: flex;
	  flex-flow: row wrap;
	  overflow: hidden;
	  height: 40rpx;
	  margin-bottom: 6rpx;
	}
	
	.mixin-label {
	  margin: 0 0 16rpx;
	}
	
	.mixin-label:nth-child(odd) {
	  margin-right: 8rpx;
	}
	
	.bottom-label,
	.price {
	  margin-bottom: 16rpx;
	}
	
	.min-price{
		font-size: 28rpx;
		color:#ff0000;
	}
	.product-price{
		font-size: 24rpx;
		color:#bbbfb3;
	}
	
	.line-slash {
	    position: relative;
	}
	
	.line-slash::after {
	    content: "";
	    border-bottom: 1px solid;
	    position: absolute;
	    width: 110%;
	    height: 1px;
	    top: 40%;
	    left: 0;
	}
</style>
