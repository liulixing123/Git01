<template>
	<!--学生-->
	<div class="case-width">
		<!--搜索-->
		<div class="search">
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
		</div>
		
		<!--表格展示-->
		<Table border :columns="columns7" style="width: 100%;" :data="data6"></Table>
		
		<!--分页器-->
		<Page :total="total" show-total @on-change='addPage' @on-page-size-change='addSize' show-sizer style="text-align: center; margin: 20px auto 0;" />
		
		<!--添加作品弹窗-->
		<Modal title="添加作品数据" v-model="modal66" :loading="loading" fullscreen ok-text="提交" @on-ok='setWorks'>
			<div class="modal-width">
		        <div class="mask">
		        	<span>作品名称：</span>
		        	<Input v-model.trim="works.name" autofocus placeholder="添加作品名称" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>作品描述：</span>
		        	<Input v-model.trim="works.details" type="textarea" clearable :autosize="{minRows: 2,maxRows: 5}" placeholder="添加作品描述" style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>添加分类：</span>
		        	<Select v-model="works.categoryId" style="width:900px">
				        <Option :value="item.id" v-for="(item,index) in childWorks" :key='index'>{{item.name}}</Option>
				    </Select>
		        </div>
		        
		        <div class="mask">
		        	<span>粉丝量：</span>
		        	<Input v-model.trim="works.fans" placeholder="添加粉丝量" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>点击量：</span>
		        	<Input v-model.trim="works.click" placeholder="添加点击量" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>序列号：</span>
		        	<Input v-model.trim="works.sortNum" placeholder="添加数字越小越靠前" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask file-title">
		        	<div class="span">作品缩略图：</div>
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
		        
		        <div class="mask file-title">
		        	<div class="span">上传二维码：</div>
		        	<div class="file">
		        		<div class="file-but">
		        			<input ref='file3' class="file-ipt" type="file" accept="image/*" name="file" @change="getFileTwo($event)" />
		        			<!--<div class="file-po">点击选择要上传的图片</div>-->
		        			<input class="file-po" type="button" value="点击选择要上传的图片" />
		        		</div>
		        		<button class="ico" @click="clearFileTwo"><Icon type="md-close" size='30' color='#cccccc' /></button>
		        		<div class="file-img">
		        			<img :src="imgSrcTwo" />
		        		</div>
		        	</div>
		        </div>
		        
		        <div class="mask editor">
		        	<span>作品内容：</span>
		        	<quill-editor ref="myTextEditor" :options="quillOption" style="height: 500px; width: 900px;margin: 10px 0 150px 235px; border-radius: 50px;"
				              v-model="works.context">
				    </quill-editor>
				    
		        </div>
	        </div>
	    </Modal>
		
		<!--添加课程弹窗-->
		<Modal title="添加学生数据" v-model="modal9" :loading="loading" fullscreen ok-text="提交" @on-ok='subData'>
			<div class="modal-width">
		        <div class="mask">
		        	<span>姓名：</span>
		        	<Input v-model.trim="modal.name" autofocus placeholder="添加学生姓名" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>手机号：</span>
		        	<Input v-model.trim="modal.phone" placeholder="添加学生手机号" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>昵称：</span>
		        	<Input v-model.trim="modal.nikeName" placeholder="添加学生昵称" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>年龄：</span>
		        	<Input v-model.trim="modal.age" placeholder="添加学生年龄" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>学生简介：</span>
		        	<Input v-model.trim="modal.digest" type="textarea" clearable :autosize="{minRows: 2,maxRows: 5}" placeholder="添加学生简介" style="width: 900px" />
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
		        	<span>添加分类：</span>
		        	<Select v-model="modal.categoryId" style="width:900px">
				        <Option :value="item.id" v-for="(item,index) in childClass" :key='index'>{{item.name}}</Option>
				    </Select>
		        </div>
		        
		        <div class="mask">
		        	<span>序列号：</span>
		        	<Input v-model.trim="modal.sortNum" placeholder="添加数字越小越靠前" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask file-title">
		        	<div class="span">学生缩略图：</div>
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
		        
		        <div class="mask file-title">
		        	<div class="span">上传二维码：</div>
		        	<div class="file">
		        		<div class="file-but">
		        			<input ref='file3' class="file-ipt" type="file" accept="image/*" name="file" @change="getFileTwo($event)" />
		        			<!--<div class="file-po">点击选择要上传的图片</div>-->
		        			<input class="file-po" type="button" value="点击选择要上传的图片" />
		        		</div>
		        		<button class="ico" @click="clearFileTwo"><Icon type="md-close" size='30' color='#cccccc' /></button>
		        		<div class="file-img">
		        			<img :src="imgSrcTwo" />
		        		</div>
		        	</div>
		        </div>
		        
		        <div class="mask editor">
		        	<span>学生内容：</span>
		        	<quill-editor ref="myTextEditor" :options="quillOption" style="height: 500px; width: 900px;margin: 10px 0 150px 235px; border-radius: 50px;"
				              v-model="modal.context">
				    </quill-editor>
				    
		        </div>
	        </div>
	    </Modal>
		
		
		<!--修改课程弹窗-->
		<Modal title="修改学生数据" v-model="modal88" :loading="loading" fullscreen ok-text="提交" @on-ok='modifyData'>
			<div class="modal-width">
		        <div class="mask">
		        	<span>姓名：</span>
		        	<Input v-model.trim="modal.name" autofocus placeholder="添加学生姓名" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>手机号：</span>
		        	<Input v-model.trim="modal.phone" placeholder="添加学生手机号" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>昵称：</span>
		        	<Input v-model.trim="modal.nikeName" placeholder="添加学生昵称" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>年龄：</span>
		        	<Input v-model.trim="modal.age" placeholder="添加学生年龄" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>学生简介：</span>
		        	<Input v-model.trim="modal.digest" type="textarea" clearable :autosize="{minRows: 2,maxRows: 5}" placeholder="添加学生简介" style="width: 900px" />
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
		        	<span>添加分类：</span>
		        	<Select v-model="modal.categoryId" style="width:900px">
				        <Option :value="item.id" v-for="(item,index) in childClass" :key='index'>{{item.name}}</Option>
				    </Select>
		        </div>
		        
		        <div class="mask">
		        	<span>序列号：</span>
		        	<Input v-model.trim="modal.sortNum" placeholder="添加数字越小越靠前" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask file-title">
		        	<div class="span">学生缩略图：</div>
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
		        
		        <div class="mask file-title">
		        	<div class="span">上传二维码：</div>
		        	<div class="file">
		        		<div class="file-but">
		        			<input ref='file3' class="file-ipt" type="file" accept="image/*" name="file" @change="getFileTwo($event)" />
		        			<!--<div class="file-po">点击选择要上传的图片</div>-->
		        			<input class="file-po" type="button" value="点击选择要上传的图片" />
		        		</div>
		        		<button class="ico" @click="clearFileTwo"><Icon type="md-close" size='30' color='#cccccc' /></button>
		        		<div class="file-img">
		        			<img :src="imgSrcTwo" />
		        		</div>
		        	</div>
		        </div>
		        
		        <div class="mask editor">
		        	<span>学生内容：</span>
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
		name: 'Students',
		data(){
			return {
				//子分类数据
				childClass: [],
				//作品子分类数据
				childWorks: [],
				//搜索数据
				search: {
					name: '',
					isEnable: '',
					phone: '',
					currentPage: '1',
					pageSize: '10',
				},
				total: 10,
				//提交作品数据
				works:{
					name: '',
					userId: '',
					context: '',
					details: '',
					categoryId: '',
					fans: '',
					click: '',
					sortNum: '',
				},
				//上传案例弹出框
				loading:true,
				modal9: false,
				modal66: false,
				imgSrc: '',
				imgSrcTwo: '',
				qiniuSrc: this.imgSRC,
				modal:{
					name: '',
					phone: '',
					remark: '',
					nikeName: '',
					age: '',
					sex: '1',
					imgURL: '',
					dyImg: '',
					digest: '',
					sortNum: '',
					context:'',
					content: '',
					categoryId:null,
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
                        title: '状态',
                        key: 'status',
                        render: (h,params) =>{
                        	if(params.row.status == '1'){
                        		return h('div',{
                        			domProps: {
										innerHTML: '报名'
									},
                        		})
                        	}else if(params.row.status == '2'){
                        		return h('div',{
                        			domProps: {
										innerHTML: '上课'
									},
                        		})
                        	}else if(params.row.status == '3'){
                        		return h('div',{
                        			domProps: {
										innerHTML: '毕业'
									},
                        		})
                        	}else{
                        		return h('div',{
                        			domProps: {
										innerHTML: '未知'
									},
                        		})
                        	}
                        }
                        
                    },
                    {
                        title: '分类',
                        key: 'categoryName'
                    },
                    {
                        title: '作品数量',
                        key: 'num',
                        
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
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                        	if(params.row.isEnable == '1'){
	                        		return h('div', [
	                        			h('Button', {
		                                    props: {
		                                        type: 'info',
		                                        size: 'small'
		                                    },
		                                    style: {
		                                        marginRight: '8px'
		                                    },
		                                    on: {
		                                        click: () => {
		                                            this.addWorks(params.row.id)
		                                        }
		                                    }
		                                }, '添加作品'),
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
		   	let user = '/api/yw/student/list';
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
		   //添加作品
		   addWorks(id){
		   		this.works.userId = id;
		   		this.clearWorks();
		   		this.loading = true;
		   		this.modal66 = true;	
		   },
		   setWorks(){
		   		let _this = this;
		   		_this.loading = true;
		   		
		   		let user = '/api/yw/works/save';
		   		if(_this.works.name !== ''){
		   			_this.$axios.post(user,{
		   				name: _this.works.name,
		   				userId: _this.works.userId,
		   				imgUrl: _this.modal.imgURL,
		   				dyImg: _this.modal.dyImg,
		   				details: _this.works.details,
						sortNum: _this.works.sortNum,
						context: _this.works.context,
		   				fans: _this.works.fans,
		   				click: _this.works.click,
						categoryId: _this.works.categoryId,
		   			})
			   		.then((res)=>{
			   			if(res.data.success){
			   				_this.$Message.success({duration:2, content:'数据添加成功！'});
			   				setTimeout(() => {
			                   _this.modal66 = false;
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
		   			alert('作品名称是必填项！')
		   			setTimeout(() => {
			                   _this.loading = false;
			                }, 1000);
		   		}
		   		
		   		
		   },
		   //清除作品弹窗的数据
		   clearWorks(){
			   	let works = this.works;
			   	works.name = '';
			   	works.context = '';
			   	works.details = '';
			   	works.fans = '';
			   	works.click = '';
			   	works.sortNum = '';
			   	this.modal.imgURL = '';
			   	this.modal.dyImg = '';
			   	this.imgSrc = '';
			   	this.imgSrcTwo = '';
			   	works.categoryId = '';
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
			   	modal.age = '',
			   	modal.sex = '1',
			   	modal.imgURL = '';
			   	modal.dyImg = '';
			   	modal.digest = '';
			   	modal.sortNum = '';
			   	modal.context = '';
			   	modal.content = '';
			   	this.imgSrc = '';
			   	this.imgSrcTwo = '';
			   	modal.categoryId = null;
		   },
		   //添加课程对话框确定执行的操作
		   subData(){
		   		let _this = this;
		   		_this.loading = true;
		   		
		   		let user = '/api/yw/student/save';
		   		if(_this.modal.name !== ''){
		   			_this.$axios.post(user,{
		   				name: _this.modal.name,
		   				phone: _this.modal.phone,
		   				remark: _this.modal.remark,
		   				nikeName: _this.modal.nikeName,
		   				age: _this.modal.age,
		   				sex: _this.modal.sex,
		   				imgUrl: _this.modal.imgURL,
		   				dyImg: _this.modal.dyImg,
						digest: _this.modal.digest,
						sortNum: _this.modal.sortNum,
						content: _this.modal.context,
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
		   			alert('学生姓名是必填项！')
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
		   //对话框获取二维码缩略图及数据
		   getFileTwo(e){
		   		let _this = this;
		   		let fileData = e.target.files[0];
		   		//获取七牛的token值
		   		_this.$axios.get('/api/yw/qiniu/token?bucket=yuwei')
		   		.then((res)=>{
		   			if(res.data.success){
		   				_this.$Loading.start();
		   				let upToken = res.data.data;
		   				let formData = new FormData();
		   				formData.append('file', fileData);
		   				formData.append('token', upToken);
		   				
		   				//从七牛中获取图片地址
		   				_this.$axios.post('http://upload.qiniu.com/',formData)
		   				.then((res)=>{
		   					_this.imgSrcTwo = _this.imgSRC + res.data.key;
		   					_this.modal.dyImg = res.data.key;
		   					
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
		   //二维码图片清空图标
		   clearFileTwo(){
		   		this.$refs.file3.value = '';
		   		this.modal.dyImg = '';
		   		this.imgSrcTwo = '';

		   },
		   //修改点击按钮
		   modify(id){
		   		//初始化原始数据，显示修改对话框
		   		this.clearModal();
		   		this.loading = true;
		   		this.id = id;
		   		//根据ID获取要修改的数据
		   		let _this = this;
		   		let user = '/api/yw/student/findById/' + id;
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
		   				modal.age = data.age;
		   				modal.sex = data.sex;
		   				modal.imgURL = data.imgUrl;
		   				modal.dyImg = data.dyImg;
					   	modal.digest = data.digest;
					   	modal.sortNum = data.sortNum;
					   	modal.content = data.content;
		   				modal.categoryId = data.categoryId;
		   				//把图片重新计算值
		   				_this.imgSrc = _this.qiniuSrc + modal.imgURL;
		   				//把图片重新计算值
		   				_this.imgSrcTwo = _this.qiniuSrc + modal.dyImg;

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
		   			alert('学生姓名不能为空！')
		   			setTimeout(() => {
			                   _this.loading = false;
			                }, 1000);
		   		}else{
		   			let user = '/api/yw/student/edit';
			   		_this.$axios.put(user,{
			   			id: _this.id,
			   			name: modal.name,
		   				phone: modal.phone,
		   				remark: modal.remark,
		   				nikeName: modal.nikeName,
		   				age: modal.age,
		   				sex: modal.sex,
		   				imgUrl: modal.imgURL,
		   				dyImg: modal.dyImg,
						digest: modal.digest,
						sortNum: modal.sortNum,
			   			content: modal.content,
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
		   //禁用
		   online(id){
		   		let _this = this;
		   		
		   		this.$Modal.confirm({
                    title: '是否禁用该条数据？',
                    onOk: () => {
                        let user = '/api/yw/student/isEnable/' + id;
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
		   //启用
		   remove(id){
		   		let _this = this;
		   		
		   		this.$Modal.confirm({
                    title: '是否启用该条数据？',
                    onOk: () => {
                        let user = '/api/yw/student/isEnable/' + id;
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
		   		let user = '/api/yw/category/list/17/child';
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
		   //根据ID获取作品子分类列表
		   getChildWorks(){
		   		let _this = this;
		   		let user = '/api/yw/category/list/20/child';
		   		_this.$axios.get(user)
		   		.then((res)=>{
		   			if(res.data.success){
		   				_this.childWorks = res.data.data
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
			//渲染作品子分类
			this.getChildWorks()
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