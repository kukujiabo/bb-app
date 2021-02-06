<template>
	<view class="exam">
		<view class="title-wrapper">
			<image class="title-left" src="../../../../static/images/arrow-left.png"></image>
			<text class="exam-title">婆媳</text>
		</view>
		<view class="exam-list">
			<view class="exam-list-item">
				<view class="exam-title-wrapper">
					<text class="exam-title-text">爱人和父辈同时落水你是先救谁</text>
				</view>
				<view class="exam-image-wrapper">
					<image class="exam-image"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.exam {
	width: 100vw;
	min-height: 100vh;
	background-color: #f6f6f6;
	overflow: auto;
	.title-wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 107upx;
		justify-content: flex-start;
		padding: 0 40upx;
		.title-left {
			width: 40upx;
			height: 40upx;
		}
		.exam-title {
			margin-left: 13upx;
			font-size: 40upx;
			font-family: PingFang SC;
			font-weight: bold;
			line-height: 52upx;
			color: #282828;
		}
	}
	.exam-list {
		margin-top: 59upx;
		.exam-list-item {
			padding: 0 75upx;
			.exam-title-wrapper {
				.exam-title-text {
					font-size: 46upx;
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 52upx;
					color: #282828;
				}
			}
			.exam-image-wrapper {
				width: 600upx;
				height: 219upx;
				background: #000000;
				opacity: 1;
				border-radius: 24upx;
				margin-top: 66upx;
			}
		}
	}
}
</style>
