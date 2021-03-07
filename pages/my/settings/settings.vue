<template>
	<view class="settings">
		<view class="title-wrapper">
			<image class="title-left" src="../../../static/images/arrow-left.png" @click="back()"></image>
			<text class="exam-title">基本设置</text>
		</view>
		<view class="content">
			<view class="content-item" @click="touserinfo">
				<text class="content-title">个人信息</text>
				<image class="toleft" src="../../../static/images/ico07@2x.png"></image>
			</view>
			<view class="content-item" @tap="showSelectColor(1)">
				<text class="content-title">喜欢的色彩</text>
				<image class="toleft" src="../../../static/images/ico07@2x.png"></image>
			</view>
			<view class="content-item" @tap="showSelectColor(4)">
				<text class="content-title">职业</text>
				<image class="toleft" src="../../../static/images/ico07@2x.png"></image>
			</view>
			<view class="content-item">
				<text class="content-title">出生日期</text>
				<image class="toleft" src="../../../static/images/ico07@2x.png"></image>
			</view>
			<view class="content-item" @tap="showSelectColor(6)">
				<text class="content-title">地址</text>
				<image class="toleft" src="../../../static/images/ico07@2x.png"></image>
			</view>
			<view class="content-item" @tap="showSelectColor(5)">
				<text class="content-title">格言</text>
				<image class="toleft" src="../../../static/images/ico07@2x.png"></image>
			</view>
			<view class="content-item" @tap="showSelectColor(2)">
				<text class="content-title">运动</text>
				<image class="toleft" src="../../../static/images/ico07@2x.png"></image>
			</view>
			<view class="content-item" @tap="showSelectColor(3)">
				<text class="content-title">旅游</text>
				<image class="toleft" src="../../../static/images/ico07@2x.png"></image>
			</view>
		</view>
		<selector
			ref="selector"
			:currentId="currentId"
			:title="currentOptions.selectTitle" 
			:options="currentOptions.options"
			:confirmText="currentOptions.confirmText"
			@confirm="selectConfirm"
			>
		</selector>
	</view>
</template>

<script>
	import Selector from '../../../components/selector.vue'
	import request from '../../../utils/request.js'
	import { dropdown, editUser, userinfo } from '@/config/api'
	const sns = [1,2,3,4,5]
	export default {
		components: {
			Selector
		},
		data() {
			return {
				currentId: 0,
				colorOptions: {
					key: 'select_color',
					selectTitle: '喜欢的色彩',
					confirmText: '确定',
					options: [],
				},
				sportOptions: {
					key: 'select_sports',
					selectTitle: '喜欢的运动',
					confirmText: '确定',
					options: [],
				},
				tripOptions: {
					key: 'select_traval',
					selectTitle: '旅游',
					confirmText: '确定',
					options: [],
				},
				workOptions: {
					key: 'job',
					selectTitle: '职业',
					confirmText: '确定',
					options: [],
				},
				wordOptions: {
					key: 'info',
					selectTitle: '格言',
					confirmText: '确定',
					options: [],
				},
				addressOptions: {
					key: 'address',
					selectTitle: '地址',
					confirmText: '确定',
					options: [{
						id: '北京',
						name: '北京'
					},{
						id: '海南',
						name: '海南'
					},{
						id: '广西',
						name: '广西'
					},{
						id: '广东',
						name: '广东'
					},{
						id: '湖南',
						name: '湖南'
					},],
				},
				currentOptions: {},
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
			this.getColorList()
			this.getSportList()
			this.getTripList()
			this.getWordList()
			this.getWorkList()
		},
		onShow() {
			this.getUserInfo()
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			touserinfo() {
				uni.navigateTo({
					url: '../userinfo/userinfo'
				})
			},
			showSelectColor(index) {
				switch(index) {
					case 1:
						this.currentId = this.userinfo.select_color
						this.currentOptions = this.colorOptions
					break;
					case 2:
						this.currentId = this.userinfo.select_sports
						this.currentOptions = this.sportOptions
					break;
					case 3:
						this.currentId = this.userinfo.select_travel
						this.currentOptions = this.tripOptions
					break;
					case 4:
						this.currentId = this.userinfo.job
						this.currentOptions = this.workOptions
					break;
					case 5:
						this.currentId = this.userinfo.info
						this.currentOptions = this.wordOptions
					break;
					case 6:
						this.currentId = this.userinfo.address
						this.currentOptions = this.addressOptions
					break;
				}
				this.$refs.selector.show()
			},
			async selectConfirm(option) {
				const user_id = uni.getStorageSync('uid')
				const params = {
					user_id,
					[this.currentOptions.key]: option.id
				}
				const res = await request(editUser, params)
				if (res.code === 200) {
					this.getUserInfo()
					uni.showToast({
						title: '修改成功！'
					})
				}
			},
			async getColorList() {
				const res = await this.getDropdownList(1)
				this.colorOptions.options = res.result.data_list
			},
			async getSportList() {
				const res = await this.getDropdownList(2)
				this.sportOptions.options = res.result.data_list
			},
			async getTripList() {
				const res = await this.getDropdownList(3)
				this.tripOptions.options = res.result.data_list
			},
			async getWorkList() {
				const res = await this.getDropdownList(4)
				this.workOptions.options = res.result.data_list
			},
			async getWordList() {
				const res = await this.getDropdownList(5)
				this.wordOptions.options = res.result.data_list
			},
			async getDropdownList(sn) {
				try{
					return await request(dropdown, { sn })
				}catch(e){
					//TODO handle the exception
				}
			},
			async getUserInfo() {
				const user_id = uni.getStorageSync('uid')
				const res = await request(userinfo, { user_id })
				this.userinfo = res.result.user_info
			}
		}
	}
</script>

<style lang="scss">
	.settings {
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
		.content {
			width: 690upx;
			height: 1027upx;
			background: #FFFFFF;
			opacity: 1;
			margin-top: 40upx;
			border-radius: 30upx;
			display: flex;
			flex-direction: column;
			align-items: center;
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
				.toleft {
					width: 24.3upx;
					height: 28.31upx;
				}
			}
			.confirm {
				margin-top: 100upx;
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
