<template>
	<view class="index">
		<view class="title-wrapper">
			<text class="title">首页</text>
		</view>
		<view class="banner-wrapper">
			<swiper class="banner-ads">
				<swiper-item class="banner-ads-item" v-for="ad in ad_list" :key="ad.id">
					<image class="banner" :src="ad.img"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="match-title-wrapper">
			<text class="title">匹配动态</text>
		</view>
		<view class="match-list">
			<view v-if="match_group.length === 0" class="empty-tips">
				<text>还没有匹配动态哦~</text>
			</view>
			<view class="match-item" v-for="mg in match_group" :key="mg.id">
				<view class="match-image-wrapper">
					<image class="match-first" :src="member.head"></image>
					<image class="match-second" :src="person.head"></image>
				</view>
				<view class="match-name">
					<text class="match-name-text">{{member.nickname}} -- {{person.nickname}}</text>
				</view>
			</view>
		</view>
		<view class="test-title-wrapper">
			<text class="test-title">题库更新</text>
			<view class="more-wrapper" @click="toMore">
				<text class="more-text">更多</text>
				<image class="more-image" src="../../static/images/ico07@2x.png"></image>
			</view>
		</view>
		<view class="test-wrapper">
			<view class="page-list-item" v-for="test in question_list" :key="test.id" @click="toDoQuestion(test.id)">
				<text class="page-list-item-title">{{test.title}}</text>
				<text class="page-list-item-test">共{{test.question_num}}题目</text>
				<text class="page-list-item-join">参与{{test.numbers}}w</text>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../utils/request.js';
	import MatchNotice from '../../components/matchNotice.vue'
	import {
		index
	} from '@/config/api';
	export default {
		components: {
			MatchNotice
		},
		data() {
			return {
				title: 'Hello',
				ad_list: [],
				match_group: [],
				question_list: []
			}
		},
		onLoad() {
			this.getIndexData()
			this.eventBus.$on('matched', () => {
				// this.setData
			})
		},
		methods: {
			async getIndexData() {
				try {
					const res = await request(index, {}, {})
					const result = res.result
					this.ad_list = result.ad_list
					this.match_group = result.match_group
					this.question_list = result.question_list
				} catch (e) {
					//TODO handle the exception
				}
			},
			toMore() {
				uni.navigateTo({
					url: '../testdb/testdb/testdb'
				})
			},
			toDoQuestion(id) {
				uni.navigateTo({
					url: '../testdb/doQuestion/doQuestion?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.index {
		padding: 0 40upx 60upx;
		overflow: auto;
		background-color: #F6f6f6;
		min-height: 100vh;

		.title-wrapper {
			margin-top: 109upx;
			height: 65upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;

			.title {
				font-size: 46upx;
				font-family: PingFang SC;
				font-weight: bold;
				line-height: 52upx;
				color: #282828;
			}
		}

		.banner-wrapper {
			margin-top: 30upx;

			.banner-ads {
				width: 100%;
				height: 350upx;

				.banner-ads-item {
					width: 670upx;
					height: 350upx;

					.banner {
						width: 670upx;
						height: 350upx;
						border-radius: 24upx;
					}
				}
			}
		}

		.match-title-wrapper {
			margin-top: 60upx;
			height: 65upx;

			.title {
				font-size: 46upx;
				font-family: PingFang SC;
				font-weight: bold;
				line-height: 52upx;
				color: #282828;
			}
		}

		.match-list {
			margin-top: 40upx;
			display: flex;
			flex-direction: row;

			.empty-tips {
				width: 100%;
				height: 242upx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				color: #CCCCCC;
				font-size: 34upx;
			}

			.match-item {
				width: 320upx;
				height: 242upx;
				margin-left: 30upx;

				&:first-child {
					margin-left: 0;
				}

				.match-image-wrapper {
					position: relative;
					width: 320upx;
					height: 180upx;

					.match-first {
						position: absolute;
						top: 0;
						left: 0;
						z-index: 1;
						width: 180upx;
						height: 180upx;
						border-radius: 90upx;
						box-sizing: border-box;
						border: 4upx solid #FFF;
					}

					.match-second {
						position: absolute;
						top: 0;
						left: 140upx;
						z-index: 0;
						width: 180upx;
						height: 180upx;
						border-radius: 90upx;
						box-sizing: border-box;
						border: 4upx solid #FFF;
					}
				}
			}

			.match-name {
				margin-top: 20upx;
				text-align: center;

				.match-name-text {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 40upx;
					color: #000000;
				}
			}
		}

		.test-title-wrapper {
			margin-top: 60upx;
			height: 65upx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			.test-title {
				font-size: 46upx;
				font-family: PingFang SC;
				font-weight: bold;
				line-height: 52upx;
				color: #282828;
			}

			.more-wrapper {
				display: flex;
				flex-direction: row;
				align-items: center;

				.more-text {
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 50upx;
					color: #666666;
				}

				.more-image {
					width: 30upx;
					height: 30upx;
				}
			}
		}

		.test-wrapper {
			margin-top: 33upx;
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
