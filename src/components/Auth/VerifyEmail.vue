<template>
  <div class="container">
    <div class="align-content-center d-flex flex-row">
      <form class="m-auto col-12 col-sm-6">
        <div class="form-group">
          <label for="name">Name</label>
          <input id="name" class="form-control" v-model="user.name"
                 v-bind:class="{'is-valid': validation.message && !validation.errors.name, 'is-invalid': validation.message && validation.errors.name}">
          <div v-if="validation.message"
               v-bind:class="{'valid-feedback': validation.message && !validation.errors.name, 'invalid-feedback':validation.message && validation.errors.name}">
            {{validation.errors.name?validation.errors.name[0]:"Looks okay"}}
          </div>
        </div>
        <div class="form-group">
          <label for="surname">Surname</label>
          <input id="surname" class="form-control" v-model="user.surname"
                 v-bind:class="{'is-valid': validation.message && !validation.errors.surname, 'is-invalid': validation.message && validation.errors.surname}">
          <div v-if="validation.message"
               v-bind:class="{'valid-feedback': validation.message && !validation.errors.surname, 'invalid-feedback':validation.message && validation.errors.surname}">
            {{validation.errors.surname?validation.errors.surname[0]:"Looks okay"}}
          </div>
        </div>
        <div class="form-group">
          <label for="username">Username</label>
          <input id="username" class="form-control" v-model="user.username"
                 v-bind:class="{'is-valid': validation.message && !validation.errors.username, 'is-invalid': validation.message && validation.errors.username}">
          <div v-if="validation.message"
               v-bind:class="{'valid-feedback': validation.message && !validation.errors.username, 'invalid-feedback':validation.message && validation.errors.username}">
            {{validation.errors.username?validation.errors.username[0]:"Looks okay"}}
          </div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" class="form-control" v-model="user.password"
                 v-bind:class="{'is-valid': validation.message && !validation.errors.password, 'is-invalid': validation.message && validation.errors.password}">
          <div v-if="validation.message"
               v-bind:class="{'valid-feedback': validation.message && !validation.errors.password, 'invalid-feedback':validation.message && validation.errors.password}">
            {{validation.errors.password?validation.errors.password[0]:"Looks okay"}}
          </div>
        </div>
        <div class="form-group">
          <label for="c_password">Confirm password</label>
          <input type="password" id="c_password" class="form-control" v-model="user.password_confirmation">
        </div>
        <div class="form-group">
          <button type="button" @click="vefify()" class="btn btn-outline-warning btn-block ">Update profile and verify account</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "VerifyEmail",
    props: [],
    data() {
      return {
        email: this.$route.query.email,
        hash: this.$route.query.hash,
        user: {
          name: "",
          surname: "",
          username: "",
          password: "",
          password_confirmation: ""
        },
        validation: {}
      }
    },
    created() {
      this.findUser();
    },
    methods: {
      findUser() {
        axios.get("http://chat.local/api/auth/verify?email=" + encodeURIComponent(this.email) + "&hash=" + this.hash).then(r => {
          if (r.data.status == 1) {
            this.user = r.data.user;
            Cookies.set("user-token", r.data.token, {expires: 7, domain: ".chatclient.local"});
            axios.defaults.headers.common['Authorization'] = r.data.token;
            window.has_token = true;
          }
        })
      },
      vefify() {
        this.validation = {};
        axios.post("http://chat.local/api/auth/verify", this.user).then(r => {
          if (r.data.status == 1) {
            this.$router.push("/spaces")
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
