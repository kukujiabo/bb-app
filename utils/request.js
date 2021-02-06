// import md5 from 'js-md5'
import Host from '@/config/hosts'
import Promise from '@/utils/es6-promise.min.js'
const secret = 'znKTm6uKCS3EEin4lpt4LW6qXdxxQbUe'

// export function makeSign(action, uid, timestamp) {
// 	var str = `action=${action}timestamp=${timestamp}uid=${uid}${secret}`
// 	return md5(str)
// }

export default async function(service, datas, header) {
	let url = Host.url
	let h = header || {}
	h['content-type'] = h['content-type'] || 'application/x-www-form-urlencoded'
	// const [,,action] = service.split('/')
	// const uid = uni.getStorageSync("uid")
	// const timestamp = (Date.now() + '').substr(0, 10)
	// if (uid) {
	// 	datas.uid = uid
	// 	datas.timestamp = timestamp
	// 	h.sign = makeSign(action, uid, timestamp)
	// }
	let promise = new Promise((resolve, reject) => {
		uni.request({
			url: url + service,
			data: datas,
			header: h,
			method: 'POST',
			dataType: 'json',
			success(res) {
				console.log(res)
				if (res.data.code === 200) {
				  resolve(res.data)
				} else {
				  reject(res.data)
				}
			},
			fail(err) {
				console.log(err)
				reject(err)
			}
		})
	})
	return promise
}
