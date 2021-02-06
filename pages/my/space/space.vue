<template>
	<view class="space">
		<view class="title-wrapper">
			<image class="title-left" src="../../../static/images/arrow-left.png" @click="back()"></image>
			<text class="exam-title">我的空间</text>
		</view>
		<view class="top-image">
			<view class="user-info">
				<image class="user-info-head" :src="user_info.head"></image>
				<text class="user-info-nickname">{{user_info.nickname}}</text>
			</view>
			<view class="top-title">
				<text class="top-title-text">我想和你去巴黎旅游</text>
			</view>
			<view class="top-image-wrapper">
				<image class="top-image-image"></image>
			</view>
			<view class="bottom">
				<text class="bottom-text">昨天</text>
				<view class="thumb">
					<image class="thumb-image" src="../../../static/images/thumb.png"></image>
					<text class="thumb-text">2142</text>
				</view>
			</view>
		</view>
		<view class="top-image">
			<view class="user-info">
				<image class="user-info-head" :src="user_info.head"></image>
				<text class="user-info-nickname">{{user_info.nickname}}</text>
			</view>
			<view class="top-title">
				<text class="top-title-text">我想和你去巴黎旅游</text>
			</view>
			<view class="top-image-wrapper">
				<image class="small-image-image"></image>
				<image class="small-image-image"></image>
			</view>
			<view class="bottom">
				<text class="bottom-text">昨天</text>
				<view class="thumb">
					<image class="thumb-image" src="../../../static/images/thumb.png"></image>
					<text class="thumb-text">2142</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_info: {
					"userid": 6,
					"head": "",
					"nickname": "",
					"phone": "",
					"select_color": 0,
					"select_color_name": "",
					"job": "",
					"birthday": "",
					"address": "",
					"info": "",
					"job_name": "",
					"info_name": "",
					"select_sports": 0,
					"select_sports_name": "",
					"select_travel": 0,
					"select_travel_name": "",
					"times": 0,
					"is_vip": 0,
					"expire_time": ""
				}
			};
		},
		onLoad() {
			this.user_info = uni.getStorageSync('user_info')
		},
		methods: {
			back() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.space {
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

		.top-image {
			margin-top: 43upx;

			.user-info {
				height: 60upx;
				display: flex;
				flex-direction: row;
				align-items: center;

				.user-info-head {
					width: 60upx;
					height: 60upx;
					border-radius: 30upx;
				}

				.user-info-nickname {
					margin-left: 19upx;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 40upx;
					color: #000000;
					opacity: 1;
				}
			}

			.top-title {
				margin-top: 20upx;

				.top-title-text {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 54upx;
					color: #000000;
					opacity: 1;
				}
			}

			.top-image-wrapper {
				margin-top: 21upx;
				width: 670upx;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				.top-image-image {
					width: 670upx;
					height: 350upx;
					background: #eee;
					border-radius: 24upx;
					opacity: 1;
				}
				.small-image-image {
					width: 320upx;
					height: 220upx;
					background: #eee;
					border-radius: 16upx;
					&:nth-child(even) {
						margin-left: 30upx;
					}
				}
			}
		}

		.bottom {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin-top: 52upx;

			.bottom-text {
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 35upx;
				color: #666666;
				opacity: 1;
			}

			.thumb {
				display: flex;
				flex-direction: row;
				align-items: center;

				.thumb-text {
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 35upx;
					color: #282828;
					opacity: 1;
				}

				.thumb-image {
					width: 40upx;
					height: 40upx;
					margin-right: 3upx;
				}
			}
		}
	}
</style>
