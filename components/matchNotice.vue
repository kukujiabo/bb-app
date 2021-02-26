<template>
	<view class="match-notice" v-if="show">
		<view class="match-mask" @touchmove.prevent="catchMove"></view>
		<view class="match-request">
			<view class="match-head">
				<image class="match-head-image" :src="avatar"></image>
			</view>
			<view class="match-name">
				<text>{{name}}</text>
			</view>
			<view class="match-text">
				<text>向你发送交往申请</text>
			</view>
			<view class="btns">
				<view class="match-btn" @click="confirm">
					<text style="color:#46868B">同意</text>
				</view>
				<view class="match-btn" style="margin-top:62upx" @click="reject">
					<text style="color:#FF0E1F">拒绝</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			name: {
				type: String,
				default: '张三'
			},
			avatar: {
				type: String,
				default: ''
			},
			matchId: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				show: false
			};
		},
		methods: {
			catchMove() {
				
			},
			confirm() {
				this.show = false
				uni.navigateTo({
					url: '/pages/match/doMAtch/doMAtch?index=1&matchId=' + this.matchId
				})
			},
			reject() {
				this.show = false
			}
		}
	}
</script>

<style lang="scss">
.match-notice {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 9999;
	.match-mask {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0.7;
		background-color: #000;
		z-index: 1;
	}
	.match-request {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 2;
		.match-head {
			margin-top: 407upx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			.match-head-image {
				width: 200upx;
				height: 200upx;
				border-radius: 100upx;
				box-sizing: border-box;
				border: 2px solid #fff;
				background-color: #f3f5f7;
			}
		}
		.match-name {
			margin-top: 20upx;
			color: #fff;
			font-size: 23px;
			display: flex;
			flex-direction: row;
			justify-content: center;
		}
		.match-text {
			margin-top: 10upx;
			color: #fff;
			font-size: 15px;
			display: flex;
			flex-direction: row;
			justify-content: center;
		}
		.btns {
			margin-top: 260upx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.match-btn {
				width: 530upx;
				height: 98upx;
				background: #FFFFFF;
				border-radius: 51upx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
			}
		}
	}
}
</style>
