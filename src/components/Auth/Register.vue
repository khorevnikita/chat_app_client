<template>
  <form>
    <div class="form-group">
      <label for="email">Email address</label>
      <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      <p class="text-danger" v-if="errors.email.length > 0">{{errors.email}}</p>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
      <p class="text-danger" v-if="errors.password.length > 0">{{errors.password}}</p>
    </div>
    <div class="form-group">
      <label for="c_password">Password Conformation</label>
      <input type="password" class="form-control" id="c_password" placeholder="Repeat password" v-model="c_password">
      <p class="text-danger" v-if="errors.c_password.length > 0">{{errors.c_password}}</p>
    </div>

    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" class="form-control" id="name" placeholder="Name" v-model="name">
      <p class="text-danger" v-if="errors.name.length > 0">{{errors.name}}</p>
    </div>

    <div class="form-group">
      <label for="surname">Surname</label>
      <input type="text" class="form-control" id="surname" placeholder="Name" v-model="surname">
      <p class="text-danger" v-if="errors.surname.length > 0">{{errors.surname}}</p>
    </div>

    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" class="form-control" id="username" placeholder="Username" v-model="username">
      <p class="text-danger" v-if="errors.username.length > 0">{{errors.username}}</p>
    </div>

    <button type="button" class="btn btn-warning btn-block" @click="submit">Submit</button>
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
          if (!this.validatePasswordLength()) {
            this.errors.password = "Too short password"
          }
          if (!this.validatePasswordConfirmation()) {
            this.errors.c_password = "Passwords do not match "
          }
          if (!this.validateSurname()) {
            this.errors.name = "Surname is required";
          }
          if (!this.validateName()) {
            this.errors.name = "Name is required";
          }
          if (!this.validateUsername()) {
            this.errors.name = "Username is required";
          }

          return this.validateEmail() && this.validatePasswordLength() && this.validatePasswordConfirmation()
        },
        validateEmail() {
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(String(this.email).toLowerCase());
        },
        validatePasswordLength() {
          return this.password.length > 5;
        },
        validatePasswordConfirmation() {
          return this.password === this.c_password;
        },
        validateName() {
          return this.name.length > 0
        },
        validateSurname() {
          return this.surname.length > 0
        },
        validateUsername() {
          return this.username.length > 0
        },

        resetErrors() {
          for (var i in this.errors) {
            this.errors[i] = "";
          }
        },
        sendRequestToServer() {
            axios.post("http://chat.local/api/auth/register", {
              email: this.email,
              password: this.password,
              password_confirmation: this.c_password,
              username: this.username,
              name: this.name,
              surname: this.surname,
            }).then(r => {
              if (r.data.status == 1) {
                localStorage.setItem('user-token', r.data.data.token); // store the token in localstorage
                axios.defaults.headers.common['Authorization'] = r.data.data.token;
                window.auth_check = 1;
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
