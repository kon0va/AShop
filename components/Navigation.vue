<template>
	<tabbar style="position: fixed">
		<tabbar-item 
			v-for="(item, index) in navigation"
      :key="index"
			:link="item.link"
			:selected="isSelected(item.link)"
		>
			<span 
				slot="label" >
				{{item.name}}
			</span>
		</tabbar-item>	
	</tabbar>
</template>
<script>
import { Tabbar, TabbarItem } from 'vux'

export default {
  components: {
    Tabbar,
    TabbarItem
  },
  props: [],
  data () {
    return {
      navigation: [
        {
          name: '活动管理',
          link: '/activity'
        },
        {
          name: '券码交易',
          link: '/trade'
        },
        {
          name: '我的',
          link: '/mine'
        }
      ]
    }
  },
  computed: {},
  methods: {
    isSelected (tabbar) {
      return this.$route.path.indexOf(tabbar) === 0
    }
  }
}
</script>
