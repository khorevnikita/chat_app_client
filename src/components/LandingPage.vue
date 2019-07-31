<template>
  <main role="main" class="text-center">
    <h1 class="text-white">Chat app</h1>
    <p class="lead text-white">
      Simple. Fast. Free.
    </p>
    <p class="lead text-white">
      <a href="#" class="btn btn-lg btn-secondary">Learn more on GitHub</a>
    </p>
  </main>
</template>

<script>
  export default {
    name: "LandingPage",
    created(){
      console.log(this.$route)
    }
  }
</script>
<style scoped>

</style>
