<template>
	<!--师资-->
	<div class="case-width">
		<!--搜索-->
		<div class="search">
			<span>姓名：</span>
        	<Input v-model.trim="search.name" placeholder="老师姓名" clearable style="width: 200px" />
        	
        	<span>手机号：</span>
        	<Input v-model.trim="search.phone" placeholder="手机号码" clearable style="width: 200px" />
        	
        	<span>状态：</span>
        	<Select v-model="search.isEnable" style="width:200px">
        		<Option value="">全部</Option>
		        <Option value="0">无效</Option>
		        <Option value="1">有效</Option>
		    </Select>
		    <Button type="primary" @click="searchData" style="margin-right: 20px;">查询</Button> 
		    <Button type="primary" @click="showMask">添加老师</Button>
		</div>
		
		<!--表格展示-->
		<Table border :columns="columns7" style="width: 100%;" :data="data6"></Table>
		
		<!--分页器-->
		<Page :total="total" show-total @on-change='addPage' @on-page-size-change='addSize' show-sizer style="text-align: center; margin: 20px auto 0;" />
		
		<!--添加课程弹窗-->
		<Modal title="添加师资数据" v-model="modal9" :loading="loading" fullscreen ok-text="提交" @on-ok='subData'>
			<div class="modal-width">
		        <div class="mask">
		        	<span>姓名：</span>
		        	<Input v-model.trim="modal.name" autofocus placeholder="添加师资姓名" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>手机号：</span>
		        	<Input v-model.trim="modal.phone" autofocus placeholder="添加师资手机号" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>昵称：</span>
		        	<Input v-model.trim="modal.nikeName" autofocus placeholder="添加师资昵称" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>职称：</span>
		        	<Input v-model.trim="modal.title" autofocus placeholder="添加师资职称" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>师资简介：</span>
		        	<Input v-model.trim="modal.digest" type="textarea" clearable :autosize="{minRows: 2,maxRows: 5}" placeholder="添加师资简介" style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>备注：</span>
		        	<Input v-model.trim="modal.remark" type="textarea" clearable :autosize="{minRows: 2,maxRows: 5}" placeholder="添加备注" style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>性别：</span>
		        	<Select v-model="modal.sex" style="width:900px">
				        <Option value="1">男</Option>
				        <Option value="2">女</Option>
				    </Select>
		        </div>
		        
		        <div class="mask">
		        	<span>序列号：</span>
		        	<Input v-model.trim="modal.sortNum" placeholder="添加数字越小越靠前" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask file-title">
		        	<div class="span">师资缩略图：</div>
		        	<div class="file">
		        		<div class="file-but">
		        			<input ref='file1' class="file-ipt" type="file" accept="image/*" name="file" @change="getFile($event)" />
		        			<!--<div class="file-po">点击选择要上传的图片</div>-->
		        			<input class="file-po" type="button" value="点击选择要上传的图片" />
		        		</div>
		        		<button class="ico" @click="clearFile"><Icon type="md-close" size='30' color='#cccccc' /></button>
		        		<div class="file-img">
		        			<img :src="imgSrc" />
		        		</div>
		        	</div>
		        </div>
		        
		        <div class="mask editor">
		        	<span>师资内容：</span>
		        	<quill-editor ref="myTextEditor" :options="quillOption" style="height: 500px; width: 900px;margin: 10px 0 150px 235px; border-radius: 50px;"
				              v-model="modal.context">
				    </quill-editor>
				    
		        </div>
	        </div>
	    </Modal>
		
		
		<!--修改课程弹窗-->
		<Modal title="修改师资数据" v-model="modal88" :loading="loading" fullscreen ok-text="提交" @on-ok='modifyData'>
			<div class="modal-width">
		        <div class="mask">
		        	<span>姓名：</span>
		        	<Input v-model.trim="modal.name" autofocus placeholder="添加师资姓名" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>手机号：</span>
		        	<Input v-model.trim="modal.phone" autofocus placeholder="添加师资手机号" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>昵称：</span>
		        	<Input v-model.trim="modal.nikeName" autofocus placeholder="添加师资昵称" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>职称：</span>
		        	<Input v-model.trim="modal.title" autofocus placeholder="添加师资职称" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>师资简介：</span>
		        	<Input v-model.trim="modal.digest" type="textarea" clearable :autosize="{minRows: 2,maxRows: 5}" placeholder="添加师资简介" style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>备注：</span>
		        	<Input v-model.trim="modal.remark" type="textarea" clearable :autosize="{minRows: 2,maxRows: 5}" placeholder="添加备注" style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>性别：</span>
		        	<Select v-model="modal.sex" style="width:900px">
				        <Option value="1">男</Option>
				        <Option value="2">女</Option>
				    </Select>
		        </div>
		        
		        <div class="mask">
		        	<span>序列号：</span>
		        	<Input v-model.trim="modal.sortNum" placeholder="添加数字越小越靠前" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask file-title">
		        	<div class="span">师资缩略图：</div>
		        	<div class="file">
		        		<div class="file-but">
		        			<input ref='file1' class="file-ipt" type="file" accept="image/*" name="file" @change="getFile($event)" />
		        			<!--<div class="file-po">点击选择要上传的图片</div>-->
		        			<input class="file-po" type="button" value="点击选择要上传的图片" />
		        		</div>
		        		<button class="ico" @click="clearFile"><Icon type="md-close" size='30' color='#cccccc' /></button>
		        		<div class="file-img">
		        			<img :src="imgSrc" />
		        		</div>
		        	</div>
		        </div>
		        
		        <div class="mask editor">
		        	<span>师资内容：</span>
		        	<quill-editor ref="myTextEditor" :options="quillOption" style="height: 500px; width: 900px;margin: 10px 0 150px 235px; border-radius: 50px;"
				              v-model="modal.content">
				    </quill-editor>
				    
		        </div>
	        </div>
	    </Modal>
		
	</div>
