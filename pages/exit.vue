<template>
  <div class="" />
</template>

<script>
export default {
  layout: 'blank',
  middleware: async (cxt) => {
    const {
      status,
      data
    } = await cxt.$axios.get('/users/exit')
    if (status === 200 && data && data.code === 0) {
      window.location.href = '/'
    }
  }
}
</script>
