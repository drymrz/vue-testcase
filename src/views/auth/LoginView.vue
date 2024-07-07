<template lang="html">
  <main class="form-signin container">
    <form @submit.prevent="login" class="col-8 mx-auto">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <div v-if="errorMessage" class="alert alert-danger mt-2">
        {{ errorMessage }}
      </div>

      <div class="form-floating mb-2">
        <input
          type="text"
          class="form-control"
          id="username"
          placeholder="Username"
          v-model="username"
          required
        />
        <label for="username">Username</label>
      </div>

      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          v-model="password"
          required
        />
        <label for="password">Password</label>
      </div>

      <button class="w-100 btn btn-lg btn-primary mt-2" type="submit">Sign in</button>
    </form>
  </main>
</template>

<script>
import { login } from '@/services/authService'

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    async login() {
      try {
        const response = await login(this.username, this.password)
        if (response.status === 200) {
          const { access_token, refresh_token } = response.data
          localStorage.setItem('access_token', access_token)
          localStorage.setItem('refresh_token', refresh_token)
          localStorage.setItem('company', 'd3170153-6b16-4397-bf89-96533ee149ee')
          this.errorMessage = ''
          this.$router.push({ name: 'masteritem-list' })
        } else {
          this.errorMessage = 'Invalid username or password'
          this.password = ''
        }
      } catch (error) {
        console.error('Error during login:', error)
      }
    }
    // async login() {
    //   const payload = {
    //     UserName: this.username,
    //     Password: this.password,
    //     Company: this.tokenCompany,
    //     Device: 'web_1703742830368',
    //     Model: 'Admin Web',
    //     Source: '103.242.150.163',
    //     Exp: 3
    //   }

    //   try {
    //     const response = await axios.post(
    //       'https://core.api.elsoft.id/portal/api/auth/signin',
    //       payload
    //     )
    //     const { access_token, refresh_token } = response.data
    //     this.setToken(access_token, refresh_token, this.tokenCompany)
    //     this.errorMessage = ''
    //     this.$router.push({ name: 'dashboard' })
    //   } catch (error) {
    //     if (error.response && error.response.status === 401) {
    //       this.errorMessage = 'Invalid username or password'
    //       this.password = ''
    //     } else {
    //       this.errorMessage = 'An error occurred. Please try again later.'
    //     }
    //     console.error('Error during login:', error)
    //   }
    // },

    // setToken(access_token, refresh_token, company) {
    //   localStorage.setItem('access_token', access_token)
    //   localStorage.setItem('refresh_token', refresh_token)
    //   localStorage.setItem('company', company)
    // }
  }
}
</script>

<style scoped>
.form-signin {
  margin-top: 30vh;
}
</style>
