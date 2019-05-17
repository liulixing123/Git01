<template>
	<div class="message">
		<div class="fixed-top">
			<div class="message-title clearfix">
				<div class="title-left left" v-show="title" @click="all()">
					全选
				</div>
				<div class="title-left left" v-show="!title" @click="goTo()">
					<i></i>
				</div>
				
				<div class="titler left">
					<h1>其它数据展示</h1>
				</div>
				
				<div class="title-right right">
					<router-link :to="{path:'/adddata'}" class="adddata">
						<img src="../../static/img/brand_04.png" alt="" />
					</router-link>
				</div>
			</div>
			<div class="title-bg">
				<div class="title-bg-width">
					<span v-for="(val,index) in pageNuber" :class="{addbg:active[index]}" @click="addPage(index)" :key="index">{{val.num}}条</span>
				</div>
			</div>
			<!--底部数据标题-->
			<div class="fixed-title">
				<div class="fixed-title-width">
					<div class="title-one" :class="{'title-one-left':title}">日期</div>
					<div class="title-two">品牌</div>
					<div class="title-three">渠道来源</div>
				</div>
			</div>
		</div>
		<!--头部结束-->

		<div class="message-data">
			<div class="message-width">
				<ul class="data-ul">
					<li v-for="(msg,index) in messageList" :key='index'>
						
						<div class="data-btn" @click="routerLink(msg.id,msg.status)">
							<div class="onediv">{{msg.createTime.substring(5,7)}}.{{msg.createTime.substring(8,11)}}</div>
							<div class="twodiv">{{msg.brandName}}</div>
							<div class="threediv">{{msg.channelName}}</div>
							<i></i>
						</div>
					</li>
					
				</ul>

			</div>
		</div>
		<!--数据展示-->
		
		
		<div class="pager" v-show="!title">
			<div class="pager-width">
				<div class="pager-flex">
					<ul class="pager-ul clearfix">
						<li>共 {{nuber}} 条</li>
						<li :class="{'pager-li':currentPage==1}">
							<button :disabled="currentPage==1" @click="pagerFirst()">首页</button>
						</li>
						<li :class="{'pager-li':currentPage==1}">
							<button :disabled="currentPage==1" @click="pagerLess()">上一页</button>
						</li>
						<li>
							<button>第 {{currentPage}} 页</button>
						</li>
						<li :class="{'pager-li':currentPage==pagerMax}">
							<button :disabled="currentPage==pagerMax" @click="pagerMore()">下一页</button>
						</li>
						<li :class="{'pager-li':currentPage==pagerMax}">
							<button :disabled="currentPage==pagerMax" @click="pagerBig()">尾页</button>
						</li>
					</ul>
				</div>
				
			</div>
		</div>
		<!--分页器-->
		

		
		
		

	</div>
</template>

