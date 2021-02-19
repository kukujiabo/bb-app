<template>
	<view class="do-match">
		<view class="title-wrapper">
			<image class="title-left" src="../../../static/images/arrow-left.png" @click="back()"></image>
			<text class="exam-title">配对状态</text>
		</view>
		<view class="match-title-wrapper">
			<text>{{status}}</text>
		</view>
		<view class="match-zoom">
			<image class="match-zoom-image" :src="userinfo.head"></image>
			<image class="match-zoom-image"></image>
		</view>
		<view class="match-tips-wrapper">
			<text class="match-tips-text">{{getStatus}}</text>
		</view>
		<view class="match-time-wrapper">
			<text class="match-time-text">{{startAt}}-{{endAt}}</text>
		</view>
		<view class="apply-date" @click="dopay">
			<text class="apply-date-text">申请交往</text>
		</view>
		<view class="re-date" @click="rematch">
			<text class="re-date-text">重新匹配</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: '恭喜配对成功',
				getStatus: 'GET一周',
				startAt: '2020-10-14',
				endAt: '2020-10-20',
				userinfo: {
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
			this.userinfo = uni.getStorageSync('user_info')
		},
		methods: {
			back() {
				uni.navigateBack({
					
				})
			},
			dopay() {
				// uni.showModal({
				// 	title: '未开通会员',
				// 	content: '开通会员后才能使用匹配服务',
				// 	confirmColor: '#46868B',
				// 	confirmText: '去开通',
				// 	cancelColor: '#999999',
				// 	cancelText: '取消'
				// })
				uni.showToast({
					icon: 'none',
					title: '功能正在开发中！'
				})
			},
			rematch() {
				uni.showToast({
					icon: 'none',
					title: '功能正在开发中！'
				})
			}
		}
	}
</script>

<style lang="scss">
	.do-match {
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
		.match-title-wrapper {
			width: 100%;
			margin-top: 40upx;
			height: 207upx;
			line-height: 207upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			font-size: 48upx;
			font-family: PingFang SC;
			font-weight: 800;
			line-height: 90upx;
			color: #46868B;
			opacity: 1;
		}
		.match-zoom {
			margin: 0 auto;
			width: 380upx;
			height: 200upx;
			display: flex;
			position: relative;
			.match-zoom-image {
				position: absolute;
				top: 0;
				width: 200upx;
				height: 200upx;
				background-color: #f3f5f7;
				border-radius: 100upx;
				border: 4upx solid #fff;
				&:first-child {
					left: 0;
					z-index: 10;
				}
				&:last-child {
					right: 0;
				}
			}
		}
		.match-tips-wrapper {
			margin-top: 95upx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			.match-tips-text {
				height: 65upx;
				font-size: 46upx;
				font-family: PingFang SC;
				font-weight: 800;
				line-height: 55upx;
				color: #282828;
				opacity: 1;
			}
		}
		.match-time-wrapper {
			margin-top: 14upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			.match-time-text {
				height: 48upx;
				font-size: 34upx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 42upx;
				color: #999999;
				opacity: 1;

			}
		}
		.apply-date {
			margin: 168upx auto 60upx;
			width: 530upx;
			height: 98upx;
			background: #46868B;
			opacity: 1;
			border-radius: 60upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			.apply-date-text {
				width: 144upx;
				height: 50upx;
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 48upx;
				color: #FFFFFF;
				opacity: 1;
			}
		}
		.re-date {
			margin: 0 auto;
			width: 530upx;
			height: 98upx;
			background: #0EB171;
			opacity: 0.69;
			border-radius: 60upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			.re-date-text {
				width: 144upx;
				height: 50upx;
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 48upx;
				color: #FFFFFF;
				opacity: 1;
			}
		}
	}
</style>
