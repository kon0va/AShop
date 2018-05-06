<template>
  <div id="app">
     <loading 
			v-model="isLoading" 
			:text="'加载中...'">
		</loading> 
    <div id="main-container">
      <router-view></router-view>
    </div>
    <navigation v-show="isShowBaseNav"></navigation>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import {ViewBox, Loading} from 'vux'

import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
		Navigation,
		ViewBox,
		Loading
	},
  computed: {
    ...mapState({
      isLoading: state => state.vux.isLoading,
      isShowBaseNav: state => state.vux.isShowBaseNav
    })
  },
  mounted () {}
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}

.float-left {
  float: left;
}

.float-right {
  float: right;
}

.inline-block {
  display: inline-block;
}

.pointer {
  cursor: pointer;
}

.vux-tab-item {
  cursor: pointer;
}

ul, ol {
  li {
    list-style: none;
  }
}

.strickout {
  text-decoration: line-through;
}

#main-container {
  padding-bottom: 60px;
}
</style>