<script>
	import axios from 'axios';
	import storage from '../model/storage.js'
	export default {
		data() {
			return {
				title: false,
				//checkbox点击传参
				nameList: [],
				//底部固定选项栏显示隐藏
				can: false,
				//数据接收
				messageList: [],
				//后台接口传参的数据控制
				currentPage: 1,
				pageSize: 10,
				//分页器数据数量
				nuber:100,
				pagerMax:10,
				//留言状态
				status:1,
				//反选开关
				off: true,
				//数据分配开关
				dataOff: true,
				//获取当前登录人等级
				getlevel:1,
				
				//每页数据的数量
				pageNuber: [{
						num: 10
					},
					{
						num: 30
					},
					{
						num: 50
					},
				],
				active: [true, false, false],
			}
		},
		methods: {
			//axios数据获取
			subData(page, size) {
				let vm = this;
				let toke = storage.get('toke');
				vm.getlevel = storage.get('level');
				let user = '/api/mgr/message-board/list';
				axios.get(user, {
						params: {
							'currentPage': page,
							'pageSize': size,
							'mgrLevel':vm.getlevel,
							'isEnable':1,
							'status':vm.status,
							
						},
						
					})
					.then((res) => {
						
						
						if(res.data.success) {
							//数据总数量
							vm.nuber = res.data.data.total;
							//数据穿递到data中
							let msg = res.data.data.list;
							vm.messageList = msg;
							//最大页码
							vm.pagerMax = Math.ceil(vm.nuber/vm.pageSize);
						}

					})
					.catch((err) => {
						console.log(err);
					})
			},
			//编程式路由跳转
			routerLink(msg,status) {
				this.$router.push({
					path: 'modifydata',
					query: {
						id: msg,
						status: status,
					}
				})
			},
			
			//全部选中
			all() {
				let msg = this.messageList;
				let nameList = this.nameList;
				nameList.splice(0, nameList.length);
				for(var i = 0; i < msg.length; i++) {
					nameList.push(msg[i].id)
				}

			},
			//后退
			goTo(){
				this.$router.go(-1);
			},
			
			//每页数据的数量
			addPage(index) {
				let vm = this;
				//先清空之前选中数据
				let nameList = this.nameList;
				nameList.splice(0, nameList.length);
				
				
				for(var i = 0; i < vm.active.length; i++) {
					vm.active[i] = false;
					vm.active[index] = true;
					vm.pageSize = vm.pageNuber[index].num
				}
				
				//处理超出最大数据情况每次选择都是从第一页开始
				vm.currentPage = 1
				vm.subData(this.currentPage, this.pageSize);
			},
			
			//分页器效果
			pagerFirst(){
				this.currentPage = 1;
				this.subData(this.currentPage, this.pageSize);
			},
			pagerLess(){
				this.currentPage--;
				this.subData(this.currentPage, this.pageSize);
			},
			pagerMore(){
				this.currentPage++;
				this.subData(this.currentPage, this.pageSize);
			},
			pagerBig(){
				this.currentPage = this.pagerMax;
				this.subData(this.currentPage, this.pageSize);
			}
			
		},
		mounted() {
			this.subData(this.currentPage, this.pageSize);
			
		},

	}
</script>

