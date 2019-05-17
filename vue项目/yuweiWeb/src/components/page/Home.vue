<template>
	<div class="layout">
		<Layout>
			<Header>
				<Menu mode="horizontal" theme="dark" active-name="1">
					<router-link class='logo' to='/home' tag='div'>
						<img src="../../assets/images/logow.png" alt="" />
					</router-link>
					<div class="text">
						<Dropdown trigger="click">
					        <a href="javascript:void(0)" style='color: #fff;'>
					        	<Icon type="md-person" size='18' style='padding-bottom: 3px; padding-right: 3px;' />
					                        {{name}}
					            <Icon type="ios-arrow-down"></Icon>
					        </a>
					        <DropdownMenu slot="list">
					            <DropdownItem @click.native='exit'>退出登录</DropdownItem>
					        </DropdownMenu>
					    </Dropdown>
					</div>
				</Menu>
			</Header>

			<Layout>
				<Sider hide-trigger :style="{background: '#fff'}">
					<Menu :active-name="user" accordion :open-names="[open]" ref='use' style="width: 200px;">

						<MenuItem name="statistical" to='/statistical'>
						<Icon type="ios-people" /> 人员管理列表
						</MenuItem>
						
						<Submenu name="alkcxw">
							<template slot="title">
								<Icon type="ios-photos" /> 案例-课程-新闻
							</template>
							<MenuItem name="case" to='/alkcxw/case'><Icon type="ios-book" />案例</MenuItem>
							<MenuItem name="course" to='/alkcxw/course'><Icon type="ios-map" />课程</MenuItem>
							<MenuItem name="news" to='/alkcxw/news'><Icon type="ios-bulb" />新闻</MenuItem>
						</Submenu>
						
						<Submenu name="szdrxs">
							<template slot="title">
								<Icon type="md-podium" /> 师资-达人-学生
							</template>
							<MenuItem name="teachers" to='/szdrxs/teachers'><Icon type="md-people" />师资</MenuItem>
							<MenuItem name="talent" to='/szdrxs/talent'><Icon type="md-person" />达人</MenuItem>
							<MenuItem name="students" to='/szdrxs/students'><Icon type="md-contacts" />学生</MenuItem>
							<MenuItem name="works" to='/szdrxs/works'><Icon type="md-contacts" />学生作品</MenuItem>
						</Submenu>
						
						<Submenu name="bhzjgynjd">
							<template slot="title">
								<Icon type="md-barcode" /> 轮播-合作-解答
							</template>
							<MenuItem name="banner" to='/bhzjgynjd/banner'><Icon type="ios-images" />banner</MenuItem>
							<MenuItem name="cooperation" to='/bhzjgynjd/cooperation'><Icon type="md-medal" />合作机构</MenuItem>
							<MenuItem name="answer" to='/bhzjgynjd/answer'><Icon type="md-text" />疑难解答</MenuItem>
						</Submenu>
						
						<MenuItem name="message" to='/message'>
						<Icon type="ios-create" /> 留言
						</MenuItem>
						<MenuItem name="points" to='/points'>
						<Icon type="ios-pricetags" /> 分类
						</MenuItem>
						<MenuItem name="config" to='/config'>
						<Icon type="md-analytics" /> 配置信息
						</MenuItem>

					</Menu>
				</Sider>
				<Layout :style="{padding: '0 24px 24px',height: height+'px',}">
					<Breadcrumb :style="{margin: '24px 0'}">
						<BreadcrumbItem to='/home'>Home</BreadcrumbItem>
						<BreadcrumbItem>{{itemData}}</BreadcrumbItem>
						<BreadcrumbItem>{{$store.state.use}}</BreadcrumbItem>

					</Breadcrumb>
					<Content class='over' :style="{padding: '24px', background: '#fff'}">
						  <router-view />
					</Content>
				</Layout>
			</Layout>
		</Layout>
	</div>
</template>

<script>
	import animate from 'animate.css'
	export default {
		name: 'Home',
		data() {
			return {
				user: '',
				itemData: '',
				height: window.innerHeight-65,
				open: '',
				name: '',
			}
		},
		methods: {
			exit(){
				let _this = this;
				this.$Modal.confirm({
                    title: '是否确定退出？',
                    onOk: () => {
                    		_this.$storage.remove('name');
							_this.$storage.remove('token');
							_this.$router.push({
								path: '/login'
							})
							_this.$Message.success({duration:1, content:'已成功退出！'});
                        
                    }
                });
				
				
			}
		},
		//监控路由的变化
		watch:{
			$route:{
				handler(to,from){
					
					let leng = to.path.split('/').length;
					if(leng==2){
						this.user = this.$route.path.slice(1);
						this.open = '';
					}else if(leng==3){
						let user = this.$route.path.split('/')[2];
						let open = this.$route.path.split('/')[1];
						if(user == 'worklist' && open == 'works'){
							this.user = 'works';
							this.open = 'szdrxs';
						}else{
							this.user = this.$route.path.split('/')[2];
							this.open = this.$route.path.split('/')[1];
						}
					}
					
					switch(to.name) {
							case 'Statistical':
								this.itemData = '人员管理列表';
								break;
							case 'Case':
								this.itemData = '案列';
								break;
							case 'Course':
								this.itemData = '课程';
								break;
							case 'News':
								this.itemData = '新闻';
								break;
							case 'Teachers':
								this.itemData = '师资';
								break;
							case 'Talent':
								this.itemData = '达人';
								break;
							case 'Students':
								this.itemData = '学生';
								break;
							case 'Works':
								this.itemData = '学生作品';
								break;
							case 'Banner':
								this.itemData = 'Banner';
								break;
							case 'Cooperation':
								this.itemData = '合作机构';
								break;
							case 'Answer':
								this.itemData = '疑难解答';
								break;
							case 'Message':
								this.itemData = '留言';
								break;
							case 'Points':
								this.itemData = '分类';
								break;
							case 'Worklist':
								this.itemData = '学生作品详情';
								break;
							case 'Config':
								this.itemData = '配置信息';
								break;
						}
					//页面更新时通过路由将name值绑定到active-name上并更新判断name所对应的面包屑的值
					this.$nextTick(() => {
						this.$refs.use.updateActiveName();
						this.$refs.use.updateOpened();
					});
				},
				immediate: true
			}
		},
		created(){
			this.name = this.$storage.getKey('name');
		}

	}
</script>

<style scoped>
	.layout {
		border-bottom: 1px solid #d7dde4;
		background: #f5f7f9;
		position: relative;
		overflow: hidden;
	}
	.layout>>>.ivu-layout-header{
		padding: 0 24px;
	}
	.logo{
		width: 180px;
		height: 40px;
		padding-top: 12px;
		float: left;
	}
	.logo img{
		display: block;
		width: 100%;
		height: auto;
	}
	.text{
		float: right;
		color: #fff;
		font-family: "微软雅黑";
		font-size: 16px;
		margin-right: 75px;
	}
	.text>>>.ivu-dropdown-item{
		font-size: 16px !important;
		padding: 15px 30px;
	}
	
	.layout-logo {
		width: 100px;
		height: 30px;
		background: #5b6270;
		border-radius: 3px;
		float: left;
		position: relative;
		top: 15px;
		left: 20px;
	}
	
	.layout-nav {
		width: 420px;
		margin: 0 auto;
		margin-right: 20px;
	}
	.abs{
		position: absolute;
		width:calc(100% - 296px);
	}
	.over{
		overflow-y: auto;
	}
	
	
	
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 1s;
  position: absolute;
  width:calc(100% - 296px);
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

	
</style>