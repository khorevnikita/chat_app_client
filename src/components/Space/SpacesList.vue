<template>
  <div class="row">
    <div class="col-12 col-sm-6 col-md-4 m-auto" v-for="space in spaces">
      <div class="card">
        <div class="card-body">
          <p>{{space.name}}</p>
          <hr>
          <a :href="'http://'+ space.subdomain +'.chatclient.local:8080'" class="text-warning">open ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "List",
    data() {
      return {
        spaces: []
      }
    },
    created() {
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

</style>
