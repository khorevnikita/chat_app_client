<template>
  <div class="container">
    <div class="align-content-center d-flex flex-row">
      <div class="m-auto col-12 col-sm-6">

        <div class="form-group">
          <button type="button" class="btn btn-outline-light btn-sm float-right" @click="$router.go(-1)">x</button>
          <div style="clear: both"></div>
        </div>
        <div class="form-group">
          <h4>Channel members</h4>
        </div>
        <div class="media" v-for="user in users">
          <img :src="user.avatar" class="mr-3" alt="...">
          <div class="media-body">
            <h5 class="mt-0">{{user.name}} {{user.surname}}</h5>
            <ul class="nav" v-if="is_founder && user.id !== me_id">
              <li class="nav-item">
                <button class="nav-link text-white" @click="makeAdmin(user)">Make admin</button>
              </li>
              <li class="nav-item">
                <button class="nav-link text-white" @click="kickOut(user)">Kick out</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Members",
    props: ['subdomain', 'token'],
    data() {
      return {
        channel_id: this.$route.params.id,
        users: [],
        is_founder: false,
        me_id: 0,
        channel_deleted: false,
      }
    },
    created() {
      this.fetchMembers()
    },
    watch: {},
    computed: {},
    methods: {
      fetchMembers() {
        axios.get("http://chat.local/api/spaces/" + this.subdomain + "/channels/" + this.channel_id + "/users").then(r => {
          this.users = r.data.users;
          this.is_founder = r.data.is_founder;
          this.me_id = r.data.me_id;
        })
      },
      makeAdmin(user) {
        if (!confirm("Are you sure?")) return false

        axios.post("http://chat.local/api/spaces/" + this.subdomain + "/channels/" + this.channel_id + "/users/make-admin", {user_id: user.id}).then(r => {
          if (r.data.status == 1) this.is_founder = false;
          return
        })

      },
      kickOut(user) {
        if (!confirm("Are you sure?")) return false

        axios.post("http://chat.local/api/spaces/" + this.subdomain + "/channels/" + this.channel_id + "/users/kick-out", {user_id: user.id}).then(r => {
          console.log(r.data)
          if (r.data.status == 1) this.users.splice(this.users.indexOf(user), 1);
          if (r.data.channel_deleted) this.$router.push('/');
          return
        })
      }
    }
  }
</script>

<style scoped>
  img {
    width: 25px;
    border-radius: 25px;
    height: 25px;
  }

  .media {
    margin-top: 20px;
  }

  .nav-link {
    padding-top: 0;
  }
</style>
