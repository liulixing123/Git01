<template>
	<!--案例-->
	<div class="case-width">
		<div class="search">
			<span>案例名称：</span>
        	<Input v-model.trim="search.name" placeholder="案例名称" clearable style="width: 200px" />
        	
        	<span>有效：</span>
        	<Select v-model="search.status" style="width:200px">
        		<Option value="">全部</Option>
		        <Option value="0">未发布</Option>
		        <Option value="1">发布</Option>
		        <Option value="2">下线</Option>
		    </Select>
		    <Button type="primary" @click="searchData" style="margin-right: 20px;">查询</Button> 
		    <Button type="primary" @click="showMask">上传案例</Button>
		</div>
		
		<!--表格展示-->
		<Table border :columns="columns7" style="width: 100%;" :data="data6"></Table>
		
		
		<!--上传案例弹窗-->
		<Modal title="上传案例数据" v-model="modal9" :loading="loading" fullscreen ok-text="提交" @on-ok='subData'>
			<div class="modal-width">
		        <div class="mask">
		        	<span>案例名称：</span>
		        	<Input v-model.trim="modal.name" autofocus placeholder="添加案例名称" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>案例简介：</span>
		        	<Input v-model.trim="modal.details" type="textarea" clearable :autosize="{minRows: 2,maxRows: 5}" placeholder="添加案例简介" style="width: 900px" />
		        </div>
		        <div class="mask">
		        	<span>粉丝量：</span>
		        	<Input v-model.trim="modal.fans" placeholder="添加的粉丝量" clearable style="width: 900px" />
		        </div>
		        <div class="mask">
		        	<span>点击量：</span>
		        	<Input v-model.trim="modal.click" placeholder="添加的点击量" clearable style="width: 900px" />
		        </div>
		        <div class="mask">
		        	<span>案例序列号：</span>
		        	<Input v-model.trim="modal.sortNum" placeholder="添加数字越小越靠前" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>添加分类：</span>
		        	<Select v-model="modal.categoryId" style="width:900px">
				        <Option :value="item.id" v-for="(item,index) in childClass" :key='index'>{{item.name}}</Option>
				    </Select>
		        </div>
		        
		        <div class="mask file-title">
		        	<div class="span">案例缩略图：</div>
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
		        	<span>案例内容：</span>
		        	<quill-editor ref="myTextEditor" :options="quillOption" style="height: 500px; width: 900px;margin: 10px 0 150px 235px; border-radius: 50px;"
				              v-model="modal.context">
				    </quill-editor>
				    
		        	<!--<quill-editor v-model="modal.context"
		        				  style="height: 500px; width: 900px;margin: 10px 0 150px 235px; border-radius: 50px;"
				                  ref="myQuillEditor"
				                  :options="editorOption"
				                  @blur="onEditorBlur($event)"
				                  @focus="onEditorFocus($event)"
				                  @ready="onEditorChange($event)">
				    </quill-editor>-->
		        </div>
	        </div>
	    </Modal>
	    
	    
	    
	    
	    <!--修改案例弹窗-->
		<Modal title="修改案例数据" v-model="modal88" :loading="loading" fullscreen ok-text="提交" @on-ok='modifyData'>
			<div class="modal-width">
		        <div class="mask">
		        	<span>案例名称：</span>
		        	<Input v-model.trim="modal.name" autofocus placeholder="添加案例名称" clearable style="width: 900px" />
		        </div>
		        
		        
		        <div class="mask">
		        	<span>案例简介：</span>
		        	<Input v-model.trim="modal.details" type="textarea" clearable :autosize="{minRows: 2,maxRows: 5}" placeholder="添加案例简介" style="width: 900px" />
		        </div>
		        <div class="mask">
		        	<span>粉丝量：</span>
		        	<Input v-model.trim="modal.fans" placeholder="添加的粉丝量" clearable style="width: 900px" />
		        </div>
		        <div class="mask">
		        	<span>点击量：</span>
		        	<Input v-model.trim="modal.click" placeholder="添加的点击量" clearable style="width: 900px" />
		        </div>
		        <div class="mask">
		        	<span>案例序列号：</span>
		        	<Input v-model.trim="modal.sortNum" placeholder="添加数字越小越靠前" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>添加分类：</span>
		        	<Select v-model="modal.categoryId" style="width:900px">
				        <Option :value="item.id" v-for="(item,index) in childClass" :key='index'>{{item.name}}</Option>
				    </Select>
		        </div>
		        
		        <div class="mask file-title">
		        	<div class="span">案例缩略图：</div>
		        	<div class="file">
		        		<div class="file-but">
		        			<input ref='file2' class="file-ipt" type="file" accept="image/*" name="file" @change="getFile($event)" />
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
		        	<span>案例内容：</span>
		        	<quill-editor ref="myTextEditor" :options="quillOption" style="height: 500px; width: 900px;margin: 10px 0 150px 235px; border-radius: 50px;"
				              v-model="modal.content">
				    </quill-editor>
		        	
		        	<!--<quill-editor v-model="modal.context"
		        				  style="height: 500px; width: 900px;margin: 10px 0 150px 235px; border-radius: 50px;"
				                  ref="myQuillEditor"
				                  :options="editorOption"
				                  @blur="onEditorBlur($event)"
				                  @focus="onEditorFocus($event)"
				                  @ready="onEditorChange($event)">
				    </quill-editor>-->
		        </div>
	        </div>
	    </Modal>
		
		
		<Page :total="total" show-total @on-change='addPage' @on-page-size-change='addSize' show-sizer style="text-align: center; margin: 20px auto 0;" />
		
	</div>
