<template>
	<view>
		<view>
			<video id="myVideo" :src="url" autoplay
			show-fullscreen-btn
			controls></video>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/360e4b20-4f4b-11eb-8a36-ebb87efcf8c0.mp4',
			}
		},
		onLoad(query) {
			this.url = query.url;
		}
	}
</script>

<style>
#myVideo{
	width: 100%;
	height: 90vh;
}
</style>
