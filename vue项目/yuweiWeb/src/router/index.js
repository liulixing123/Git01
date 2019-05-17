import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/page/Login'
import home from '@/components/page/Home'
import message from '@/components/page/Message'
import points from '@/components/page/Points'
import statistical from '@/components/page/Statistical'
import config from '@/components/page/Config'
//案例-课程-新闻
import course from '@/components/page/Course'
import Case from '@/components/page/Case'
import news from '@/components/page/News'
//师资-达人-学生
import teachers from '@/components/page/Teachers'
import talent from '@/components/page/Talent'
import students from '@/components/page/Students'
import works from '@/components/page/Works'
import worklist from '@/components/page/Worklist'
//banner-合作机构-疑难解答
import banner from '@/components/page/Banner'
import cooperation from '@/components/page/Cooperation'
import answer from '@/components/page/Answer'


import storage from '../model/storage.js';


Vue.use(Router)

//let router = new Router({
//	mode: 'history',
//routes: [
//  {
//    path: '/',
//    component: login
//  },
//  {
//    path: '/login',
//    name: 'Login',
//    component: login
//  },
//  {
//    path: '/home',
//    name: 'Home',
//    component: home,
//    children:[
//    	{
//    		path: '/message',
//			    name: 'Message',
//			    component: message,
//    	},
//    	{
//    		path: '/points',
//			    name: 'Points',
//			    component: points,
//    	},
//    	{//人员管理
//    		path: '/statistical',
//			    name: 'Statistical',
//			    component: statistical,
//    	},
//    	
//    	{	//师资-达人-学生
//			    		path: '/szdrxs/teachers',
//					    name: 'Teachers',
//					    component: teachers,
//			  },
//			  {
//			    		path: '/szdrxs/talent',
//					    name: 'Talent',
//					    component: talent,
//			  },
//			  {
//			    		path: '/szdrxs/students',
//					    name: 'Students',
//					    component: students,
//			  },
//			  {
//			    		path: '/szdrxs/works',
//					    name: 'Works',
//					    component: works,
//			  },
//			  {
//			    		path: '/works/worklist',
//					    name: 'Worklist',
//					    component: worklist,
//			  },
//			  
//			  { //案例-课程-新闻
//		      		path: '/alkcxw/case',
//					    name: 'Case',
//					    component: Case,
//		    },
//		    {
//		      		path: '/alkcxw/course',
//					    name: 'Course',
//					    component: course,
//		    },
//		    {
//		      		path: '/alkcxw/news',
//					    name: 'News',
//					    component: news,
//		    },
//		    
//		    { //banner-合作机构-疑难解答
//		      		path: '/bhzjgynjd/banner',
//					    name: 'Banner',
//					    component: banner,
//		    },
//		    {
//		      		path: '/bhzjgynjd/cooperation',
//					    name: 'Cooperation',
//					    component: cooperation,
//		    },
//		    {
//		      		path: '/bhzjgynjd/answer',
//					    name: 'Answer',
//					    component: answer,
//		    },
//			  
//    ],
//    redirect: '/statistical'
//  }
//]
//})

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/login',
      name: 'Login',
      component: login
    },
    {
      path: '/home',
      name: 'Home',
      component: home,
      children:[
      	{
      		path: '/config',
			    name: 'Config',
			    component: config,
      	},
      	{
      		path: '/message',
			    name: 'Message',
			    component: message,
      	},
      	{
      		path: '/points',
			    name: 'Points',
			    component: points,
      	},
      	{//人员管理
      		path: '/statistical',
			    name: 'Statistical',
			    component: statistical,
      	},
      	
      	{	//师资-达人-学生
			    		path: '/szdrxs/teachers',
					    name: 'Teachers',
					    component: teachers,
			  },
			  {
			    		path: '/szdrxs/talent',
					    name: 'Talent',
					    component: talent,
			  },
			  {
			    		path: '/szdrxs/students',
					    name: 'Students',
					    component: students,
			  },
			  {
			    		path: '/szdrxs/works',
					    name: 'Works',
					    component: works,
			  },
			  {
			    		path: '/works/worklist',
					    name: 'Worklist',
					    component: worklist,
			  },
			  
			  { //案例-课程-新闻
		      		path: '/alkcxw/case',
					    name: 'Case',
					    component: Case,
		    },
		    {
		      		path: '/alkcxw/course',
					    name: 'Course',
					    component: course,
		    },
		    {
		      		path: '/alkcxw/news',
					    name: 'News',
					    component: news,
		    },
		    
		    { //banner-合作机构-疑难解答
		      		path: '/bhzjgynjd/banner',
					    name: 'Banner',
					    component: banner,
		    },
		    {
		      		path: '/bhzjgynjd/cooperation',
					    name: 'Cooperation',
					    component: cooperation,
		    },
		    {
		      		path: '/bhzjgynjd/answer',
					    name: 'Answer',
					    component: answer,
		    },
			  
      ],
      redirect: '/statistical'
    }
  ]
});