<template>
	<view class="edit-phone">
		<view class="title-wrapper">
			<image class="title-left" src="../../../static/images/arrow-left.png" @click="back()"></image>
			<text class="exam-title">手机号</text>
		</view>
		<view class="content">
				<image class="iconphone-image" src="../../../static/images/changePhone.png"></image>
				<text class="iphone">{{getPhone}}</text>
		</view>
		<view class="submit">
			<view class="confirm" @tap="toPhone">
				<text class="confirm-text">更换手机号</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: ''
			};
		},
		computed: {
			getPhone() {
				return Array.from(this.phone).map((n, i) => [4,5,6,7].includes(i) ? '*' : n).join('')
			}
		},
		onShow() {
			this.phone = uni.getStorageSync('phone')
		},
		methods: {
			back() {
				uni.navigateBack({
					
				})
			},
			toPhone() {
				uni.navigateTo({
					url: '../changePhone/changePhone'
				})
			}
		}
	}
</script>

<style lang="scss">
.edit-phone {
	padding: 0 40upx;
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
		height: 600upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.iphone {
			font-size: 23px;
			color: #282828;
			font-weight: bold;
			margin-top: 30upx;
		}
		.iconphone-image {
			width: 70upx;
			height: 92upx;
		}
	}
	.submit {
		width: 670upx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		.confirm {
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
