<template>
	<!--人员管理-->
	<div class="case-width">
		<div class="search">
			<span>姓名：</span>
        	<Input v-model.trim="search.name" placeholder="账户名称" clearable style="width: 200px" />
        	<span>手机号：</span>
        	<Input v-model.trim="search.phone" placeholder="手机号码" clearable style="width: 200px" />
        	<span>有效：</span>
        	<Select v-model="search.enable" style="width:200px">
		        <Option value="">全部</Option>
		        <Option value="1">有效</Option>
		        <Option value="0">无效</Option>
		    </Select>
		    <Button type="primary" style="margin-right: 20px;" @click="searchData()">查询</Button> 
		    
		    <Button type="primary" @click="addData()" v-if="isAdd">添加管理员</Button> 
		</div>
		<!--表格-->
		<Table border :columns="columns12" :data="data6" no-data-text='账户没有操作人信息！'>
	        <template slot-scope="{ row }" slot="name">
	            <strong>{{ row.name }}</strong>
	        </template>
	        <template slot-scope="{ row, index }" slot="action">
	            <Button type="primary" v-if="row.isEnable == 1" size="small" style="margin-right: 10px" @click="show(index)">修改</Button>
	            <Button type="error" v-if="row.isEnable == 1" size="small" @click="remove(row,index)">禁用</Button>
	            <Button type="success" v-if="row.isEnable == 0" size="small" @click="enable(row,index)">启用</Button>
	        </template>
    	</Table>
    	<!--分页器-->
    	<Page :total="nmb" show-total show-sizer @on-change='pageSize' @on-page-size-change='pageNuber' style='text-align: center;margin: 20px auto 0;'/>
    	<!--修改账号弹出层-->
    	<Modal
        v-model="modal6"
        :title="Title"
        ok-text="提交"
        :loading="loading"
        @on-ok="asyncOK">
        <div class="mask">
        	<span>账户：</span>
        	<Input v-model.trim="mask.name" placeholder="账户名称" clearable style="width: 300px" />
        </div>
        <div class="mask">
        	<span>重置密码：</span>
        	<Input v-model.trim="mask.password" placeholder="重置密码" clearable style="width: 300px" />
        </div>
        <div class="mask">
        	<span>电话号码：</span>
        	<Input v-model.trim="mask.phone" placeholder="电话号码" clearable style="width: 300px" />
        </div>
        <div class="mask">
        	<span>等级：</span>
        	<Select v-model="mask.level" style="width:300px">
		        <Option v-for="(item,index) in levData" :value="item.val" :key='index'>{{item.html}}</Option>
		    </Select>
        </div>
        
    	</Modal>
    	
    	<!--添加账号弹出层-->
    	<Modal
        v-model="modal7"
        :title="Tle"
        ok-text="提交"
        :loading="loading"
        @on-ok="sub">
        <div class="mask">
        	<span>名称：</span>
        	<Input v-model.trim="mosk.name" placeholder="添加账户名称" clearable style="width: 300px" />
        </div>
        <div class="mask">
        	<span>账户密码：</span>
        	<Input v-model.trim="mosk.password" placeholder="添加账户密码" clearable style="width: 300px" />
        </div>
        <div class="mask">
        	<span>电话号码：</span>
        	<Input v-model.trim="mosk.phone" placeholder="添加的电话号码" clearable style="width: 300px" />
        </div>
        <div class="mask">
        	<span>等级：</span>
        	<Select v-model.trim="mosk.level" style="width:300px">
		        <Option v-for="(item,index) in levData" :value="item.val" :key='index'>{{item.html}}</Option>
		    </Select>
        </div>
        
    	</Modal>
	</div>