<style scoped="scoped">
	.fixed-top{
		position: fixed;
		top: 0;
		width: 100%;
		background: #fff;
		z-index: 100;
	}
	.title-left {
		width: 30%;
		height: 0.5rem;
		border-radius: 0.1rem;
		font-size: 0.32rem;
		line-height: 0.5rem;
		color: #080ba2;
	}
	.title-left i{
		display: block;
		background: url(../../static/img/brand_03.png)no-repeat;
		width: 0.36rem;
		height: 0.36rem;
		background-size: 100%;
		margin-top: 0.07rem;
	}
	.titler{
		width: 40%;
		height: 0.5rem;
		line-height: 0.5rem;
		font-size: 0.36rem;
		color: #333;
		text-align: center;
	}
	.message-title {
		padding: 0.23rem 0.3rem;
		padding-top: 0.5rem;
		color: #fff;
	}
	
	.title-right {
		width: 30%;
		height: 0.5rem;
	}
	
	.title-right img {
		float: right;
		width: 0.5rem;
		height: auto;
	}
	.adddata{
		display: block;
		width: 100%;
		height: 100%;
	}
	.title-bg {
		width: 100%;
		height: 0.8rem;
		background: #ededed;
	}
	
	.title-bg-width {
		padding: 0 0.3rem;
	}
	
	.title-bg-width span {
		display: block;
		width: 1.05rem;
		height: 0.8rem;
		line-height: 0.8rem;
		font-size: 0.32rem;
		color: #999999;
		float: left;
	}
	
	.title-bg-width .addbg {
		color: #333333;
	}
	.fixed-title-width{
		padding-left: 0.3rem;
	}
	.fixed-title{
		width: 100%;
		height: 0.5rem;
		border-bottom: 1px solid #CCCCCC;
		color: #000000;
		font-size: 0.3rem;
	}
	.title-one,.title-two,.title-three{
		height: 0.5rem;
		line-height: 0.5rem;
		float: left;
		width: 30%;
	}
	.title-one{
		width: 25%;
	}
	.title-two{
		margin-right: 5%;
	}
	
	
	
	
	
	.message-data {
		padding: 0 0 0 0.3rem;
		margin-top: 2.77rem;
	}
	
	.message-width {
		width: 100%;
	}
	
	.data-ul {
		overflow: hidden;
	}
	
	.data-ul li {
		width: 100%;
		height: 0.9rem;
		line-height: 0.9rem;
		border-bottom: 1px solid #ededed;
		position: relative;
	}
	
	.ul-margin li {
		margin-left: 0.45rem;
	}
	
	.ipt {
		position: absolute;
		width: 0.45rem;
		height: 0.9rem;
		display: flex;
		left: -0.45rem;
	}
	
	.ipt input {
		display: block;
		width: 0.35rem;
		height: 0.35rem;
		margin: auto;
		outline: none;
	}
	
	.data-ul li p {
		position: relative;
		display: block;
		width: 50%;
		height: 0.9rem;
		line-height: 0.9rem;
		font-size: 0.26rem;
		float: left;
	}
	
	.data-ul li p span {
		display: block;
		padding-right: 0.45rem;
	}
	
	.data-ul li p i {
		display: block;
		position: absolute;
		width: 0.16rem;
		height: 0.25rem;
		right: 0.31rem;
		top: 50%;
		margin-top: -0.125rem;
		background: url(../../static/img/brand_02.png) no-repeat;
		background-size: 100%;
	}
	
	.data-ul li strong {
		display: block;
		float: left;
		width: 50%;
		height: 0.9rem;
		text-align: left;
		font-size: 0.34rem;
		line-height: 0.9rem;
		overflow: hidden;
	}
	
	/*改版后样式*/
	.data-btn {
		outline: none;
		display: block;
		width: 100%;
		height: 0.9rem;
		border: none;
		background: none;
		position: relative;
	}
	.onediv,.twodiv,.threediv{
		width: 30%;
		height: 0.9rem;
		overflow: hidden;
		color: #333;
		font-size: 0.34rem;
		float: left;
	}
	.onediv{
		width: 25%;
	}
	.twodiv{
		margin-right: 5%;
	}
	
	.data-btn i{
		display: block;
		width: 0.16rem;
		height: 0.25rem;
		position: absolute;
		right: 5%;
		top: 50%;
		margin-top: -0.125rem;
		background: url(../../static/img/brand_02.png)no-repeat;
		background-size: 100%;
	}
	
	
	/*改版后样式*/
	
	.btn-none {
		pointer-events: none
	}
	
	
	.pager{
		width: 100%;
		height: 1.3rem;
		border-bottom: 1px solid #efefef;
	}
	.pager-width{
		padding: 0 0.3rem;
	}
	.pager-flex{
		display: flex;
		height: 1.3rem;
	}
	.pager-ul{
		margin: auto;
	}
	.pager-ul li{
		float: left;
		font-size: 0.3rem;
		padding: 0.1rem 0.05rem;
		border: 1px solid #333 ;
		border-radius: 0.1rem;
		margin-left: 0.15rem;
	}
	.pager-ul .pager-li{
		border-color: #CCCCCC;
	}
	.pager-ul li:first-child{
		border: none;
	}
	.pager-ul li button{
		
		display: block;
		outline: none;
		border: none;
		background: none;
		
	}
	
	
	
	
	.message-footer {
		width: 100%;
		height: 0.98rem;
		border-top: 1px solid #efefef;
		position: fixed;
		bottom: 0;
		font-size: 0.34rem;
		background: #fff;
	}
	
	.footer-l,
	.footer-r {
		width: 50%;
		height: 0.98rem;
		line-height: 0.98rem;
		color: #999999;
	}
	
	.footer-r {
		color: #080ba2;
		text-align: right;
	}
</style>