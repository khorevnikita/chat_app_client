<template>
  <div class="row container m-auto">
    <div class="col-12 col-sm-6 col-md-4 m-auto" v-for="space in spaces">
      <div class="card">
        <div class="flex-column m-auto text-center">
          <h5 class="card-title text-warning">{{space.name}}</h5>
          <a :href="'http://'+ space.subdomain +'.chatclient.local:8080'" class="card-link">Open space</a>
        </div>
      </div>
    </div>
    <div class="col-12 col-sm-6 col-md-4 m-auto">
      <div class="card">
        <div class="flex-column m-auto text-center">
          <button @click="$router.push('/new-space')" class="card-link text-primary">Create space</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "List",
    props: ['subdomain', "base_domain"],
    data() {
      return {
        spaces: []
      }
    },
    created() {
      if (this.subdomain !== this.base_domain) {
        window.location.href = "http://" + this.base_domain + ".local:8080/#/spaces"
      }
      this.fetchSpaces()
    },
    methods: {
      fetchSpaces() {
        axios.get("http://chat.local/api/spaces").then(r => {
          this.spaces = r.data.data.spaces;
        })
      }
    }
  }
</script>

<style scoped>
  .card {
    height: 200px;
  }
</style>
