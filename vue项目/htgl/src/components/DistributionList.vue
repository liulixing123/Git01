<template>
	<div class="butionlist">
		<top>
			<h1 slot="title">多条分配</h1>
		</top>

		<div class="bution-title">
			<div class="width">
				<h2>基本信息展示</h2>
			</div>
		</div>
		<!--上面结束-->
		
		<div class="bution-two">
			<div class="width">
				<ul class="bution-ul">
					<li>
						<div class="prompt-left left">
							<p><span>*</span>合作公司</p>
						</div>
						<div class="prompt-right left">
							<select v-model="agentId">
								<option value="" disabled selected style='display:none;'>点击选择合作公司</option>
								<option :value="val.id" v-for="(val,index) in selectData" :key="index">{{val.name}}</option>
							</select>
						</div>
					</li>
					<li>
						<div class="prompt-left left">
							<p><span>*</span>紧急程度</p>
						</div>
						<div class="prompt-right left">
							<select v-model="level">
								<option value="" disabled selected style='display:none;'>点击选择紧急程度</option>
								<option value="0">平急</option>
								<option value="1">加急</option>
								<option value="2">特急</option>
							</select>
						</div>
					</li>
					<li class="last-li">
						<div class="prompt-left left">
							<p>备注</p>
						</div>
						<div class="prompt-right left">
							<textarea class="area" v-model="remark" placeholder="如果需要备注请输入">
								
							</textarea>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<!--第二部分选择数据-->
		
		
		<div class="submit">
			<div class="sub-width clearfix">
				<div class="sub-l left">
					<button @click="setSub()">提交</button>
				</div>
				<div class="sub-r right">
					<button @click="reset()">重置</button>
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
		data(){
			return {
				list:[],
				agentId: '', //合作公司
				level: '', //紧急情况
				remark: '', //留言
				selectData:[],//选择合作公司数据
			}
		},
		methods:{
			//获取合作公司数据
			getId() {
				let vm = this;
				const user = '/api/mgr/promoter/list';
				let toke = storage.get('toke');
				axios.get(user, {
						params:{
							level:3
						},
						
					})
					.then((res) => {
						vm.selectData = res.data.data.list;
						
					})
					.catch((err) => {
						console.log(err);
					})
			},
			//数据传输
			setData(){
				let vm = this;
				const user = '/api/mgr/message-allocation/batch-save';
				let toke = storage.get('toke');
				axios.post(user,{
					list:this.list,
					agentId:this.agentId,
					level:this.level,
					remark:this.remark,	
				},
				
				)
				.then((res)=>{
					if(res.data.success){
						alert("提交成功！")
						vm.$router.go(-1)
					}else{
						alert(res.data.code)
					}
					
				})
				.catch((err)=>{
					console.log(err);
				})
			},
			//提交保存数据
			setSub(){
				if (this.agentId=="" || this.level=="") {
					alert("合作公司与紧急程度必选")
				} else{
					this.setData();
					
				}
			},
			//重置
			reset(){
				this.agentId = "";
				this.level = "";
				this.remark = "";
			},
		},
		mounted(){
			this.list = this.$route.query.nameList;
			console.log(this.list)
			//获取合作公司id
			this.getId();
		},
		components: {
			top: Top
		},
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
	select,option{
		outline: none;
		text-align: center;
		font-size: 0.34rem;
		background: none;
		
	}
	.prompt-right select{
		width: 100%;
		height: 0.88rem;
		border: none;
		color: #999;
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