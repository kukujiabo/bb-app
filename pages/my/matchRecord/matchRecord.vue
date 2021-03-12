<template>
	<view class="match-record">
		<view class="title-wrapper">
			<image class="title-left" src="../../../static/images/arrow-left.png" @click="back()"></image>
			<text class="exam-title">匹配记录</text>
		</view>
		<view class="tabs">
			<view class="tab-item" :class="{ active: tabIndex === 1 }" @click="switchTab(1)">
				<text>已匹配</text>
			</view>
			<view class="tab-item" :class="{ active: tabIndex === 2 }" @click="switchTab(2)">
				<text>TA的申请</text>
			</view>
		</view>
		<view class="items">
			<view class="item" v-for="d in data_list" :key="d.id">
				<view class="title">
					<text>{{d.words}}</text>
				</view>
				<view class="time">
					<text>{{d.start_time}}</text>
					<text>~</text>
					<text>{{d.end_time}}</text>
				</view>
				<view class="match-zoom">
					<image class="match-zoom-image" :src="d.member.head"></image>
					<image class="match-zoom-image" :src="d.person.head"></image>
				</view>
				<view class="match-operation">
					<view class="operation-btn" v-if="tabIndex === 1">
						<text>联系TA</text>
					</view>
					<view class="operation-btn" v-if="tabIndex === 2" style="color:#46868B" @click="dealApply(d.id, 1)">
						<text>同意</text>
					</view>
					<view class="operation-btn" v-if="tabIndex === 2" style="color:#20B2AA"  @click="dealApply(d.id, 0)">
						<text>拒绝</text>
					</view>
					<view class="operation-btn" @click="toSpace(d.person, d.friend_id)">
						<text>看看TA</text>
					</view>
				</view>
			</view>
		</view>
		<view style="height:200upx"></view>
	</view>
</template>

<script>
	import {
		matchList,
		dealApply
	} from '@/config/api';
	import request from '../../../utils/request.js'
	export default {
		data() { 
			return {
				tabIndex: 1,
				data_list: []
			};
		},
		onLoad(options) {
			if (options.tabIndex) {
				this.tabIndex = Number(options.tabIndex)
			}
			this.getMatchedList()
		},
		methods: {
			back() {
				uni.navigateBack({ })
			},
			switchTab(index) {
				this.tabIndex = index
				this.getMatchedList()
			},
			async getMatchedList() {
				const user_id = uni.getStorageSync('uid')
				const res = await request(matchList, {
					user_id, sn: this.tabIndex % 2 + 1
				}, {}, 'get')
				this.data_list = res.result.data_list
			},
			toSpace(person, friend_id) {
				const user_id = uni.getStorageSync('uid')
				uni.navigateTo({ 
					url: `../friendSpace/friendSpace?user_id=${user_id}&friend_id=${friend_id}`
				})
			},
			async dealApply(match_id, type) {
				const user_id = uni.getStorageSync('uid')
				const res = request(dealApply, { user_id, type, match_id })
				if (type === 1) {
					uni.showToast({
						icon: 'none',
						title: '您已同意对方申请！'
					})
				} else { 
					uni.showToast({
						icon: 'none',
						title: '您已拒绝对方申请！'
					})
				}
				this.getMatchedList()
			}
		}
	}
</script>

<style lang="scss">
	.match-record {
		width: 100vw;
		min-height: 100vh;
		box-sizing: border-box;
		padding: 0 30upx;
		background-color: #e3e4e5;
		overflow: auto;

		.items {
			.item {
				margin-top: 60upx;
				position: relative;
				width: 100%;
				.title {
					height: 65upx;
					font-size: 46upx;
					font-family: PingFang SC;
					font-weight: 800;
					line-height: 55upx;
					color: #282828;
					opacity: 1;
				}

				.time {
					margin-top: 14upx;
					height: 48upx;
					font-size: 34upx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 42upx;
					color: #999999;
					opacity: 1;
				}

				.match-zoom {
					margin-top: 30upx;
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
				.match-operation {
					position: absolute;
					right: 0;
					bottom: 0;
					height: 200upx;
					width: 200upx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					.operation-btn {
						width: 120upx;
						padding: 10upx 30upx;
						border-radius: 50upx;
						background-color: #fff;
						margin: 10upx 0;
						text-align: center;
					}
				}
			}
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
		.tabs {
			width: 100%;
			height: 90upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			font-size: 20px;
			font-weight: 600;
			margin-top: 30upx;
			.tab-item {
				height: 90upx;
				flex: 1;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
			}
			.tab-item.active {
				color: #46868B;
				border-bottom: 1px solid #46868B;
			}
		}
	}
</style>
