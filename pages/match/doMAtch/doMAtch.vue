<template>
	<view class="do-match">
		<view class="title-wrapper">
			<image class="title-left" src="../../../static/images/arrow-left.png" @click="back()"></image>
			<text class="exam-title">配对状态</text>
		</view>
		<view v-if="matchInfo.match_id">
			<view class="match-title-wrapper">
				<text>{{status}}</text>
			</view>
			<view class="match-zoom">
				<image class="match-zoom-image" :src="matchInfo.user_info.member.head"></image>
				<image class="match-zoom-image" :src="matchInfo.user_info.person.head"></image>
			</view>
			<view class="match-tips-wrapper">
				<text class="match-tips-text">{{getStatus}}</text>
			</view>
			<view class="match-time-wrapper">
				<text class="match-time-text">{{matchInfo.period_time[0]}}-{{matchInfo.period_time[1]}}</text>
			</view>
			<view v-if="!matchSuccess">
				<view class="apply-date" @click="dopay">
					<text class="apply-date-text">申请交往</text>
				</view>
				<view class="re-date" @click="rematch">
					<text class="re-date-text">重新匹配</text>
				</view>
			</view>
			<view v-else>
				<view class="apply-date" @click="im">
					<text class="apply-date-text">语音/视频</text>
				</view>
				<view class="re-date" @click="chat">
					<text class="re-date-text">聊天</text>
				</view>
			</view>
		</view>
		<view v-else class="empty">
			<text>暂无匹配结果...</text>
		</view>
		<match-notice ref="matchNotice" :name="applyInfo.nickname" :avatar="applyInfo.head" @confirm="confirmApply" @reject="rejectApply"></match-notice>
	</view>
</template>

<script>
	import {
		getMatch,
		requestMatch,
		getApply,
		dealApply,
		responseCheck
	} from '@/config/api'
	import request from '../../../utils/request.js'
	import MatchNotice from '../../../components/matchNotice.vue'

	let handler = null,
		handler2 = null
	export default {
		components: {
			MatchNotice
		},
		data() {
			return {
				status: '恭喜配对成功',
				getStatus: 'GET一周',
				startAt: '2020-10-14',
				endAt: '2020-10-20',
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
				},
				matchInfo: {
					match_id: 0,
					user_info: {
						member: {
							nickname: "",
							head: ""
						},
						person: {
							nickname: "2茶",
							head: ""
						}
					},
					period_time: []
				},
				applyInfo: {
					"nickname": "",
					"head": ""
				},
				matchSuccess: false
			};
		},
		onLoad() {
			this.userinfo = uni.getStorageSync('user_info')
			this.getMatch()
			const user_id = uni.getStorageSync('uid')
			if (user_id) {
				handler = setInterval(async () => {
					const res = await request(getApply, {
						user_id,
						match_id: this.matchInfo.match_id
					}, {}, 'get')
					this.applyInfo = res.result.apply_info
					if (this.applyInfo.nickname) {
						this.$refs.matchNotice.showNotice()
					}
				}, 1500)
				handler2 = setInterval(async () => {
					const res = await request(responseCheck, {
						user_id,
						match_id: this.matchInfo.match_id
					}, {}, 'get')
					if (res.result.apply_status.status === 2) {
						uni.showToast({
							icon: 'none',
							title: '匹配成功，可以开始聊天了！'
						})
						clearInterval(handler2)
						this.matchSuccess = true
					} else if (res.result.apply_status.status === 0) {
						uni.showToast({
							icon: 'none',
							title: '对方已拒绝，请重新匹配'
						})
						clearInterval(handler2)
						this.matchSuccess = false
						setTimeout(() => uni.navigateBack({

						}), 1500)
					}
				}, 1500)
			}
		},
		onUnload() {
			clearInterval(handler)
			clearInterval(handler2)
		},
		methods: {
			chat() {
				
			},
			im() {
				
			},
			async confirmApply() {
				const user_id = uni.getStorageSync('uid')
				const res = await request(dealApply, {
					user_id,
					match_id: this.matchInfo.match_id,
					type: 1
				})
				this.matchSuccess = true
				uni.showToast({
					title: '您已同意申请！'
				})
			},
			async rejectApply() {
				const user_id = uni.getStorageSync('uid')
				const res = await request(dealApply, {
					user_id,
					match_id: this.matchInfo.match_id,
					type: 0
				})
				uni.showToast({
					icon: 'none',
					title: '您已拒绝申请，请重新匹配'
				})
				setTimeout(() => uni.navigateBack({
					
				}), 1000)
			},
			async getMatch() {
				try {
					uni.showLoading()
					const user_id = uni.getStorageSync('uid')
					const res = await request(getMatch, {
						user_id
					}, {}, 'GET')
					this.matchInfo = res.result
					uni.hideLoading()
				} catch (e) {
					//TODO handle the exception
				}
			},
			back() {
				uni.navigateBack({

				})
			},
			async dopay() {
				if (!this.matchInfo.match_id) {
					return
				}
				const user_id = uni.getStorageSync('uid')
				uni.showLoading()
				try {
					const res = await request(requestMatch, {
						user_id,
						match_id: this.matchInfo.match_id
					})
					uni.hideLoading()
					uni.showToast({
						icon: 'none',
						title: '申请已发送'
					})
				} catch (e) {
					uni.hideLoading()
					uni.showModal({
						title: '未开通会员',
						content: '开通会员后才可以使用匹配服务',
						confirmText: '去开通',
						cancelText: '取消',
						confirmColor: '#46868B',
						cancelText: '取消',
						cancelColor: '#999999',
						success: ({
							confirm
						}) => {
							if (confirm) {
								uni.navigateTo({
									url: '../../my/member/member'
								})
							} else {

							}
						}
					})
				}
			},

			rematch() {
				this.getMatch()
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

		.empty {
			width: 100%;
			height: 400upx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			color: #999;
			font-size: 18px;
		}

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
			padding: 0;
			.apply-date-text {
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
