<template>
	<view class="hobby">
		<view class="title-wrapper">
			<image class="title-left" src="../../../static/images/arrow-left.png" @click="back()"></image>
			<text class="exam-title">兴趣爱好</text>
		</view>
		<view class="hobby-wrapper">
			<text class="hobby-wrapper-title">运动</text>
		</view>
		<view class="hobby-item" @click="toSetting">
			<text class="hobby-item-text">{{ userinfo.select_sports_name || '未选择' }}</text>
		</view>
		<view class="hobby-wrapper">
			<text class="hobby-wrapper-title">旅游</text>
		</view>
		<view class="hobby-item" @click="toSetting">
			<text class="hobby-item-text">{{userinfo.select_travel_name || '未选择' }}</text>
		</view>
	</view>
</template>

<script>
	import request from '../../../utils/request.js'
	import { userinfo } from '@/config/api'
	export default {
		data() {
			return {
				userinfo: {
					"userid": 0,
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
			this.getUserInfo()
		},
		methods: {
			back() {
				uni.navigateBack({
					
				})
			},
			async getUserInfo() {
				const user_id = uni.getStorageSync('uid')
				const res = await request(userinfo, { user_id })
				this.userinfo = res.result.user_info
			},
			toSetting() {
				uni.navigateTo({
					url: '/pages/my/settings/settings'
				})
			}
		}
	}
</script>

<style lang="scss">
	.hobby {
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
		
		.hobby-wrapper {
			margin-top: 113upx;
			height: 136upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			.hobby-wrapper-title {
				font-size: 40upx;
				font-family: PingFang SC;
				font-weight: bold;
				line-height: 47upx;
				color: #282828;
				opacity: 1;
			}
		}
		.hobby-item {
			width: 610upx;
			height: 140upx;
			margin: 0 40upx;
			background: #FFFFFF;
			box-shadow: 0px 2px 18px rgba(0, 0, 0, 0.08);
			opacity: 1;
			border-radius: 24upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			.hobby-item-text {
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 34upx;
				color: #46868B;
			}
		}
	}
</style>
