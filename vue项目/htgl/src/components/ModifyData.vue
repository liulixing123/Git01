<template>
	<div class="bution">
		<top>
			<h1 slot="title">数据的修改删除</h1>
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
							<input v-model.trim="data.name" type="text" placeholder="请输入客户姓名" />
							
						</div>
					</li>
					<li>
						<div class="prompt-left left">
							<p><span>*</span>客户电话</p>
						</div>
						<div class="prompt-right left">
							<input v-model.trim="data.phone" type="number" placeholder="请输入客户电话" />
							
						</div>
					</li>
					<li>
						<div class="prompt-left left">
							<p><span>*</span>品牌编号</p>
						</div>
						<div class="prompt-right left">
							<select v-model="data.brandId">
								<option value="" disabled selected style='display:none;'>点击选择品牌</option>
								<option :value="val.id" v-for="(val,index) in brandList" :key="index">{{val.name}}</option>
							</select>
							
						</div>
					</li>
					<li>
						<div class="prompt-left left">
							<p><span>*</span>渠道编号</p>
						</div>
						<div class="prompt-right left">
							<select v-model="data.channelId">
								<option value="" disabled selected style='display:none;'>点击选择渠道</option>
								<option :value="val.id" v-for="(val,index) in channelList" :key="index">{{val.name}}</option>
							</select>
							
						</div>
					</li>
					<li>
						<div class="prompt-left left">
							<p>客户留言</p>
						</div>
						<div class="prompt-right left">
							<p>{{data.context}}</p>
						</div>
					</li>
					<li class="last-li">
						<div class="prompt-left left">
							<p>推广员备注</p>
						</div>
						<div class="prompt-right left">
							<textarea v-model.trim="data.remark" class="area" placeholder="如果需要备注请输入">
								
							</textarea>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<!--上半部分数据展示结束-->
		
		<div class="submit">
			<div class="sub-width clearfix" v-if="status==0 || status==1">
				<div class="sub-l left">
					<button @click="modifyData()">修改</button>
				</div>
				<div class="sub-r right">
					<button @click="removeData()">删除</button>
				</div>
			</div>
			<div class="sub-text" v-else>
				数据已被分配
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
				data: {},
				mbId:1,
				brandList:[],
				channelList:[],
				status:1,
			}
		},
		methods: {
			//获取当前数据id的参数
			getData(id) {
				let vm = this;
				let user = "/api/mgr/message-board/" + id;
				let toke = storage.get('toke');
				axios.get(user, {
						
					})
					.then((res) => {
						vm.data = res.data.data;
						
					})
					.catch((err) => {
						console.log(err);
					})
			},
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
						headers: {
							'token': toke
						}
					})
					.then((res) => {
						if(res.data.success) {
							//数据穿递到data中
							vm.channelList = res.data.data.list;
							
						}
						
					})
					.catch((err) => {
						console.log(err);
					})
			},
			modifyData(){
				let vm = this;
				let toke = storage.get('toke');
				let level = storage.set('level',level);
				let user = "/api/mgr/message-board/promoter-edit";
				axios.put(user,{
					'id':vm.mbId,
					'promoterId':level,
					'name':vm.data.name,
					'phone':vm.data.phone,
					'brandId':vm.data.brandId,
					'parentId':vm.data.channelId,
					'remark':vm.data.remark,
				},)
				.then((res)=>{
					if(res.data.success){
						alert("您已经成功修改了这条数据！")
						vm.$router.go(-1);
					}else{
						alert(res.data.code)
					}
				})
				.catch((err)=>{
					console.log(err);
				})
			},
			removeData(){
				let vm = this;
				let toke = storage.get('toke');
				let user = '/api/mgr/message-board/enable/' + vm.mbId;
				axios.put(user,{},
				)
				.then((res)=>{
					
					if(res.data.success){
						alert("您已经成功删除这条数据！")
						vm.$router.go(-1);
					}else{
						alert(res.data.message)
					}
					
				})
				.catch((err)=>{
					console.log(err);
				})
				
			},
		},
		mounted() {
			//获取当前ID的数据
			this.mbId = this.$route.query.id;
			this.status = this.$route.query.status;
			this.getData(this.mbId);
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
		display: block;
		margin: 0;
		padding: 0;
		width: 100%;
		height: 0.87rem;
		border: none;
		color: #999;
		text-align: left;
	}
	.prompt-right select option{
		display: block;
		margin: 0;
		padding: 0;
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
		display: block;
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
		display: block;
		padding-top: 0.16rem;
		width: 98%;
		padding-left: 2%;
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
	.sub-text{
		text-align: center;
		width: 100%;
		color: #333;
		font-size: 0.36rem;
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
	.sub-l button{
		display: block;
		color: #fff;
		background: #09bb07;
		border: 1px solid #029400;
	}
	.sub-r button{
		color: #000;
		background: #fff;
		border: 1px solid #d6d5d6;
	}
</style>