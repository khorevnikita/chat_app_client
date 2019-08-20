<template>
  <div class="container d-flex flex-column text-center">
    <h4>You have been logged out</h4>
    <p>
      <button class="btn btn-link" @click="$router.push('/signin')">Sing in</button>
    </p>
  </div>
</template>

<script>
  export default {
    name: "Logout",
    created() {
      this.logOut()
    },
    methods: {
      logOut() {
        Cookies.remove('user-token',{ path: '', domain: '.chatclient.local' }); // store the token in localstorage
        axios.defaults.headers.common['Authorization'] = "";
        window.location.href="http://chatclient.local:8080/#/signin"
      }
    }
  }
</script>

<style scoped>

</style>
