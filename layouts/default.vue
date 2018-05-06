<template>
  <div id="app">
    <loading
      v-model="globalLoading"
      text="加载中...">
    </loading>
    <nuxt/>
    <navigation></navigation>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import {ViewBox, Loading} from 'vux'

export default {
  name: 'app',
  components: {
    Navigation,
    ViewBox,
    Loading
  },
  data () {
    return {
      globalLoading: false
    }
  },
  mounted () {
    this.globalLoading = true
    setTimeout(() => {
      this.globalLoading = false
    }, 1000)
  }
}
</script>

<style lang="less">

body {
  background-color: #fbf9fe;
}
</style>
