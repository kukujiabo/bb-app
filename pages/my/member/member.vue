<template>
	<view class="member">
		<view class="title-wrapper">
			<view class="title-left-wrapper">
				<image class="title-left" src="../../../static/images/arrow-left.png" @click="back()"></image>
				<text class="exam-title">开通会员</text>
			</view>
		</view>
		<view class="member-logo">
			<image class="member-logo-image" src="../../../static/images/logo.png"></image>
		</view>
		<view class="bb-member">
			<text class="bb-member-text">BB会员</text>
		</view>
		<view class="carousel" v-if="cardList.length > 0">
			<curry-swiper :width="200" :height="280" :space="150" :inverseScaling="500" :perspective="14" :border="3" :count="10"
			 ref="swiper"> 
				<curry-slide v-for="(slide, i) in cardList" :index="i" :key="i">
					<template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
						<view class="icon-cards__item" :class="{ active: i === currentIndex }" @tap="tapCard(i)">
							<view class="title">
								<text>{{cardNames[i]}}</text>
							</view>
							<view class="price">
								<text class="pt">¥</text>
								<text class="pp">{{slide.title1}}</text>
							</view>
							<view class="old-price">
								<text>¥ {{slide.price}}</text>
							</view>
							<view class="tips">
								<text>次数： {{slide.times}}</text>
							</view>
							<view class="tips">
								<text>{{slide.title2}}</text>
							</view>
							<view class="tips">
								<text>{{slide.title3}}</text>
							</view>
						</view>
					</template>
				</curry-slide>
			</curry-swiper>
			<!--
			<view class="icon-cards">
				<view class="icon-cards__content">
					<view class="icon-cards__item" @tap="tapCard(0)">
						<view class="title">
							<text>月卡会员</text>
						</view>
						<view class="price">
							<text class="pt">¥</text>
							<text class="pp">{{cardList[0].title1}}</text>
							<text class="pd">/月</text>
						</view>
						<view class="old-price">
							<text>¥ {{cardList[0].price}}/月</text>
						</view>
						<view class="tips">
							<text>次数： {{cardList[0].times}}</text>
						</view>
						<view class="tips">
							<text>{{cardList[0].title2}}</text>
						</view>
						<view class="tips">
							<text>{{cardList[0].title3}}</text>
						</view>
					</view>
					<view class="icon-cards__item" @tap="tapCard(1)">
						<view class="title">
							<text>季卡会员</text>
						</view>
						<view class="price">
							<text class="pt">¥</text>
							<text class="pp">{{cardList[1].title1}}</text>
						</view>
						<view class="old-price">
							<text>¥ {{cardList[1].price}}/月</text>
						</view>
						<view class="tips">
							<text>次数： {{cardList[1].times}}</text>
						</view>
						<view class="tips">
							<text>{{cardList[1].title2}}</text>
						</view>
						<view class="tips">
							<text>{{cardList[1].title3}}</text>
						</view>
					</view>
					<view class="icon-cards__item" @tap="tapCard(2)">
						<view class="title">
							<text>年卡会员</text>
						</view>
						<view class="price">
							<text class="pt">¥</text>
							<text class="pp">{{cardList[2].title1}}</text>
							<text class="pd">/月</text>
						</view>
						<view class="old-price">
							<text>¥ {{cardList[2].price}}/月</text>
						</view>
						<view class="tips">
							<text>次数： {{cardList[2].times}}</text>
						</view>
						<view class="tips">
							<text>{{cardList[2].title2}}</text>
						</view>
						<view class="tips">
							<text>{{cardList[2].title3}}</text>
						</view>
					</view>
				</view>
			</view>
			-->
		</view>
		<view class="pay">
			<view class="apply-date" @click="requestPayment">
				<text class="apply-date-text">确认支付： ¥{{price}}.00</text>
			</view>
		</view>
	</view>
</template>

<script>
	import CurrySwiper from '../../../components/curry-swiper/curry-swiper.vue'
	import CurrySlide from '../../../components/curry-swiper/curry-slide.vue'
	import request from '../../../utils/request.js'
	import {
		getPayData,
		vipList,
		pay
	} from '@/config/api'
	export default {
		components: {
			CurrySwiper,
			CurrySlide
		},
		data() {
			return {
				price: 0,
				currentIndex: 0,
				cardList: [],
				sceneList: [{
						img: 'https://2fz1.me/img/phaser.jpg'
					},
					{
						img: 'https://2fz1.me/img/css3.png'
					},
					{
						img: 'https://2fz1.me/img/nodemodules.jpg'
					},
					{
						img: 'https://2fz1.me/img/js.jpg'
					}
				],
				cardNames: ['月卡会员', '季卡会员', '年卡会员']
			};
		},
		onLoad() {
			this.getVipList()
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			async getVipList() {
				const res = await request(vipList, {}, {}, 'get')
				this.cardList = res.result
				this.price = cardList[0].title1
			},
			async requestPayment() {
				uni.showLoading({
					mask: true
				})
				const user_id = uni.getStorageSync('uid')
				const res = await request(pay, {
					user_id,
					type: 0
				})
				const order_id = res.result.order_id
				const payResult = await request(getPayData, {
					user_id,
					order_id
				})
				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: payResult.result.info,
					success: function(res) {
						console.log('success:' + JSON.stringify(res));
						uni.hideLoading();
					},
					fail: function(err) {
						uni.hideLoading();
						console.log('fail:' + JSON.stringify(err));
					}
				});
			},
			tapCard(index) {
				this.currentIndex = index
				this.price = this.cardList[index].title1
			}
		}
	}
