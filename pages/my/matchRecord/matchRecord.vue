<template>
	<view class="match-record">
		<view class="title-wrapper">
			<image class="title-left" src="../../../static/images/arrow-left.png" @click="back()"></image>
			<text class="exam-title">匹配记录</text>
		</view>
		<view class="items">
			<view class="item" v-for="d in data_list" :key="d.id">
				<view class="title">
					<text>GET 一周</text>
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
			</view>
		</view>
		<view style="height:200upx"></view>
	</view>
</template>

<script>
	import {
		matchList
	} from '@/config/api';
	import request from '../../../utils/request.js'
	export default {
		data() {
			return {
				data_list: []
			};
		},
		onLoad() {
			this.getMatchedList()
		},
		methods: {
			back() {
				uni.navigateBack({

				})
			},
			async getMatchedList() {
				const user_id = uni.getStorageSync('uid')
				const res = await request(matchList, {
					user_id
				}, {}, 'get')
				this.data_list = res.result.data_list
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
		background-color: #f6f6f6;
		overflow: auto;

		.items {
			.item {
				margin-top: 60upx;

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
	}
</style>
