<template>
	<view class="check-boss">
		<image class="im" src="../../static/checkboss.png"></image>
		<view class="checks">
			<view class="btns" @click="toIndex">
				<text>YES</text>
			</view>
			<view class="btns" style="opacity: 0.7;" @click="toIndex">
				<text>NO</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			toIndex() {
				uni.setStorageSync('boss', 1)
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.check-boss {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100vw;
		height: 100vh;
		z-index: 1000;
		padding: 50upx 0;
		background-color: #46868B;
		.im {
			width: 750upx;
			height: 740upx;
		}
		.checks {
			margin-top: 100upx;
			display: flex;
			justify-content: center;
			.btns {
				display: flex;
				flex-direction: row;
				justify-content: center;
				width: 180upx;
				height: 90upx;
				font-weight: 600;
				margin: 0 25upx;
				border-radius: 15upx;
				background-color: #fff;
				display: flex;
				flex-direction: row;
				justify-content: ceneter;
				align-items: center;
			}
		}
	}
</style>
