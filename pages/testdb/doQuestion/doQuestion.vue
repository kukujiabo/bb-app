<template>
	<view class="match">
		<view class="title-wrapper">
			<image class="title-left" src="../../../static/images/arrow-left.png" @click="back()"></image>
			<text class="exam-title">知识题库</text>
		</view>
		<view class="match-title-wrapper">
			<rich-text :nodes="currentQuestion.title" space="nbsp"></rich-text>
		</view>
		<view class="question-image-wrapper">
			<image class="question-image" :src="currentQuestion.cover_img"></image>
		</view>
		<view
			class="match-condition hobby"
			:key="q.id"
			:class="{ active: index === q.id }"
			v-for="q in currentQuestion.answer_list"
			@click="switchType(q.id)"
			>
			<text>{{q.title}}</text>
		</view>
		<view class="next-wrapper">
			<image class="next-image" src="../../../static/images/ico01@2x.png" @click="next"></image>
		</view>
		<view class="qnum">
			<text class="ac">{{(currentIndex + 1)}}</text>
			<text class="ma">/{{maxQuestionNum}}</text>
		</view>
	</view>
</template>

<script>
	import request from '../../../utils/request.js';
	import { questionList, submitText } from '@/config/api.json';
	export default {
		data() {
			return {
				cid: 0,
				index: 0,
				type: '',
				question: '',
				currentIndex: 0,
				maxQuestionNum: 0,
				data_list: [],
				currentQuestion: {
					"id": 0,
					"cid": 0,
					"title": "",
					"cover_img": "",
					"answer_list": [{
						"id": 0,
						"title": "",
						"name": ""
					}]
				},
				answers: []
			}
		},
		onLoad(options) {
			this.cid = options.id
			this.getQuestionList()
		},
		methods: {
			switchType(id) {
				this.index = id
			},
			async getQuestionList() {
				const user_id = uni.getStorageSync('uid')
				const cid = this.cid
				const res = await request(questionList, { user_id, cid }, {})
				this.data_list = res.result.data_list
				this.maxQuestionNum = this.data_list.length
				this.currentQuestion = this.data_list[0]
				this.currentIndex = 0
			},
			back() {
				uni.navigateBack({
					
				})
			},
			async next() {
				if (this.index === 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择答案!'
					})
					return
				} else {
					this.answers.push({ id: this.currentQuestion.id, aid: this.index })
					this.index = 0
				}
				if (this.currentIndex < this.maxQuestionNum - 1) {
					this.currentIndex++;
					this.currentQuestion = this.data_list[this.currentIndex]
				} else {
					const answerResults = this.answers.map(answer => `${answer.id}:${answer.aid}`)
					const sn = answerResults.join(',')
					uni.showLoading({
						title: '测试完成...',
						mask: true
					}) 
					const user_id = uni.getStorageSync('uid')
					const result = await request(submitText, { sn, user_id, cid: this.cid }, {})
					uni.hideLoading()
					setTimeout(() => {
						uni.redirectTo({ url: '/pages/match/doMAtch/doMAtch' })
					}, 500)
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
	.match-title-wrapper {
		margin-top: 150upx;
		.match-title-text {
			font-size: 46upx;
			font-family: PingFang SC;
			font-weight: bold;
			line-height: 52upx;
			color: #282828;
			opacity: 1;
		}
	}
	.question-image-wrapper {
		margin-top: 60upx;
		width: 600upx;
		height: 219upx;
		background: rgba(0, 0, 0, 0);
		opacity: 1;
		border-radius: 24upx;
		.question-image {
			width: 600upx;
			height: 219upx;
			opacity: 1;
			border-radius: 24upx;
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
	.qnum {
		width: 100%;
		text-align: center;
		padding: 100upx 0;
		.ac {
			font-size: 40upx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 34upx;
			color: #46868B;
		}
		.ma {
			font-size: 34upx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 34upx;
			color: #999999;
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
		margin-top: 50upx;
	}
	.degree {
		margin-top: 70upx;
	}
}
</style>
