<template>
  <div>
    <sticky>
      <tab v-model="tabIndex">
        <tab-item
          class="vux-center"
          v-for="({title}, index) in businessTabs"
          :key="index"
        >
          {{ title }}
        </tab-item>
      </tab>
    </sticky>
    <div id="business-container">
      <div :class="[selectedTab+'-field']">
        <!--<p class="tips">{{ showTip }}</p>-->
        <ul>
          <li
            v-for="({ id, title }, index) in wishList"
            :key="">
            <span>{{ title }}</span>
            <div class="float-right">
              <x-button plain mini type="primary" @click.native="showDialog(id)">我想{{ showBtn }}</x-button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer-toolbar">
      <x-button mini type="primary" @click.native="showOtherDialog">{{ showBtn }}其他</x-button>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showedDialog">
        <p class="dialog-title">
          我想{{ showBtn }}
          <span class="vux-close" @click.stop="showedDialog = false"></span>
        </p>
        <p class="dialog-tips">
          <icon type="info-circle"></icon>需要绑定手机号，方便客服与您联系
        </p>
        <x-input
          title="手机号码"
          name="mobile"
          placeholder="请输入手机号码"
          keyboard="number"
          is-type="china-mobile"
        ></x-input>
        <x-input
          title="验证码"
          class="weui-vcode"
          placeholder="请输入验证码"
          keyboard="number"
        >
          <x-button slot="right" type="primary" mini plain>发送验证码</x-button>
        </x-input>
        <div class="dialog-footer weui-cell">
          <x-button mini type="primary">确认</x-button>
        </div>
      </x-dialog>
      <x-dialog v-model="showedOtherDialog">
        <p class="dialog-title">
          {{ showBtn }}其他
          <span class="vux-close" @click.stop="showedOtherDialog = false"></span>
        </p>
        <group style="overflow: auto;max-height: 450px;">
          <x-input
            title="券码名称"
            placeholder="请输入券码名称"
          ></x-input>
          <x-input
            title="收购价格"
            placeholder="请输入欲收购价格"
            keyboard="number"
            v-show="isBuyerTab"
          >
            <span slot="right">元</span>
          </x-input>
          <x-input
            title="收购数量"
            placeholder="请输入欲收购数量"
            keyboard="number"
            v-show="isBuyerTab"
          >
            <span slot="right">件</span>
          </x-input>
          <x-input
            title="券码来源"
            placeholder="请输入券码来源"
          ></x-input>
          <x-input
            title="活动链接"
            placeholder="请输入活动链接"
          ></x-input>
          <x-input
            title="串码样式"
            placeholder="请输入串码样式"
          ></x-input>
          <x-input
            title="串码限制"
            placeholder="请输入串码限制"
          ></x-input>
          <x-textarea
            title="使用方法"
            :max="200"
          ></x-textarea>
          <div class="box weui-cell">
            <checker
              v-model="cardType"
              type="checkbox"
              default-item-class="default-checker"
              selected-item-class="selected-checker"
            >
              <checker-item :value="1">有二维码</checker-item>
              <checker-item :value="2">有密码</checker-item>
            </checker>
          </div>
          <p class="tips">感谢您的反馈，我们将通过电话与您联系，以进行进一步的沟通。</p>
          <div class="dialog-footer weui-cell">
            <x-button mini type="primary">确认</x-button>
          </div>
        </group>
      </x-dialog>
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
  Cell,
  Group,
  Icon,
  Checker,
  CheckerItem,
  XButton,
  XDialog,
  XInput,
  XTextarea
} from 'vux'
// const buyTabs = () => ['我是券商', '我是卡友']

export default {
  name: 'business',
  directives: {
    TransferDom
  },
  components: {
    Divider,
    Masker,
    Tab,
    TabItem,
    Sticky,
    Cell,
    Group,
    Icon,
    Checker,
    CheckerItem,
    XButton,
    XDialog,
    XInput,
    XTextarea
  },
  data () {
    return {
      showBtn: '收购',
      showTip: '',
      buyerTip: '您好！如果您是收获券商，并且对某些卡券（暂时不在本平台）有需求，希望本平台平台开通进行更多权益的交易，请告诉我们！',
      sellerTip: '您好！如果您是玩卡卡友，希望本平台开通进行更多卡券的交易，请告诉我们！',
      tabIndex: 0,
      businessTabs: [
        { type: 'buyer', title: '我是券商' },
        { type: 'seller', title: '我是卡友' }
      ],
      selectedTab: 'buyer',
      isBuyerTab: true,
      whoami: 'buyer',
      showedDialog: false,
      showedOtherDialog: false,
      cardType: [],
      wishList: [
        { id: 1, title: '点评50-30以下' },
        { id: 2, title: '光大KFC20' },
        { id: 3, title: '浦发赤坂亭双人自助餐代金券' },
        { id: 4, title: '汉堡王皇堡/天椒皇堡' },
        { id: 5, title: '小浦食神节100元券' }
      ]
    }
  },
  mounted () {
    this.showTip = this.buyerTip
    this.$store.commit('toggleBaseNav', { isShowNav: false })
  },
  beforeDestroy () {
    this.$store.commit('toggleBaseNav', { isShowNav: true })
  },
  methods: {
    showDialog: function (id) {
      this.showedDialog = true
    },
    showOtherDialog: function () {
      this.showedOtherDialog = true
    }
  },
  watch: {
    tabIndex (index) {
      this.selectedTab = this.businessTabs[index].type
      this.isBuyerTab = this.selectedTab === 'buyer'
      this.showTip = this.isBuyerTab ? this.buyerTip : this.sellerTip
      this.showBtn = this.isBuyerTab ? '收购' : '开通'
    }
  }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/close';

#business-container {
  padding: 20px;

  ul {
    margin-top: 20px;

    li {
      height: 2.5rem;
      line-height: 2.5rem;
      padding: 0.5rem;
      padding-left: 1rem;
      margin: 10px 0;
      background-color: white;
      position: relative;
    }
  }

  .float-right {
    position: absolute;
    right: 10px;
    top: 7px;
    z-index: 100;

    & button {
      background-color: white;
    }
    /*display: inline-block;*/
  }

  .tips {
    font-size: 14px;
  }
}

.footer-toolbar {
  line-height: 30px;
  width: 100%;
  padding: 10px 0;
  position: fixed;
  bottom: 0px;
  background-color: white;
  text-align: center;
  z-index: 100;
}

.seller-field {
  ul li {
    border-left: 3px solid green;
  }
}

.buyer-field {
  ul li {
    border-left: 3px solid orange;
  }
}

.dialog-title {
  height: 44px;
  line-height: 44px;
}

.dialog-footer {
  padding: 10px;
}

.vux-close {
  position: absolute;
  top: 10px;
  right: 10px;
}

.dialog-tips {
  font-size: 14px;
  padding: 5px;

  & .weui-icon-info-circle {
    font-size: 20px;
  }
}

.default-checker {
  border: 1px solid #ececec;
  padding: 5px 15px;
  margin-right: 10px;
}

.selected-checker {
  border: 1px solid green;
}
</style>
