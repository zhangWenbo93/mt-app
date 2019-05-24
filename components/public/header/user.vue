<!--  -->
<template>
  <div class="m-user">
    <template v-if="user">
      欢迎您，
      <span class="username">{{ user }}</span>
      [<nuxt-link to="/exit">退出</nuxt-link>]
    </template>
    <template else="user">
      <nuxt-link to="login" class="login">立即注册</nuxt-link>
      <nuxt-link to="register" class="register">注册</nuxt-link>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      user: ''
    }
  }
}
</script>

<style lang="scss">
</style>
