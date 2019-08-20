<template>
  <div class="container">
    <div class="align-content-center d-flex flex-row">
      <form class="m-auto col-12 col-sm-6">
        <div class="form-group text-center">
          <img :src="user.avatar" class="img-fluid">
        </div>
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
          <label for="phone">Phone</label>
          <input id="phone" class="form-control" v-model="user.phone"
                 v-bind:class="{'is-valid': validation.message && !validation.errors.phone, 'is-invalid': validation.message && validation.errors.phone}">
          <div v-if="validation.message"
               v-bind:class="{'valid-feedback': validation.message && !validation.errors.phone, 'invalid-feedback':validation.message && validation.errors.phone}">
            {{validation.errors.username?validation.errors.phone[0]:"Looks okay"}}
          </div>
        </div>
        <div v-if="show_security">
          <div class="form-group">
            <label for="email">E-mail</label>
            <input id="email" class="form-control" v-model="user.email"
                   v-bind:class="{'is-valid': validation.message && !validation.errors.email, 'is-invalid': validation.message && validation.errors.email}">
            <div v-if="validation.message"
                 v-bind:class="{'valid-feedback': validation.message && !validation.errors.email, 'invalid-feedback':validation.message && validation.errors.email}">
              {{validation.errors.email?validation.errors.email[0]:"Looks okay"}}
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
        </div>

        <div class="form-group">
          <button type="button" class="btn btn-link text-white" @click="show_security = !show_security"><span v-if="!show_security">Show</span><span
            v-else>Hide</span> security fields
          </button>
        </div>

        <div class="form-group">
          <button type="button" @click="save()" class="btn btn-outline-warning btn-block ">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Profile",
    props: ['subdomain'],
    data() {
      return {
        user: {},
        validation: {},
        show_security: false
      }
    },
    created() {
      this.fetchUser()
    },
    methods: {
      fetchUser() {
        axios.get("http://chat.local/api/auth/profile").then(r => {
          if (r.data.status == 1) {
            this.user = r.data.user;
          }
        })
      },
      save() {
        this.validation = {};
        var params = {
          name: this.user.name,
          surname: this.user.surname,
          username: this.user.username,
          phone: this.user.phone,
        };
        if (this.show_security) {
          params.email = this.user.email ? this.user.email : "";
          params.password = this.user.password ? this.user.password : "";
          params.password_confirmation = this.user.password_confirmation ? this.user.password_confirmation : ""
        }

        axios.post("http://chat.local/api/auth/profile", params).then(r => {
          if (r.data.status == 1) {
            swal.fire({
              type: 'success',
              title: 'Information has been updated',
              showConfirmButton: false,
              timer: 1500
            })
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
  .img-fluid {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
</style>
