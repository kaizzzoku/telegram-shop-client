<template>
  <v-row justify="center" align="center">
    <v-col>
      <h1>Admin Dashboard</h1>
      <v-card>
        <v-card-title class="headline">
          Bot Info
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field v-model="info.greeting"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-content">
          <v-btn @click="changeBotGreeting" block large>Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
  export default {
    auth: 'admin',
    layout: 'admin',

    data() {
      return {
        info: {
          greeting: undefined,
        },
      };
    },

    mounted() {
      if (this.$auth.$state.loggedIn && this.$auth.$state.strategy == 'admin') {  // move to middleware
        this.$axios.get('/admin/bot/info')
          .then(response => {
            this.info = response.data;
          });
      } else {
        this.$router.push({path: '/admin/auth/login'});
      }
    },

    methods: {
      changeBotGreeting() {
        this.$axios.put('/admin/bot/greeting', {'greeting': this.info.greeting})
        .then(response => {
          if (response.status < 300) {
            this.$toast.success('Bot greeting changed successfully');
          }
        });
      }
    },
  }
</script>
