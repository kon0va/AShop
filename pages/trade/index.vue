<template>
  <div>
    <swiper :list="swiperItems" v-model="swiperItemIndex"></swiper>
			<grid v-for="(entries, i) in tradeCategorys" :key="i">
				<grid-item
					v-for="(entry, j) in entries"
					:key="j"
					:label="entry.label"
					:link="entry.link"
				>
				</grid-item>
			</grid>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Grid, GridItem, Swiper, SwiperItem } from 'vux'

const baseList = [{
  url: 'javascript:',
  img: '',
  title: '今日必撸-不可错过的羊毛'
}]

export default {
  name: 'trade-list',
  components: {
    Flexbox,
    FlexboxItem,
    Grid,
    GridItem,
    Swiper,
    SwiperItem
  },
  data () {
    return {
      tradeCategorys: [
        [
          { label: '我要买', link: '/trade/buy' },
          { label: '我要卖', link: '/trade/sell' }
        ],
        [
          { label: '券码招商', link: '/trade/business' },
          { label: '券码资讯', link: '/trade/information' }
        ]
      ],
      swiperItemIndex: 1,
      swiperItems: baseList
    }
  },
  methods: {}
}
</script>

<style scaped>
.page {
  margin: 3rem;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
}

.grid-block {
  text-align: center;
  color: #fff;
  background-color: #20b907;
  border-radius: 1.5rem;
  margin: 1.5rem;
  margin-top: 0;
  height: 20rem;
  cursor: pointer;
}

.weui-grids {
  background-color: white;
}

.cbox {
  text-align: center;
}
.cbox-inner {
  padding: 15px 0;
  width: 100%;
  height: 100%;
}
</style>
