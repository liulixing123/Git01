<template>
	<div>
		<div class="search clearfix">
			<div class="box">
				<span>查询开始日期：</span>
				<DatePicker class="start" @on-change="time1" size="large" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="未选择是全部查询" style="width: 200px"></DatePicker>
			</div>
			
			<div class="box">
				<span>处理情况数据查询：</span>
				<Select v-model="model1" style="width:200px" placeholder="未选择是全部查询">
					<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
			</div>

			<div class="box">
				<span>推广SEO数据查询：</span>
				<Select v-model="model2" style="width:200px" placeholder="未选择是全部查询">
					<Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
			</div>

			<div class="box">
				<span>推广人数据查询：</span>
				<Select v-model="model3" style="width:200px" placeholder="未选择是全部查询">
					<Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
			</div>

			<div class="box">
				<span>查询结束日期：</span>
				<DatePicker class="start" @on-change="time2" size="large" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="未选择是全部查询" style="width: 200px"></DatePicker>
			</div>

			<div class="box">
				<button id="sub" @click="getCavasData()">查询</button>
			</div>
			
			
			
		</div>
		
		<div class="data-on clearfix">
			
			<div class="data-l">
				<div id="myChart" style=" height: 600px;" :style="{ width: With+'px'}"></div>
				<div id="myChartTwo" style=" height: 600px;" :style="{ width: With+'px'}"></div>
				<div id="myChartThree" style=" height: 600px;" :style="{ width: With+'px'}"></div>
			</div>
			
			<div class="data-r">
				<table class="tab">
					<tr>
						<th>品牌</th>
						<th>访问次数</th>
					</tr>
					<tr v-for="(item,index) in cavasDataOne" :key='index'>
						<td :title="item.name">{{item.name}}</td>
						<td :title="item.value">{{item.value}}</td>
					</tr>
				</table>
				
				<table class="tab">
					<tr>
						<th>渠道</th>
						<th>访问次数</th>
					</tr>
					<tr v-for="(item,index) in cavasDataTwo" :key='index'>
						<td :title="item.name">{{item.name}}</td>
						<td :title="item.value">{{item.value}}</td>
					</tr>
				</table>
				
				<table class="tab">
					<tr>
						<th>推广人</th>
						<th>访问次数</th>
					</tr>
					<tr v-for="(item,index) in cavasDataThree" :key='index'>
						<td :title="item.name">{{item.name}}</td>
						<td :title="item.value">{{item.value}}</td>
					</tr>
				</table>
			</div>
			
		</div>
		
	</div>
</template>

