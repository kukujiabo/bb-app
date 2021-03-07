<template>
	<view class="user">
		<view class="name-card">
			<view class="user-info">
				<view class="user-head-wrapper" @click="toSettings">
					<image class="user-head" :src="user_info.head"></image>
					<image class="user-setting" src="../../../static/images/setttings.png"></image>
				</view>
				<view class="user-name-wrapper">
					<text class="user-name">{{nickname}}</text>
					<text class="user-phone">{{getPhone}}</text>
				</view>
			</view>
			<view class="membership">
				<view class="member-type">
					<text class="member-type-name">BB会员</text>
					<text class="member-type-status">{{user_info.is_vip ? user_info.expire_time : '未开通会员'}}</text>
				</view> 
				<view class="buy">
					<view class="buy-btn" @click="openMember">
						<text>{{ user_info.is_vip ? '续费' : '开通会员' }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="user-grid">
			<view class="user-grid-item" @click="toSpace">
				<image class="user-grid-item-icon" src="../../../static/images/myspace.png"></image>
				<text class="user-grid-item-title">我的空间（{{numbers.space_num}}）</text>
			</view>
			<view class="user-grid-item" @click="toMatch">
				<image class="user-grid-item-icon" src="../../../static/images/match-record.png"></image>
				<text class="user-grid-item-title">匹配记录（{{numbers.match_times}}）</text>
			</view>
		</view>
		<view class="diliver-title">
			<text>最新发布</text>
		</view>
		<view class="diliver-list">
			<view class="empty" v-if="new_space.length === 0">
				<text>还没有发布哦～</text>
			</view>
			<view
				class="diliver-list-item"
				v-for="space in new_space"
				:key="space.id"
				@click="toDetail(space.id)"
				>
				<image class="diliver-item-image" :src="space.thumb"></image>
				<view class="diliver-list-item-text">
					<text class="diliver-list-item-text-desc">{{space.desc}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { user, userinfo } from '@/config/api'
	import request from '../../../utils/request.js'
	export default {
		data() {
			return {
				avatarUrl: '',
				nickname: '',
				phone: '',
				numbers: {
					"space_num": 0,
					"match_times": 0
				},
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
				},
				is_secret: 0,
				new_space: []
			};
		},
		computed: {
			getPhone() {
				if (this.phone) {
					const phone = Array.from(this.phone)
					return phone.map((w, i) => [3, 4, 5, 6].includes(i) ? '*' : w).join('')
				} else {
					return ''
				}
			},
		},
		onLoad() {

		},
		onShow() {
			this.nickname = uni.getStorageSync('nickname')
			this.phone = uni.getStorageSync('phone')
			this.getUserInfo()
			this.getUser()
		},
		methods: {
			toDetail(sn) {
				uni.navigateTo({
					url: '../spaceDetail/spaceDetail?sn=' + sn
				})
			},
			toHobby() {
				uni.navigateTo({
					url: '/pages/my/hobby/hobby'
				})
			},
			toSpace() {
				uni.navigateTo({
					url: '/pages/my/space/space'
				})
			},
			async getUserInfo() {
				const user_id = uni.getStorageSync('uid')
				const res = await request(user, { user_id })
				const result = res.result
				this.numbers = result.numbers
				this.new_space = result.new_space
			},
			async getUser() {
				const user_id = uni.getStorageSync('uid')
				const res = await request(userinfo, { user_id })
				this.user_info = res.result.user_info
				uni.setStorageSync('user_info', this.user_info)
			},
			toSettings() {
				uni.navigateTo({
					url: '/pages/my/settings/settings'
				})
			},
			toMatch() {
				uni.navigateTo({
					url: '/pages/my/matchRecord/matchRecord'
				})
			},
			openMember() {
				uni.navigateTo({
					url: '/pages/my/member/member'
				})
			}
		}
	}
</script>

<style lang="scss">
.user {
	margin: 0;
	background-color: #f6f6f6;
	min-height: 100vh;
	.name-card {
		width: 750upx;
		height: 411upx;
		position: relative;
		background-color: #46868B;
		overflow: auto;
		.user-info {
			width: 670upx;
			height: 120upx;
			margin-top: 114upx;
			padding: 0 40upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
			.user-head-wrapper {
				position: relative;
				width: 120upx;
				height: 120upx;
				.user-head {
					width: 120upx;
					height: 120upx;
					border-radius: 60upx;
					border: 2upx solid #FFFFFF;
					box-sizing: border-box;
					background-color: #f3f5f7;
				}
				.user-setting {
					position: absolute;
					width: 32upx;
					height: 32upx;
					top: 104upx;
					left: calc(50% - 16upx);
					z-index: 100;
				}
			}
			.user-name-wrapper {
				display: flex;
				flex-direction: column;
				margin-left: 30upx;
				.user-name {
					font-size: 48upx;
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 72upx;
					color: #FFFFFF;
				}
				.user-phone {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 56upx;
					color: #FFFFFF;
				}
			}
		}
		.membership {
			position: absolute;
			left: 40upx;
			bottom: 0;
			width: 670upx;
			height: 120upx;
			border-radius: 30upx 30upx 0 0;
			background: #24201D;
			box-sizing: border-box;
			padding: 0 30upx 0 40upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			.member-type {
				display: flex;
				flex-direction: column;
				justify-content: center;
				.member-type-name {
					font-size: 36upx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 50upx;
					color: #FFD4B1;
					opacity: 1;
				}
				.member-type-status {
					font-size: 22upx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 32upx;
					color: #FFFFFF;
					opacity: 1;
				}
			}
			.buy {
				.buy-btn {
					width: 150upx;
					height: 56upx;
					background: #FFD4B1;
					border-radius: 28px;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 36upx;
					color: #282828;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}
	.user-grid {
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding: 40upx 50upx;
		.user-grid-item {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			width: 300upx;
			.user-grid-item-icon {
				width: 100upx;
				height: 100upx;
				border-radius: 50upx;
				background-color: #e3e5e7;
			}
			.user-grid-item-title {
				margin-top: 10upx;
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 30upx;
				color: #000000;
				opacity: 1;
			}
		}
	}
	.diliver-title {
		padding: 0 40upx;
		font-size: 46upx;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 54upx;
		color: #000000;
	}
	.diliver-list {
		padding: 0 40upx;
		margin-top: 9upx;
		.empty {
			height: 200upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			font-size: 28upx;
			font-weight: 400;
			font-family: PingFang SC;
			line-height: 35upx;
			color: #939393;
		}
		.diliver-list-item {
			height: 170upx;
			padding: 20upx 0;
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			border-bottom: 1upx solid #eee;
			.diliver-item-image {
				width: 130upx;
				height: 130upx;
				margin-right: 20upx;
				border-radius: 24upx;
				background-color: #f3f5f7;
			}
			.diliver-list-item-text {
				display: flex;
				flex-direction: column;
				justify-content: center;
				.diliver-list-item-text-title {
					font-size: 36upx;
					font-family: PingFang SC;
					font-weight: 800;
					line-height: 43upx;
					color: #000000;
				}
				.diliver-list-item-text-desc {
					margin-top: 12upx;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 35upx;
					color: #939393;
					opacity: 1;
				}
			}
			&:last-child {
				border-bottom: 0;
			}
		}
	}
}
</style>
