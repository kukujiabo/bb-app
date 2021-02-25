<template>
	<view class="edit-text">
		<view class="title-wrapper">
			<image class="title-left" src="../../../static/images/arrow-left.png" @click="back()"></image>
			<text class="exam-title">修改昵称</text>
		</view>
		<view class="input-form">
			<view class="phone-input">
				<input class="nickname" v-model="nickname" placeholder="请输入昵称" />
			</view>
		</view>
		<view class="submit">
			<view class="confirm" @tap="confirmInfo">
				<text class="confirm-text">确定</text>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../../utils/request.js'
	import { editUser } from '@/config/api'
	export default {
		data() {
			return {
				nickname: ''
			};
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			async confirmInfo() {
				const user_id = uni.getStorageSync('uid')
				try {
					uni.showLoading()
					const res = await request(editUser, { user_id, nickname: this.nickname })
					uni.hideLoading()
					if (res.code === 200) {
						uni.showToast({
							title: '修改成功!'
						})
						const user_info = uni.getStorageSync('user_info')
						user_info.nickname = this.nickname
						uni.setStorageSync('user_info', user_info)
						uni.setStorageSync('nickname', this.nickname)
						setTimeout(() => this.back(), 1000)
					}
				} catch(e) {
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss">
	.edit-text {
		width: 100vw;
		min-height: 100vh;
		box-sizing: border-box;
		padding: 0 30upx;
		background-color: #f6f6f6;
		overflow: auto;

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

		.input-form {
			margin-top: 200upx;

			.phone-input {
				margin-top: 77upx;
				width: 100%;
				height: 126upx;
				border-bottom: 1rpx solid #DDDDDD;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;

				.nickname {
					text-align: center;
				}
			}
		}
		.submit {
			width: 690upx;
			margin-top: 300upx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			.confirm {
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
