<template>
  <v-app dark>
    <v-main>
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="8">
            <v-card>
              <v-card-title>Login</v-card-title>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="login_form.email"
                    type="email"
                    label="Email Address"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="login_form.password"
                    type="password"
                    label="Password"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn  @click="login()" large block color="primary">
                  Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
  export default {
    layout: 'auth',
    auth: 'guest',

    data() {
      return {
        login_form: {
          email: '',
          password: '',
        },
      };
    },

    mounted() {

    },

    methods: {
      login() {
        this.$auth.loginWith('admin', {
          data: {
            email: this.login_form.email,
            password: this.login_form.password,
          },
        }).then(response => {
          this.$toast.success('You successfully logged in');
          this.$router.push({path: '/admin/dashboard'});
        }).catch(errors => {
          this.errors = errors.response.data.errors;
        });
      },
    },
  }
</script>
