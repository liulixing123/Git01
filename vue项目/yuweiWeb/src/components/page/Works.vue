<template>
	<!--学生作品-->
	<div class="case-width">
		<!--搜索-->
		<!--<div class="search">
			<span>姓名：</span>
        	<Input v-model.trim="search.name" placeholder="学生姓名" clearable style="width: 200px" />
        	
        	<span>手机号：</span>
        	<Input v-model.trim="search.phone" placeholder="手机号码" clearable style="width: 200px" />
        	
        	<span>状态：</span>
        	<Select v-model="search.isEnable" style="width:200px">
        		<Option value="">全部</Option>
		        <Option value="0">无效</Option>
		        <Option value="1">有效</Option>
		    </Select>
		    <Button type="primary" @click="searchData" style="margin-right: 20px;">查询</Button> 
		    <Button type="primary" @click="showMask">添加学生</Button>
		</div>-->
		
		<!--表格展示-->
		<Table border :columns="columns7" style="width: 100%;" :data="data6"></Table>
		
		<!--分页器-->
		<Page :total="total" show-total @on-change='addPage' @on-page-size-change='addSize' show-sizer style="text-align: center; margin: 20px auto 0;" />
		
		
	</div>
</template>

<script>
	export default {
		name: 'Works',
		data(){
			return {
				//搜索数据
				search: {
					name: '',
					isEnable: '',
					phone: '',
					currentPage: '1',
					pageSize: '10',
				},
				total: 10,
				
				//数据标题
				columns7: [
					{
                        title: '序列号',
                        type: 'index'
                    },
                    {
                        title: '学生名称',
                        key: 'userName',
                        
                    },
                    
                    {
                        title: '作品数量',
                        key: 'num'
                    },
                    
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
	                        		return h('div', [
		                                h('Button', {
		                                    props: {
		                                        type: 'primary',
		                                        size: 'default'
		                                    },
		                                    style: {
		                                        marginRight: '8px'
		                                    },
		                                    on: {
		                                        click: () => {
		                                            this.toView(params.row.userId)
		                                        }
		                                    }
		                                }, '查看详情'),
		                               
		                            ]);
                        	
                        }
                    }
                ],
                //数据
                data6: [],
			}
		},
		
		methods:{
			//取回所有数据
		   getData(){
		   	let _this = this;
		   	let user = '/api/yw/works/list';
		   	this.$axios.get(user,{
		   		params:{
		   			currentPage: _this.search.currentPage,
					pageSize: _this.search.pageSize,
		   		}
		   	})
		   	.then((res)=>{
		   		
		   		if(res.data.success){
		   			_this.total = res.data.data.total;
		   			let dataList = res.data.data.list;
		   			dataList.map((item)=>{
		   				return item.imgUrl = _this.qiniuSrc + item.imgUrl
		   			})
		   			
		   			_this.data6 = dataList;
		   		}else{
		   			_this.$Notice.error({
			              title: res.data.msg
			            });
		   		}
		   		
		   	})
		   	.catch((err)=>{
		   		_this.$Notice.warning({
		                   title: '网络错误，请刷新重试！'
		                });
		   	})
		   },
		   //page页面选择的处理
		   addPage(size){
		   		this.search.currentPage = size;
		   		this.getData();
		   },
		   addSize(size){
		   		this.search.pageSize = size;
		   		this.getData();
		   		
		   },
		   //查看详情
		   toView(id){
		   		this.$router.push({
		   			path: '/works/worklist',
		   			query:{
		   				id: id
		   			}
		   		})
		   		
		   }
		   
		},
		created(){
			//初始化表格数据
			this.getData();
		},
		
		
		
		
	}
</script>

<style scoped="scoped">
	.search{
		width: 990px;
		margin: 0 auto 20px;
	}
	.search span{
		display: inline-block;
		padding-left: 15px;
	}
	.modal-width{
		width: 1150px;
		margin: 0 auto;
	}
	.mask{
		margin: 20px 0;
	}
	.editor{
		height: 600px;
	}
	.mask span{
		display: inline-block;
		width: 230px;
		padding: 0 0 0 150px;
	}
	.file-title{
		width: 100%;
		height: 300px;
	}
	.file-title .span{
		width: 230px;
		height: 200px;
		padding: 0 0 0 150px;
		float: left;
	}
	.file{
		position: relative;
		width: 900px;
		height: 300px;
		border: 1px solid #ccc;
		border-radius: 5px;
		margin-left: 4px;
		float: left;
		padding: 10px;
	}
	.file-but{
		width: 100%;
		height: 50px;
		overflow: hidden;
		position: relative;
	}
	.ico{
		display: block;
		outline: none;
		border: none;
		width: 40px;
		height: 40px;
		position: absolute;
		z-index: 10;
		right: 10px;
		top: 80px;
		background: none;
		cursor: pointer;
	}
	.file-img{
		width: 100%;
		height: 240px;
		margin-top: 10px;
		border-top: 1px solid #ccc;
	}
	.file-img img{
		width: auto;
		display: block;
		height: auto;
		max-width: 80%;
		max-height: 80%;
		margin: 20px auto 0;
	}
	.file-ipt{
		display: block;
		width: 100%;
		height: 50px;
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		cursor: pointer;
	}
	.file-po{
		width: 100%;
		height: 50px;
		text-align: center;
		line-height: 50px;
		font-size: 18px;
		
	}
</style>