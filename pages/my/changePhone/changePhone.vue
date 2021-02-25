<template>
	<view class="register">
		<view class="title-wrapper">
			<image class="title-left" src="../../../static/images/arrow-left.png" @click="back()"></image>
			<text class="exam-title">更换手机号</text>
		</view>
		<view class="form-group">
			<view class="checkcode-title">
				<text>短信验证验证</text>
			</view>
			<view class="checkcode-phone">

			</view>
			<view class="form-group-item">
				<view class="form-group-item-input">
					<input class="input-content" placeholder="请输入手机号" placeholder-style="color:#DDDDDD" v-model="phone" />
				</view>
				<view class="form-group-item-input">
					<input class="input-content" placeholder="请输入验证码" placeholder-style="color:#DDDDDD" v-model="verify" />
					<view class="send-btn" @click="sendSms()">
						<text>{{sendText}}</text>
					</view>
				</view>
				<view class="form-submit">
					<view class="submit-btn" @click="resetPhone()">
						<text class="submit-btn-text">更换手机号</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '@/utils/request.js'
	import {
		changePhone
	} from '@/config/api'
	export default {
		data() {
			return {
				verify: '',
				phone: '',
				nickname: '',
				sendText: '发送验证码',
				count: 30,
				sending: false,
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
			}
		},
		onLoad(options) {
			this.phone = options.phone
			this.nickname = options.nickname
		},
		methods: {
			async resetPhone() {
				uni.showLoading({
					mask: true
				})
				const user_id = uni.getStorageSync('uid')
				const res = await request(changePhone, { 
					user_id,
					phone: this.phone,
					verify: this.verify,
				})
				uni.hideLoading()
				if (res.code === 200) {
					uni.showToast({
						title: '修改成功!'
					})
					uni.setStorageSync('phone', this.phone)
					setTimeout(() => this.back(), 1000)
				} else {
					uni.showModal({
						title: '修改失败,请联系管理员!'
					})
				}
			},
			back() {
				uni.navigateBack() 
			},
			async sendSms() {
				if (!this.phone || this.phone.length !== 11) {
					uni.showToast({
						icon: 'none',
						title: '请正确输入手机号!'
					})
					return
				}
				if (this.sending || this.count < 30) {
					return
				}
				try {
					this.sending = true
					this.sendText = '发送中...'
					const res = await request(sendCode, {
						phone: this.phone,
						type: 'bind'
					}, {})
					this.sending = false
					if (res.code === 200) {
						const intervalHandler = setInterval(() => {
							if (this.count === 0) {
								this.count = 30
								clearInterval(intervalHandler)
								this.sendText = '重发验证码'
							} else {
								this.count = this.count - 1
								this.sendText = `(${this.count})后重发`
							}
						}, 1000)
					} else {
						this.sendText = '重发验证码'
					}
				} catch (e) {
					this.sending = false
					this.sendText = '重发验证码'
					uni.showToast({
						icon: 'none',
						title: '网络错误,请稍后重试!'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.register {
		width: 100vw;
		min-height: 100vh;
		overflow: auto;
		background-color: #f6f6f6;

		.title-wrapper {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: 107upx;
			justify-content: flex-start;
			padding: 0 70upx;

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

		.form-group {
			margin-top: 69upx;
			padding: 0 70upx;

			.checkcode-title {
				font-size: 46upx;
				font-family: PingFang SC;
				font-weight: bold;
				line-height: 48upx;
				color: #282828;
				opacity: 1;
			}

			.checkcode-phone {
				margin-top: 18upx;
				width: 212upx;
				height: 48upx;
				font-size: 34upx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 48upx;
				color: #666666;
				opacity: 1;
			}

			.form-group-item-input {
				height: 90upx;
				margin-top: 40upx;
				border-bottom: 1px solid #DDDDDD;
				display: flex;
				flex-direction: row;
				align-items: center;

				.input-title {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 50upx;
					color: #000000;
				}

				.input-content {
					flex: 1;
					margin-left: 20upx;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 50upx;
					opacity: 1;
				}

				.send-btn {
					text-align: right;
					width: 200upx;
					height: 42upx;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 50upx;
					color: #46868B;
					opacity: 1;
				}
			}

			.form-submit {
				margin-top: 263upx;
				display: flex;
				flex-direction: row;
				justify-content: center;

				.submit-btn {
					width: 530upx;
					height: 98upx;
					background: #46868B;
					opacity: 1;
					border-radius: 60upx;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;

					.submit-btn-text {
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
	}
</style>
