<template>
	<div class="information">
		<div class="information-icon">
			<div class="width clearfix">
				<div class="icon-l left">
					
				</div>
				<div class="icon-r left">
					{{name}}
				</div>
			</div>
		</div>
		<!--第一部分结束-->
		
		<div class="version">
			<div class="width clearfix">
				<p class="left">关于叁剑客</p>
				<p class="right p">版本1.0</p>
			</div>
		</div>
		<!--第二部分结束-->
		
		<div class="password" @click="show = !show">
			修改密码
		</div>
		<!--修改密码结束-->
		
		<div class="exit" @click="removeToke()">
			退出登录
		</div>
		<!--退出登录结束-->
		
		<transition name="late">
			<div class="layer" v-show="show">
				<div class="flex" @click="empty()">
					<div class="layer-text" @click.stop>
						<div class="width">
							<ul class="layer-ul">
								<li>
									<div class="layer-l">
										<p>账户ID：</p>
										<h3>{{name}}</h3>
									</div>
								</li>
								<li>
									<div class="layer-l">
										<p>旧密码：</p>
										<input type="text" v-model.trim="OnePass" placeholder="请输入旧密码" />
									</div>
								</li>
								<li>
									<div class="layer-l">
										<p>新密码：</p>
										<input type="password" v-model.trim="TwoPass" placeholder="请输入新密码" />
									</div>
								</li>
								<li>
									<div class="layer-l">
										<p>确认密码：</p>
										<input type="password" v-model.trim="ThreePass" placeholder="请再次输入新密码" />
									</div>
								</li>
							</ul>
							<!--密码输入框-->
							
							<div class="layer-ts">
								<p>
									密码必须至少6个字符，建议同时包含数字字母。如忘记原密码请联系管理员
								</p>
							</div>
							<!--密码输入提示-->
							
							
							<div class="btn clearfix">
								<div class="btn-l left" @click="empty()">取消</div>
								<div class="btn-r right" @click="changePass()">确认</div>
							</div>
							
						</div>
					</div>
				</div>
			</div>
			<!--修改密码的弹出层-->
		</transition>
		
	</div>
</template>

<script>
	import storage from '../../model/storage.js';
	import axios from 'axios'
	export default{
		data(){
			return {
				name:'',
				show:false,
				OnePass:'',
				TwoPass:'',
				ThreePass:'',
			}
		},
		methods:{
			//点击修改密码，弹出修改层
			toggle(){
				this.show = true;
				
			},
			//点击其它地方时隐藏修改层，并将输入框中的密码清空
			empty(){
				this.show = false;
				this.OnePass = '';
				this.TwoPass = '';
				this.ThreePass = '';
			},
			removeToke(){
				let vm = this;
		        this.$messagebox.confirm('确定执行此操作?', '提示').then(action=>{
		        	storage.remove('toke');
		        	this.$toast({
			          message: '退出登录成功',
			          iconClass: 'mintui mintui-success',
			          duration:500
			        });
			        vm.$router.push({path:'login'});
		        })
		        .catch(()=>{
		        	this.$toast({
			          message: '取消成功',
			          iconClass: 'mintui mintui-success',
			          duration:500
			        });
		        });
			},
			changePass(){
				if(!this.OnePass){
					alert("请输入旧密码")
				}else if(!this.TwoPass){
					alert("请输入新密码")
				}else if(!this.ThreePass){
					alert("请再次输入新密码")
				}else if(this.TwoPass != this.ThreePass){
					alert("两次密码输入不一致")
				}else if(this.TwoPass.length < 6 || this.ThreePass.length < 6){
					alert("您输入的新密码要多于或等于六位数")
				}else{
					let vm = this;
					let user = 'http://118.31.21.214:9001/api/mgr/user/edit-pass';
					let toke = storage.get('toke');
					axios.post(user,{
						oldPassword: vm.OnePass,
						newPassword: vm.TwoPass,
					},
					{
						headers:{'token':toke}
					}
					)
					.then((res)=>{
						if(res.data.success){
							alert("您的密码修改已经成功！");
							vm.empty();
						}else{
							alert(res.data.code)
						}
						
					})
					.catch((err)=>{
						console.log(err)
					})
				}
			},
		},
		mounted(){
			let vm = this;
			vm.name = storage.get('name');
			//获取登录人名字
			
		}
	}
</script>

<style scoped="scoped">
	.information-icon{
		padding: 0.3rem 0;
		background: #fff;
	}
	.width{
		padding: 0 0.3rem;
	}
	.icon-l{
		width: 1.2rem;
		height: 1.2rem;
		background: url(../../../static/img/home_08.png) no-repeat;
		background-size: 100%;
	}
	.icon-r{
		height: 1.2rem;
		font-size: 0.36rem;
		color: #333;
		line-height: 1.2rem;
		padding-left: 0.26rem;
	}
	.version{
		margin-top: 0.4rem;
		background: #fff;
		font-size: 0.34rem;
		color: #333333;
		height: 0.9rem;
		line-height: 0.9rem;
	}
	.version .p{
		color: #666666;
	}
	.password{
		margin-top: 0.4rem;
	}
	.exit{
		margin-top: 0.2rem;
	}
	.password,.exit{
		background: #fff;
		font-size: 0.34rem;
		color: #333;
		height: 0.9rem;
		line-height: 0.9rem;
		text-align: center;
	}
	.layer{
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 100;
		background: rgba(0,0,0,0.3);
		top: 0;
		left: 0;
	}
	.flex{
		width: 100%;
		height: 100%;
		position: relative;
	}
	.layer-text{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #fff;
	}
	.layer-ul{
		padding-top: 0.2rem;
	}
	.layer-ul li{
		width: 100%;
		height: 0.8rem;
		line-height: 0.8rem;
		font-size: 0.34rem;
		color: #000;
	}
	.layer-ul li p{
		float: left;
		width: 40%;
	}
	.layer-ul li:first-child p{
		color: #666;
	}
	.layer-ul li h3{
		color: #666;
		float: left;
		width: 60%;
	}
	.layer-ul li input{
		float: left;
		width: 60%;
		color: #666;
		height: 0.8rem;
		font-size: 0.34rem;
		border: none;
		outline: none;
	}
	.layer-ul li input::-webkit-input-placeholder{
		font-size: 0.34rem;
		color: #666;
	}
	.layer-ul li input:-moz-placeholder{
		font-size: 0.34rem;
		color: #666;
	}
	.layer-ul li input::-moz-placeholder{
		font-size: 0.34rem;
		color: #666;
	}
	.layer-ul li input:-ms-input-placeholder{
		font-size: 0.34rem;
		color: #666;
	}
	
	.layer-ts{
		padding: 0.1rem 0 0.3rem;
		font-size: 0.28rem;
		color: #999;
		line-height: 0.38rem;
	}
	
	
	.btn-l,.btn-r{
		width: 50%;
		height: 0.8rem;
		line-height: 0.8rem;
		font-size: 0.34rem;
	}
	.btn .btn-l{
		color: #666666;
		padding-bottom: 0.2rem;
	}
	.btn .btn-r{
		color: #080ba2;
		text-align: right;
		padding-bottom: 0.2rem;
	}
	.late-enter-active,.late-leave-active{
		transition: all 0.5s;
	}
	.late-enter,.late-leave-to{
		opacity: 0;
	}
</style>