<template>
	<view class="new-space">
		<view class="title-wrapper">
			<view class="title-left-wrapper">
				<image class="title-left" src="../../../static/images/arrow-left.png" @click="back()"></image>
				<text class="exam-title">编辑内容</text>
			</view>
		</view>
		<view class="content">
			<textarea class="content-area" placeholder="请输入..." :maxlength="500" v-model="content"></textarea>
			<text class="text-number">{{content.length}}/500</text>
		</view>
		<view class="pictures">
			<image v-for="img in imgs" :key="img.id" class="picture-plus upload-image" :src="img.img_url"></image>
			<image class="picture-plus" src="../../../static/icon-plus.png" @click="uploadImage"></image>
		</view>
		<view class="lock" @click="tapLock">
			<image v-if="is_secret===0" class="lock-icon" src="../../../static/images/lock-black.png"></image>
			<text v-if="is_secret===0" class="lock-type">{{lockType}}</text>
			<image v-if="is_secret===1" class="lock-icon" src="../../../static/images/lock-active.png"></image>
			<text v-if="is_secret===1" class="lock-type active">{{lockType}}</text>
		</view>
		<view class="submit">
			<view class="confirm" @tap="confirm">
				<text class="confirm-text">确定</text>
			</view>
		</view>
		<selector
			ref="selector"
			:currentId="is_secret"
			:title="selectorOptions.selectTitle" 
			:options="selectorOptions.options"
			:confirmText="selectorOptions.confirmText"
			@confirm="selectConfirm"
			>
		</selector>
	</view>
</template>

<script>
	import Selector from '../../../components/selector.vue';
	import request from '../../../utils/request.js'
	import { addMoment } from '@/config/api'
	let uploading = false
	export default {
		components: {
			Selector
		},
		data() {
			return {
				imgs: [],
				lockType: '所有人可见',
				content: '',
				is_secret: 1,
				selectorOptions: {
					key: 'info',
					selectTitle: '保密',
					confirmText: '确定',
					options: [{
						id: 1,
						name: '所有人可见'
					}, {
						id: 0,
						name: '自己可见'
					}],
				},
			};
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			tapLock() {
				this.$refs.selector.show()
			},
			async selectConfirm(option) {
				this.is_secret = option.id
				this.lockType = option.name
			},
			uploadImage() {
				const user_id = uni.getStorageSync('uid')
				uni.chooseImage({
					count: 1,
					success: (res) => {
						uni.showLoading()
						uni.uploadFile({
							url: 'https://bb.ccjjj.com//mallapi/index/uploadfile',
							name: 'img',
							fileType: 'image',
							filePath: res.tempFilePaths[0],
							success: (res) => {
								uni.hideLoading()
								uni.showToast({
									title: '上传成功!'
								})
								const result = JSON.parse(res.data)
								this.imgs.push(result.result.response)
							},
							fail: (err) => {
								uni.hideLoading()
								uni.showToast({
									icon: 'none',
									title: '网络错误, 请重新上传!'
								})
								console.log(err)
							}
						})
					},
				})
			},
			async confirm() {
				if (uploading) {
					return
				}
				uploading = true
				if (!this.content) {
					uni.showToast({
						icon: 'none',
						title: '内容必须填写!'
					})
					uploading = false
					return
				}
				try{
					const user_id = uni.getStorageSync('uid')
					uni.showLoading()
					const res = await request(addMoment, { user_id, desc: this.content, imgs: this.imgs.map(img => img.img_id).join(','), is_show: this.is_secret })
					if (res.code === 200) {
						uni.showToast({
							title: '发布成功!'
						})
						setTimeout(() => uni.navigateBack(), 1000)
					} else {
						
					}
					uploading = false
					uni.hideLoading()
				} catch(e) {
					uploading = false
				}
			}
		}
	}
</script>

<style lang="scss">
	.new-space {
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
			justify-content: space-between;
			.lock {
				width: 48upx;
				height: 48upx;
			}
			.title-left-wrapper {
				display: flex;
				flex-direction: row;
				align-items: center;
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
		}
		.content {
			position: relative;
			padding: 40upx 0;
			box-sizing: border-box;
			.content-area {
				width: 670upx;
				height: 480upx;
				font-size: 18px;
				box-sizing: border-box;
			}
			.text-number {
				position: absolute;
				color: #666666;
				bottom: 40upx;
				right: 0;
			}
		}
		.pictures {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			.picture-plus {
				width: 200upx;
				height: 200upx;
				border-radius: 25upx;
				margin-right: 35upx;
				margin-bottom: 35upx;
				&:nth-child(3n) {
					margin-right: 0;
				}
			}
			.picture-plus.upload-image {
				background-color: #e3e5e7;
			}
		}

		.lock {
			margin-top: 100upx;
			display: flex;
			flex-direction: row;
			justify-content: center;

			.lock-icon {
				width: 40upx;
				height: 40upx;
			}
			.lock-type {
				margin-left: 10upx;
			}
			.lock-type.active {
				color: #46868B;
			}
		}

		.submit {
			margin-top: 60upx;
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