</template>

<script>
	import quillConfig from '@/model/quill-config.js'
	
	export default {
		name: 'teachers',
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
				
				//上传案例弹出框
				loading:true,
				modal9: false,
				imgSrc: '',
				qiniuSrc: this.imgSRC,
				modal:{
					name: '',
					phone: '',
					remark: '',
					nikeName: '',
					sex: '1',
					imgURL: '',
					title: '',
					digest: '',
					sortNum: '',
					context:'',
					content: '',
				},
				fileData: '',
				//富文本编辑器属性
				quillOption: quillConfig,
				
				//修改对话框数据
				modal88: false,
				id: '',
				
				//数据标题
				columns7: [
					{
                        title: '序列号',
                        type: 'index'
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        
                    },
                    {
                        title: '缩略图',
                        key: 'imgUrl',
                        render: (h,params) => {
                        	return h('img', {
                        		style:{//设置样式
                        			width: 'auto',
                        			display: 'block',
                        			maxHeight: '40px',
                        			padding: '5px',
                        			margin: 'auto'
                        		},
                        		attrs: {//设置属性
                        			src: params.row.imgUrl
                        		}
                        	})
                        }
                    },
                    {
                        title: '号码',
                        key: 'phone',
                        
                    },
                    {
                        title: '昵称',
                        key: 'nikeName'
                    },
                    {
                        title: '操作人',
                        key: 'operator'
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
		   	let user = '/api/yw/teacher/list';
		   	this.$axios.get(user,{
		   		params:{
		   			name: _this.search.name,
		   			phone: _this.search.phone,
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
			   	modal.name = '',
			   	modal.phone = '',
			   	modal.remark = '',
			   	modal.nikeName = '',
			   	modal.sex = '1',
			   	modal.imgURL = '';
			   	modal.title = '';
			   	modal.digest = '';
			   	modal.sortNum = '';
			   	modal.context = '';
			   	modal.content = '';
			   	this.imgSrc = '';
		   },
		   //添加课程对话框确定执行的操作
		   subData(){
		   		let _this = this;
		   		_this.loading = true;
		   		
		   		let user = '/api/yw/teacher/save';
		   		if(_this.modal.name !== ''){
		   			_this.$axios.post(user,{
		   				name: _this.modal.name,
		   				phone: _this.modal.phone,
		   				remark: _this.modal.remark,
		   				nikeName: _this.modal.nikeName,
		   				sex: _this.modal.sex,
		   				imgUrl: _this.modal.imgURL,
						title: _this.modal.title,
						digest: _this.modal.digest,
						sortNum: _this.modal.sortNum,
						content: _this.modal.context,
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
		   			alert('老师姓名是必填项！')
		   			setTimeout(() => {
			                   _this.loading = false;
			                }, 1000);
		   		}
		   		
		   		
		   },
		   //对话框获取file缩略图及数据
		   getFile(e){
		   		let _this = this;
		   		_this.fileData = e.target.files[0];
		   		//获取七牛的token值
		   		_this.$axios.get('/api/yw/qiniu/token?bucket=yuwei')
		   		.then((res)=>{
		   			if(res.data.success){
		   				_this.$Loading.start();
		   				let upToken = res.data.data;
		   				let formData = new FormData();
		   				formData.append('file', _this.fileData);
		   				formData.append('token', upToken);
		   				
		   				//从七牛中获取图片地址
		   				_this.$axios.post('http://upload.qiniu.com/',formData)
		   				.then((res)=>{
		   					_this.imgSrc = _this.imgSRC + res.data.key;
		   					_this.modal.imgURL = res.data.key;
		   					
		   					_this.$Loading.finish();
		   				})
		   				.catch((err)=>{
		   					_this.$Loading.error();
		   					 _this.$Notice.warning({
				                title: '错误提示，网络错误，请刷新重试！'
				              });
		   				})
		   			} else {
			            _this.$Notice.error({
			              title: res.data.msg
			            });
			        }

		   		})
		   		.catch((err)=>{
		   			_this.$Notice.warning({
			            title: '错误提示，网络错误，请刷新重试！'
			          });
		   		})
		   },
		   //对话框图片清空图标
		   clearFile(){
		   		this.$refs.file1.value = '';
		   		this.modal.imgURL = '';
		   		this.imgSrc = '';
		   },
		   //修改点击按钮
		   modify(id){
		   		//初始化原始数据，显示修改对话框
		   		this.clearModal();
		   		this.loading = true;
		   		this.id = id;
		   		//根据ID获取要修改的数据
		   		let _this = this;
		   		let user = '/api/yw/teacher/findById/' + id;
		   		_this.$axios.get(user)
		   		.then((res)=>{
		   			
		   			if(res.data.success){
		   				_this.modal88 = true;
		   				let modal = _this.modal;
		   				let data = res.data.data;
		   				modal.name = data.name;
		   				modal.phone = data.phone;
		   				modal.remark = data.remark;
		   				modal.nikeName = data.nikeName;
		   				modal.sex = data.sex;
		   				modal.imgURL = data.imgUrl;
					   	modal.title = data.title;
					   	modal.digest = data.digest;
					   	modal.sortNum = data.sortNum;
					   	modal.content = data.content;
		   				
		   				//把图片重新计算值
		   				_this.imgSrc = _this.qiniuSrc + modal.imgURL;

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
		   		if(modal.name ==''){
		   			alert('老师姓名不能为空！')
		   			setTimeout(() => {
			                   _this.loading = false;
			                }, 1000);
		   		}else{
		   			let user = '/api/yw/teacher/edit';
			   		_this.$axios.put(user,{
			   			id: _this.id,
			   			name: modal.name,
		   				phone: modal.phone,
		   				remark: modal.remark,
		   				nikeName: modal.nikeName,
		   				sex: modal.sex,
		   				imgUrl: modal.imgURL,
						title: modal.title,
						digest: modal.digest,
						sortNum: modal.sortNum,
			   			content: modal.content,
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
                        let user = '/api/yw/teacher/isEnable/' + id;
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
                        let user = '/api/yw/teacher/isEnable/' + id;
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