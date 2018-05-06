import Vue from 'vue'
import Router from 'vue-router'
import Trade from '@/views/trade.vue'
import Buy from '@/views/trade/buy.vue'

// trade pages
const TradeList = () => import('@/views/trade/tradeList.vue')
const Sell = () => import('@/views/trade/sell.vue')
const Business = () => import('@/views/trade/business.vue')
const Information = () => import('@/views/trade/information.vue')

// activity pages
const Activity = () => import('@/views/activity.vue')
const ActivityList = () => import('@/views/activity/activityList.vue')
const AllAct = () => import('@/views/activity/all.vue')
const TodayAct = () => import('@/views/activity/today.vue')
const ConfigAct = () => import('@/views/activity/config.vue')
const StrategyAct = () => import('@/views/activity/strategy.vue')

// my pages
const Mine = () => import('@/views/mine.vue')

let router = new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      redirect: '/trade/buy'
    },
    {
      path: '/activity',
      component: Activity,
      children: [
        {
          path: '',
          name: 'ActivityList',
          component: ActivityList,
          meta: {
            title: '活动管理'
          }
        },
        {
          path: 'all',
          name: 'All',
          component: AllAct,
          meta: {
            title: '活动管理 - 全部活动'
          }
        },
        {
          path: 'today',
          name: 'Today',
          component: TodayAct,
          meta: {
            title: '活动管理 - 今天活动'
          }
        },
        {
          path: 'config',
          name: 'Config',
          component: ConfigAct,
          meta: {
            title: '活动管理 - 提醒设置'
          }
        },
        {
          path: 'strategy',
          name: 'Strategy',
          component: StrategyAct,
          meta: {
            title: '活动管理 - 活动攻略'
          }
        }
      ]
    },
    {
      path: '/trade',
      component: Trade,
      children: [
        {
          path: '',
          name: 'TradeList',
          component: TradeList,
          meta: {
            title: '权益交易'
          }
        },
        {
          path: 'buy',
          name: 'Buy',
          component: Buy,
          meta: {
            title: '权益交易 - 我要买'
          }
        },
        {
          path: 'sell',
          name: 'Sell',
          component: Sell,
          meta: {
            title: '权益交易 - 我要卖'
          }
        },
        {
          path: 'business',
          name: 'Business',
          component: Business,
          meta: {
            title: '权益交易 - 券码招商'
          }
        },
        {
          path: 'information',
          name: 'Information',
          component: Information,
          meta: {
            title: '权益交易 - 券码咨询'
          }
        }
      ]
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine,
      meta: {
        title: '我的'
      }
    }
  ]
})

export default router
