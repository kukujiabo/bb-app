<template>
	<view class="testdb">
		<view class="title-wrapper">
			<image class="title-left" src="../../../static/images/arrow-left.png" @click="back()"></image>
			<text class="exam-title">知识题库</text>
		</view>
		<view class="test-wrapper">
			<view class="page-list-item" v-for="test in question_list" :key="test.id" @click="toDoQuestion(test.id)">
				<text class="page-list-item-title">{{test.title}}</text>
				<view class="page-list-item-join">
					<view class="page-list-item-join-mask"></view>
					<text>{{test.numbers}}人在线</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../../utils/request.js'
	import {
		testdb
	} from '@/config/api'
	export default {
		data() {
			return {
				question_list: []
			}
		},
		onLoad() {
			this.getTestDb()
		},
		methods: {
			back() {
				wx.navigateBack()
			},
			async getTestDb() {
				const user_id = uni.getStorageSync('uid')
				const res = await request(testdb, {
					user_id
				}, {}, 'GET')
				this.question_list = res.result.question_list
			},
			toDoQuestion(id) {
				uni.navigateTo({
					url: '../doQuestion/doQuestion?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.testdb {
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

		.test-wrapper {
			display: flex;
			flex-direction: column;
			padding: 0 40upx;
			margin-top: 33upx;
			justify-content: center;
			align-items: center;

			.page-list-item {
				width: 670upx;
				height: 220upx;
				background: #000;
				box-shadow: 0px 2px 18px rgba(0, 0, 0, 0.08);
				opacity: 1;
				border-radius: 30upx;
				margin-bottom: 30upx;
				box-sizing: border-box;
				padding: 41upx 50upx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;

				.page-list-item-title {
					font-size: 36upx;
					font-family: PingFang SC;
					font-weight: 800;
					line-height: 42upx;
					color: #ffffff;
				}

				.page-list-item-join {
					position: relative;
					font-size: 22upx;
					font-family: PingFang SC;
					line-height: 19upx;
					margin-top: 25upx;
					margin-right: auto;
					color: #ffffff;
					padding: 15upx 25upx;
					border-radius: 100upx;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					overflow: hidden;

					.page-list-item-join-mask {
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						opacity: 0.5;
						background-color: #fff;
					}
				}
			}
		}


	}
</style>
