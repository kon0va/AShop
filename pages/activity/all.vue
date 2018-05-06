<template>
  <div>
    <sticky>
      <tab>
        <tab-item class="vux-center" :selected="selectedTab === key" v-for="({title}, key) in activityTabs" @click="selectedTab = key" :key="'tab-' + key">{{ title }}</tab-item>
      </tab>
    </sticky>
    <div class="activity-panel">
      <activity-card
        v-for="(activity, index) in activities"
        :key="'activity-no-' + index"
        :activity="activity"
        @click="showDetail"
        @like="likeOrDeleteActivity"
        @recover="recoverActivity"
      >
      </activity-card>
    </div>
    <div>
      <popup v-model="show12" position="bottom">
        <div class="card">
          <header>
            {{ selectedActivity.bank || '默认' }} | {{ selectedActivity.title || '测试活动' }}
          </header>
          <section>
            <p>({{ selectedActivity.time || '' }})</p>
            <p>{{ selectedActivity.detail || '' }}</p>
          </section>
        </div>
        <div style="padding: 15px;">
          <x-button @click.native="show12 = false" plain type="primary"> Close Me </x-button>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import {
  ActivityCard
} from '@/components/activity'

import {
  Tab,
  TabItem,
  Sticky,
  Popup,
  XButton
} from 'vux'

export default {
  name: 'all',
  components: {
    ActivityCard,
    Tab,
    TabItem,
    Sticky,
    Popup,
    XButton
  },
  data () {
    return {
      show12: false,
      selectedActivity: {},
      activityTabs: {
        all: { title: '全部活动' },
        mine: { title: '我的活动' },
        ignore: { title: '忽略活动' }
      },
      selectedTab: 'all',
      activities: []
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData: async function () {
      let response = await this.$http.get('activity')
      let activities = []
      response.forEach(({ id, bankID, title, dateFrom, dateTo, summary }) => {
        activities.push({
          id,
          bank: bankID === 0 ? '北京' : '上海',
          title,
          time: dateFrom + '-' + dateTo,
          detail: summary,
          collectors: 600,
          isDeleted: false,
          isFavored: false
        })
      })
      this.activities = activities
    },
    showDetail: function (activity) {
      this.show12 = true
      this.selectedActivity = activity
    },
    likeOrDeleteActivity: async function ({activity, type = 'like'}) {
      let id = activity.id
      console.log(id, type)
      let response = await this.$http[type === 'like' ? 'post' : 'delete'](`activity/${id}`)
      if (response.result) this.loadData()
    },
    recoverActivity: async function (id, like = true) {
      let response = await this.$http.put(`activity/${id}/${like ? 'like' : 'delete'}`)
      if (response.result) this.loadData()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
