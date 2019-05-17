<template>
	<div class="login">
		<div class="logo">
			<router-link :to="{path:'/login'}">
				<img src="../../static/img/logo_01.png" alt="logo" />
				<img src="../../static/img/logo_02.png" alt="logo" />
			</router-link>
		</div>
		<div class="form">
			<div :class="{itpborder:iptOne,itpbordercolor: colorOne }">
				<label>{{labelUser}}</label>
				<input type="text" v-model.trim="username" :placeholder="placeOne" @focus="takeOne()" @blur="loseOne()" @change="loginTrue()" />
			</div>
			<div :class="{itpborder:iptTwo, itpbordercolor: colorTwo }">
				<label>{{labelPass}}</label>
				<input type="password" v-model.trim="pass" :placeholder="placeTwo" @focus="takeTwo()" @blur="loseTwo()" @change="loginTrue()" />
			</div>

			<button class="my-btn" @click="subData()" :class="{'my-btn-bg':!myBtn}" :disabled="myBtn">登录</button>

		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import storage from '../model/storage.js'
	import { interceptorsRequest, interceptorsResponse} from '../main.js'
	
	export default {
		data() {
			return {
				//账号
				username: '',
				//密码
				pass: '',
				//上部提示框
				labelUser: '',
				labelPass: '',
				//按钮可否点击
				myBtn: true,
				//提示名称
				placeOne: '用户名',
				placeTwo: '密码',
				//两个底部边框跑判断
				iptOne: false,
				iptTwo: false,
				colorOne: false,
				colorTwo: false,

			}
		},
		created(){
//			axios.interceptors.request.eject(interceptorsRequest);
//			axios.interceptors.request.eject(interceptorsResponse);
		},
		methods: {
			takeOne() {

				this.placeOne = '';
				this.labelUser = '用户名';
				this.iptOne = true;
				if(this.colorOne) {
					this.colorOne = false;
				}
			},
			loseOne() {
				if(this.username == "") {
					this.colorOne = true;
					this.myBtn = true;
				}

			},
			takeTwo() {

				this.placeTwo = '';
				this.labelPass = '密码';
				this.iptTwo = true;
				if(this.colorTwo) {
					this.colorTwo = false;
				}
			},
			loseTwo() {

				if(this.pass == "") {
					this.colorTwo = true;
					this.myBtn = true;
				}
			},
			loginTrue() {
				if(this.username != '' && this.pass != '') {
					this.myBtn = false;
				}
			},
			subData() {
				let vm = this;
				const user = '/api/mgr/user/login';
				axios.post(user, {
						username: this.username,
						password: this.pass
					})
					.then(function(response) {
//						console.log(response)
						if(response.data.success){
							
							vm.$router.push({path:'/home'});
							let toke = response.data.data;
							storage.set('toke',toke)
							storage.set('name',vm.username) 
						}else{
							alert(response.data.code)
						}
					})
					.catch(function(error) {
						console.log(err);
					});
			},
		},
		watch:{
			username(newName,oldName){
				this.loginTrue()
			},
			pass(newName,oldName){
				this.loginTrue()
			},
		}
	}
</script>

<style scoped="scoped">
	.logo {
		display: flex;
		width: 100%;
		padding: 2.1rem 0 0.5rem;
	}
	
	.logo a {
		display: block;
		width: 100%;
	}
	
	.logo img {
		display: block;
	}
	
	.logo img:first-child {
		width: 1.56rem;
		height: 1.56rem;
		margin: auto;
		margin-bottom: 0.2rem;
	}
	
	.logo img:last-child {
		width: 5.01rem;
		height: 1.44rem;
		margin: auto;
	}
	
	.form {
		width: 5rem;
		margin: 0 auto;
	}
	
	.form label {
		height: 0.5rem;
		line-height: 0.5rem;
		font-size: 0.3rem;
	}
	
	.form label,
	.form input {
		display: block;
		box-sizing: border-box;
		width: 100%;
	}
	
	.form input {
		height: 0.6rem;
		outline: none;
		border: none;
		border-bottom: 1px solid #ededed;
		font-size: 0.35rem;
		color: #000000;
		margin-bottom: 0.3rem;
		border-radius: 0;
	}
	
	input::-webkit-input-placeholder {
		color: #999999;
		font-size: 0.35rem;
	}
	
	.form .itpborder>input {
		border-bottom-color: #080ba2;
	}
	
	.form .itpborder>label {
		color: #080ba2;
	}
	
	.form .itpbordercolor>input {
		border-bottom-color: #f00;
	}
	
	.form .itpbordercolor>label {
		color: #f00;
	}
	
	.my-btn {
		width: 100%;
		margin-top: 0.7rem;
		height: 0.88rem;
		color: #fff;
		border: none;
		background: #ededed;
		font-size: 0.36rem;
		border-radius: 0.08rem;
		outline: none;
	}
	
	.my-btn-bg {
		background: #080ba2;
	}
</style>