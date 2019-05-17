// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import "babel-polyfill"

//vuex
import store from './store'
//本地存储sessionStorage
import storage from './model/storage.js';
Vue.use(iView);

//富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

//element插件
//import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';
//Vue.use(ElementUI);

Vue.prototype.$axios = Axios;
Vue.prototype.$storage = storage;

Vue.config.productionTip = false

//配置axios请求数据之前准备工作

Axios.defaults.baseURL = 'http://test.haowaisp.cn:9201';

Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//请求拦截
const interceptorsRequest = Axios.interceptors.request.use(config => {
	let toke = storage.getKey('token');
	if(toke) {
		config.headers['token'] = toke
	} else {
		router.push({
			path: '/login'
		})
	}

	return config;
}, error => {
	console.log(error)
	return Promise.reject(error);
})

//转换日期格式
import format from './model/format'
Date.prototype.format = format

let imgSRC = 'http://file.kxdz2.com/';
Vue.prototype.imgSRC = imgSRC;


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})