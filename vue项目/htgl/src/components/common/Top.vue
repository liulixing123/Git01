<template>
	<div class="top">
		<div class="top-width">
			<div class="top-title clearfix">
				<div class="top-l left" @click="goBack()">
					<div class="left"><img src="../../../static/img/brand_03.png" alt="返回" /></div>

				</div>
				<div class="top-c left">
					<slot name="title">
						<p>留言分配</p>
					</slot>
				</div>
				<div class="top-r left"></div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goBack() {
				this.$router.go(-1)
			},
			

		},
		
	}
</script>

<style scoped="scoped">
	.top {
		height: 0.96rem;
		width: 100%;
		padding-top: 0.5rem;
	}
	
	.top-width {
		padding: 0 0.3rem;
	}
	
	.top-l {
		width: 30%;
		height: 0.96rem;
	}
	
	.top-l img {
		display: block;
		width: auto;
		height: 0.36rem;
		margin-top: 0.31rem;
	}
	
	.top-c {
		width: 40%;
		font-size: 0.36rem;
		text-align: center;
		height: 0.96rem;
		line-height: 0.96rem;
		color: #333;
	}
	
	.top-r {
		width: 30%;
		height: 0.96rem;
	}
</style>