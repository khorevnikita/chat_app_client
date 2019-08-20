<template>
  <div id="app">
    <div class="d-flex w-100 h-100 flex-column">
      <header class="mb-auto">
        <nav class="navbar navbar-expand-lg navbar-light">
          <a class="navbar-brand text-white" href="/">Chat App</a>
          <button class="navbar-toggler bg-white" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                  aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse " id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item  active" v-if="!token">
                <router-link class="nav-link text-white" to="/signin">Sign In</router-link>
              </li>
              <li class="nav-item" v-if="!token">
                <router-link class="nav-link text-white" to="/signup">Sign Up</router-link>
              </li>
              <li class="nav-item" v-if="token">
                <router-link class="nav-link text-white" to="/spaces">My spaces</router-link>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white" href="https://github.com/khorevnikita/chat_app_client" target="_blank">Help us</a>
              </li>
              <li class="nav-item" v-if="token">
                <a class="nav-link text-white" style="cursor: pointer" @click="$router.push('/logout')">Logout</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <router-view :subdomain="subdomain" :base_domain="base_domain" :token="token"/>

      <footer class="mt-auto text-center">
        <div class="text-white">
          <p>
            KhoNik
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      token: Cookies.get("user-token"),
      subdomain: window.location.host.split(".")[0],
      base_domain: "chatclient"
    }
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
