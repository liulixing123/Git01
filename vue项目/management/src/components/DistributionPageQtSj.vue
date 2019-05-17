<template>
	<div class="bution">
		<top>
			<h1 slot="title">分配数据详情</h1>
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
							<p>{{data.mbName}}</p>
						</div>
					</li>
					<li>
						<div class="prompt-left left">
							<p><span>*</span>客户电话</p>
						</div>
						<div class="prompt-right left">
							<p>{{data.mbPhone}}</p>
						</div>
					</li>
					<li>
						<div class="prompt-left left">
							<p>合作公司</p>
						</div>
						<div class="prompt-right left">
							<p>{{data.agentName}}</p>
						</div>
					</li>
					<li>
						<div class="prompt-left left">
							<p>推广人姓名</p>
						</div>
						<div class="prompt-right left">
							<p>{{data.severName}}</p>
						</div>
					</li>
					<li>
						<div class="prompt-left left">
							<p>品牌编号</p>
						</div>
						<div class="prompt-right left">
							<p>{{data.brand}}</p>
						</div>
					</li>
					<li>
						<div class="prompt-left left">
							<p>渠道来源</p>
						</div>
						<div class="prompt-right left">
							<p>{{data.channel}}</p>
						</div>
					</li>
					<li>
						<div class="prompt-left left">
							<p>客户留言</p>
						</div>
						<div class="prompt-right left">
							<p>{{data.customers}}</p>
						</div>
					</li>
					<li>
						<div class="prompt-left left">
							<p>加盟地址</p>
						</div>
						<div class="prompt-right left">
							<p>{{data.mbAddress}}</p>
						</div>
					</li>
					<li class="nonebg">
						<div class="prompt-left left">
							<p>推广员备注</p>
						</div>
						<div class="prompt-right left">
							<p>{{data.remark}}</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<!--上半部分数据展示结束-->
		
		
		
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
			}
		},
		methods: {
		},
		mounted() {
			this.data = this.$route.query.msg;
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
	select,option{
		outline: none;
		text-align: center;
		font-size: 0.34rem;
		
		
	}
	.prompt-right select{
		width: 100%;
		height: 0.88rem;
		border: none;
		color: #999;
		text-align: left;
		background: none;
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
		background: #f7f7f7;
		
	}
	.sub-width{
		padding: 0 0.4rem;
		display: flex;
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
		margin: auto;
		color: #ee1717;
		border: 1px solid #ee1717;
	}
	.submit-text{
		width: 100%;
		text-align: center;
		font-size: 0.36rem;
		color: #ee1717;
	}
	
	
</style>