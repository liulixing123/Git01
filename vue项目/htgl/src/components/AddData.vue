<template>
	<div class="bution">
		<top>
			<h1 slot="title">数据添加</h1>
		</top>

		<div class="bution-title">
			<div class="width">
				<h2>基本信息展示</h2>
			</div>
		</div>
		<!--上面结束-->

		<div class="bution-one">
			<div class="width">
				<ul class="bution-ul">
					<li>
						<div class="prompt-left left">
							<p><span>*</span>客户姓名</p>
						</div>
						<div class="prompt-right left">
							<input v-model.trim="name" type="text" placeholder="请输入客户姓名" />
						</div>
					</li>
					<li>
						<div class="prompt-left left">
							<p><span>*</span>客户电话</p>
						</div>
						<div class="prompt-right left">
							<input v-model.trim="phone" type="number" placeholder="请输入客户电话" />
						</div>
					</li>
					<li>
						<div class="prompt-left left">
							<p><span>*</span>意向品牌</p>
						</div>
						<div class="prompt-right left">
							<select v-model="brandId">
								<option value="" disabled selected style='display:none;'>点击选择品牌</option>
								<option :value="val.id" v-for="(val,index) in brandList" :key="index">{{val.name}}</option>
							</select>
						</div>
					</li>
					<li>
						<div class="prompt-left left">
							<p><span>*</span>渠道</p>
						</div>
						<div class="prompt-right left">
							<select v-model="channelId">
								<option value="" disabled selected style='display:none;'>点击选择渠道</option>
								<option :value="val.id" v-for="(val,index) in channelList" :key="index">{{val.name}}</option>
							</select>
						</div>
					</li>
					
					<li class="last-li">
						<div class="prompt-left left">
							<p>推广员备注</p>
						</div>
						<div class="prompt-right left">
							<textarea v-model.trim="message" class="area" placeholder="如果需要备注请输入">
								
							</textarea>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<!--上半部分数据展示结束-->
		
		<div class="submit">
			<div class="sub-width clearfix">
				<div class="sub-l left">
					<button @click="addData()">添加</button>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import Top from './common/Top'
	import axios from 'axios'
	import storage from '../model/storage.js'
	export default {
		data() {
			return {
				brandList:[],
				brandId:"",
				channelList:[],
				channelId:"",
				name:"",
				phone:"",
				message:"",
			}
		},
		methods: {
			//品牌接口查询
			getBrand() {
				let vm = this;
				let toke = storage.get('toke');
				
				let user = '/api/mgr/brand/list';
				axios.get(user, {
						params: {
							pageSize:7,
							currentPage:1,
						},
						
					})
					.then((res) => {
						
						
						if(res.data.success) {
							
							//数据穿递到data中
							vm.brandList = res.data.data.list;
							
						}

					})
					.catch((err) => {
						vm.$router.push({path:'login'});
						console.log(err);
					})
			},
			//渠道接口查询
			getChannel() {
				let vm = this;
				let toke = storage.get('toke');
				
				let user = '/api/mgr/channel/list';
				axios.get(user, {
						params: {
							'isEnable':1,
						},
						
					})
					.then((res) => {
						if(res.data.success) {
							//数据穿递到data中
							vm.channelList = res.data.data.list;
							
						}

					})
					.catch((err) => {
						console.log(err);
						vm.$router.push({path:'login'});
					})
			},
			//添加数据的接口
			setData(){
				let vm = this;
				let toke = storage.get('toke');
				
				let user = '/api/mgr/message-board/promoter-save';
				axios.post(user, {
							'name':vm.name,
							'phone':vm.phone,
							'brandId':vm.brandId,
							'parentId':vm.channelId,
							'remark':vm.message,
						},
						{
							headers: {
								'token': toke
							}
						},
					)
					.then((res) => {
						
						if(res.data.success) {
							alert("恭喜已成功添加数据！");
							vm.$router.go(-1);
						}else{
							alert(res.data.message);
						}

					})
					.catch((err) => {
						console.log(err);
						vm.$router.push({path:'login'});
					})
			},
			//添加数据
			addData(){
				if(this.name=="" || this.phone=="" || this.brandId=="" || this.channel==""){
					alert("左边带 * 的都是必填选项！")
				}else{
					this.setData();
				}
			},
		},
		mounted() {
			//品牌接口查询调用
			this.getBrand();
			//渠道接口查询调用
			this.getChannel();
		},
		components: {
			top: Top
		}
	}
</script>

<style scoped="scoped">
	.bution-top {
		width: 100%;
		height: 1.46rem;
	}
	
	.width {
		padding: 0 0.3rem;
	}
	
	.bution-title {
		width: 100%;
		height: 0.66rem;
		background: #ededed;
		line-height: 0.66rem;
		color: #999999;
		font-size: 0.28rem;
	}
	
	.bution-ul li {
		width: 100%;
		height: 0.88rem;
		line-height: 0.88rem;
		border-bottom: 1px solid #f1f1f1;
	}
	
	.bution-ul .nonebg {
		border-bottom: none;
	}
	
	.prompt-left {
		width: 40%;
	}
	
	.prompt-left p {
		font-size: 0.34rem;
		padding-left: 0.3rem;
		color: #000;
		position: relative;
	}
	
	.prompt-left p span {
		display: block;
		position: absolute;
		color: #f60c0c;
		left: 0;
		top: 0;
		line-height: 1rem;
	}
	
	.prompt-right {
		width: 60%;
	}
	select{
		background: none;
	}
	select,option{
		outline: none;
		text-align: center;
		font-size: 0.34rem;
		
		
	}
	.prompt-right select{
		width: 100%;
		height: 0.88rem;
		border: none;
		color: #666;
		text-align: left;
	}
	.prompt-right select option{
		width: 100%;
		color: #666;
		text-align:center;
	}
	.prompt-right p {
		font-size: 0.34rem;
		color: #666666;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.prompt-right input{
		width: 97.5%;
		padding-left: 2.5%;
		color: #666;
		height: 0.87rem;
		border: none;
		outline: none;
		font-size: 0.34rem;
	}
	
	.bg {
		width: 100%;
		height: 0.2rem;
		background: #ededed;
	}
	
	.bution-ul .last-li{
		border: none;
		height: 1.8rem;
		padding-bottom: 0.2rem;
	}
	.last-li .area{
		padding-top: 0.2rem;
		width: 97.5%;
		padding-left: 2.5%;
		height: 1.55rem;
		outline: none;
		border: none;
		font-size: 0.34rem;
		line-height: 0.5rem;
		color: #666;
		resize: none;
	}
	
	
	.submit{
		width: 100%;
		padding: 0.6rem 0;
		background: #ededed;
	}
	.sub-width{
		padding: 0 0.4rem;
	}
	.sub-width button{
		outline: none;
		border: none;
		background: none;
		font-size: 0.36rem;
		display: block;
		width: 3rem;
		height: 0.88rem;
		border-radius: 0.15rem;
	}
	.sub-l{
		width: 100%;
	}
	.sub-l button{
		color: #fff;
		background: #09bb07;
		border: 1px solid #029400;
		margin: 0 auto;
	}
	
</style>