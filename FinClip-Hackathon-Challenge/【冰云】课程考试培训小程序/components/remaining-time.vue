<template>
	<view>
		<div>{{desc}}{{count}}</div>
	</view>
</template>

<script>
	export default {
		name:"remaining-time",
		props:{
			desc:{
				type:String,
				default: '剩余时间：'
			},
			seconds:{
				type:Number
			}
		},
		data() {
			return {
				count: '', //倒计时
				seconds: 0,
				timer:null,
			};
		},
		mounted() {
			this.Time() //调用定时器
		},
		beforeDestroy() {
			clearInterval(this.timer);
		},
		methods: {
			// 天 时 分 秒 格式化函数
			countDown() {
				let d = parseInt(this.seconds / (24 * 60 * 60))
				d = d < 10 ? "0" + d : d
				let h = parseInt(this.seconds / (60 * 60) % 24);
				h = h < 10 ? "0" + h : h
				let m = parseInt(this.seconds / 60 % 60);
				m = m < 10 ? "0" + m : m
				let s = parseInt(this.seconds % 60);
				s = s < 10 ? "0" + s : s
				
				let tmp = '';
				if (d !== '00') tmp += d + '天';
				if (h !== '00') tmp += h + '时';
				if (m !== '00') tmp += m + '分';
				if (s !== '00') tmp += s + '秒';
				this.count = tmp
			},
			//定时器没过1秒参数减1
			Time() {
				this.timer = setInterval(() => {
					this.seconds -= 1
					this.countDown()
				}, 1000)
			},
		}
	}
</script>

<style>

</style>
