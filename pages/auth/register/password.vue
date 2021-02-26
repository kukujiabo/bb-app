<template>
	<view class="register">
		<view class="title-wrapper">
			<image class="title-left" src="../../../static/images/arrow-left.png" @click="back()"></image>
			<text class="exam-title">密码</text>
		</view>
		<view class="form-group">
			<view class="form-group-item">
				<view class="form-group-item-input">
					<text class="input-title">输入密码</text>
					<input type="password" class="input-content" placeholder="请输入" placeholder-style="color:#DDDDDD" v-model="password" />
				</view>
				<view class="form-group-item-input" style="margin-top:50upx">
					<text class="input-title">重复密码</text>
					<input type="password" class="input-content" placeholder="请输入" placeholder-style="color:#DDDDDD" v-model="repassword" />
				</view>
				<view class="form-submit">
					<view class="submit-btn" @click="register()">
						<text class="submit-btn-text">确认注册</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { register } from '@/config/api.json'
	import request from '../../../utils/request.js'
	let options = {}
	export default {
		data() {
			return {
				username: '',
				phone: '',
				verify: '',
				password: '',
				repassword: ''
			};
		},
		onLoad(options) {
			this.username = options.username
			this.phone = options.phone
			this.verify = options.verify
		},
		methods: {
			async register() {
				if (!this.password || this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码必须大于6位',
						position: 'top'
					})
					return
				} else if (this.password !== this.repassword) {
						uni.showToast({
							icon: 'none',
							title: '两次密码不一致',
							position: 'top'
						})
						return
				}
				uni.showLoading({
					title: '正在注册'
				})
				try{
					const params = { password: this.password, repassword: this.repassword, username: this.username, verify: this.verify, phone: this.phone }
					const res = await request(register, params, {})
					if (res.code === 200) {
						uni.hideLoading()
						uni.showToast({ title: '注册成功!' })
						setTimeout(_ => {
							uni.redirectTo({
								url: '/pages/auth/login/login'
							})
						}, 1500)
					} else {
						uni.hideLoading()
						uni.showModal({
							title: '错误!',
							content: res.msg
						})
					}
				}catch(e){
					uni.hideLoading()
					uni.showModal({
							title: '错误!',
							content: e.msg
					})
				}

			},
			back() {
				uni.navigateBack()
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

		.form-group {
			margin-top: 190upx;
			padding: 0 70upx;

			.form-group-item-input {
				height: 90upx;
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
