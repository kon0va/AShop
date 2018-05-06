<template>
  <div class="card" v-if="activity.id || 1" @click="$emit('click', activity)">
    <header>
      {{ activity.bank || '默认' }} | {{ activity.title || '测试活动' }}
    </header>
    <section>
      <p>({{ activity.time || '' }})</p>
      <p>{{ activity.detail || '' }}</p>
    </section>
    <footer>
      <div class="inline-block">收藏：{{ activity.collectors || 0 }}</div>
      <div class="toolbar float-right">
        <span @click="handleDelete">{{ activity.isDeleted ? '恢复' : '删除' }}</span>
        <span @click="handleFavor">{{ activity.isFavored ? '不再收藏' : '收藏' }}</span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'activity-card',
  props: {
    activity: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {

    }
  },
  mounted () {},
  methods: {
    handleDelete: function () {
      // let event = this.activity.isDeleted ? 'recover' : 'delete'
      this.$emit('like', { activity: this.activity, type: 'delete' })
    },
    handleFavor: function () {
      // let event = this.activity.isFavored ? 'normal' : 'favor'
      this.$emit('like', { activity: this.activity, type: 'like' })
    }
  }
}
</script>

<style lang="less" scoped>
  .card {
    margin: 10px 0;
    padding: 15px 20px;
    background-color: white;

    header {
      font-size: 1.2rem;
    }

    section {
      padding: 10px 0;
    }

    footer {
      border-top: 1px solid #DDD;
      padding-top: 10px;

      .toolbar {
        position: relative;
        right: 0px;
      }
    }
  }
</style>
