<template>
	<view class="index">
		<view class="title-wrapper">
			<text class="title">{{app_index_title1}}</text>
		</view>
		<view class="banner-wrapper">
			<swiper class="banner-ads">
				<swiper-item
					class="banner-ads-item"
					v-for="ad in ad_list" :key="ad.id"
					>
					<image
						class="banner"
						:src="ad.img"
						@click="toArticle(ad)"
						>
					</image>
				</swiper-item>
			</swiper>
		</view> 
		<view class="match-title-wrapper">
			<text class="title">{{app_index_title2}}</text>
		</view>
		<view class="match-list">
			<view v-if="match_group.length === 0" class="empty-tips">
				<text>还没有匹配动态哦~</text>
			</view>
			<view class="match-item" v-for="mg in match_group" :key="mg.id">
				<view class="match-image-wrapper">
					<image class="match-first" :src="mg.member.head"></image>
					<image class="match-second" :src="mg.person.head"></image>
				</view>
				<view class="match-name">
					<text class="match-name-text">{{mg.member.nickname}}</text>
					<text class="match-name-text">{{mg.person.nickname}}</text>
				</view>
			</view>
		</view>
		<view class="test-title-wrapper" style="padding: 0 40upx">
			<text class="test-title">{{app_index_title3}}</text>
			<view class="more-wrapper" @click="toMore">
				<text class="more-text">更多</text>
				<image class="more-image" src="../../static/images/ico07@2x.png"></image>
			</view>
		</view>
		<view class="test-wrapper">
			<view
				class="page-list-item"
				v-for="test in question_list"
				:key="test.id"
				@click="toDoQuestion(test.id)"
				:style="{ backgroundColor:`#${test.rgba}` }"
				>
				<text class="page-list-item-title">{{test.title}}</text>
				<view class="page-list-item-join">
					<view class="page-list-item-join-mask"></view>
					<text>{{test.numbers}}人在线</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import request from '../../utils/request.js';
	import MatchNotice from '../../components/matchNotice.vue'
	import {
		index,
		getTitle
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
				question_list: [],
				app_index_title1: "",
				app_index_title2: "",
				app_index_title3: "",
			}
		},
		onLoad() {
			this.getTitle()
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
			},
			async getTitle() {
				const res = await request(getTitle, {})
				this.app_index_title1 = res.result.data_list.app_index_title1
				this.app_index_title2 = res.result.data_list.app_index_title2
				this.app_index_title3 = res.result.data_list.app_index_title3
			},
			toArticle(ad) {
				uni.navigateTo({
					url: '/pages/article/article?aid=' + ad.aid
				})
			}
		}
	}
</script>

<style lang="scss">
	::-webkit-scrollbar {
		display: none;
		/* Chrome Safari */
	}

	.index {
		padding: 0 0 60upx 0;
		overflow: auto;
		background-color: #F6f6f6;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		.title-wrapper {
			margin-top: 109upx;
			height: 65upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
			padding: 0 40upx;
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
			padding: 0 40upx;

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
			padding: 0 40upx;

			.title {
				font-size: 46upx;
				font-family: PingFang SC;
				font-weight: bold;
				line-height: 52upx;
				color: #282828;
			}
		}

		.match-list {
			width: 750upx;
			margin-top: 40upx;
			display: flex;
			flex-direction: row;
			overflow-x: scroll;
			box-sizing: border-box;
			padding: 0 40upx;
			scrollbar-width: none;
			scrollbar-width: none;
			/* firefox */
			-ms-overflow-style: none;

			/* IE 10+ */
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
				display: flex;
				flex-direction: row;
				align-items: center;
				.match-name-text {
					width: 160upx;
					margin: 0 18upx;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 40upx;
					color: #000000;
					display: inline-block;
					text-align: center;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
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
			padding: 0 40upx !important;
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
			display: flex;
			flex-direction: column;
			padding: 0 40upx;
			margin-top: 33upx;
			justify-content: center;
			align-items: center;
			.page-list-item {
				width: 670upx;
				height: 220upx;
				box-shadow: 0px 2px 18px rgba(0, 0, 0, 0.08);
				opacity: 1;
				border-radius: 30upx;
				margin-bottom: 30upx;
				box-sizing: border-box;
				padding: 41upx 50upx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;
				.page-list-item-title {
					font-size: 36upx;
					font-family: PingFang SC;
					font-weight: 800;
					line-height: 42upx;
					color: #ffffff;
				}
				.page-list-item-join {
					position: relative;
					font-size: 22upx;
					font-family: PingFang SC;
					line-height: 19upx;
					margin-top: 25upx;
					margin-right: auto;
					color: #ffffff;
					padding: 15upx 25upx;
					border-radius: 100upx;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					overflow: hidden;
					.page-list-item-join-mask {
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						opacity: 0.5;
						background-color: #fff;
					}
				}
			}
		}
	}
</style>
