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
      console.log(Cookies.get())
      this.fetchSpaces()
    },
    methods: {
      fetchSpaces() {
        axios.get("http://chat.local/api/spaces").then(r => {
          if (r.data.status == 1) {
            this.spaces = r.data.data.spaces;
          } else {
            console.log(r.data);
            switch (r.data.status) {
              case 0:
                //  this.$router.push("/logout");
                break;
              case 9:
                // this.$router.push("/signin");
                break;
              default:
                console.log(r.data);
                break;
            }
          }
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
