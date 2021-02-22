<template>
	<view class="login">
		<view class="login-content-wrapper">
			<view class="login-logo-wrapper">
				<image class="logo" src="@/static/images/ico04@2x.png" />
			</view>
			<view class="login-title-wrapper">
				<text class="login-title">登录BB</text>
			</View>
			<view class="login-desc-wrapper">
				<text class="login-desc">请登陆后查看相关数据</text>
			</view>
			<view class="phone-input">
				<input v-model="phone" placeholder="请输入手机号"/>
			</view>
			<view class="password-input">
				<input v-model="password" type="password" placeholder="请输入密码"/>
			</view>
			<view class="other-options">
				<view class="forget">
					<image v-if="record" class="forget-icon" src="@/static/images/ico06@2x.png" mode="" @click="switchRecord(false)"></image>
					<image v-else class="forget-icon" src="@/static/images/ico05@2x.png" mode="" @click="switchRecord(true)"></image>
					<text>记住账号</text>
				</view>
				<view class="remember" @click="toForget">
					<text>忘记密码</text>
				</view>
			</view>
			<view class="login-btn-wrapper">
				<image class="login-btn" src="@/static/images/ico01@2x.png" @click="login"/>
			</view>
			<view class="reg" @click="toRegister">
				<text class="reg-text">我要注册</text>
			</view>
			<view class="third-party-login">
				<image class="third-party-icon" src="@/static/images/ico03@2x.png" mode=""></image>
				<image class="third-party-icon" src="@/static/images/ico02@2x.png" mode=""></image>
			</view>
			<view class="agreement">
				<text class="agreement-text">登录注册表示同意许可使用协议、隐私政策</text>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../../utils/request.js';
	import { login } from '@/config/api.json'
	export default {
		data() {
			return {
				phone: '',
				password: '',
				record: true
			};
		},
		onLoad() {
			if (uni.getStorageSync('uid')) {
				uni.switchTab({ url: '/pages/index/index' })
			}
		},
		methods: {
			toRegister() {
				uni.navigateTo({
					url: '../register/nickname'
				})
			},
			switchRecord(record) {
				this.record = record
			},
			toForget() {
				uni.navigateTo({
					url: '../forget/forget'
				})
			},
			async login() {
				if (!this.phone) {
					uni.showToast({
						icon: 'none',
						title: '手机号不能为空!'
					});
					return
				}
				if (!this.password) {
					uni.showToast({
						icon: 'none',
						title: '密码不能为空!'
					});
					return
				}
				uni.showLoading({
					title: '正在登录'
				})
				try{
					const res = await request(login, { username: this.phone, password: this.password }, {})
					if (res.code === 200) {
						uni.showToast({ title: '登录成功!' })
						const result = res.result
						if (this.record) {
							uni.setStorageSync('uid', result.user_id)
							uni.setStorageSync('nickname', result.nickname)
							uni.setStorageSync('phone', result.phone)
							uni.setStorageSync('is_vip', result.is_vip)
						}
						setTimeout(() => {
							uni.switchTab({ url: '/pages/index/index' })
						}, 1500)
					} 
				}catch(e){
					uni.hideLoading()
					uni.showModal({
						title: '错误',
						content: e.msg
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.login {
	width: 750upx;
	height: 1624upx;
	background: #F6F6F6;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	.login-content-wrapper {
		position: absolute;
		top: 189upx;
		left: 72upx;
		right: 72upx;
		bottom: 138upx;
		.login-logo-wrapper {
			height: 115.05upx;
			.logo {
				width: 125.1upx;
				height: 115.05upx;
			}
		}
		.login-title-wrapper {
			margin-top: 27upx;
			height: 65upx;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			.login-title {
				font-size: 46upx;
				font-family: PingFang SC;
				font-weight: bold;
				line-height: 48upx;
				color: #282828;
			}
		}
		.login-desc-wrapper {
			height: 42upx;
			margin-top: 14upx;
			.login-desc {
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 48upx;
				color: #666666;
			}
		}
		.phone-input {
			margin-top: 77upx;
			width: 100%;
			height: 126upx;
			border-bottom: 1rpx solid #DDDDDD;
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		.password-input {
			margin-top: 7upx;
			width: 100%;
			height: 126upx;
			border-bottom: 1rpx solid #DDDDDD;
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		.other-options {
			margin-top: 48upx;
			height: 45upx;
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			font-size: 32upx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 42upx;
			color: #5E5E5E;
			opacity: 1;
			.forget {
				display: flex;
				flex-direction: row;
				align-items: center;
				.forget-icon {
					margin-right: 13upx;
					width: 32upx;
					height: 32upx;
				}
			}
		}
		.login-btn-wrapper {
			margin-top: 63upx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			.login-btn {
				width: 140upx;
				height: 140upx;
			}
		}
		.reg {
			margin-top: 61upx;
			height: 49upx;
			display: flex;
			justify-content: center;
			align-items: center;
			.reg-text {
				font-size: 35upx;
				font-family: PingFang SC;
				font-weight: 500;
				line-height: 42upx;
				color: #46868B;
				opacity: 1;
			}
		}
		.third-party-login {
			width: 100%;
			height: 96upx;
			margin-top: 101upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			.third-party-icon {
				width: 96upx;
				height: 96upx;
				margin: 0 50upx;
			}
		}
		.agreement {
			margin-top: 60upx;
			height: 33upx;
			display: flex;
			justify-content: center;
			align-items: center;
			.agreement-text {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 48pux;
				color: #999999;
			}
		}
	}
}
</style>
