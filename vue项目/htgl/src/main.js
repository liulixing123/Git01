// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import storage from './model/storage.js';




//mint-ui插件引入
import MintUI from 'mint-ui'

Vue.use(MintUI)
//mint-ui引入

Vue.config.productionTip = false


//拦截器配置



axios.defaults.baseURL = 'http://47.97.126.157:9001';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//请求拦截
const interceptorsRequest = axios.interceptors.request.use(config=>{
	let toke = storage.get('toke');
	if(toke != null){
		config.headers['token'] = toke
	}
	
	return config;
},error=>{
	console.log(error)
	return Promise.reject(error);
})
//响应拦截

const interceptorsResponse = axios.interceptors.response.use(response=> {
    // 对响应数据做点什么
    
    return response;
  }, error=> {
    // 对响应错误做点什么
    alert('登录超时，请重新登录！')
    router.replace({
    	
	path: 'login', 

//	query: {redirect: router.currentRoute.fullPath}  
	
	//登录成功后跳入浏览的当前页面
	
	})
    return Promise.reject(error);
  });

//暴露拦截器出去
export {interceptorsRequest,interceptorsResponse}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
