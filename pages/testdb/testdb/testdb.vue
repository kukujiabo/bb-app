<template>
	<view class="testdb">
		<view class="title-wrapper">
			<image class="title-left" src="../../../static/images/arrow-left.png" @click="back()"></image>
			<text class="exam-title">知识题库</text>
		</view>
		<view class="page-list">
			<view
				class="page-list-item"
				v-for="question in question_list"
				:key="question.id"
				>
				<text class="page-list-item-title">{{question.title}}</text>
				<text class="page-list-item-test">共{{question.question_num}}题目</text>
				<text class="page-list-item-join">参与{{question.numbers}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../../utils/request.js'
	import { testdb } from '@/config/api'
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
				const res = await request(testdb, { user_id }, {})
				this.question_list = res.result.question_list
			}
		}
	}
</script>

<style lang="scss">
	.testdb {
		width: 100vw;
		min-height: 100vh;
		padding: 0 40upx;
		overflow: auto;
		background-color: #f6f6f6;
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

		.page-list {
			margin-top: 43upx;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;

			.page-list-item {
				width: 320upx;
				height: 220upx;
				background: #FFFFFF;
				box-shadow: 0px 2px 18px rgba(0, 0, 0, 0.08);
				opacity: 1;
				border-radius: 30upx;
				margin-bottom: 30upx;
				box-sizing: border-box;
				padding: 41upx 50upx;
				display: flex;
				flex-direction: column;
				justify-content: center;

				&:nth-child(2n) {
					margin-left: 30upx;
				}

				.page-list-item-title {
					font-size: 36upx;
					font-family: PingFang SC;
					font-weight: 800;
					line-height: 42upx;
					color: #000000;
				}

				.page-list-item-test {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					line-height: 33upx;
					margin-top: 16upx;
					color: #666666;
					opacity: 1;
				}

				.page-list-item-join {
					font-size: 22upx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 19upx;
					margin-top: 20upx;
					color: #46868B;
					opacity: 1;
				}
			}
		}
	}
</style>
