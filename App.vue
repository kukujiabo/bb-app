<script>
	import request from 'utils/request.js'
	import { getMatch } from '@/config/api'
	export default {
		onLaunch: function() {
			const user_id = uni.getStorageSync('uid')
			if (user_id) {
				setInterval(async () => {
					const res = await request(getMatch, { user_id }, {}, 'get')
					console.log(this.eventBus)
					if (res.result.match_id > 0) {
						this.eventBus.$emit('matched', res.result)
					}
				}, 5000)
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
