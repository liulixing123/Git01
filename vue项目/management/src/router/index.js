import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import MessageBoard from '@/components/MessageBoard'
import MessageBoardTwo from '@/components/MessageBoardTwo'
import Distribution from '@/components/Distribution'
import Top from '@/components/common/Top'
import DistributionList from '@/components/DistributionList'
import AddData from '@/components/AddData'
import ModifyData from '@/components/ModifyData'
import DistributionPage from '@/components/DistributionPage'
import DistributionPageKf from '@/components/DistributionPageKf'
import DistributionPageQt from '@/components/DistributionPageQt'
import DistributionPageQtSj from '@/components/DistributionPageQtSj'
import Empty from '@/components/Empty'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/messageboard',
      name: 'MessageBoard',
      component: MessageBoard
    },
    {
      path: '/distribution',
      name: 'Distribution',
      component: Distribution
    },
    {
      path: '/distributionlist',
      name: 'DistributionList',
      component: DistributionList,
    },
    {
      path: '/messageboardtwo',
      name: 'MessageBoardTwo',
      component: MessageBoardTwo,
    },
    {
      path: '/adddata',
      name: 'AddData',
      component: AddData,
    },
    {
      path: '/modifydata',
      name: 'ModifyData',
      component: ModifyData,
    },
    {
      path: '/distributionpage',
      name: 'DistributionPage',
      component: DistributionPage,
    },
    {
      path: '/distributionpagekf',
      name: 'DistributionPageKf',
      component: DistributionPageKf,
    },
    {
      path: '/distributionpageqt',
      name: 'DistributionPageQt',
      component: DistributionPageQt,
    },
    {
      path: '/distributionpageqtsj',
      name: 'DistributionPageQtSj',
      component: DistributionPageQtSj,
    },
    {
      path: '/empty',
      name: 'Empty',
      component: Empty,
    },
  ]
})
