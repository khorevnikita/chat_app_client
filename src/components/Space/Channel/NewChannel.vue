<template>
  <div class="container">
    <div class="align-content-center d-flex flex-row">
      <form class="m-auto col-12 col-sm-6">
        <div class="form-group">
          <button type="button" class="btn btn-outline-light btn-sm float-right" @click="$router.go(-1)">x</button>
          <div style="clear: both"></div>
        </div>
        <div class="form-group">
          <input class="form-control" placeholder="Channel name" v-model="channel.name">
        </div>
        <!--<div class="form-group">
          <textarea class="form-control" placeholder="Description..." rows="3"></textarea>
        </div>-->

        <div class="form-group">
          <div class="custom-control custom-switch">
            <input @change="switchAccess()" type="checkbox" class="custom-control-input" id="access">
            <label class="custom-control-label" for="access">Make it private</label>
          </div>
        </div>
        <div class="form-group p-r">
          <input placeholder="Add user to channel..." type="text" v-model="search" class="form-control p-r">
          <ul class="list-unstyled selected-users">
            <li v-for="user in channel.users" class="list-inline-item">
              <span class="badge badge-pill badge-light">
                <img :src="user.avatar" class="img-fluid">
                {{user.name}}
              </span>
              <button @click="removeUser(user)" class="btn btn-sm btn-link text-white pl-0">x</button>
            </li>
          </ul>
          <div class="list-group users-list" v-if="people.length>0">
            <button type="button" v-for="user in uniquePeople" @click="addUser(user)" class="list-group-item list-group-item-action">
              {{user.name}}
            </button>
          </div>
        </div>
        <div class="form-group">
          <button type="button" @click="save()" class="btn btn-outline-warning btn-block ">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
    export default {
      name: "NewChannel",
      props: ['subdomain', 'token'],
      data() {
        return {
          channel: {
            name: "",
            //description: "",
            access: "visible",
            users: [],
          },
          search: "",
          isUpdating: false,
          people: [],
        }
      },
      watch: {
        search: function (val) {
          this.isUpdating = true;
          axios.get("http://chat.local/api/spaces/" + this.subdomain + "/users?q=" + this.search).then(r => {
            this.people = r.data.users;
            this.isUpdating = false;
          })
        }
      },
      computed: {
        uniquePeople: function () {
          return this.people.filter(u => this.channel.users.filter(cu => cu.id === u.id).length === 0)
        }
      },
      methods: {
        save() {
          axios.post("http://chat.local/api/spaces/" + this.subdomain + "/channels/create", this.channel).then(r => {
            if (r.data.status == 1) this.$router.push("/channel/" + r.data.channel_id);
            console.log(r);
          })
        },
        addUser(user) {
          this.channel.users.push(user);
          this.people = [];
          this.search = "";
        },
        removeUser(user) {
          this.channel.users.splice(this.channel.users.indexOf(user), 1)
        },
        switchAccess() {
          switch (this.channel.access) {
            case "hidden":
              this.channel.access = "visible";
              break;
            default:
              this.channel.access = "hidden";
          }
        }
      }
    }
</script>

<style scoped>
  .users-list {
    max-height: 200px;
    overflow-y: scroll;
    position: absolute;
    width: 100%;
    top: 38px;
  }

  .p-r {
    position: relative;
  }

  img {
    width: 30px;
  }
</style>
