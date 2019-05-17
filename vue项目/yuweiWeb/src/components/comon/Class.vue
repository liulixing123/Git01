<template>
	<div>
		<div>
			<span>分类：</span>
			<Cascader :data="msg" v-model="value1" style='width: 500px;display: inline-block;' :load-data="loadData"></Cascader>
		</div>
		
		<div>{{value1}}</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				value1: [],
                msg: []
			}
		},
		methods:{
			loadData (item, callback) {
				item.loading = true;
				let _this = this;
		   		let user = '/api/yw/category/list/'+ item.value +'/child';
		   		_this.$axios.get(user)
		   		.then((res)=>{
		   			if(res.data.success){
		   				let data = [{
                        value: 'hangzhou',
                        label: '杭州',
                    }]
		   				item.children = data;
		   				console.log(res)
		   				item.loading = false;
		   				callback();
		   			}
		   			
		   		})
		   		.catch((err)=>{
		   			console.log(err)
		   		})
			},
			//根据父分类编号获取子分类列表
			getChild(item,callback){
				item.loading = true;
				let _this = this;
		   		let user = '/api/yw/category/list/'+ item.value +'/child';
		   		_this.$axios.get(user)
		   		.then((res)=>{
		   			if(res.data.success){
		   				let data = [{
                        value: 'hangzhou',
                        label: '杭州',
                        children: [{
                            value: 'xihu',
                            label: '西湖'
                        }]
                    }]
		   				item.children = data;
		   				console.log(res)
		   				item.loading = false;
		   				callback();
		   			}
		   			
		   		})
		   		.catch((err)=>{
		   			console.log(err)
		   		})
			},
			//查询父渠道列表
		   getParent(){
		   		let _this = this;
		   		let user = '/api/yw/category/list/parent';
		   		_this.$axios.get(user)
		   		.then((res)=>{
		   			if(res.data.success){
		   				let data = res.data.data;
		   				let arr = [];
		   				for(let i= 0; i<data.length; i++){
		   					let obj = {};
		   					obj.value = data[i].id;
		   					obj.label = data[i].name;
		   					obj.loading = false;
		   					obj.children = [];
		   					arr.push(obj);
		   				}
		   				_this.msg = arr;
		   			}
		   			console.log(res)
		   		})
		   		.catch((err)=>{
		   			console.log(err)
		   		})
		   }
		},
		created(){
			this.getParent()
		}
	}
</script>
