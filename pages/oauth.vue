<template>
</template>

<script>
function getUrlParam (param) {
  const reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)')
  const result = window.location.search.substr(1).match(reg)
  return result ? decodeURIComponent(result[2]) : ''
}

export default {
  head () {
    return {
      title: 'loading'
    }
  },
  beforeMount () {
    const url = window.location.href
    const visit = '/' + getUrlParam('state')
    this.$store.dispatch('getWechatOAuth', url).then(res => {
      const { data } = res
      if (data.result) {
        // alert(JSON.stringify(data.user))
        this.$store.dispatch('setAuthUser', data.user)
        this.$router.replace(visit)
      } else {
        console.log('用户信息获取失败, 重新拉取。')
        window.location.href = visit
      }
    })
  }
}
</script>
