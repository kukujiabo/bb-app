<template>
	<view class="match">
		<view class="match-title-wrapper">
			<text class="match-title-text">匹配条件</text>
		</view>
		<view class="match-title-desc">
			<text class="match-title-desc-text">让交友更有灵魂</text>
		</view>
		<view class="match-condition hobby" :class="{ active: index === 1 }" @click="switchType(1)">
			<image v-if="index === 1" class="check-icon" src="../../../static/images/icorightactive.png"></image>
			<image v-if="index === 2" class="check-icon" src="../../../static/images/iconrightinactive.png"></image>
			<text>按兴趣爱好</text>
		</view>
		<view class="match-condition degree" :class="{ active: index === 2 }" @click="switchType(2)">
			<image v-if="index === 2" class="check-icon" src="../../../static/images/icorightactive.png"></image>
			<image v-if="index === 1" class="check-icon" src="../../../static/images/iconrightinactive.png"></image>
			<text>按学识匹配</text>
		</view>
		<view class="next-wrapper" >
			<image class="next-image" src="../../../static/images/ico01@2x.png" @click="toDoMatch"></image>
		</view>
	</view>
</template>

<script>
	import request from '../../../utils/request.js'
	import { addMatch } from '@/config/api'
	export default {
		data() {
			return {
				index: 1,
			}
		},
		methods: {
			switchType(index) {
				this.index = index
			},
			async toDoMatch() {
				uni.showLoading()
				const user_id = uni.getStorageSync('uid')
				const res = await request(addMatch, { user_id, type: this.index - 1 })
				uni.hideLoading()
				if (res.code === 200) {
					uni.navigateTo({
						url: '/pages/match/doMAtch/doMAtch?index=' + this.index
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '网络错误,请重试!'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.match {
	width: 100vw;
	min-height: 100vh;
	padding: 0 70upx;
	background-color: #F6f6f6;
	overflow: auto;
	box-sizing: border-box;
	.match-title-wrapper {
		height: 65upx;
		margin-top: 222upx;
		.match-title-text {
			font-size: 46upx;
			font-family: PingFang SC;
			font-weight: bold;
			line-height: 48upx;
			color: #282828;
		}
	}
	.match-title-desc {
		height: 48upx;
		margin-top: 10upx;
		.match-title-desc-text {
			font-size: 34upx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 48upx;
			color: #666666;
		}
	}
	.match-condition {
		position: relative;
		width: 610upx;
		height: 140upx;
		background: #FFFFFF;
		box-shadow: 0px 2px 18px rgba(0, 0, 0, 0.08);
		opacity: 1;
		border-radius: 24upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		
		font-size: 36upx;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 34upx;
		color: #282828;
		.check-icon {
			width: 40upx;
			height: 40upx;
			position: absolute;
			left: 105upx;
			top: 50upx;
		}
	}
	.match-condition.active {
		color: #46868B;
		border: 2upx solid #46868B;
	}
	.next-wrapper {
		margin-top: 200upx;
		display: flex;
		justify-content: center;
		.next-image {
			width: 140upx;
			height: 140upx;
		}
	}
	.hobby {
		margin-top: 100upx;
	}
	.degree {
		margin-top: 70upx;
	}
}
</style>
