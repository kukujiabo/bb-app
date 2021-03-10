<template>
	<view class="article">
		<view class="title-wrapper">
			<image class="title-left" src="../../static/images/arrow-left.png" @click="back()"></image>
			<text class="title">配对状态</text>
		</view>
		<view class="content">
			<view class="article-title">
				<text>{{title}}</text>
			</view>
			<view class="article-time">
				<text>{{create_time}}</text>
			</view>
			<view style="margin-top:20upx">
				<rich-text :nodes="content" space="nbsp" type="text"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getArticle
	} from '@/config/api';
	import request from '../../utils/request.js'
	export default {
		data() {
			return {
				title: '',
				content: '',
				create_time: ''
			};
		},
		onLoad(options) {
			this.aid = options.aid
			this.getArticle()
		},
		methods:{
			async getArticle() {
				const res = await request(getArticle, {
					aid: this.aid
				})
				this.title = res.result.article.title
				this.content = res.result.article.content
				this.create_time = res.result.article.create_time
			}
		}
	}
</script>

<style lang="scss">
	.article {
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
			.title-left {
				width: 40upx;
				height: 40upx;
			}
			.title {
				font-size: 46upx;
				font-family: PingFang SC;
				font-weight: bold;
				line-height: 52upx;
				color: #282828;
				margin-left: 30upx;
			}
		}
		.content {
			padding: 40upx;
			.article-title {
				font-size: 20px;
				color: #000;
				line-height: 40px;
			}
			.article-time {
				font-size: 16px;
				color: #999;
				line-height: 32px;
			}
		}
	}
</style>
