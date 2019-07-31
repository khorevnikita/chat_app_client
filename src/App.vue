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
              <li class="nav-item  active">
                <router-link class="nav-link text-white" to="/signin">Sign In</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link text-white" to="/signup">Sign Up</router-link>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white" href="https://github.com/khorevnikita/chat_app_client" target="_blank">Help us</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <router-view/>

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
  name: 'App'
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
