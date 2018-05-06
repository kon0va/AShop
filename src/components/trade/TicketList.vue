<template>
  <div class="ticket-container" @click="$emit('click')">
    <div class="tips">
      <p>温馨提示：</p>
      <p>1.非券码质量问题，不接受退货；</p>
      <p>2.如果是第一次购买，请务必阅读商品的使用说明；</p>
      <p>3.请诚信交易，平台有权拒绝服务作弊用户；</p>
    </div>
    <div class="ticket-list">
      <div class="card">
        <header>
          <div class="inline-block">我买网</div>
          <span class="float-right">￥34.00</span>
        </header>
        <section class="card-detail">
          <ul>
            <li>
              <div class="inline-block">民生100-50</div>
              <span class="float-right strickout">市场价：￥50.00</span>
            </li>
            <li>
              <div class="inline-block">出售中：94个 已成交：1677单</div>
              <div class="float-right">
                <x-button mini type="primary">购买</x-button>
              </div>
            </li>
          </ul>
        </section>
        <footer>
          <span class="tips">请于购买后1小时内使用</span>
          <div class="toolbar float-right">
            <span>收藏</span>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import {
  XButton
} from 'vux'

export default {
  name: 'ticket-list',
  components: {
    XButton
  }
}
</script>

<style lang="less" scoped>
.tips {
  background-color: white;
  padding: 10px;
  margin-top: -5px;
}

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

  .card-detail {
    & li {
      margin-bottom: 10px;
    }
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