<script>
	var echarts = require('echarts');
	export default {
		data() {
			return {
				msg: '品牌查询',
				start: '',
				endStart: '',
				With: document.body.clientWidth / 2,
				//左侧数据1
				leftDataOne: [],
				//cavas上的数据1
				cavasDataOne: [],
				//左侧数据2
				leftDataTwo: [],
				//cavas上的数据2
				cavasDataTwo: [],
				//左侧数据3
				leftDataThree: [],
				//cavas上的数据3
				cavasDataThree: [],
				//第一个下拉框的数据
				cityList: [{
						value: '',
						label: '全部展示'
					},
					{
						value: '0',
						label: '未处理'
					},
					{
						value: '1',
						label: '已录入'
					},
					{
						value: '2',
						label: '已处理'
					},
				],
				model1: '',
				//第二个下拉框的数据
				cityList2: [{
						value: '',
						label: '全部展示'
					},
					{
						value: '1',
						label: '推广'
					},
					{
						value: '2',
						label: 'SEO'
					},
				],
				model2: '',
				//第三个下拉框的数据
				cityList3: [{
						value: '',
						label: '全部展示'
					},
					{
						value: '0',
						label: '有效'
					},
					{
						value: '1',
						label: '无效'
					},
				],
				model3: '',
			}
		},
		
		methods: {
			//获取时间戳要用on-chang方法不能用v-model获取
			time1(e){
				this.start = e
			},
			time2(e){
				this.endStart = e
			},
			//三个echarts数据渲染方法开始
			setOneData() {
				let _this = this;
				let myChart = echarts.init(document.getElementById('myChart'));
				let myChartTwo = echarts.init(document.getElementById('myChartTwo'));
				let myChartThree = echarts.init(document.getElementById('myChartThree'));
				
				
				//echarts数据1
				myChart.setOption({
					title: {
						text: '品牌查询',
						x: 'left',
						top: 20,
						left: 30
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						left: 'left',
						left: 30,
						top: 80,
						data: _this.leftDataOne,
					},
					series: [{
						name: '访问来源',
						type: 'pie',
						radius: '60%',
						center: ['65%', '48%'],
						data: _this.cavasDataOne,
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				});
				
				//echarts数据2
				myChartTwo.setOption({
					title: {
						text: '渠道查询',
						x: 'left',
						top: 20,
						left: 30
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						left: 'left',
						left: 30,
						top: 80,
						data: _this.leftDataTwo,
					},
					series: [{
						name: '访问来源',
						type: 'pie',
						radius: '60%',
						center: ['65%', '50%'],
						data: _this.cavasDataTwo,
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				});
				
				//echarts数据3
				myChartThree.setOption({
					title: {
						text: '推广人查询',
						x: 'left',
						top: 20,
						left: 30
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						left: 'left',
						left: 30,
						top: 80,
						data: _this.leftDataThree,
					},
					series: [{
						name: '访问来源',
						type: 'pie',
						radius: '60%',
						center: ['65%', '47%'],
						data: _this.cavasDataThree,
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				});
				
			}, 
			//三个echarts数据渲染方法结束
			
			//获取后台数据填充到echarts以及table中
			getCavasData(){
				
				let _this = this;
				let msg = {
					startTime:_this.start,
					endTime:_this.endStart,
					status:_this.model1,
					groupAt:_this.model2,
					isEnable:_this.model3,
				}
				
				let user = 'http://test.haowaisp.cn/api/mgr/message-board/chart';
				this.Axios.get(user,{
					params:{
						startTime:_this.start,
						endTime:_this.endStart,
						status:_this.model1,
						groupAt:_this.model2,
						isEnable:_this.model3,
					}
				})
				.then((res)=>{
					let data = res.data.data;
					console.log(data)
					let brand = data.brandChartList;
					let channel = data.channelChartList;
					let promoter = data.promoterChartList;
					
					let brandLeft = [];
					let brandData = [];
					let channelLeft = [];
					let channelData = [];
					let promoterLeft = [];
					let promoterData = [];
					
					
					for (let i=0; i<brand.length; i++){
						let obj = {};
						obj.value = brand[i].num;
						obj.name = brand[i].brandName;
						brandLeft.push(brand[i].brandName);
						brandData.push(obj);
						
					}
					_this.leftDataOne = brandLeft;
					_this.cavasDataOne = brandData;
//					_this.cavasDataOne.splice(0);
//					_this.cavasDataOne.push(...brandData)
					//第一部分brand数据结束
					
					
					
					for (let i=0; i< channel.length; i++){
						let obj = {};
						obj.value = channel[i].num;
						obj.name = channel[i].channelName;
						channelLeft.push(channel[i].channelName);
						channelData.push(obj);
						
					}
					_this.leftDataTwo = channelLeft;
					_this.cavasDataTwo = channelData;
					//第二部分channel数据结束
					
					
					
					for (let i=0; i< promoter.length; i++){
						let obj = {};
						obj.value = promoter[i].num;
						obj.name = promoter[i].promoterName;
						promoterLeft.push(promoter[i].promoterName);
						promoterData.push(obj);
						
					}
					_this.leftDataThree = promoterLeft;
					_this.cavasDataThree = promoterData;
					//第三部分brand数据结束
					
					
					
					_this.setOneData();
					
				})
				.catch((err)=>{
					console.log(err)
				})
			}
			//填充数据结束
		},
		mounted() {
			//调用数据填充方法
			this.getCavasData();
			
			//监听window窗口的改变响应echarts
			window.onresize = ()=>{
				this.With = document.body.clientWidth / 2;
				
			}
		},

	}
</script>

<style scoped="scoped">
	.clearfix {
		*zoom: 1;
	}
	
	.clearfix:after {
		content: '';
		display: block;
		clear: both;
		height: 0;
		visibility: hidden;
	}
	
	.search {
		width: 1300px;
		margin: 50px auto 20px;
	}
	/*深度选择器__>>>  可以直接作用到子组件上*/
	/*.start>>>input:focus,.start>>>input:hover{
		border-color: #dcdee2;
		box-shadow:none;
	}*/
	
	.box {
		float: left;
		margin-right: 20px;
		margin-bottom: 20px;
		height: 36px;
	}
	
	.box span {
		color: #333;
	}
	
	#myChart,#myChartTwo,#myChartThree{
		border: 1px solid #dcdee2;
		border-left: none;
	}
	#myChartTwo{
		border-top: none;
		border-bottom: none;
	}
	
	#sub{
		display: block;
		width: 120px;
		height: 36px;
		border-radius: 5px;
		margin-right: 0;
		border: none;
		background: transparent;
		border: 1px solid #333;
		color: #333;
		cursor: pointer;
		outline: none;
	}
	
	#sub:hover {
		background: #00d87f;
	}
	
	
	.data-l{
		float: left;
		width: 50%;
	}
	.data-r{
		float: right;
		width: 49%;
	}
	table{
		border-collapse: collapse;
		float: left;
		width: 33%;
	}
	table,th,td{
		border: 1px solid #dcdee2;
		line-height: 50px;
	}
	
	th,td{
		text-align: center;
		font-size: 16px;
		color: #333;
	}
	.tab:first-child,.tab:first-child tr td:nth-of-type(even),.tab:first-child tr th:nth-of-type(even){
		border-right: none;
	}
	.tab:last-child,.tab:last-child tr td:nth-of-type(odd),.tab:last-child tr th:nth-of-type(odd){
		border-left: none;
	}
	
</style>