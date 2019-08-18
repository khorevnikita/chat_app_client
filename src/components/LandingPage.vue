<template>
  <main role="main" class="text-center" v-bind:class="{'h-100 overflow-scroll':subdomain!==base_domain}">
    <div v-if="subdomain===base_domain">
      <h1 class="text-white">Chat app</h1>
      <p class="lead text-white">
        Simple. Fast. Free.
      </p>
      <p class="lead text-white">
        <a href="#" class="btn btn-lg btn-secondary">Learn more on GitHub</a>
      </p>
    </div>
    <space-main v-else></space-main>
  </main>
</template>

<script>
  import SpaceMain from "@/components/SpaceMain";

  export default {
    name: "LandingPage",
    components: {SpaceMain},
    props: ['subdomain', 'base_domain'],
    created(){
      console.log(window.location.host.split(".")[0])
    }
  }
</script>
<style scoped>
.overflow-scroll{
  overflow-y: scroll;
}
</style>
