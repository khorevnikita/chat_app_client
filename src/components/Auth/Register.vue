<template>
  <form>
    <div class="form-group">
      <label for="email">Email address</label>
      <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      <p class="text-danger" v-if="errors.email.length > 0">{{errors.email}}</p>
    </div>
    <button type="button" class="btn btn-warning btn-block" @click="submit">Continue</button>
  </form>
</template>

<script>
    export default {
      name: "Register",
      data() {
        return {
          email: "",
          password: "",
          c_password: "",
          username: "",
          name: "",
          surname: "",
          errors: {
            email: "", password: "", username: "", c_password: "",
            name: "", surname: ""
          },
          token: "",
        }
      },
      methods: {
        submit() {
          this.resetErrors();
          if (this.validated()) {
            this.sendRequestToServer()
          }
        },
        validated() {
          if (!this.validateEmail()) {
            this.errors.email = "Invalid e-mail";
          }
          return this.validateEmail();
        },
        validateEmail() {
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(String(this.email).toLowerCase());
        },
        resetErrors() {
          for (var i in this.errors) {
            this.errors[i] = "";
          }
        },
        sendRequestToServer() {
            axios.post("http://chat.local/api/auth/register", {
              email: this.email,
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
