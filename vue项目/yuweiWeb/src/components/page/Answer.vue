<template>
	<!--疑难解答-->
	<div class="case-width">
		<!--搜索-->
		<div class="search">
			<span>问题：</span>
        	<Input v-model.trim="search.question" placeholder="输入问题名称" clearable style="width: 200px" />
        	
        	<span>答案：</span>
        	<Input v-model.trim="search.answer" placeholder="输入答案名称" clearable style="width: 200px" />
        	
        	<span>状态：</span>
        	<Select v-model="search.isEnable" style="width:200px">
        		<Option value="">全部</Option>
		        <Option value="0">无效</Option>
		        <Option value="1">有效</Option>
		    </Select>
		    <Button type="primary" @click="searchData" style="margin-right: 20px;">查询</Button> 
		    <Button type="primary" @click="showMask">添加疑难</Button>
		</div>
		
		<!--表格展示-->
		<Table border :columns="columns7" style="width: 100%;" :data="data6"></Table>
		
		<!--分页器-->
		<Page :total="total" show-total @on-change='addPage' @on-page-size-change='addSize' show-sizer style="text-align: center; margin: 20px auto 0;" />
		
		<!--添加课程弹窗-->
		<Modal title="添加疑难解答数据" v-model="modal9" :loading="loading" fullscreen ok-text="提交" @on-ok='subData'>
			<div class="modal-width">
		        
		        <div class="mask">
		        	<span>问题：</span>
		        	<Input v-model.trim="modal.question" type="textarea" clearable :autosize="{minRows: 2,maxRows: 5}" placeholder="添加疑难问题" style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>答案：</span>
		        	<Input v-model.trim="modal.answer" type="textarea" clearable :autosize="{minRows: 2,maxRows: 5}" placeholder="添加疑难答案" style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>点击量：</span>
		        	<Input v-model.trim="modal.click" placeholder="添加点击量" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>添加分类：</span>
		        	<Select v-model="modal.categoryId" style="width:900px">
				        <Option :value="item.id" v-for="(item,index) in childClass" :key='index'>{{item.name}}</Option>
				    </Select>
		        </div>
		        
		        <div class="mask">
		        	<span>序列号：</span>
		        	<Input v-model.trim="modal.sortNum" placeholder="添加数字越小越靠前" clearable style="width: 900px" />
		        </div>
		        
		        
	        </div>
	    </Modal>
		
		
		<!--修改课程弹窗-->
		<Modal title="修改疑难解答数据" v-model="modal88" :loading="loading" fullscreen ok-text="提交" @on-ok='modifyData'>
			<div class="modal-width">
		        <div class="mask">
		        	<span>问题：</span>
		        	<Input v-model.trim="modal.question" type="textarea" clearable :autosize="{minRows: 2,maxRows: 5}" placeholder="添加疑难问题" style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>答案：</span>
		        	<Input v-model.trim="modal.answer" type="textarea" clearable :autosize="{minRows: 2,maxRows: 5}" placeholder="添加疑难答案" style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>点击量：</span>
		        	<Input v-model.trim="modal.click" placeholder="添加点击量" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>添加分类：</span>
		        	<Select v-model="modal.categoryId" style="width:900px">
				        <Option :value="item.id" v-for="(item,index) in childClass" :key='index'>{{item.name}}</Option>
				    </Select>
		        </div>
		        
		        <div class="mask">
		        	<span>序列号：</span>
		        	<Input v-model.trim="modal.sortNum" placeholder="添加数字越小越靠前" clearable style="width: 900px" />
		        </div>
		        
		        
	        </div>
	    </Modal>
		
	</div>
</template>

