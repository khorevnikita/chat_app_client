<template>
  <form>
    <div class="form-group">
      <label for="email">Email address</label>
      <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
      <p class="text-danger" v-if="errors.email.length > 0">{{errors.email}}</p>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
      <p class="text-danger" v-if="errors.password.length > 0">{{errors.password}}</p>
    </div>
    <div class="form-group form-check">
      <input v-model="remember" type="checkbox" class="form-check-input" id="exampleCheck1">
      <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div>
    <button type="button" class="btn btn-warning btn-block" @click="sendRequestToServer">Submit</button>
  </form>
</template>

<script>
    export default {
      name: "Login",
      data() {
        return {
          email: "",
          password: "",
          remember: 1,
          errors: {email:"",password:""}
        }
      },
      methods: {
        sendRequestToServer() {
          this.resetErrors();
          axios.post("http://chat.local/api/auth/login", {
            email: this.email,
            password: this.password,
          }).then(r => {
            if (r.data.status == 1) {
              Cookies.set("user-token", r.data.data.token, {expires: 7,domain:".chatclient.local"});
              axios.defaults.headers.common['Authorization'] = r.data.data.token;
              this.$router.push("/spaces")
            }
          }).catch(error => {
            for (var i in error.response.data.errors) {
              this.errors[i] = error.response.data.errors[i][0]
            }
          });
        },
        resetErrors() {
          for (var i in this.errors) {
            this.errors[i] = "";
          }
        },
      }
    }
</script>

<style scoped>
  form {
    width: max-content;
    margin: auto;
    color: #fff;
  }
</style>
