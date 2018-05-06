<template>
  <div>
    <sticky>
      <tab v-model="tabIndex">
        <tab-item class="vux-center" v-for="({title}, index) in buyTabs" :key="'tab-buy-' + index">{{ title }}</tab-item>
      </tab>
    </sticky>
    <div id="buy-container">
      <div id="category" v-show="selectedTab === 'goods'">
        <div
          v-for="(item, index) in categories"
          :key="'ticket-type-' + index"
          class="pointer"
          @click="handleClickCard(index)"
        >
          <masker style="border-radius: 5px;">
            <div class="m-img"></div>
            <div slot="content" class="m-title">
              {{item.title}}
              <br/>
              <div class="onSell">
                <span>出售中：</span>
                <span class="count">{{ item.onsell }}个，</span>
              </div>
              <div class="dealt">
                <span>已成交：</span>
                <span class="count">{{ item.dealt }}个</span>
              </div>
            </div>
          </masker>
          <ticket-list v-if="selectedType === index" @click="showDetail"></ticket-list>
        </div>
        <divider>到底啦 (*^_^*)</divider>
      </div>
      <div id="favorite" v-if="renderFavorite" v-show="selectedTab === 'favorite'">
        我的收藏
      </div>
    </div>
    <div v-transfer-dom>
      <popup v-model="showedDetail" position="bottom">
        <div class="card">
          <header>
            123
          </header>
          <section>
            123
          </section>
        </div>
        <div style="padding: 15px;">
          <x-button @click.native="showedDetail = false" plain type="primary"> Close Me </x-button>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import {
  Divider,
  Masker,
  Tab,
  TabItem,
  Sticky,
  TransferDom,
  Popup,
  XButton
} from 'vux'

import {
  TicketList
} from '@/components/trade'

export default {
  name: 'sell',
  directives: {
    TransferDom
  },
  components: {
    Divider,
    Masker,
    Tab,
    TabItem,
    Sticky,
    TicketList,
    TransferDom,
    Popup,
    XButton
  },
  data () {
    return {
      tabIndex: 0,
      selectedTab: 'goods',
      selectedType: 0,
      showedDetail: false,
      buyTabs: [
        { type: 'goods', title: '全部商品' },
        { type: 'favorite', title: '我的收藏' }
      ],
      categories: [
        {
          title: '购物券',
          onsell: '66',
          dealt: '76069'
        },
        {
          title: '票务影视',
          onsell: '116',
          dealt: '16813'
        },
        {
          title: '电影票',
          onsell: '72',
          dealt: '18473'
        },
        {
          title: '美食券',
          onsell: '66',
          dealt: '76069'
        },
        {
          title: '咖啡券',
          onsell: '23',
          dealt: '56679'
        },
        {
          title: '出行券',
          onsell: '15',
          dealt: '28606'
        },
        {
          title: '流量娱乐',
          onsell: '6',
          dealt: '11964'
        }
      ],
      renderFavorite: false
    }
  },
  mounted () {},
  methods: {
    handleClickCard (index = 0) {
      if (this.selectedType === index) {
        this.selectedType = -1
      } else {
        this.selectedType = index
      }
    },
    showDetail (id = '0') {
      this.showedDetail = true
    }
  },
  watch: {
    tabIndex (index) {
      this.selectedTab = this.buyTabs[index].type
      if (!this.renderFavorite) this.renderFavorite = true
    }
  }
}
</script>

<style lang="less" scoped>
.m-img {
  padding-bottom: 33%;
  display: block;
  position: relative;
  max-width: 100%;
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  border-radius: 2px;
}

.m-title {
  color: #fff;
  text-align: center;
  text-shadow: 0 0 2px rgba(0, 0, 0, .5);
  font-weight: 500;
  font-size: 2rem;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}

.onSell, .dealt {
  font-size: 1rem;
  padding-top: 4px;
  /*border-bottom: 1px solid #f0f0f0;*/
  display: inline-block;
  margin-top: 5px;
}

#buy-container {
  margin-bottom: 60px;
  padding: 10px;
}

#category {
  &>div {
    margin-bottom: 10px;
  }
}
</style>
