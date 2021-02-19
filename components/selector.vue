<template>
	<view class="selector" :hidden="!visible">
		<view class="selector-mask" @tap="hide"></view>
		<view class="bottom-selector">
			<view class="b-s-title">
				<text class="b-s-title-text">{{title}}</text>
				<image class="b-s-close" src="../static/images/close.png"></image>
			</view>
			<view
				class="b-s-options"
				v-for="(option, idx) in options"
				:key="option.id"
				:class="{ active: confirmOption.id === option.id }"
				@tap="select(option)"
				>
				<text class="">{{option.name}}</text>
			</view>
			<view class="b-s-button" @tap="confirm">
				<text>{{confirmText}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			options: {
				type: Array,
				default: () => []
			},
			confirmText: {
				type: String,
				default: ''
			},
			currentId: {
				type: Number,
				default: ''
			}
		},
		created() {
			this.options.forEach(option => {
				if (option.id === this.currentId) {
					this.confirmOption = option
				}
			})
		},
		data() {
			return {
				visible: false,
				confirmOption: {}
			};
		},
		methods: {
			select(option, index) {
				this.index = index
				this.confirmOption = option
			},
			hide() {
				this.visible = false
			},
			show() {
				this.visible = true
			},
			confirm() {
				this.$emit('confirm', this.confirmOption)
				this.hide()
			}
		}
	}
</script>

<style lang="scss">
	.selector {
		position: fixed;
		top: 0;
		lefT: 0;
		right: 0;
		bottom: 0;
		z-index: 1000;

		.selector-mask {
			position: fixed;
			top: 0;
			lefT: 0;
			right: 0;
			bottom: 0;
			background-color: #000;
			opacity: 0.7;
			z-index: 100;
		}

		.bottom-selector {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: #fff;
			border-radius: 50upx 50upx 0 0;
			z-index: 101;
			padding: 0 70upx;

			.b-s-title {
				position: relative;
				height: 160upx;
				line-height: 160upx;
				border-radius: 50upx 50upx 0 0;
				text-align: center;
				.b-s-title-text {
					font-size: 40upx;
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 47upx;
					color: #282828;
				}
				.b-s-close {
					position: absolute;
					right: 35upx;
					top: 44upx;
					width: 40upx;
					height: 40upx;
					z-index: 102;
				}
			}
			.b-s-options {
				height: 100upx;
				line-height: 100upx;
				text-align: center;
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 54upx;
				color: #666666;
			}
			.b-s-options.active {
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 54upx;
				color: #46868B;
			}
			.b-s-button {
				text-align: center;
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 48upx;
				color: #46868B;
				height: 110upx;
				line-height: 110upx;
				border-top: 1upx solid #eee;
			}
		}
	}
</style>
