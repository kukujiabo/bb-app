<template>
	<view class="member">
		<view class="title-wrapper">
			<view class="title-left-wrapper">
				<image class="title-left" src="../../../static/images/arrow-left.png" @click="back()"></image>
				<text class="exam-title">开通会员</text>
			</view>
		</view>
		<view class="member-logo">
			<image class="member-logo-image" src="../../../static/images/logo.png"></image>
		</view>
		<view class="bb-member">
			<text class="bb-member-text">BB会员</text>
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
			back() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.member {
		width: 100vw;
		min-height: 100vh;
		overflow: auto;
		background-color: #f6f6f6;
		box-sizing: border-box;
		padding: 0 40upx;

		.title-wrapper {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: 107upx;
			justify-content: space-between;

			.lock {
				width: 48upx;
				height: 48upx;
			}

			.title-left-wrapper {
				display: flex;
				flex-direction: row;
				align-items: center;

				.title-left {
					width: 40upx;
					height: 40upx;
				}

				.exam-title {
					marign-top: 104upx;
					margin-left: 13upx;
					font-size: 40upx;
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 52upx;
					color: #282828;
				}
			}
		}
		.member-logo {
			display: flex;
			margin-top: 104upx;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			.member-logo-image {
				width: 125upx;
				height: 115upx;
			}
		}
		.bb-member {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			margin-top: 29upx;
			.bb-member-text {
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 48upx;
				color: #282828;
				opacity: 1;
			}
		}
	}
</style>
