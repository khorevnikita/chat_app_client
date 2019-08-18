<template>
  <div class="container">
    <div class="align-content-center d-flex flex-row">
      <div class="m-auto col-12 col-sm-6">
        <div class="form-group">
          <button type="button" class="btn btn-outline-light btn-sm float-right" @click="$router.go(-1)">x</button>
          <div style="clear: both"></div>
        </div>
        <div class="form-group">
          <h4>Channel settings</h4>
        </div>
        <div class="form-group">
          <input v-model="channel.name" class="form-control" placeholder="Channel name">
        </div>
        <div class="form-group">
          <div class="custom-control custom-switch">
            <input @change="switchAccess()" type="checkbox" class="custom-control-input" id="access">
            <label class="custom-control-label" for="access">Private</label>
          </div>
        </div>
        <div class="form-group">
          <a class="btn btn-warning btn-sm text-white float-right" @click="$router.push('/channel/' + channel_id + '/members')">Members</a>
          <button class="btn btn-info" @click="save()">Save</button>
        </div>

        <div class="form-group">
          <button class="btn btn-danger float-right btn-sm" @click="deleteChannel()">Delete channel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Settings",
    props: ['subdomain', 'token'],
    data() {
      return {
        channel_id: this.$route.params.id,
        channel: {}
      }
    },
    created() {
      axios.get("http://chat.local/api/spaces/" + this.subdomain + "/channels/" + this.channel_id + "/info").then(r => {
        this.channel = r.data.channel
      })
    },
    watch: {},
    computed: {},
    methods: {
      switchAccess() {
        switch (this.channel.access) {
          case "hidden":
            this.channel.access = "visible";
            break;
          default:
            this.channel.access = "hidden";
        }
      },
      save() {
        axios.post("http://chat.local/api/spaces/" + this.subdomain + "/channels/" + this.channel_id + "/update", this.channel).then(r => {
          this.$router.push("/")
        })
      },
      deleteChannel() {
        axios.post("http://chat.local/api/spaces/" + this.subdomain + "/channels/" + this.channel_id + "/delete", this.channel).then(r => {
          if (r.data.status == 1) {
            this.$router.push("/")
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