</script>

<style lang="scss">
	.member {
		width: 100vw;
		min-height: 100vh;
		overflow: auto;
		background-color: #F6F6F6;
		box-sizing: border-box;
		padding: 0 40upx;
		.carousel {
			position: relative;
			width: 100vw;
			padding: 60upx 0;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			transform: translateX(-15px);
			.icon-cards__content {
				position: absolute;
				width: 100%;
				height: 100%;
				// -webkit-transform-style: preserve-3d;
				// transform-style: preserve-3d;
				// -webkit-transform: translateZ(-182px) rotateY(0);
				// transform: translateZ(-182px) rotateY(0);
			}

			.icon-cards__animation {
				-webkit-animation: carousel 10s infinite cubic-bezier(1, 0.015, 0.295, 1.225) forwards;
				animation: carousel 20s infinite cubic-bezier(1, 0.015, 0.295, 1.225) forwards;
			}

			.icon-cards__item {
				position: absolute;
				width: 100%;
				height: 100%;
				border-radius: 6px;
				background-color: #afafaf;
				.title {
					margin-top: 20upx;
					height: 84upx;
					font-size: 60upx;
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 165upx;
					color: #FFFFFF;
					opacity: 1;
					text-align: center;
				}

				.price {
					color: #FFEEDC;
					margin-top: 60upx;
					font-weight: bold;
					text-align: center;

					.pt {
						font-size: 28upx;
					}

					.pp {
						font-size: 71upx;
					}

					.pd {
						font-size: 39upx
					}
				}
				
				

				.old-price {
					color: #FFEEDC;
					font-weight: bold;
					text-align: center;
					font-size: 38upx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 76upx;
					color: #FFFFFF;
					opacity: 0.4;
					text-decoration: line-through;
				}

				.tips {
					margin-top: 15upx;
					text-align: center;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 30upx;
					color: #FFFFFF;
					opacity: 1;
				}
			}
			.icon-cards__item.active {
				background-color:#46868B ;
			}
		}

		.title-wrapper {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: 107upx;
			justify-content: space-between;

			.lock {
				width: 48upx;
				height: 48upx;
			}

			.title-left-wrapper {
				display: flex;
				flex-direction: row;
				align-items: center;

				.title-left {
					width: 40upx;
					height: 40upx;
				}

				.exam-title {
					marign-top: 104upx;
					margin-left: 13upx;
					font-size: 40upx;
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 52upx;
					color: #282828;
				}
			}
		}

		.member-logo {
			display: flex;
			margin-top: 104upx;
			flex-direction: row;
			align-items: center;
			justify-content: center;

			.member-logo-image {
				width: 125upx;
				height: 115upx;
			}
		}

		.bb-member {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			margin-top: 29upx;

			.bb-member-text {
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 48upx;
				color: #282828;
				opacity: 1;
			}
		}

		.pay {
			.apply-date {
				margin: 168upx auto 60upx;
				width: 530upx;
				height: 98upx;
				background: #46868B;
				opacity: 1;
				border-radius: 60upx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				padding: 0;

				.apply-date-text {
					height: 50upx;
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

	// @-webkit-keyframes carousel {

	// 	0%,
	// 	17.5% {
	// 		-webkit-transform: translateZ(-182px) rotateY(0);
	// 		transform: translateZ(-182px) rotateY(0);
	// 	}

	// 	27.5%,
	// 	45% {
	// 		-webkit-transform: translateZ(-182px) rotateY(-120deg);
	// 		transform: translateZ(-182px) rotateY(-120deg);
	// 	}

	// 	55%,
	// 	72.5% {
	// 		-webkit-transform: translateZ(-182px) rotateY(-240deg);
	// 		transform: translateZ(-182px) rotateY(-240deg);
	// 	}

	// 	82.5%,
	// 	100% {
	// 		-webkit-transform: translateZ(-182px) rotateY(-360deg);
	// 		transform: translateZ(-182px) rotateY(-360deg);
	// 	}
	// }

	@keyframes carousel {

		0%,
		17.5% {
			-webkit-transform: translateZ(-182px) rotateY(0);
			transform: translateZ(-182px) rotateY(0);
		}

		27.5%,
		45% {
			-webkit-transform: translateZ(-182px) rotateY(-120deg);
			transform: translateZ(-182px) rotateY(-120deg);
		}

		55%,
		72.5% {
			-webkit-transform: translateZ(-182px) rotateY(-240deg);
			transform: translateZ(-182px) rotateY(-240deg);
		}

		82.5%,
		100% {
			-webkit-transform: translateZ(-182px) rotateY(-360deg);
			transform: translateZ(-182px) rotateY(-360deg);
		}
	}
</style>
