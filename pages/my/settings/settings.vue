<template>
	<view class="settings">
		<view class="title-wrapper">
			<image class="title-left" src="../../../static/images/arrow-left.png" @click="back()"></image>
			<text class="exam-title">基本设置</text>
		</view>
		<view class="content">
			<view class="content-item" @click="touserinfo">
				<text class="content-title">个人信息</text>
				<image class="toleft" src="../../../static/images/ico07@2x.png"></image>
			</view>
			<view class="content-item">
				<text class="content-title">喜欢的色彩</text>
				<image class="toleft" src="../../../static/images/ico07@2x.png"></image>
			</view>
			<view class="content-item">
				<text class="content-title">职业</text>
				<image class="toleft" src="../../../static/images/ico07@2x.png"></image>
			</view>
			<view class="content-item">
				<text class="content-title">出生日期</text>
				<image class="toleft" src="../../../static/images/ico07@2x.png"></image>
			</view>
			<view class="content-item">
				<text class="content-title">地址</text>
				<image class="toleft" src="../../../static/images/ico07@2x.png"></image>
			</view>
			<view class="content-item">
				<text class="content-title">格言</text>
				<image class="toleft" src="../../../static/images/ico07@2x.png"></image>
			</view>
			<view class="content-item">
				<text class="content-title">运动</text>
				<image class="toleft" src="../../../static/images/ico07@2x.png"></image>
			</view>
			<view class="content-item">
				<text class="content-title">旅游</text>
				<image class="toleft" src="../../../static/images/ico07@2x.png"></image>
			</view>
			<view class="confirm">
				<text class="confirm-text">确定</text>
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
			back() {
				uni.navigateBack()
			},
			touserinfo() {
				uni.navigateTo({
					url: '../userinfo/userinfo'
				})
			}
		}
	}
</script>

<style lang="scss">
	.settings {
		width: 100vw;
		min-height: 100vh;
		background-color: #f6f6f6;
		overflow: auto;
		padding: 0 30upx;
		box-sizing: border-box;
		.title-wrapper {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: 107upx;
			justify-content: flex-start;
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
		.content {
			width: 690upx;
			height: 1027upx;
			background: #FFFFFF;
			opacity: 1;
			margin-top: 40upx;
			border-radius: 30upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.content-item {
				margin: 0 40upx;
				height: 91upx;
				width: 610upx;
				border-bottom: 1upx solid #f0f0f0;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				.content-title {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 50upx;
					color: #000000;
					opacity: 1;
				}
				.toleft {
					width: 24.3upx;
					height: 28.31upx;
				}
			}
			.confirm {
				margin-top: 100upx;
				width: 530upx;
				height: 98upx;
				background: #46868B;
				opacity: 1;
				border-radius: 60upx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				.confirm-text {
					font-size: 36upx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 48upx;
					color: #FFFFFF;
					opacity: 1;
				}
			}
		}
	}
</style>
