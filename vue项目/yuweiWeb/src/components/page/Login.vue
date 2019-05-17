<template>
	<div class="login" :style="{height:width+'px'}">
		<div class="login-conten">
			<div class="logo">
				<img src="../../assets/images/logo.png" alt="" />
			</div>
			
			<div class="form-title">
				<h2>用户登录</h2>
				<h5>USER LOGIN</h5>
			</div>
			
			<div class="form">
				<form>
					<div class="admin">
						<input type="text" placeholder="用户名" v-model.trim="admin.adminData" @blur="adminBlur" />
						<div class="icon-img">
							<img src="../../assets/images/admin_01.jpg" alt="" />
						</div>
					</div>
					<div class="data-title">{{admin.adminPrompt}}</div>
					<div class="password">
						<input type="password" v-model.trim="pass.passData" @keyup.enter='setData()' placeholder="密码" @blur="passBlur" />
						<div class="icon-img">
							<img src="../../assets/images/admin_02.jpg" alt="" />
						</div>
					</div>
					<div class="data-title">{{pass.passwordPrompt}}</div>
				</form>
				<div class="btn">
					<button @click="setData()">登录</button>
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	
	export default {
		name: 'Lgoin',
		data(){
			return {
				width: window.innerHeight,
				//账号数据
				admin:{
					adminData: '',
					adminPrompt: '',
				},
				//密码数据
				pass:{
					passData: '',
					passwordPrompt: '',
				},
				
			}
		},
		created(){
			
		},
		watch:{
			'admin.adminData':{
				handler(newData){
					if(newData){
						this.admin.adminPrompt = ''
					}else{
						this.admin.adminPrompt = '请输入账号!'
					}
				},
				deep: true,
			},
			'pass.passData':{
				handler(newVal){
					if(newVal){
						this.pass.passwordPrompt = ''
					}else{
						this.pass.passwordPrompt = '请输入密码!'
					}
				},
				deep: true,
				
			}
		},
		methods:{
			adminBlur(){
				if(this.admin.adminData){
					this.admin.adminPrompt = ''
				}else{
					this.admin.adminPrompt = '请输入账号!'
				}
			},
			passBlur(){
				if(this.pass.passData){
					this.pass.passwordPrompt = ''
				}else{
					this.pass.passwordPrompt = '请输入密码!'
				}
			},
			
			setData(){
				let _this = this;
				if(!_this.admin.adminData){
					this.admin.adminPrompt = '请输入账号!'
				}else if(!_this.pass.passData){
					this.pass.passwordPrompt = '请输入密码!'
				}else{
					let user = '/api/yw/login';
					this.$axios.post(user,{
						username: _this.admin.adminData,
						password: _this.pass.passData
					})
					.then((res)=>{
						
						if(res.data.success){
							_this.$router.push({
								path: 'home'
							})
							_this.$storage.set('token',res.data.data.token);
							_this.$storage.set('name',res.data.data.name);
							_this.$storage.set('level',res.data.data.level);
							
							let name = _this.$storage.getKey('name')
							_this.$Notice.success({
			                    title: name + ' 欢迎您登录娱未后台系统',
			                    duration: 1,
			                });
							
						}else{
							_this.$Message.error({duration:1, content:res.data.msg});
						}
						
					})
					.catch((err)=>{
						_this.$Notice.warning({
		                   title: '网络错误，请刷新重试！'
		                });
					})
				}
				
			},
		}
	}
</script>

<style scoped>
	
	.login{
		width: 100%;
		overflow: hidden;
		background: url(../../assets/images/login.jpg) center center no-repeat;
	}
	.login-conten{
		width: 473px;
		margin-left: 59%;
		margin-top: 70px;
	}
	.logo{
		width: 473px;
		height: 162px;
		margin-left: -10px;
	}
	.logo img{
		width: 100%;
		height: auto;
	}
	
	.form-title{
		margin-top: 80px;
		margin-bottom: 36px;
		font-family: "微软雅黑";
	}
	.form-title h2{
		font-size: 24px;
		font-weight: normal;
		line-height: 30px;
		color: #4452d5;
	}
	.form-title h5{
		font-size: 14px;
		font-weight: normal;
		line-height: 20px;
		color: #a7a7a7;
		letter-spacing: 1.2px;
	
	}
	
	
	.form input{
		width: 350px;
		height: 52px;
		border: 1px solid #dfdfdf;
		padding: 0 20px 0 62px;
		font-size: 16px;
		color: #5d5d5d;
		font-family: "微软雅黑";
		
	}
	.admin,.password{
		width: 100%;
		height: 52px;
		position: relative;
		
	}
	.data-title{
		width: 350px;
		padding-left: 5px;
		font-size: 16px;
		height: 20px;
		line-height: 20px;
		margin-bottom: 18px;
		color: #f00f00;
	}
	.icon-img{
		width: 55px;
		height: 50px;
		position: absolute;
		left: 1px;
		top: 1px;
	}
	.btn button{
		outline: none;
		display: block;
		width: 350px;
		height: 56px;
		background: #4452d5;
		color: #fff;
		font-size: 24px;
		cursor: pointer;
		border: none;
		border: 1px solid #dfdfdf;
	}
	
	input::-webkit-input-placeholder{
            color:#5d5d5d;
            font-size: 16px;
    }
    input::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color:#5d5d5d;
            font-size: 16px;
    }
    input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
            color:#5d5d5d;
            font-size: 16px;
    }
    input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
            color:#5d5d5d;
            font-size: 16px;
    }
	
</style>