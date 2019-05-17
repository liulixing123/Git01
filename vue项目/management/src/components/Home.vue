<template>
	<div class="home" :style="windowHeight">
		<div class="top">后台首页</div>
		<div class="home-conten" :style="windowHeight">
			<div class="width">
				<div v-show="imgOne">
					<div class="home-link clearfix" :class="{'home-outright':homeOutRight}">
						<!--客服专用留言板-->
						<div class="home-link-left left" v-if="homeLeft">
							<router-link :to="{path:'/messageboard'}"><i><img src="../../static/img/home_01.png" alt="" /></i><span>留言板</span></router-link>
						</div>
						<!--其它留言板-->
						<div class="home-link-left left" v-if="homeLeftOne">
							<router-link :to="{path:'/messageboardtwo'}"><i><img src="../../static/img/home_01.png" alt="" /></i><span>留言板</span></router-link>
						</div>
						
						
						<div class="home-link-left icon-width left" :class="{'left-two':leftTwo}" v-if="homeLeftTwo">
							<router-link :to="{path:'/adddata'}"><i><img src="../../static/img/home_07.png" alt="" /></i><span>录入</span></router-link>
						</div>
						
						<!--其它分配表链接-->
						<div class="home-link-left home-link-right right" v-if="homeRight">
							<router-link :to="{path:'/distributionpageqt'}"><i><img src="../../static/img/home_02.png" alt="" /></i><span>分配表</span></router-link>
						</div>
						<!--客服分配表链接-->
						<div class="home-link-left home-link-right right" v-if="homeRightKf">
							<router-link :to="{path:'/distributionpage'}"><i><img src="../../static/img/home_02.png" alt="" /></i><span>分配表</span></router-link>
						</div>
					</div>
					<!--链接导航页面-->
					
					<div class="prompt">
						<ul>
							<li>{{name}},欢迎回来！</li>
							<li>今天是：{{dater}}</li>
							<li v-show="level==3">未处理事项：您有 {{nuber}} 条未处理事项！</li>
						</ul>
					</div>
					<!--处理事件-->
				</div>
			</div>
			
			
			<div class="about" v-show="!imgOne">
				<infornation></infornation>
			</div>
			<!--关于账号页面-->
		</div>
		
		
		<div class="home-footer">
			<ul>
				<li @click="flipone()">
					<div class="one" v-show="imgOne"><img src="../../static/img/home_03.png" alt="" /></div>
					<div class="one" v-show="!imgOne"><img src="../../static/img/home_05.png" alt="" /></div>
				</li>
				<li @click="fliptwo()">
					<div class="two" v-show="imgOne"><img src="../../static/img/home_04.png" alt="" /></div>
					<div class="two" v-show="!imgOne"><img src="../../static/img/home_06.png" alt="" /></div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	
	import MyInfornation from './common/MyInfornation';
	import axios from 'axios';
	import storage from '../model/storage.js';
	export default {
		data(){
			return {
				toke:'',
				windowHeight:{
					height:2,
				},
				name:'',
				dater:'',
				nuber:5,
				imgOne:true,
				//左边接口
				homeLeft:true,
				homeLeftOne:false,
				homeLeftTwo:false,
				leftTwo:false,
				//右边接口
				homeRight:true,
				homeOutRight:false,
				homeRightKf:false,
				level:3,
				getlevel:1,
				//留言状态
				status:1,
			}
		},
		methods:{
			//获取客服未分配的条数
			subDataNuber() {
				let vm = this;
				let toke = storage.get('toke');
				vm.getlevel = storage.get('level');
				let user = 'http://118.31.21.214:9001/api/mgr/message-board/keFuList';
				axios.get(user, {
						params: {
							'mgrLevel':vm.getlevel,
							'status':vm.status,
							'isEnable':1,
						},
						headers: {
							'token': toke
						}
					})
					.then((res) => {
						if(res.data.success) {
							//数据总数量
							vm.nuber = res.data.data.total;
							
						}

					})
					.catch((err) => {
						console.log(err);
					})
			},
			getDate(){
				let myDate = new Date();
				let myYear = myDate.getFullYear();
				let myMonth = myDate.getMonth()+1;
				if(myMonth < 10){
					myMonth = '0' + myMonth;
				}
				let myDay = myDate.getDate();
				if(myDay < 10){
					myDay = '0' + myDay;
				}
				
				let dat = myYear + '/' + myMonth + '/' + myDay;
				
				return dat
			},
			flipone(){
				this.imgOne = true;
			},
			fliptwo(){
				this.imgOne = false;
			},
			
			//获取当前权限
			subData() {
				let vm = this;
				let toke = storage.get('toke');
				let user = 'http://118.31.21.214:9001/api/mgr/promoter';
				axios.get(user, {
						headers: {
							'token': toke
						},
					})
					.then((res) => {
						
						if(res.data.success){
							this.level = res.data.data.level;
							let level = res.data.data.level;
							storage.set('level',level)
							vm.name = res.data.data.name 
							if(level == 0){
								vm.homeLeft = false;
								vm.homeLeftOne =true;
								vm.homeLeftTwo = false;
								vm.homeRight = true;
								vm.homeRightKf = false;
							}else if(level == 1){
								vm.homeLeft = false;
								vm.homeLeftOne =true;
								vm.homeLeftTwo = true;
								vm.homeRight = false;
								vm.leftTwo = true;
								vm.homeRightKf = false;
							}else if(level == 2){
								vm.homeLeft = false;
								vm.homeLeftOne =true;
								vm.homeLeftTwo = true;
								vm.homeRight = false;
								vm.leftTwo = true;
								homeRightKf = false;
							}else if(level == 3){
								vm.homeLeft = true;
								vm.homeLeftOne =false;
								vm.homeLeftTwo = false;
								vm.homeRight = false;
								vm.homeRightKf = true;
							}else if(level == 4){
								vm.homeLeft = false;
								vm.homeLeftOne =false;
								vm.homeLeftTwo = false;
								vm.homeRight = true;
								vm.homeOutRight = true;
								vm.homeRightKf = false;
							}
						}
					})
					.catch(err => {

						console.log(err);
					
					})
			},
		},
		mounted(){
			let vm = this;
			this.toke = storage.get('toke');
			this.dater = this.getDate();
			
			//调用获取权限方法
			this.subData()
			//获取客服未分配的条数
			this.subDataNuber();
		},
		created(){
			this.windowHeight.height = document.documentElement.clientHeight + 'px';
		},
		components: {
			
			infornation: MyInfornation
		}
	}
