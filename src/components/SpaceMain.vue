<template>
  <div class="row" v-bind:class="{'h-100':open_channel.id}">
    <div class="col-sm-4">
      <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between disabled">
          <span>{{space.name}}</span>
        </li>
        <li class="list-group-item title">
          <p class="float-left mb-0">Channels</p>
          <a @click="newChannel" class="btn btn-warning btn-sm float-right" role="button">New channel</a>
        </li>
        <li>
          <div class="input-group">
            <input v-model="q" type="text" class="form-control" id="searcher" placeholder="Search channel..." aria-describedby="searcher">
          </div>
        </li>
        <li v-for="channel in filteredChannels" @click="$router.push('/channel/' + channel.id)"
            class="list-group-item d-flex justify-content-between align-items-center">
          {{channel.name}}
          <span class="badge badge-info badge-pill" v-if="badges[channel.id]">{{badges[channel.id]}}</span>
        </li>
        <li class="list-group-item title">
          <p class="float-left mb-0">Users</p>
          <a @click="inviteUser" class="btn btn-warning btn-sm float-right" role="button">Invite user</a>
        </li>
        <li v-for="user in filteredUsers" @click="openPrivateChannel(user)" class="list-group-item d-flex justify-content-between align-items-center">
          {{user.name}} {{user.surname}}
          <span class="badge badge-info badge-pill">14</span>
        </li>
      </ul>
    </div>
    <div class="col-sm-7 d-flex align-items-center">
      <channel-main v-on:channel_deleted="removeChannel" v-if="open_channel.id" :channel="open_channel" :me="me" :subdomain="sd"></channel-main>
      <div v-else>
        <h4>You can open a channel by clicking on the left list</h4>
      </div>
    </div>
  </div>
</template>

<script>
  import ChannelMain from "@/components/Space/Channel/ChannelMain";

  export default {
    name: "SpaceMain",
    components: {ChannelMain},
    props: ['subdomain'],
    data() {
      return {
        space: {},
        q: "",
        open_channel: {},
        badges: [],
        me: {},
        sd: this.subdomain ? this.subdomain : window.location.host.split(".")[0]
      }
    },
    computed: {
      'filteredChannels': function () {
        if (!this.space.channels) return [];
        return this.space.channels.filter(c => c.name.indexOf(this.q) > -1)
      },
      'filteredUsers': function () {
        if (!this.space.channels) return [];
        return this.space.users
      }
    },
    watch: {
      '$route': {
        handler: function (route) {
          if (route.params.id !== this.open_channel.id) {
            this.openFirstChannel();
          }
        },
        deep: true
      }
    },
    created() {
      this.fetchChannels()
    },
    methods: {
      fetchChannels() {
        axios.get("http://chat.local/api/spaces/" + this.sd).then(r => {
          switch (r.data.status) {
            case 1:
              this.space = r.data.space;
              this.openFirstChannel();
              this.me = r.data.me;
              this.badges = r.data.badges;
              break;
            case 9:
              this.$router.push("/signin");
              break;

            default:
              console.log(r)
          }
        });
      },
      openFirstChannel() {
        if (this.$route.params.id) {
          let channel_id = this.$route.params.id;
          let need_channel = this.space.channels.filter(c => c.id == channel_id)[0];
          if (need_channel) {
            this.open_channel = need_channel
          } else {
            this.open_channel = {'id': channel_id, "type": "private"}
          }
        }
      },
      newChannel() {
        this.$router.push("/new-channel")
      },
      removeChannel(channel_id) {
        console.log(channel_id);
      },
      inviteUser() {

      },
      openPrivateChannel(user) {
        axios.get("http://chat.local/api/spaces/" + this.sd + "/get-user-channel?user_id=" + user.id).then(r => {
          let channel = r.data.channel;
          this.$nextTick(function () {
            this.$router.push('/channel/' + channel.id);
          });
          return
        })
      }
    }
  }
</script>

<style scoped>
  .list-group-item {
    background: inherit;
    border: none;
    border-bottom: 1px solid #fff;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    cursor: pointer;
  }

  .list-group-item:hover {
    background: #ffffff;
    color: #333333;
  }

  .list-group-item.title:hover {
    background: inherit;
  }

  .list-group-item.title:hover > p, .list-group-item.title:hover > a {
    color: #fff;
  }


  .form-control {
    background: #333333;
  }

  .input-group-text {
    background: #333333;
    color: #ffffff;
  }
</style>
