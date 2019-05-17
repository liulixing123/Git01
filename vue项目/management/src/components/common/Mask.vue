<template>
	<div>
		<transition name="late">
			<div class="layer" v-show="show">
				<div class="flex" @click="empty()">
					<div class="pos" @click.stop>
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
				</div>
			</div>
		</transition>
	</div>
	<!--修改密码的弹出层-->
</template>

<script>
	import storage from '../../model/storage.js';
	import axios from 'axios'
	export default {
		data() {
			return {

				show: this.proData.show,//点击分配弹出层
				mbId: this.proData.id,//留言id
				agentId: '', //合作公司
				level: '', //紧急情况
				remark: '', //留言
				selectData:[],//选择合作公司数据
			}
		},
		methods: {

			//点击其它地方时隐藏修改层，并将输入框中的密码清空
			empty() {
				this.show = false;

			},
			
			//获取合作公司数据
			getId() {
				let vm = this;
				const user = 'http://118.31.21.214:9001/api/mgr/promoter/list';
				let toke = storage.get('toke');
				axios.get(user, {
						params:{
							level:3
						},
						headers: {
							'token': toke
						}
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
				const user = 'http://118.31.21.214:9001/api/mgr/message-allocation/save';
				let toke = storage.get('toke');
				axios.post(user,{
					mbId:this.mbId,
					agentId:this.agentId,
					level:this.level,
					remark:this.remark,	
				},
				{
					headers:{'token':toke}
				}
				)
				.then((res)=>{
					if(res.data.success){
						
						vm.show = false;
						//弹出成功提示
			        	this.$toast({
				          message: '数据分配成功',
				          iconClass: 'mintui mintui-success',
				          duration:500
				        });
						vm.$router.push({path:'empty'});
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
			addMask(data){
				this.show = data.show;
				this.mbId = data.id;
				
			}
		},
		mounted() {
			this.mbId = this.$route.query.id;
			
			//获取合作公司id
			this.getId();
		},
		props:{
			'proData':Object,
		}
	}
</script>

<style scoped="scoped">
	.layer {
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 100;
		background: rgba(0, 0, 0, 0.3);
		top: 0;
		left: 0;
	}
	
	.flex {
		width: 100%;
		height: 100%;
		position: relative;
	}
	.pos{
		width: 100%;
		position: absolute;
		bottom: 0;
		padding-top: 0.3rem;
		background: #fff;
	}
	.bution-two{
		background: #fff;
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
	.width {
		padding: 0 0.3rem;
	}
	.late-enter-active,.late-leave-active{
		transition: all 0.5s;
	}
	.late-enter,.late-leave-to{
		opacity: 0;
	}
</style>