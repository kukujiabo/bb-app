<template>
	<view class="space">
		<view class="title-wrapper">
			<view class="title-left-wrapper">
				<image class="title-left" src="../../../static/images/arrow-left.png" @click="back()"></image>
				<text class="exam-title" v-if="uid">{{user_info.nickname}}的空间</text>
				<text class="exam-title" v-else>我的空间</text>
			</view>
		</view>
		<view v-for="space in new_space" :key="space.id">
			<view class="top-image" v-if="space.imgs.length === 1">
				<view class="user-info">
					<image class="user-info-head" :src="user_info.head"></image>
					<text class="user-info-nickname">{{user_info.nickname}}</text>
				</view>
				<view class="top-title">
					<text class="top-title-text">{{space.desc}}</text>
				</view>
				<view class="top-image-wrapper">
					<image class="top-image-image" :src="space.imgs[0]"></image>
				</view>
				<view class="bottom">
					<text class="bottom-text">{{space.publish_time}}</text>
					<view class="thumb">
						<image class="thumb-image" src="../../../static/images/thumb.png"></image>
						<text class="thumb-text">{{space.likes}}</text>
					</view>
				</view>
			</view>
			<view class="top-image" v-else>
				<view class="user-info">
					<image class="user-info-head" :src="user_info.head"></image>
					<text class="user-info-nickname">{{user_info.nickname}}</text>
				</view>
				<view class="top-title">
					<text class="top-title-text">{{space.desc}}</text>
				</view>
				<view class="top-image-wrapper">
					<image v-for="img in space.imgs" :key="img" class="small-image-image" :src="img"></image>
				</view>
				<view class="bottom">
					<text class="bottom-text">{{space.publish_time}}</text>
					<view class="thumb">
						<image class="thumb-image" src="../../../static/images/thumb.png"></image>
						<text class="thumb-text">{{space.likes}}</text>
					</view>
				</view>
			</view>
			<view style="margin-top:100upx"></view>
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
		<image class="add-new" src="../../../static/plus.png" @click="toAddNew"></image>
	</view>
</template>

<script>
	import Selector from '../../../components/selector.vue';
	import request from '../../../utils/request.js'
	import { myspace, editUser, spacelist } from '@/config/api'
	export default {
		components: {
			Selector
		},
		data() {
			return {
				is_secret: 0,
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
				space_info: {
					
				},
				uid: 0,
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
				new_space: []
			};
		},
		onLoad(options) {
			if (options.uid) {
				this.uid = options.uid
				this.user_info.head = options.head
				this.user_info.nickname = options.nickname
				console.log(options)
			} else {
				this.user_info = uni.getStorageSync('user_info')
			}
			this.getSpaceList()
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			toAddNew() {
				uni.navigateTo({
					url: '../newSpace/newSpace'
				})
			},
			
			async selectConfirm(option) {
				const user_id = uni.getStorageSync('uid')
				const params = {
					user_id,
					is_secret: option.id
				}
				const res = await request(editUser, params)
				if (res.code === 200) {
					this.getSpaceList()
					uni.showToast({ title: '修改成功！' })
				}
			},
			tapLock() {
				this.$refs.selector.show()
			},
			async getSpaceInfo() {
				const user_id = this.uid ? this.uid : uni.getStorageSync('uid')
				const res = await request(myspace, { user_id, sn: 1 })
			},
			async getSpaceList() {
				const user_id = this.uid ? this.uid : uni.getStorageSync('uid')
				const res = await request(spacelist, { user_id })
				this.new_space = res.result.new_space
				this.is_secret = res.result.user_info.is_secret
			}
		}
	}
</script>

<style lang="scss">
	.space {
		width: 100vw;
		min-height: 100vh;
		overflow: auto;
		background-color: #f6f6f6;
		box-sizing: border-box;
		padding: 0 40upx;
		.add-new {
			position: fixed;
			bottom: 100upx;
			right: 50upx;
			width: 100upx;
			height: 100upx;
			border-radius: 50upx;
		}
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

		.top-image {
			margin-top: 43upx;

			.user-info {
				height: 60upx;
				display: flex;
				flex-direction: row;
				align-items: center;

				.user-info-head {
					width: 60upx;
					height: 60upx;
					border-radius: 30upx;
				}

				.user-info-nickname {
					margin-left: 19upx;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 40upx;
					color: #000000;
					opacity: 1;
				}
			}

			.top-title {
				margin-top: 20upx;

				.top-title-text {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 54upx;
					color: #000000;
					opacity: 1;
				}
			}

			.top-image-wrapper {
				margin-top: 21upx;
				width: 670upx;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				.top-image-image {
					width: 670upx;
					height: 350upx;
					background: #eee;
					border-radius: 24upx;
					opacity: 1;
				}
				.small-image-image {
					width: 200upx;
					height: 200upx;
					background: #eee;
					border-radius: 16upx;
					margin-left: 30upx;
					margin-bottom: 30upx;
					&:nth-child(3n + 1) { 
						margin-left: 0;
					}
				}
			}
		}

		.bottom {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin-top: 52upx;

			.bottom-text {
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 35upx;
				color: #666666;
				opacity: 1;
			}

			.thumb {
				display: flex;
				flex-direction: row;
				align-items: center;

				.thumb-text {
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 35upx;
					color: #282828;
					opacity: 1;
				}

				.thumb-image {
					width: 40upx;
					height: 40upx;
					margin-right: 3upx;
				}
			}
		}
	}
</style>