</template>
<!--人员管理-->
<script>
	
	export default {
		name: 'Statistical',
		data(){
			return {
				//登录人等级
				lev: '1',
				//搜索数据
				search:{
					name: '',
					phone: '',
					enable: '',
				},
				//表格数据
				columns12: [
					{
                        title: '编号',
                        type: 'index'
                    },
                    {
                        title: '管理员名字',
                        key: 'name'
                    },
                    
//                  {
//                      title: '开始时间',
//                      key: 'createTime'
//                  },
                    {
                        title: '电话号码',
                        key: 'phone'
                    },
                    {
                        title: '操作人',
                        key: 'operator'
                    },
                    {
                        title: '等级',
                        key: 'level'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 200,
                        align: 'center'
                    }
                ],
                data6: [],
                //数据分页
                currentPage: 1,
                paSize: 10,
                //page分页器
                nmb: 10,
                //修改账号对话框数据
                mask: {},
                Title: '数据修改',
                modal6: false,
                loading: true,
                
                //添加账号对话框数据
                mosk: {
                	name: '',
                	password: '',
                	phone: '',
                	level: '2',
                },
                Tle: '账号添加',
                modal7: false,
                isAdd: true,
                //添加账户等级集合
                levData: [],
			}
		},
		methods:{
			
			//搜索查询
			searchData(){
				this.getData()
			},
			//添加管理员
			addData(){
				this.modal7 = true;
				this.mosk.name = '';
				this.mosk.password = '';
				this.mosk.phone = '';
				this.mosk.level = '2';
				
			},
			//添加管理员信息接口
			setMosk(){
				let _this = this;
				let user = '/api/yw/operator/save';
				_this.$axios.post(user,{
					name: _this.mosk.name,
					phone: _this.mosk.phone,
					level: _this.mosk.level,
					password: _this.mosk.password,
				})
				.then((res)=>{
					
	                if(res.data.success){
	                	setTimeout(() => {
		                    _this.modal7 = false;
		                }, 1500);
		                
		                _this.$Message.success({content: '您已经成功修改了该条数据！',duration: 2})
		                _this.getData();
	                }else{
	                	setTimeout(() => {
		                   _this.modal7 = false;
		                }, 1000);
	                	this.$Message.error({content: res.data.msg,duration: 2});
	                }
					
				})
				.catch((err)=>{
					_this.$Notice.warning({
		                   title: '网络错误，请刷新重试！'
		                });
				})
			},
			//添加管理员提交按钮
			sub(){
				this.setMosk()
				
			},
			//参数提交获取数据
			getData(){
				let _this = this;
				let user = '/api/yw/operator/list';
				_this.$axios.get(user,{
					params: {
						name: _this.search.name,
						phone: _this.search.phone,
						isEnable: _this.search.enable,
						currentPage: _this.currentPage,
                		pageSize: _this.paSize,
					}
				})
				.then((res)=>{
					_this.data6 = res.data.data.list;
					_this.nmb = res.data.data.total;
				})
				.catch((err)=>{
					_this.$Notice.warning({
		                   title: '网络错误，请刷新重试！'
		                });
				})
			},
			//重置账户信息接口
			setPeople(){
				let _this = this;
				let user = '/api/yw/operator/edit';
				_this.$axios.put(user,{
					id: _this.mask.id,
					name: _this.mask.name,
					phone: _this.mask.phone,
					level: _this.mask.level,
					password: _this.mask.password,
				})
				.then((res)=>{
	                if(res.data.success){
	                	setTimeout(() => {
		                    _this.modal6 = false;
		                }, 1500);
		                
		                _this.$Message.success({content: '您已经成功修改了该条数据！',duration: 2})
	                }else{
	                	setTimeout(() => {
		                   _this.modal6 = false;
		                }, 1000);
	                	this.$Message.error({content: res.data.msg,duration: 2});
	                }
					
				})
				.catch((err)=>{
					_this.$Notice.warning({
		                   title: '网络错误，请刷新重试！'
		                });
				})
			},
			//禁用跟启用的方法
			isEnable(row){
				let _this = this;
				let user = '/api/yw/operator/isEnable/'+row.id;
				_this.$axios.put(user)
				.then((res)=>{
					if(res.data.success){
						if(row.isEnable == 0){
							row.isEnable = 1,
							_this.$Message.success({content: row.name + ' 这个账户已被启用！',duration: 2})
							
						}else if(row.isEnable == 1){
							row.isEnable = 0,
							_this.$Message.success({content: row.name + ' 这个账户已被禁用！',duration: 2})
						}
					}else{
						this.$Message.error({content: res.data.msg,duration: 2});
					}
	                
				})
				.catch((err)=>{
					_this.$Notice.warning({
		                   title: '网络错误，请刷新重试！'
		                });
				})
			},
			//action方法
			show (index) {
				this.modal6 = true;
				this.mask = this.data6[index];
				this.mask.password = '';
            },
            remove (row,index) {
            	
            	this.isEnable(row);

            },
            enable(row,index){
            	
            	this.isEnable(row);
            	
            },
            //页码数跟每一页的数量
            pageSize(size){
            	this.currentPage = size;
            	this.getData();
            },
            pageNuber(size){
            	this.paSize = size;
            	this.getData();
            	
            },
            //修改层确定按钮
            asyncOK () {
            	this.setPeople();
                
            },
            //添加层确定按钮
		},
		created(){
			
			//本地获取登录人等级
			
			let level = this.$storage.getKey('level');
			this.lev = level;
			let levData = [];
			switch(level){
				case '0':
					levData.push({val:'1',html: '1'},{val:'2',html: '2'})
					break;
				case '1':
					levData.push({val:'2',html: '2'})
					break;
				case '2':
					this.isAdd = false
					break;
				
			}
			this.levData = levData;
			//获取总数量
			
			//获取每一页的数据
			this.getData();
		}
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
	.mask{
		margin: 20px 0;
	}
	.mask span{
		display: inline-block;
		width: 120px;
		padding: 0 20px;
	}
	
	
</style>