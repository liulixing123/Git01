<template>
	<!--banner-->
	<div class="case-width">
		
		<!--搜索-->
		<div class="search">
		    <Button type="primary" @click="showMask" style="float: right; width: 140px;">添加Banner</Button>
		</div>
		
		<!--表格展示-->
		<Table border :columns="columns7" style="width: 100%;" :data="data6"></Table>
		
		<!--分页器-->
		<Page :total="total" show-total @on-change='addPage' @on-page-size-change='addSize' show-sizer style="text-align: center; margin: 20px auto 0;" />
		
		<!--添加课程弹窗-->
		<Modal title="添加Banner数据" v-model="modal9" :loading="loading" fullscreen ok-text="提交" @on-ok='subData'>
			<div class="modal-width">
		        <div class="mask">
		        	<span>开始时间：</span>
		        	<DatePicker type="datetime" v-model='modal.startTime' format='yyyy-MM-dd HH:mm:ss' @on-change='modal.startTime=$event' placeholder="选择图片开始时间" style="width: 900px"></DatePicker>
		        </div>
		        
		        <div class="mask">
		        	<span>结束时间：</span>
		        	<DatePicker type="datetime" v-model='modal.endTime' format='yyyy-MM-dd HH:mm:ss' @on-change='modal.endTime=$event' placeholder="选择图片结束时间" style="width: 900px"></DatePicker>
		        </div>
		        
		        <div class="mask">
		        	<span>序列号：</span>
		        	<Input v-model.trim="modal.sortNum" placeholder="添加数字越小越靠前" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>图片链接：</span>
		        	<Input v-model.trim="modal.targetUrl" autofocus placeholder="添加图片链接" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask file-title">
		        	<div class="span">轮播图：</div>
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
		        
	        </div>
	    </Modal>
		
		
		<!--修改课程弹窗-->
		<Modal title="修改Banner数据" v-model="modal88" :loading="loading" fullscreen ok-text="提交" @on-ok='modifyData'>
			<div class="modal-width">
		        <div class="mask">
		        	<span>开始时间：</span>
		        	<DatePicker type="datetime" v-model='modal.startTime' format='yyyy-MM-dd HH:mm:ss' @on-change='modal.startTime=$event' placeholder="选择图片开始时间" style="width: 900px"></DatePicker>
		        </div>
		        
		        <div class="mask">
		        	<span>结束时间：</span>
		        	<DatePicker type="datetime" v-model='modal.endTime' format='yyyy-MM-dd HH:mm:ss' @on-change='modal.endTime=$event' placeholder="选择图片结束时间" style="width: 900px"></DatePicker>
		        </div>
		        
		        <div class="mask">
		        	<span>序列号：</span>
		        	<Input v-model.trim="modal.sortNum" placeholder="添加数字越小越靠前" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask">
		        	<span>图片链接：</span>
		        	<Input v-model.trim="modal.targetUrl" autofocus placeholder="添加图片链接" clearable style="width: 900px" />
		        </div>
		        
		        <div class="mask file-title">
		        	<div class="span">轮播图：</div>
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
		        
	        </div>
	    </Modal>
		
	</div>
</template>

<script>
	
	export default {
		name: 'Banner',
		data(){
			return {
				//搜索数据
				search: {
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
					startTime: '',
					endTime: '',
					sortNum: '',
					targetUrl: '',
					imgURL: '',
				},
				fileData: '',
				
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
                        title: '开始时间',
                        key: 'startTime',
                        
                    },
                    {
                        title: '结束时间',
                        key: 'endTime'
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
		   	let user = '/api/yw/banner/list';
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
			   	modal.startTime = '',
			   	modal.endTime = '',
			   	modal.sortNum = '',
			   	modal.targetUrl = '',
			   	modal.imgURL = '1',
			   	this.imgSrc = '';
		   },
		   //选择时间时on-chang事件
		   addStartTime(time){
		   		this.modal.startTime = time
		   },
		   addEndTime(time){
		   		this.modal.endTime = time
		   },
		   //添加课程对话框确定执行的操作
		   subData(){
		   		let _this = this;
		   		_this.loading = true;
		   		
		   		let user = '/api/yw/banner/save';
		   		if(_this.modal.startTime !== '' && _this.modal.endTime !== ''){
		   			_this.$axios.post(user,{
		   				startTime: _this.modal.startTime,
		   				endTime: _this.modal.endTime,
		   				targetUrl: _this.modal.targetUrl,
		   				imgUrl: _this.modal.imgURL,
						sortNum: _this.modal.sortNum,
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
		   			alert('轮播图的开始结束时间是必填选项！')
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
		   		let user = '/api/yw/banner/findById/' + id;
		   		_this.$axios.get(user)
		   		.then((res)=>{
		   			
		   			if(res.data.success){
		   				_this.modal88 = true;
		   				let modal = _this.modal;
		   				let data = res.data.data;
		   				let time = data.startTime;
		   				modal.startTime= data.startTime;
		   				modal.endTime= data.endTime;
		   				
		   				modal.targetUrl = data.targetUrl;
		   				modal.imgURL = data.imgUrl;
					   	modal.sortNum = data.sortNum;
		   				
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
		   		
		   		if(modal.startTime =='' || modal.endTime ==''){
		   			alert('开始结束时间为必选项！')
		   			setTimeout(() => {
			                   _this.loading = false;
			                }, 1000);
		   		}else{
		   			
		   			let user = '/api/yw/banner/edit';
			   		_this.$axios.put(user,{
			   			id: _this.id,
			   			//数据格式转换
			   			startTime: new Date(modal.startTime).format("yyyy-MM-dd hh:mm:ss"),
			   			endTime: new Date(modal.endTime).format("yyyy-MM-dd hh:mm:ss"),
			   			targetUrl: modal.targetUrl,
		   				imgUrl: modal.imgURL,
						sortNum: modal.sortNum,
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
                        let user = '/api/yw/banner/isEnable/' + id;
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
                        let user = '/api/yw/banner/isEnable/' + id;
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
		width: 99%;
		height: 32px;
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