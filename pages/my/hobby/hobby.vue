<template>
	<view class="hobby">
		<view class="title-wrapper">
			<image class="title-left" src="../../../static/images/arrow-left.png" @click="back()"></image>
			<text class="exam-title">筛选</text>
		</view>
		<view class="hobby-wrapper">
			<text class="hobby-wrapper-title">性别</text>
		</view>
		<view class="hobby-item" @click="chooseSex">
			<text class="hobby-item-text">{{getSex || '未选择' }}</text>
		</view>
		<view class="hobby-wrapper">
			<text class="hobby-wrapper-title">城市</text>
		</view>
		<view class="hobby-item" @click="chooseAddress">
			<text class="hobby-item-text">{{currentCity || '未选择' }}</text>
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
	import { userinfo, matchCondition, getCondition } from '@/config/api'
	export default {
		components: {
			Selector
		},
		computed: {
			getSex() {
				const sex = this.sexOptions.options.find(option => option.id === this.currentSex)
				return sex ? sex.name : ''
			}
		},
		data() {
			return {
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
				currentId: 0,
				currentOptions: {},
				sexOptions: {
					key: 'select_sex',
					selectTitle: '选择性别',
					confirmText: '确定',
					options: [{
						id: 0,
						name: '全部'			
					},{
						id: 1,
						name: '男'
					},{
						id: 2,
						name: '女'
					}]
				},
				currentSex: 0,
				addressOptions: {
					key: 'address',
					selectTitle: '地址',
					confirmText: '确定',
					options: [{
						id: '全部',
						name: '全部'			
					}, {
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
					},{
						id: '山东',
						name: '山东'
					}],
				},
				currentCity: '全部'
			};
		},
		onLoad() {
			this.getUserInfo()
			this.getSetting()
		},
		methods: {
			back() {
				uni.navigateBack({
					
				})
			},
			async getSetting() {
				const user_id = uni.getStorageSync('uid')
				const res = await request(getCondition, { user_id }, { }, 'get')
				console.log(res.result)
				this.currentCity = res.result.user_info.match_city
				this.currentSex = res.result.user_info.match_sex
				console.log(res.result.user_info)
			},
			chooseAddress() {
				this.currentOptions = this.addressOptions
				this.$refs.selector.show()
			},
			chooseSex() {
				this.currentOptions = this.sexOptions
				this.$refs.selector.show()
			},
			async getUserInfo() {
				const user_id = uni.getStorageSync('uid')
				const res = await request(userinfo, { user_id })
				this.userinfo = res.result.user_info
			},
			toSetting() {
				uni.navigateTo({
					url: '/pages/my/settings/settings'
				})
			},
			selectConfirm(evt) {
				const id = evt.id
				const name = evt.name
				const user_id = uni.getStorageSync('uid')
				if (this.currentOptions.key === 'address') {
					this.currentCity = id
					const res =request(matchCondition, { user_id, match_city: id })
				} else {
					this.currentSex = id
					const res =request(matchCondition, { user_id, match_sex: id })
				}
			}
		}
	}
</script>

<style lang="scss">
	.hobby {
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
		
		.hobby-wrapper {
			margin-top: 113upx;
			height: 136upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			.hobby-wrapper-title {
				font-size: 40upx;
				font-family: PingFang SC;
				font-weight: bold;
				line-height: 47upx;
				color: #282828;
				opacity: 1;
			}
		}
		.hobby-item {
			width: 610upx;
			height: 140upx;
			margin: 0 40upx;
			background: #FFFFFF;
			box-shadow: 0px 2px 18px rgba(0, 0, 0, 0.08);
			opacity: 1;
			border-radius: 24upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			.hobby-item-text {
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 34upx;
				color: #46868B;
			}
		}
	}
</style>
