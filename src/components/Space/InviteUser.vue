<template>
  <div class="container">
    <div class="align-content-center d-flex flex-row">
      <form class="m-auto col-12 col-sm-6">
        <div class="form-group">
          <button type="button" class="btn btn-outline-light btn-sm float-right" @click="$router.go(-1)">x</button>
          <div style="clear: both"></div>
        </div>
        <div class="form-group">
          <input class="form-control" placeholder="Enter e-mail..." v-model="email"
                 v-bind:class="{'is-invalid': validation.message && validation.errors.email}">
          <p v-if="validation.message" v-bind:class="{'invalid-feedback':validation.message && validation.errors.email}">
            {{validation.errors.email?validation.errors.email[0]:"Looks okay"}}
          </p>
        </div>
        <div class="form-group">
          <button type="button" @click="invite()" class="btn btn-outline-warning btn-block ">Send an invitation link</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "InviteUser",
    props: ['subdomain'],
    data() {
      return {
        email: "",
        validation: {}
      }
    },
    methods: {
      invite() {
        this.validation = {};
        axios.post("http://chat.local/api/spaces/" + this.subdomain + "/invite", {email: this.email}).then(r => {
          if (r.data.status == 1) {
            alert("OK")
          } else {
            console.log(r);
          }
        }).catch(error => {
          this.validation = error.response.data;

          console.log(this.validation)
        });
      }
    }
  }
</script>

<style scoped>

</style>
