<template>
	<view class="userinfo">
		<view class="title-wrapper">
			<image class="title-left" src="../../../static/images/arrow-left.png" @click="back()"></image>
			<text class="exam-title">个人设置</text>
		</view>
		<view class="content">
			<view class="header-holder">
				<image class="header-holder-image" :src="user_info.head" @click="editHeader"></image>
			</view>
			<view class="content-item" @click="editNickname">
				<text class="content-title">昵称</text>
				<view class="content-tail">
					<text class="content-tail-text">{{user_info.nickname}}</text>
					<image class="toleft" src="../../../static/images/ico07@2x.png"></image>
				</view>
			</view>
			<view class="content-item" @click="toeditphone">
				<text class="content-title">手机</text>
				<view class="content-tail">
					<text class="content-tail-text">{{getPhone}}</text>
					<image class="toleft" src="../../../static/images/ico07@2x.png"></image>
				</view>
			</view>
			<view class="content-item" @click="chooseSex">
				<text class="content-title">性别</text>
				<view class="content-tail">
					<image class="toleft" src="../../../static/images/ico07@2x.png"></image>
				</view>
			</view>
			<view class="content-item" @click="editPassword">
				<text class="content-title">登录密码</text>
				<view class="content-tail">
					<image class="toleft" src="../../../static/images/ico07@2x.png"></image>
				</view>
			</view>
			<view class="logout-container" @click="logout">
				<text class="logout">安全退出</text>
			</view>
		</view>
		<selector
			ref="selector"
			:currentId="currentId"
			:title="sexOptions.selectTitle" 
			:options="sexOptions.options"
			:confirmText="sexOptions.confirmText"
			@confirm="selectConfirm"
			>
		</selector>
	</view>
</template>

<script>
	import request from '../../../utils/request.js'
	import Selector from '../../../components/selector.vue'
	import { editHeader, editUser } from '@/config/api'
	export default {
		components: {
			Selector
		},
		computed: {
			getPhone() {
				if (this.user_info.phone) {
					const phone = Array.from(this.user_info.phone)
					return phone.map((w, i) => [3, 4, 5, 6].includes(i) ? '*' : w).join('')
				} else {
					return ''
				}
			}
		},
		data() {
			return {
				currentId: 0,
				currentOptions: {
					selectTitle: '',
					options: [],
					confirmText: '确定'
				},
				sexOptions: {
					key: 'select_sex',
					selectTitle: '选择性别',
					confirmText: '确定',
					options: [{
						id: 1,
						name: '男'
					},{
						id: 2,
						name: '女'
					}],
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
			};
		},
		onShow() {
			this.user_info = uni.getStorageSync('user_info')
		},
		methods: {
			back() { 
				uni.navigateBack()
			},
			touserinfo() {
				
			},
			editNickname() {
				uni.navigateTo({
					url: '../editText/editText?key=nickname'
				})
			},
			chooseSex() {
				this.$refs.selector.show()
			},
			editPassword() {
				uni.navigateTo({
					url: '../resetPassword/resetPassword'
				})
			},
			toeditphone() {
				uni.navigateTo({
					url: '../editPhone/editPhone'
				}) 
			},
			async selectConfirm(option) {
				const user_id = uni.getStorageSync('uid')
				const params = {
					user_id,
					sex: option.id
				}
				const res = await request(editUser, params)
				if (res.code === 200) {
					this.getUserInfo()
					uni.showToast({
						title: '修改成功！'
					})
				}
			},
			async getUserInfo() {
				const user_id = uni.getStorageSync('uid')
				const res = await request(userinfo, { user_id })
				this.user_info = res.result.user_info
			},
			editHeader() {
				const user_id = uni.getStorageSync('uid')
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: (res) => {
						const path = res.tempFilePaths[0]
						uni.showLoading()
						wx.uploadFile({
							url: 'https://bb.ccjjj.com//mallapi/user/headimg',
							filePath: path,
							name: 'head',
							formData: { user_id },
							success: (response) => {
								uni.hideLoading()
								uni.showToast({
									title: '上传成功!'
								})
								const data = JSON.parse(response.data)
								this.user_info.head = data.result.head_url
								uni.setStorageSync('user_info', this.user_info)
							},
							fail: (err) => {
								uni.hideLoading()
								uni.showModal({
									title: '错误',
									content: '服务器错误, 请稍后重试!'
								})
							}
						})
					}
				})
			},
			logout() {
				uni.showModal({
					title: '提示',
					content: '确认退出吗?',
					success: ({ confirm }) => {
						if (confirm) { 
							uni.clearStorageSync()
							uni.setStorageSync('boss', 1)
							uni.redirectTo({
								url: '/pages/auth/login/login'
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.userinfo {
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
	.content {
		margin-top: 40upx;
		width: 690upx;
		height: 934upx;
		background: #FFFFFF;
		opacity: 1;
		border-radius: 30upx;
		.header-holder {
			width: 610upx;
			height: 300upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			border-bottom: 1upx solid #f0f0f0;
			margin: 0 40upx;
			.header-holder-image {
				width: 180upx;
				height: 180upx;
				border-radius: 90upx;
			} 
		}
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
			.content-tail {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: flex-end;
				.content-tail-text {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 50upx;
					color: #000000;
					opacity: 1;
					margin-right: 15upx;
				}
				.toleft {
					width: 24.3upx;
					height: 28.31upx;
				}
			}
		}
	}
	.logout-container {
		width: 100%;
		height: 240upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		.logout {
			font-size: 36upx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 48upx;
			color: #E70012;
			opacity: 1;
		}
	}
}
</style>
