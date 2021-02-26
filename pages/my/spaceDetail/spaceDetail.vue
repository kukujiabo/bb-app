<template>
	<view class="space-detail">
		<view class="title-wrapper">
			<view class="title-left-wrapper">
				<image class="title-left" src="../../../static/images/arrow-left.png" @click="back()"></image>
				<text class="exam-title">动态详情</text>
			</view>
		</view>
		<view class="space-time">
			<text style="font-weight: 900;font-size: 18px;">{{data_info.publish_time}}</text>
		</view>
		<view class="space-detail-info">
			<text>{{data_info.desc}}</text>
		</view>
		<view class="space-list">
			<image
				mode="aspectFill"
				v-for="space in data_info.imgs"
				:key="space.id"
				class="space-image"
				:src="space.img_url"
				>
			</image>
		</view>
	</view>
</template>

<script>
	import request from '../../../utils/request.js';
	import { getSpaceDetail } from '@/config/api';
	export default {
		data() {
			return {
				data_info: {
					"desc": "",
					"imgs": [],
					"likes": 0,
					"is_show": 0,
					"create_time": "",
					"publish_time": ""
				}
			};
		},
		onLoad(options) {
			this.getDetail(options.sn)
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			async getDetail(sn) {
				try{
					const user_id = uni.getStorageSync('uid')
					const res = await request(getSpaceDetail, { user_id, sn }, {}, 'get')
					console.log(res, '----')
					this.data_info = res.result.data_info
				}catch(e){
					
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss">
.space-detail {
	width: 100vw;
	min-height: 100vh;
	padding: 0 40upx;
	background-color: #F6f6f6;
	overflow: auto;
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
	.space-time {
		padding-top: 40upx;
	}
	.space-detail-info {
		padding: 40upx 0;
	}
	.space-list {
		display: flex;
		flex-direction: column;
		.space-image {
			width: 670upx;
			border-radius: 20upx;
			background-color: #f0f5f7;
			background-position: center center;
			background-size: auto 100%;
			background-repeat: no-repeat;
			margin-bottom: 40upx;
		}
	}
}
</style>
