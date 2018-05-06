<template>
  <div>
    <swiper :list="swiperItems" v-model="swiperItemIndex"></swiper>
    <grid v-for="(items, i) in activityCategory" :key="i">
      <grid-item
        v-for="(item, j) in items"
        :key="j"
        :label="item.label"
        :link="'/activity/' + item.link"
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
  name: 'activity-list',
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
      activityCategory: [
        [
          { label: '全部活动', link: 'all' },
          { label: '今日必撸', link: 'today' }
        ],
        [
          { label: '提醒设置', link: 'config' },
          { label: '活动攻略', link: 'strategy' }
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
</style>
