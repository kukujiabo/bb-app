<template>
	<view class="match-record">
		<view class="title-wrapper">
			<image class="title-left" src="../../../static/images/arrow-left.png" @click="back()"></image>
			<text class="exam-title">匹配记录</text>
		</view>
	</view>
</template>

<script>
	import { matchList } from '@/config/api';
	import request from '../../../utils/request.js'
	export default {
		data() {
			return {
				
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
				const res = await request(matchList, { user_id }, {}, 'get')
				console.log(res)
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
