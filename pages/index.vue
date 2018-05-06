<template></template>


<script>
export default {
  head () {
    return {
      title: 'loading'
    }
  },
  beforeMount () {
    this.$router.replace('/trade/buy')
  }
}
</script>
