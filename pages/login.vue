<template>
  <form @submit.prevent='login'>
    <div>
      <input type='text' v-model='user.email' placeholder="请输入邮箱"/>
    </div>
    <div>
      <input type="password" v-model='user.password' placeholder="请输入密码" />
    </div>
    <div>
      <button>登陆</button>
    </div>
  </form>
</template>

<script>
export default {
  data () {
    return {
      user: {}
    }
  },
  methods: {
    async login () {
      let { email, password } = this.user

      if (!email || !password) {
        return ''
      }

      let res = await this.$store.dispatch('login', this.user)

      if (!res.ret) this.$router.push('/admin')
    }
  }
}
</script>