</script>

<style scoped="scoped">
	.top{
		height: 0.96rem;
		width: 100%;
		text-align: center;
		line-height: 0.96rem;
		font-size: 0.36rem;
		color: #333;
		padding-top: 0.5rem;
	}
	.home{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.home-title{
		width: 100%;
		height: 1.28rem;
	}
	.home-conten{
		width: 100%;
		height: 100%;
		padding-top: 0.2rem;
		background: #ededed;
		box-sizing: border-box;
	}
	.width{
		padding: 0 0.5rem;
	}
	.home-footer{
		width: 100%;
		position: fixed;
		bottom: 0;
		height: 1.1rem;
		background: #fff;
	}
	.home-link{
		padding-top: 0.3rem;
	}
	.home-link-left{
		position: relative;
		width: 3rem;
		height: 1.85rem;
		background: #02cae2;
		border-radius: 0.18rem;
	}
	.home-outright{
		display: flex;
	}
	.home-link-right{
		background: #7f77eb;
	}
	.home-outright>.home-link-right{
		margin: auto;
	}
	.home-link-left a{
		display: block;
		color: #fff;
	}
	.home-link-left i{
		display: block;
		width: 0.72rem;
		height: 0.65rem;
		position: absolute;
		left: 0.4rem;
		top: 50%;
		margin-top: -0.34rem;
	}
	.icon-width{
		background: #6666ff;
	}
	.icon-width i{
		width: 0.7rem;
		height: 0.77rem;
		margin-top: -0.385rem;
		left: 0.5rem;
	}
	.home-link-right i{
		width: 0.66rem;
		height: 0.71rem;
		margin-top: -0.35rem;
	}
	.home-link-left i img{
		width: 100%;
		height: auto;
	}
	.home-link-left span{
		display: block;
		padding-left: 0.8rem;
		font-size: 0.4rem;
		text-align: center;
		line-height: 1.85rem;
	}
	.left-two{
		float: right;
	}
	.prompt{
		width: 100%;
		border-radius: 0.18rem;
		background: #fff;
		color: #333;
		font-size: 0.3rem;
		margin-top: 0.5rem;
	}
	.prompt ul{
		padding: 0 0.4rem;
	}
	.prompt li{
		height: 0.9rem;
		line-height: 0.9rem;
		border-bottom: 1px solid #ededed;
	}
	.prompt li:last-child{
		border-bottom: none;
	}
	
	.home-footer li{
		width: 50%;
		height: 1.1rem;
		display: flex;
		float: left;
	}
	.home-footer li img{
		display: block;
		width: 100%;
		height: auto;
	}
	.home-footer li .one{
		margin: auto;
		width: 0.53rem;
		height: 0.53rem;
	}
	.home-footer li .two{
		margin: auto;
		width: 0.49rem;
		height: 0.55rem;
	}
	
	.about{
		width: 100%;
	}
	
</style>