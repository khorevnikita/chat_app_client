<template>
  <div class="h-100 w-100">
    <h4 id="channel-name">{{name}}</h4>

    <hr>

    <ul class="nav justify-content-end">
      <li class="nav-item">
        <button class="nav-link text-white" @click="$router.push('/channel/' + channel.id + '/members')">Members</button>
      </li>
      <li class="nav-item">
        <button class="nav-link text-white" @click="$router.push('/channel/' + channel.id + '/settings')">Settings</button>
      </li>
    </ul>
    <section class="chat-container" v-bind:style="{'height':chat_container_height+'px'}">
      <div class="chat-log" v-bind:style="{'height':chat_log_height+'px'}">
        <div class="media mt-3" v-for="message in messages">
          <img :src="messageAuthor(message).avatar" class="mr-3" alt="...">
          <div class="media-body">
            <h5 class="mt-0 text-left">
              {{messageAuthor(message).name}} {{messageAuthor(message).surname}}
              <span class="time">{{time(message.created_at)}}</span>
            </h5>
            <p class="text-left">{{message.value}}</p>
          </div>
        </div>
      </div>
      <div class="input-group mb-3">
        <input @keyup.enter="sendMessage" v-model="text" type="text" class="form-control" placeholder="Type a message..." aria-label="message"
               aria-describedby="btn-send">
        <div class="input-group-append">
          <button @click="sendMessage()" class="btn btn-outline-secondary" type="button" id="btn-send">
            Send
          </button>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: "ChannelMain",
    props: ['channel', 'subdomain', 'me'],
    data() {
      return {
        name: "",
        users: [],
        messages: [],
        text: "",
      }
    },
    created() {
      this.fetchMessages()
    },
    computed: {
      'chat_container_height': function () {
        let header_height = window.document.getElementsByTagName("header")[0].offsetHeight;
        let footer_height = window.document.getElementsByTagName("footer")[0].offsetHeight
        let window_height = window.innerHeight;
        let channel_name_height = window.document.getElementById("channel-name") ? window.document.getElementById("channel-name").clientHeight : 0
        let hr_height = window.document.getElementsByTagName("hr")[0] ? window.document.getElementsByTagName("hr")[0].clientHeight : 0;
        return window_height - header_height - footer_height - channel_name_height - hr_height - 70;
      },
      'chat_log_height': function () {
        let input_height = document.getElementsByClassName("form-group")[0] ? document.getElementsByClassName("form-group")[0].clientHeight : 0;
        return this.chat_container_height - input_height - 50;
      },

    },
    watch: {
      'channel': function (channel) {
        this.fetchMessages()
      }
    },
    methods: {
      fetchMessages() {
        axios.get("http://chat.local/api/spaces/" + this.subdomain + "/channels/" + this.channel.id).then(r => {
          switch (r.data.status) {
            case 1:
              this.messages = r.data.channel.messages;
              this.name = r.data.channel.name;
              this.users = r.data.channel.users;
              this.$nextTick(function () {
                var chatLog = document.querySelectorAll('.chat-log');
                chatLog[0].scrollTop = chatLog[0].scrollHeight;
              });
              break;
            case 9:
              this.$router.push("/signin");
              break;
            default:
              console.log(r)
          }
        })
      },
      sendMessage() {
        let new_message = {
          value: this.text,
          created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
          users: [
            {
              name: this.me.name,
              surname: this.me.surname,
              avatar: this.me.avatar,
              pivot: {
                is_author: 1
              }
            }
          ]
        };
        this.messages.push(new_message);
        this.$nextTick(function () {
          var chatLog = document.querySelectorAll('.chat-log');
          chatLog[0].scrollTop = chatLog[0].scrollHeight;
        });
        this.scrollLog();
        this.text = ""
      },
      scrollLog() {
        var chatLog = document.querySelectorAll('.chat-log');
        chatLog[0].scrollTop = chatLog[0].scrollHeight;
      },
      messageAuthor(message) {
        return message.users.filter(u => u.pivot.is_author === 1)[0]
      },
      time(date) {
        return moment(date, "YYYY-MM-DD HH:mm:ss").format("HH:mm")
      }
    }
  }
</script>

<style scoped>
  img {
    max-width: 40px;
  }

  .chat {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .chat-container {
    display: flex;
    flex-direction: column;
    /*height: 100vh;*/
    justify-content: flex-end;
    overflow-y: scroll;
  }

  .chat-log {
    overflow-y: auto;
    display: flex;
    flex-flow: column nowrap;
  }

  .chat-log > :first-child {
    margin-top: auto !important;
    /* use !important to prevent breakage from child margin settings */
  }

  .time {
    font-size: 14px;
    float: right;
  }

  .chat-message {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .chat-message--right {
    flex-direction: row-reverse;
  }
</style>
