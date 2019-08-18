<template>
  <div class="container">
    <div class="align-content-center d-flex flex-row">
      <form class="m-auto col-12 col-sm-6 col-md-4">
        <div class="form-group">
          <button type="button" class="btn btn-outline-light btn-sm float-right" @click="$router.go(-1)">x</button>
          <div style="clear: both"></div>
        </div>
        <div class="form-group">
          <input class="form-control" v-bind:class="{'is-valid': validation.message && !validation.errors.name, 'is-invalid': validation.message && validation.errors.name}" placeholder="Channel name" v-model="space.name">
          <div v-if="validation.message" v-bind:class="{'valid-feedback': validation.message && !validation.errors.name, 'invalid-feedback':validation.message && validation.errors.name}">
            {{validation.errors.name?validation.errors.name[0]:"Looks okay"}}
          </div>
        </div>
        <div class="form-group">
          <input class="form-control" v-bind:class="{'is-valid': validation.message && !validation.errors.subdomain, 'is-invalid': validation.message && validation.errors.subdomain}" placeholder="Subdomain" v-model="space.subdomain">
          <div v-if="validation.message" v-bind:class="{'valid-feedback': validation.message && !validation.errors.subdomain, 'invalid-feedback':validation.message && validation.errors.subdomain}">
            {{validation.errors.subdomain?validation.errors.subdomain[0]:"Looks okay"}}
          </div>
        </div>
        <div class="form-group">
          <button type="button" @click="save()" class="btn btn-outline-warning btn-block ">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NewSpace",
    props: ['base_domain'],
    data() {
      return {
        space: {
          name: "",
          subdomain: "",
        },
        validation: {}
      }
    },
    methods: {
      save() {
        this.validation = {};
        axios.post("http://chat.local/api/spaces/create", this.space).then(r => {
          if (r.data.status == 1) {
            window.location.href = "http://" + r.data.space.subdomain + "." + this.base_domain + ".local:8080"
          } else {
            console.log(r);
          }
        }).catch(error => {
          this.validation = error.response.data
          console.log(this.validation)
        });
      }
    }
  }
</script>

<style scoped>

</style>