</template>

<script>
	
	import quillConfig from '@/model/quill-config.js'
	export default {
		name: 'Case',
		data(){
			return {
				//子分类数据
				childClass: [],
				//搜索数据
				search: {
					name: '',
					status: '',
					currentPage: 1,
					pageSize: 10,
				},
				total: 10,
				//修改对话框数据
				modal88: false,
				id: '',
				//上传案例弹出框
				loading:true,
				modal9: false,
				imgSrc: '',
				imgSrcTwo: '',
				qiniuSrc: this.imgSRC,
				modal:{
					imgURL: '',
					dyImg: '',
					name: '',
					details: '',
					fans: '',
					click: '',
					sortNum: '',
					context:'',
					content: '',
					categoryId:null,
				},
				fileData: '',
				//富文本编辑器属性
				quillOption: quillConfig,
//              editorOption:{},
				//数据标题
				columns7: [
					{
                        title: '序列号',
                        type: 'index'
                    },
                    {
                        title: '案例名称',
                        key: 'name',
                        
                    },
                    {
                        title: '图片',
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
                        title: '粉丝量',
                        key: 'fans'
                    },
                    {
                        title: '点击量',
                        key: 'click'
                    },
                    {
                        title: '分类',
                        key: 'categoryName'
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
                        	if(params.row.status !== '1'){
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
		                                }, '上线')
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
		                                }, '下线')
		                            ]);
                        	}
                            
                        }
                    }
                ],
                //数据
                data6: [],
			}
		},
		methods: {
			
			//取回所有数据
		   getData(){
		   	let _this = this;
		   	
		   	let user = '/api/yw/case/list';
		   	this.$axios.get(user,{
		   		params:{
		   			name: _this.search.name,
					status: _this.search.status,
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
		   //page页面选择的处理
		   addPage(size){
		   		this.search.currentPage = size;
		   		this.getData();
		   },
		   addSize(size){
		   		this.search.pageSize = size;
		   		this.getData();
		   		
		   },
		   //打开上传对话框
		   showMask(){
		   		this.clearModal();
		   		this.loading = true;
		   		this.modal9 = true;
		   },
		   //对话框获取file缩略图及数据
		   getFile(e){
		   		let _this = this;
		   		_this.fileData = e.target.files[0];
//		   		_this.fileData = this.$refs.file1.files[0];
//		   		let reader = new FileReader();
		   		
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
//		   		_this.fileData = this.$refs.file1.files[0];
//		   		let reader = new FileReader();
		   		
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
		   //对话框确定执行的操作
		   subData(){
		   		
		   		let _this = this;
		   		
		   		_this.loading = true;
		   		let user = '/api/yw/case/save';
		   		if(_this.modal.imgURL !== '' || _this.modal.name !== ''){
		   			_this.$axios.post(user,{
		   				imgUrl: _this.modal.imgURL,
		   				dyImg: _this.modal.dyImg,
						name: _this.modal.name,
						details: _this.modal.details,
						fans: _this.modal.fans,
						click: _this.modal.click,
						sortNum: _this.modal.sortNum,
						context: _this.modal.context,
						categoryId: _this.modal.categoryId,
		   			})
			   		.then((res)=>{
//			   			_this.clearModal();
			   			
			   			if(res.data.success){
			   				_this.$Message.success({duration:2, content:'数据成功上传！'});
			   				setTimeout(() => {
			                   _this.modal9 = false;
			                }, 1000);
			   				//成功在刷新一下主页上面的数据
			   				_this.getData();
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
		   			alert('案例名称与案例缩略图是必填项！')
		   			setTimeout(() => {
			                   _this.loading = false;
			                }, 1000);
		   		}
		   		
		   },
		   //清除对话框的数据
		   clearModal(){
			   	let modal = this.modal;
			   	modal.imgURL = '';
			   	modal.dyImg = '';
			   	modal.name = '';
			   	modal.details = '';
			   	modal.fans = '';
			   	modal.click = '';
			   	modal.sortNum = '';
			   	modal.context = '';
			   	modal.content = '';
			   	this.imgSrc = '';
			   	this.imgSrcTwo = '';
			   	modal.categoryId = null;
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
		   		let user = '/api/yw/case/findById/' + id;
		   		_this.$axios.get(user)
		   		.then((res)=>{
		   			
		   			if(res.data.success){
		   				_this.modal88 = true;
		   				let modal = _this.modal;
		   				let data = res.data.data;
		   				modal.imgURL = data.imgUrl;
		   				modal.dyImg = data.dyImg;
					   	modal.name = data.name;
					   	modal.details = data.details;
					   	modal.fans = data.fans;
					   	modal.click = data.click;
					   	modal.sortNum = data.sortNum;
					   	modal.content = data.context;
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
		   		if(modal.name =='' || modal.imgURL ==''){
		   			alert('案例名称与案例缩略图是必填项！')
		   			setTimeout(() => {
			                   _this.loading = false;
			                }, 1000);
		   		}else{
		   			
		   			let user = '/api/yw/case/edit';
			   		_this.$axios.put(user,{
			   			id: _this.id,
			   			name: modal.name,
			   			imgUrl: modal.imgURL,
			   			dyImg: modal.dyImg,
			   			details: modal.details,
			   			fans: modal.fans,
			   			click: modal.click,
			   			sortNum: modal.sortNum,
			   			context: modal.content,
			   			categoryId: modal.categoryId,
			   		})
			   		.then((res)=>{
//			   			_this.clearModal();
			   			if(res.data.success){
			   				setTimeout(() => {
			                   _this.modal88 = false;
			                }, 1000);
			                _this.$Message.success({duration:2, content:'数据成功修改！'});
			                
			                //成功在刷新一下主页上面的数据
			   				_this.getData();
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
                    title: '是否确定该条数据上线？',
                    
                    onOk: () => {
                        let user = '/api/yw/case/release/' + id;
				   		_this.$axios.put(user)
				   		.then((res)=>{
				   			if(res.data.success){
				   				_this.$Message.success({duration:2, content:'数据成功上线！'});
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
                    title: '是否确定该条数据下线？',
                    
                    onOk: () => {
                        let user = '/api/yw/case/offLine/' + id;
				   		_this.$axios.put(user)
				   		.then((res)=>{
				   			if(res.data.success){
				   				_this.$Message.success({duration:2, content:'数据已经下线！'});
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
		   		let user = '/api/yw/category/list/13/child';
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
			this.getData();
			//渲染子分类
			this.getChildClass()
		}
	}
</script>

<style scoped>
	
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