<template>
	<view class="register">
		<view class="title-wrapper">
			<image class="title-left" src="../../../static/images/arrow-left.png" @click="back()"></image>
			<text class="exam-title">昵称</text>
		</view>
		<view class="form-group">
			<view class="form-group-item">
				<view class="form-group-item-input">
					<text class="input-title">昵称</text>
					<input class="input-content" :maxlength="40" placeholder="请输入" placeholder-style="color:#DDDDDD" v-model="nickname" />
				</view>
				<view class="form-submit">
					<view class="submit-btn" @click="toPhone()">
						<text class="submit-btn-text">下一步</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname: ''
			};
		},
		methods: {
			toPhone() {
				if (!this.nickname || this.nickname.length < 4) {
					uni.showToast({
						icon: 'none',
						title: '昵称长度在4-40之间',
						position: 'top'
					})
				} else {
					uni.navigateTo({
						url: './phone?nickname=' + this.nickname
					})
				}
			},
			back() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.register {
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

		.form-group {
			margin-top: 190upx;
			padding: 0 70upx;

			.form-group-item-input {
				height: 90upx;
				border-bottom: 1px solid #DDDDDD;
				display: flex;
				flex-direction: row;
				align-items: center;

				.input-title {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 50upx;
					color: #000000;
				}

				.input-content {
					flex: 1;
					margin-left: 20upx;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 50px;
					opacity: 1;
				}
			}
			.form-submit {
				margin-top: 263upx;
				display: flex;
				flex-direction: row;
				justify-content: center;
				.submit-btn {
					width: 530upx;
					height: 98upx;
					background: #46868B;
					opacity: 1;
					border-radius: 60upx;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					.submit-btn-text {
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
	}
</style>
