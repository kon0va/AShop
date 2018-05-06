<template>
	<div class="mine-container">
		<div class="mine-head-wrap">
			<div class="mine-info">
        <div class="avator">
          <img :src="authUser.avatarUrl" alt="头像">
        </div>
				<p class="name">{{ authUser.nickname }}</p>
				<p class="level">信用分：100</p>
        <div class="recommend">
          <p>我要推荐</p>
          <p>推荐列表</p>
        </div>
			</div>
		</div>
		<div class="mine-wallet-wrap">
			<cell 
				class="mine-order-all"
				title="我的钱包"
      >
			</cell>
      <grid>
				<grid-item>
          <p>可提现账户余额</p>
          <p class="money">￥0.00</p>
				</grid-item>
        <grid-item>
          <p>冻结账户余额</p>
          <p class="money">￥0.00</p>
				</grid-item>
			</grid>
      <tab v-model="tabIndex">
        <tab-item class="vux-center" v-for="({title}, index) in orderTabs" :key="'tab-order-' + index">{{ title }}</tab-item>
      </tab>
      <grid>
				<grid-item
          v-for="({ title, link }, index) in orderList"
          :key="'order-' + index"
        >
          <div
            class="vux-center"
            @click="showOrderDetail(index)"
          >
            {{ title }}
          </div>
				</grid-item>
			</grid>
      <cell title="我的成就"></cell>
      <grid>
				<grid-item>
          <p>
            <span>
              {{ isSellTab ? '出售单数' : '购买单数' }}：
            </span>
            <span>0</span>
          </p>
          <p>
            <span>
              {{ isSellTab ? '出售信誉' : '购买信誉' }}：
            </span>
            <span>0%</span>
          </p>
          <p>
            <span>
              {{ isSellTab ? '共出售' : '共花费' }}：
            </span>
            <span>￥0.00</span>
          </p>
				</grid-item>
        <grid-item>
          <p>
            {{ isSellTab ? '出售盈利' : '购买节省' }}
          </p>
          <p class="money">￥0.00</p>
          <p>&nbsp;</p>
				</grid-item>
			</grid>
		</div>
    <div>
      <popup v-model="showedOrderDetail" position="bottom">
        <div class="card">
          <header>
            交易明细
            <span class="vux-close float-right" @click="showedOrderDetail = false"></span>
          </header>
          <section>
            <tab v-model="detailTabIndex">
              <tab-item class="vux-center" v-for="({title}, index) in orderList" :key="'tab-order-' + index">{{ title }}</tab-item>
            </tab>
          </section>
        </div>
      </popup>
    </div>
	</div>
</template>
<script>
import {
  Badge,
  Cell,
  Group,
  Grid,
  GridItem,
  Tab,
  TabItem,
  Popup
} from 'vux'

import { mapState } from 'vuex'

export default {
  name: 'mine',
  components: {
    Badge,
    Group,
    Cell,
    Grid,
    GridItem,
    Tab,
    TabItem,
    Popup
  },
  data () {
    return {
      tabIndex: 0,
      detailTabIndex: 0,
      orderTabs: [
        { type: 'sell', title: '我的卖单' },
        { type: 'buy', title: '我的买单' }
      ],
      isSellTab: true,
      selectedOrder: 'sell',
      orderList: [],
      orderSellList: [
        { title: '出售中', link: '#' },
        { title: '已下架', link: '#' },
        { title: '已出售', link: '#' },
        { title: '纠纷中', link: '#' }
      ],
      orderBuyList: [
        { title: '待支付', link: '#' },
        { title: '待使用', link: '#' },
        { title: '已完成', link: '#' },
        { title: '纠纷中', link: '#' }
      ],
      showedOrderDetail: false
    }
  },
  computed: {
    ...mapState([
      'authUser'
    ])
  },
  mounted () {
    this.orderList = this.orderSellList
  },
  methods: {
    showOrderDetail (tab = 0) {
      this.showedOrderDetail = true
    }
  },
  watch: {
    tabIndex (value) {
      this.selectedOrder = this.orderTabs[value].type
      this.isSellTab = this.selectedOrder === 'sell'
      this.orderList = this.isSellTab ? this.orderSellList : this.orderBuyList
    }
  }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/close';

.mine {
	background: #fff;
}

.mine-head-wrap {
	height: 120px;
	background: #fff;
	padding: 30px;
	position: relative;
}

.mine-head-wrap .setting {
	position: absolute;
	display: inline-block;
	top: 10px;
	right: 10px;
	color: #868683;
	padding: 4px;
}

.mine-head-wrap img {
	width: 60px;
	height: 60px;
	float: left;
}

.mine-head-wrap {
  .mine-info {
    overflow: hidden;
    height: 100%;

    .name {
      font-size: 24px;
      font-weight: 500px;
      color: #404040;
    }

    .recommend {
      font-size: 14px;
      line-height: 20px;
      float: right;
      position: absolute;
      right: 30px;
      top: 30px;
    }
  }
}

.mine-head-wrap {
  .recommend {
    p {
      padding: 5px;

      &:first-child {
        padding-bottom: 4px;
        border-bottom: 1px solid #DDD;
      }
    }
  }
}
</style>
