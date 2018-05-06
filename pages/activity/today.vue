<template>
  <div>
    <div class="activity-panel">
      <activity-card
        v-for="(activity, index) in activities"
        :key="'activity-no-' + index"
        :activity="activity"
        @click="showDetail"
      >
      </activity-card>
    </div>
    <div v-transfer-dom>
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
  TransferDom,
  Popup,
  Group,
  Cell,
  XButton
} from 'vux'

export default {
  name: 'today',
  directives: {
    TransferDom
  },
  components: {
    Popup,
    Group,
    Cell,
    XButton,
    ActivityCard
  },
  data () {
    return {
      show12: false,
      selectedActivity: {},
      activities: [
        {
          bank: '广发',
          title: '周五抢1W积分',
          time: '2017/10/22-2018/02/28',
          detail: '啦啦啦',
          collectors: 4480,
          isDeleted: false,
          isFavored: false
        },
        {
          bank: '北京',
          title: '惠享7天，每天都抢',
          time: '2017/10/22-2018/02/28',
          detail: '啦啦啦',
          collectors: 600,
          isDeleted: false,
          isFavored: false
        },
        {
          bank: '广发',
          title: '周五抢1W积分',
          time: '2017/10/22-2018/02/28',
          detail: '啦啦啦',
          collectors: 4480,
          isDeleted: false,
          isFavored: false
        },
        {
          bank: '北京',
          title: '惠享7天，每天都抢',
          time: '2017/10/22-2018/02/28',
          detail: '啦啦啦',
          collectors: 600,
          isDeleted: false,
          isFavored: false
        },
        {
          bank: '广发',
          title: '周五抢1W积分',
          time: '2017/10/22-2018/02/28',
          detail: '啦啦啦',
          collectors: 4480,
          isDeleted: false,
          isFavored: false
        },
        {
          bank: '北京',
          title: '惠享7天，每天都抢',
          time: '2017/10/22-2018/02/28',
          detail: '啦啦啦',
          collectors: 600,
          isDeleted: false,
          isFavored: false
        }
      ]
    }
  },
  methods: {
    showDetail: function (activity) {
      this.show12 = true
      this.selectedActivity = activity
    }
  }
}
</script>

<style lang="less" scoped>
.activity-panel {
  padding-bottom: 50px;
}
</style>