<script>
	
	export default {
		name: 'Answer',
		data(){
			return {
				//子分类数据
				childClass: [],
				//搜索数据
				search: {
					question: '',
					isEnable: '',
					answer: '',
					currentPage: '1',
					pageSize: '10',
				},
				total: 10,
				
				//上传案例弹出框
				loading:true,
				modal9: false,
				
				modal:{
					question: '',
					answer: '',
					click: '',
					sortNum: '',
					categoryId:null,
				},
				fileData: '',
				//修改对话框数据
				modal88: false,
				id: '',
				
				//数据标题
				columns7: [
					
					{
                        title: '序列号',
                        type: 'index',
                        width: 100
                    },
                    
                    {
                        title: '问题',
                        key: 'question',
                        
                        
                    },
                    {
                        title: '答案',
                        key: 'answer',
                       
                        
                    },
                    {
                        title: '点击量',
                        key: 'click',
                        width: 100
                    },
                    {
                        title: '分类',
                        key: 'categoryName',
                        width: 100
                    },
                    {
                        title: '操作人',
                        key: 'operator',
                        width: 100
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                        	if(params.row.isEnable == '1'){
	                        		return h('div', [
		                                h('Button', {
		                                    props: {
		                                        type: 'primary',
		                                        size: 'small'
		                                    },
		                                    style: {
		                                        marginRight: '8px'
		                                    },
		                                    on: {
		                                        click: () => {
		                                            this.modify(params.row.id)
		                                        }
		                                    }
		                                }, '修改'),
		                                h('Button', {
		                                    props: {
		                                    	type: 'error',
		                                        size: 'small'
		                                        
		                                    },
		                                    on: {
		                                        click: () => {
		                                            this.online(params.row.id)
		                                        }
		                                    }
		                                }, '禁用')
		                            ]);
                        	}else{
                        		return h('div', [
		                                h('Button', {
		                                    props: {
		                                        type: 'success',
		                                        size: 'small'
		                                    },
		                                    on: {
		                                        click: () => {
		                                            this.remove(params.row.id)
		                                        }
		                                    }
		                                }, '启用')
		                            ]);
                        	}
                            
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
		   	let user = '/api/yw/troubleshooting/list';
		   	this.$axios.get(user,{
		   		params:{
		   			question: _this.search.question,
		   			answer: _this.search.answer,
					isEnable: _this.search.isEnable,
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
		   //查询按钮
		   searchData(){
		   		this.getData();
		   },
		   //打开添加课程对话框
		   showMask(){
		   		this.clearModal();
		   		this.loading = true;
		   		this.modal9 = true;
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
		   //清除对话框的数据
		   clearModal(){
			   	let modal = this.modal;
			   	modal.question = '',
			   	modal.answer = '',
			   	modal.click = '';
			   	modal.sortNum = '';
			   	modal.categoryId = null;
		   },
		   //添加课程对话框确定执行的操作
		   subData(){
		   		let _this = this;
		   		_this.loading = true;
		   		
		   		let user = '/api/yw/troubleshooting/save';
		   		if(_this.modal.question !== ''){
		   			_this.$axios.post(user,{
		   				question: _this.modal.question,
		   				answer: _this.modal.answer,
		   				click: _this.modal.click,
						sortNum: _this.modal.sortNum,
						categoryId: _this.modal.categoryId,
		   			})
			   		.then((res)=>{
			   			if(res.data.success){
			   				_this.$Message.success({duration:2, content:'数据成功上传！'});
			   				setTimeout(() => {
			                   _this.modal9 = false;
			                }, 1000);
			   				//成功在刷新一下主页上面的数据
			   				_this.getData();
			   				
//			   				_this.clearModal();
			   			}else{
			   				setTimeout(() => {
			                   _this.loading = false;
			                }, 1000);
			   				this.$Message.error({duration:1, content:res.data.msg});
			   			}
			   			
			   		})
			   		.catch((err)=>{
			   			_this.$Notice.warning({
		                   title: '网络错误，请刷新重试！'
		                });
			   		})
		   		}else{
		   			alert('问题是必填项！')
		   			setTimeout(() => {
			                   _this.loading = false;
			                }, 1000);
		   		}
		   		
		   		
		   },
		   
		   //修改点击按钮
		   modify(id){
		   		//初始化原始数据，显示修改对话框
		   		this.clearModal();
		   		this.loading = true;
		   		this.id = id;
		   		//根据ID获取要修改的数据
		   		let _this = this;
		   		let user = '/api/yw/troubleshooting/findById/' + id;
		   		_this.$axios.get(user)
		   		.then((res)=>{
		   			
		   			if(res.data.success){
		   				_this.modal88 = true;
		   				let modal = _this.modal;
		   				let data = res.data.data;
		   				modal.question = data.question;
		   				modal.answer = data.answer;
		   				modal.click = data.click;
					   	modal.sortNum = data.sortNum;
					   	modal.categoryId = data.categoryId;
		   				
		   			}else{
		   				_this.$Message.error({duration:1, content:res.data.msg});
		   			}
		   		})
		   		.catch((err)=>{
		   			_this.$Notice.warning({
		                   title: '网络错误，请刷新重试！'
		                });
		   		})
		   },
		   //修改对话框提交方法
		   modifyData(){
		   		let _this = this;
		   		 _this.loading = true;
		   		let modal = _this.modal;
		   		if(modal.question ==''){
		   			alert('问题不能为空！')
		   			setTimeout(() => {
			                   _this.loading = false;
			                }, 1000);
		   		}else{
		   			let user = '/api/yw/troubleshooting/edit';
			   		_this.$axios.put(user,{
			   			id: _this.id,
			   			question: modal.question,
		   				answer: modal.answer,
		   				click: modal.click,
						sortNum: modal.sortNum,
						categoryId: modal.categoryId,
			   		})
			   		.then((res)=>{
			   			
			   			if(res.data.success){
			   				setTimeout(() => {
			                   _this.modal88 = false;
			                }, 1000);
			                _this.$Message.success({duration:2, content:'数据成功修改！'});
			                
			                //成功在刷新一下主页上面的数据
			   				_this.getData();
			   				
//			   				_this.clearModal();
			   			}else{
			                setTimeout(() => {
			                   _this.loading = false;
			                }, 1000);
			   				_this.$Message.error({duration:1, content:res.data.msg});
			   			}
			   			
			   			
			   		})
			   		.catch((err)=>{
			   			_this.$Notice.warning({
		                   title: '网络错误，请刷新重试！'
		                });
			   		})
		   		}
		   		
		   		
		   },
		   //上线
		   online(id){
		   		let _this = this;
		   		
		   		this.$Modal.confirm({
                    title: '是否禁用该条数据？',
                    
                    onOk: () => {
                        let user = '/api/yw/troubleshooting/isEnable/' + id;
				   		_this.$axios.put(user)
				   		.then((res)=>{
				   			if(res.data.success){
				   				_this.$Message.success({duration:2, content:'数据成功禁用！'});
				   				_this.getData();
				   			}else{
				   				_this.$Message.error({duration:1, content:res.data.msg});
				   			}
				   			
				   		})
				   		.catch((err)=>{
				   			_this.$Notice.warning({
			                   title: '网络错误，请刷新重试！'
			                });
				   		})
                    }
                });
		   		
		   },
		   //下线
		   remove(id){
		   		let _this = this;
		   		
		   		this.$Modal.confirm({
                    title: '是否启用该条数据？',
                    onOk: () => {
                        let user = '/api/yw/troubleshooting/isEnable/' + id;
				   		_this.$axios.put(user)
				   		.then((res)=>{
				   			if(res.data.success){
				   				_this.$Message.success({duration:2, content:'数据已经启用！'});
				   				_this.getData();
				   			}else{
				   				_this.$Message.error({duration:1, content:res.data.msg});
				   			}
				   		})
				   		.catch((err)=>{
				   			_this.$Notice.warning({
			                   title: '网络错误，请刷新重试！'
			                });
				   		})
                    }
                });
		   		
		   },
		   //根据ID获取自分类列表
		   getChildClass(){
		   		let _this = this;
		   		let user = '/api/yw/category/list/19/child';
		   		_this.$axios.get(user)
		   		.then((res)=>{
		   			if(res.data.success){
		   				_this.childClass = res.data.data
		   			}
		   			
		   		})
		   		.catch((err)=>{
		   			_this.$Notice.warning({
		                   title: '网络错误，请刷新重试！'
		                });
		   		})
		   },
		},
		created(){
			//初始化表格数据
			this.getData();
			//渲染子分类
			this.getChildClass()
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